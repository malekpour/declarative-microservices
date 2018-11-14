export default function (app, db) {
  app.post('/imperative/employee', function (req, res) {
    // table columns
    const columns = [
      "Id", "LastName", "FirstName", "Title", "TitleOfCourtesy", "BirthDate",
      "HireDate", "Address", "City", "Region", "PostalCode", "Country",
      "HomePhone", "Extension", "Photo", "Notes", "ReportsTo", "PhotoPath"
    ];

    // intersect of passed object column names and valid table colums, this
    // is to extract valid column names from the input
    const keys = Object.keys(req.body).filter(value => -1 !== columns.indexOf(value));;

    // passed object column valus
    const values = keys.map(value => req.body[value]);

    db.run(`INSERT INTO Employee (${keys.join(', ')}) VALUES (${keys.map(key => '?').join(', ')})`, values, function (err) {
      if (err) {
        console.log(err);
        res.status(500);
        res.json({ error: { ...err, message: err.toString() } });
      }
      else {
        res.status(202);
        res.json({ result: ({ lastId: this.lastID }) });
      }
      res.end();
    });
  });
}
