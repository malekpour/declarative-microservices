export default function (app, db) {
  app.patch('/imperative/product/:productId', function (req, res) {
    // table columns
    const columns = [
      "Id", "ProductName", "SupplierId", "CategoryId", "QuantityPerUnit", "UnitPrice",
      "UnitsInStock", "UnitsOnOrder", "ReorderLevel", "Discontinued"      
    ];

    // intersect of passed object column names and valid table colums, this
    // is to extract valid column names from the input
    const keys = Object.keys(req.body).filter(value => -1 !== columns.indexOf(value));;

    // passed object column valus
    const values = keys.map(value => req.body[value]);

    db.run(`UPDATE Product SET ${keys.map(key => key + ' = ?').join(', ')} WHERE Id = ?`, [...values, req.params.productId], function (err) {
      if (err) {
        console.log(err);
        res.status(500);
        res.json({ error: { ...err, message: err.toString() } });
      }
      else {
        res.status(202);
        res.json({ result: ({ changes: this.changes }) });
      }
      res.end();
    });
  });
}
