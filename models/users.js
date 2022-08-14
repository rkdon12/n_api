const db = require('../db/db');
const config = require('../config');

async function getUsers(){
  const rows = await db.query("SELECT * from users");
 //return rows;
  /*function emptyOrRow(rows){
    if(!rows){
      return []
    }
    return rows;
  }*/

  const data = rows;
  return {
    data
  }
  //getUsers().then(result => console.log(result));
  //console.log(rows);
}
 module.exports = {
   getUsers
 }
