
const {Pool } = require('pg');
// host is the name of db container
//module.exports = new Pool ({user:'puser', host:'postgress_db',database:'db' ,password:'pass',port:'5432' });
module.exports = new Pool ({user:'puser', host:'localhost',database:'db' ,password:'pass',port:'5432' });




//const conString = "postgres://YourUserName:YourPassword@YourHost:5432/YourDatabase";
// const t= 'postgres://puser:pass@postgres:5432/db'
// console.log(t)
// module.exports = new Pool({
//   max: 10,
//   connectionString: t
// });
