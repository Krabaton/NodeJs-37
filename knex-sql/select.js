const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: '567234',
    database: 'learn',
  },
})

/*
SELECT ROUND(AVG(p.total), 2) AS salary, e.post
FROM payments AS p
LEFT JOIN employees AS e ON p.employee_id = e.id
GROUP BY e.post;
*/

// knex
//   .select(knex.raw('ROUND(AVG(payments.total), 2) AS salary'), 'employees.post')
//   .from('payments')
//   .leftJoin('employees', 'payments.employee_id', 'employees.id')
//   .groupBy('employees.post')
//   .orderBy('salary', 'desc')
//   .then((r) => {
//     console.log(r)
//     knex.destroy()
//   })
//   .catch((e) => {
//     console.log(e)
//     knex.destroy()
//   })

knex
  .raw(
    `
    SELECT c.company_name, e.employee, e.post, p.total
    FROM companies c
      LEFT JOIN employees e ON e.company_id=c.id
      LEFT JOIN payments p ON p.employee_id=e.id
    WHERE p.total > 7000 AND p.date_of BETWEEN '2020-03-10' AND '2020-03-20'`,
  )
  .then((r) => {
    console.log(r.rows)
    knex.destroy()
  })
  .catch((e) => {
    console.log(e)
    knex.destroy()
  })
