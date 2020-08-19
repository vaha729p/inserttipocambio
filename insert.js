const mariadb = require('mariadb');
const express=require('express');
const app=express();
const bodyParser=require('body-parser');

const pool = mariadb.createPool(
    {host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'armando',
        password: process.env.DB_PASS || 'armando',
        database: process.env.DB_NAME || 'tipocambio',
        port: process.env.DB_PORT || '3307',
         connectionLimit: 5});
 
const port=process.env.SERVERPORT||'4170'
const serverip=process.env.SERVERIP||'0.0.0.0';

app.use (bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


app.post('/inserttipocambio',async function asyncFunction(req,res) {
  let conn;
  let valores = req.body;
  console.log(req.body);
  try {
 
    conn = await pool.getConnection();
    // const rows = await conn.query("SELECT 1 as val");
    // rows: [ {val: 1}, meta: ... ]
 
    const rows = await conn.query(`insert into  tipocambio.historico values('${valores.id}','${valores.fecha}','${valores.monto}')`);
    res.json(rows);
    conn.release();
 
  } catch (err) {
    throw err;
    res.json(err);
    conn.release();
  }
});

app.listen(port, serverip, function(request, response){
    console.log('el servidor escucha por el puerto:', port)   
});
    