import { sequelize } from '../models'

export const login = async (ctx, next) => {
  const userData = ctx.request.body
  
  let query = `
    select * from member.member_data
    where account='${userData.account}' and password='${userData.password}'
  `
  const CheckLogin = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT })

  if (CheckLogin.length !== 0) {
    ctx.body = {
      success: true,
      data: CheckLogin
    }
  } else {
    ctx.body = {
      success: false,
      data: []
    }
  }
  next()
}

export const bookInfo = async (ctx, next) => {
  const query = `select * from member.book_data`
  const data = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT }) 
  ctx.body = {
    sucess: true,
    data: data
  }
  next()
}

export const create = async (ctx, next) => {
  const bookInfo = ctx.request.body
  const query = `
  INSERT INTO member.book_data(\`id\`,\`title\`,\`author\`,\`quantity\`,\`price\`) 
  VALUES( 
    ${null},
    '${bookInfo.title}',
    '${bookInfo.author}',
    '${bookInfo.quantity}',
    '${bookInfo.price}'
  )
  `
  await sequelize.query(query, { type: sequelize.QueryTypes.INSERT })

  ctx.body = {
    success: true,
    message: 'create success'
  }
  next()
}

export const update = async (ctx, next) => {
  const { id } = ctx.params
  const { title, author, quantity, price } = ctx.request.body
  let set = []
  
  title ? set.push(`title='${title}'`)  : null
  author ? set.push(`author='${author}'`) : null
  quantity ? set.push(`quantity='${quantity}'`) : null
  price ? set.push(`price='${price}'`) : null

  if (set.length === 0) ctx.throw(400, 'error')

  let query = `
    update member.book_data
    set ${set.join(',')}
    where id=${id}
  `
  await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE })

  ctx.body = {
    success: true,
    message: `update ID: ${id} is success`
  }
  next()
}

export const del = async (ctx, next) => {
  const { id } = ctx.params
  const query = `delete from member.book_data where id=${id}`
  const user = await sequelize.query(query, { type: sequelize.QueryTypes.DELETE })

  if (!user) {
    ctx.body = {
      success: false,
      message: 'The id is not exists'
    }
  } else {
    ctx.body = {
      success: true,
      message: `delete ID: ${id} is success`
    }
  }
  
  
  next()
}