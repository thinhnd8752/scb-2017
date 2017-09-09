'use strict';
const router = require('express').Router();
const Promise = require('bluebird');
const path = require('path');
const Database = require('nedb');

Promise.promisifyAll(Database.prototype);
const db = new Database({
    filename: path.join(__dirname, '/db/nedb/todos.db'),
    autoload: true,
  });

router.get('/', (req, res, next) => {
  db.findAsync({})
  .then(results => res.render('todo-demo', { todos: results }))
  .catch(next);
});

router.post('/todo', (req, res, next) => {
  db.insertAsync({ description: req.body.description })
  .then(result => res.send(result))
  .catch(next);
});

router.delete('/todos', (req, res, next) => {
    db.removeAsync({}, { multi: true })
    .then(() => res.send())
    .catch(next);
  });

module.exports = router;
