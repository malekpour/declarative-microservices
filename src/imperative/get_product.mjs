export default function (app, db) {
  // get all records from product table
  // imperative/product/
  app.get('/imperative/product', function (req, res) {

    // call database
    db.all("SELECT * FROM Product", function (err, data) {
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

  // get one record from product table
  // imperative/product/:productId?
  app.get('/imperative/product/:productId?', function (req, res) {

    // call database
    db.all("SELECT * FROM Product WHERE Id = ?", req.params.productId, function (err, data) {
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
