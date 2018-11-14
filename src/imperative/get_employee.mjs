export default function (app, db) {
  // get all records from employee table
  // imperative/employee/
  app.get('/imperative/employee', function (req, res) {

    // call database
    db.all("SELECT * FROM Employee", function (err, data) {
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

  // get one record from employee table
  // imperative/employee/:employeeId?
  app.get('/imperative/employee/:employeeId?', function (req, res) {

    // call database
    db.all("SELECT * FROM Employee WHERE Id = ?", req.params.employeeId, function (err, data) {
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
}
