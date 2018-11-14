// initialize web application
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());

// initialize database
import sqlite from 'sqlite3';
const dbserver = sqlite.verbose();
const db = new dbserver.Database('data/northwind.sqlite');

// initialize imperative microservices
import initImperative from './src/imperative.mjs';
initImperative(app, db, express);

// initialize declarative microservices
import initDeclarative from './src/declarative.mjs';
initDeclarative(app, db, express);

// start listening to incomming requests
const port = process.env.PORT || '3000';
const listener = app.listen(port, () => {
  console.log(`Listening on port ${listener.address().port}`);
});
