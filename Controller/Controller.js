// Express server instead of HTTP.
const express = require("express");
const controller = express();
const cors = require("cors");
const multipluxer = require("./Multipluxer");

// Here we can use process.env but process.env is not woking while deploying in aws server.
const env = require("dotenv").config({ path: require("find-config")("env") });

// Default aign of port if it is unavailable form env.
const port = env.parsed.PORT || 3000;

// Allow all origin to access this server resource.
// In Production :  Need to allow particular origin. 
controller.use(cors());

// parse data based on content-type (json/byte)
controller.use(express.json());

// context path mapped with multipluxer router (router handler)
controller.use(env.parsed.CONTEXT_PATH,multipluxer);

// req.body is object with key value pairs (values are only string/array in extended : false)
// (if it is true then it allow all type)
// example : true allow { Name : 'John Smith', Age: 23} but false allow only Name=John+Smith&Age=23
controller.use(express.urlencoded({ extended: true }));

controller.listen(process.env.PORT, () => {
    console.log("##### LOG : "+new Date().toISOString() + ": MSF App Service Connected At PORT " + port);
});
