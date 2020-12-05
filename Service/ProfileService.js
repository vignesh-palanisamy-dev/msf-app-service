const dbClient = require("../Utils/DBUtils");
const env = require("dotenv").config({ path: require("find-config")("env") });
const dbSchema = env.parsed.DB_SCHEMA;

exports.updateUserData = function(user_name, phone_no, updateDataMap){
    let queryString = `UPDATE ${dbSchema}.user_details
             SET email_id ='${updateDataMap.email_id}',  password ='${updateDataMap.password}'
             first_name ='${updateDataMap.first_name}',  last_name ='${updateDataMap.last_name}'
             d_o_b ='${updateDataMap.d_o_b}',  company_name ='${updateDataMap.company_name}'
             experience =${updateDataMap.experience},  updated_at ='${new Date().toDateString()}'
             WHERE (user_name = '${user_name}' AND phone_no = ${phone_no})`;
    return dbClient.query(queryString);
 }