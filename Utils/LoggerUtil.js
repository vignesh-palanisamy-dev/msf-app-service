// IN production :  console logs are replaced by  any file logger 


// logged every api request
exports.request = (req) => {
    let route = req.baseUrl;
    console.log("##### REQ : "+new Date().toISOString()  + " Access route " + route);
};

// logged every api response
exports.response = (req, res, responseData) => {
    let dataMap = undefined !== responseData ? responseData : "";
    let route = req.baseUrl;
    let responseMap = {
        status: "success",
        code: "200",
        result: dataMap,
    };
    console.log("##### RES : "+new Date().toISOString()  + " " + route + " get completed");
    return res.status(200).json(responseMap);
};

// logged every api error
exports.error = (req, res, errorCode, errorData) => {
    let route = req.baseUrl;
    let responseMap = {
        status: "error",
        code: errorCode,
        result: errorData,
    };
    console.log("##### ERROR : "+new Date().toISOString()  + " " + route + " get failed");
    console.log(errorData);
    return res.status(errorCode).json(responseMap);
};
