const { Client } = require('pg');
const env = require("dotenv").config({ path: require("find-config")("env") });
let dbUrl = process.env.DATABASE_URL ||  env.parsed.DATABASE_URL;

const client = new Client({
  connectionString: dbUrl,
  ssl: false
});

client.connect().then(() =>{
    console.log("##### LOG : "+new Date().toISOString() + " : DB Connected ");
}).catch((error) =>{
    console.log("##### ERROR : "+new Date().toISOString() + ": Failed To Connect DB ");
    console.log(error);
});


module.exports=client;