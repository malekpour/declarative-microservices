export default function (app, db) {
  app.delete('/imperative/product/:productId', function (req, res) {
    db.run(`DELETE FROM Product WHERE Id = ?`, [req.params.productId], function (err) {
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
