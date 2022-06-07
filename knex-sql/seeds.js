const { faker } = require('@faker-js/faker')

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

const NUMBER_OF_COMPANY = 5
const NUMBER_OF_EMPLOYEE = 15

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //Максимум не включается, минимум включается
}

company = []

for (let i = 0; i < NUMBER_OF_COMPANY; i++) {
  company.push({ company_name: faker.company.companyName() })
}

employees = []

for (let i = 0; i < NUMBER_OF_EMPLOYEE; i++) {
  employees.push({
    employee: faker.name.findName(),
    post: faker.name.jobTitle(),
    company_id: getRandomInt(1, NUMBER_OF_COMPANY + 1),
  })
}

payments = []

for (let i = 1; i <= 12; i++) {
  month_total = []
  month = i < 10 ? `0${i}` : i
  for (let j = 1; j <= NUMBER_OF_EMPLOYEE; j++) {
    paymentDate = faker.date.between(`2020-${month}-10`, `2020-${month}-20`)
    month_total.push({
      employee_id: j,
      date_of: paymentDate,
      total: getRandomInt(1000, 10000),
    })
  }
  payments.push(month_total)
}

knex('companies')
  .insert(company)
  .then((r) => {
    console.log(r)
    return knex('employees').insert(employees)
  })
  .then((r) => {
    console.log(r)
    return Promise.all(
      payments.map((payment) => {
        return knex('payments').insert(payment)
      }),
    )
  })
  .then(() => {
    console.log('Seeds done')
    knex.destroy()
  })
