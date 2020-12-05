const dbClient = require("../Utils/DBUtils");
const env = require("dotenv").config({ path: require("find-config")("env") });
const dbSchema = env.parsed.DB_SCHEMA;

exports.insertRegisterUserData = function(dataMap){
   let queryString = `INSERT INTO ${dbSchema}.user_details(
            user_id, user_name, email_id, password, first_name, last_name,
            d_o_b, phone_no, company_name, experience,
            created_by, created_at, updated_by, updated_at
            ) VALUES(
            '${dataMap.user_id}','${dataMap.user_name}','${dataMap.email_id}','${dataMap.password}','${dataMap.first_name}','${dataMap.last_name}',
            '${dataMap.d_o_b}',${dataMap.phone_no},'${dataMap.company_name}',${dataMap.experience},
            '${dataMap.user_name}','${new Date().toDateString()}','${dataMap.user_name}','${new Date().toDateString()}')`;

   return dbClient.query(queryString);
}

exports.getLoginUserData = function(user_name, email_id, password){
    let queryString = `SELECT user_id, first_name, last_name,
    d_o_b, phone_no, company_name, experience,created_by, created_at, updated_by, updated_at
    FROM ${dbSchema}.user_details WHERE (password = '${password}' AND ( user_name = '${user_name}' 
    OR  email_id = '${email_id}') )`;
    return dbClient.query(queryString);
 }

 exports.getExistUserData = function(user_name, email_id){
    let queryString = `SELECT user_id, user_name, email_id
    FROM ${dbSchema}.user_details WHERE  ( user_name = '${user_name}' 
    OR  email_id = '${email_id}') `;
    return dbClient.query(queryString);
 }

 exports.updatePassword = function(user_name, email_id, password){
    let queryString = `UPDATE ${dbSchema}.user_details SET  password = ${password}
    WHERE  ( user_name = '${user_name}' 
    AND  email_id = '${email_id}') `;
    return dbClient.query(queryString);
 }



