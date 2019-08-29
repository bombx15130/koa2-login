import Sequelize from 'sequelize'

export const sequelize = new Sequelize('member', null, null, {
  host: 'localhost',
  username: 'root',
  password: '123456',
  port: '3306',
  dialect: 'mysql'
})


// test connection
export const testDBConnection = async seql => {
  try {
    await seql.authenticate()
    console.log('Database connection has been established successfully.')
  } catch (err) {
    console.error('Unable to connect to the database:', err)
  }
}

