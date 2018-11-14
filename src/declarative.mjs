import fs from 'fs';
import yaml from 'js-yaml';
import glob from 'glob';

// this is our declaration engine
function processDeclaration(app, db, decl) {
  // each declaration contains an array of services, loop through and process one by one
  decl.forEach(service => {

    // register service route with handler
    app.all(service.route, function (req, res, next) {

      // this handler accepts all HTTP methods so if request method does not match service method
      // we ignore the block and call next handler in the pipeline
      if (req.method.localeCompare(service.method, 'en', {sensitivity: 'base'}) !== 0) {
        return next();
      }

      // extract request parameters by mapping to service declared parameters
      const params = (service.params || []).map(name => req.param(name))

      // execute database
      db.all(service.script, params, function (err, data) {
        if (err) {
          console.log(err);
          res.status(500);
        } else {
          res.status(202);
          res.json({ result: data });
        }
        res.end();
      });

    });

    console.log(service);
  })  
}

// entry point
export default function(app, db) {
  // find all declarations with the following name pattern
  glob('./src/declarative/*.svc.+(yml|yaml)', function(er, files) {
    // loop throgh found files
    files.forEach((file) => {
      try {
        // try to load YAML files and process one by one
        const decl = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
        processDeclaration(app, db, decl);
      } catch (e) {
        console.error(e);
      }
    })
  })
}
