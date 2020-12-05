// IN production :  console logs are replaced by  any file logger 


// logged every api request
exports.request = (req) => {
    let route = req.originalUrl;
    console.log("##### REQ : "+new Date().toISOString()  + " Access route " + route);
};

// logged every api response
exports.response = (req, res, responseData) => {
    let dataMap = undefined !== responseData ? responseData : "";
    let route = req.originalUrl;
    let responseMap = {
        status: "success",
        code: "200",
        result: dataMap,
    };
    console.log("##### RES : "+new Date().toISOString()  + " " + route + " get completed");
    return res.status(200).json(responseMap);
};

// logged every api error
exports.error = (req, res, errorCode, errorData, error_opt) => {
    let route = req.originalUrl;
    let responseMap = {
        status: "error",
        code: errorCode,
        result: errorData,
    };
    console.log("##### ERR : "+new Date().toISOString()  + " " + route + " get failed");
    console.log(errorData);
    console.log(error_opt);
    return res.status(errorCode).json(responseMap);
};
