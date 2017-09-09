'use strict'
const router = require('express').Router();
const Pool = require('pg').Pool;
const pool = new Pool({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
	user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    max: 5,
    min: 2,
  });

const insertTodoSql = 'insert into todo (description) values ($1) returning id';

router.get('/', (req, res, next) => {
  pool.query('select id, description from todo')
      .then(results => res.render('todo-demo',{todos: results.rows}))
      .catch(next);
});

router.post('/todo', (req, res, next) => {
      pool.query(insertTodoSql,[req.body.description])
	  	  .then(results => res.send({id: results.rows[0].id, description: req.body.description}))
		  .catch(next);
    });

router.delete('/todos', (req, res, next) => {
	pool.query('delete from todo')
		.then(res.send())
		.catch(next);
  });

module.exports = router;
