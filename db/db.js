const mysql = require('mysql');
const config = require('../config');

async function query(sql, params){
  const connection = await mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    port: config.db.port,
  });

  connection.connect((err)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("connected");
    }
  })

  //const [results, fields, ] = await connection.execute(sql, params);

  /*return {
    results,
    fields
  }*/
}
module.exports ={
  query
}
