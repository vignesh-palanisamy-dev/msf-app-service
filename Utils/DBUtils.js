const { Client } = require('pg');
const env = require("dotenv").config({ path: require("find-config")("env") });
let dbUrl = process.env.DATABASE_URL ||  env.parsed.DATABASE_URL;
const dbSchema = process.env.DB_SCHEMA || env.parsed.DB_SCHEMA;

const client = new Client({
  connectionString: dbUrl,
  ssl: false
});

client.connect().then(() =>{
    console.log("##### LOG : "+new Date().toISOString() + " : DB Connected ");
    createTable();
}).catch((error) =>{
    console.log("##### ERROR : "+new Date().toISOString() + ": Failed To Connect DB ");
    console.log(error);
});


function createTable(){
  let dropQueryString = `DROP TABLE ${dbSchema}.user_details`;
  client.query(dropQueryString).then(() =>{
    let createQueryString = `CREATE TABLE ${dbSchema}.user_details
    (
        user_id character varying(1000) NOT NULL,
        user_name character varying(1000) NOT NULL,
        email_id character varying(1000) NOT NULL,
        password character varying(1000),
        first_name text,
        last_name text,
        d_o_b text,
        phone_no bigint,
        company_name text,
        experience integer,
        created_by character varying(1000),
        created_at timestamp without time zone,
        updated_by character varying(1000),
        updated_at timestamp without time zone,
        CONSTRAINT user_details_pkey PRIMARY KEY (user_id, user_name, email_id)
    )`;
    client.query(createQueryString).then(() =>{
      console.log("##### LOG : "+new Date().toISOString() + " : Table Created Successfully");
    });
  }).catch((error) =>{
    console.log("##### ERR : "+new Date().toISOString() + " : Error While Creating Table");
    console.log(error);
  });
}


module.exports=client;