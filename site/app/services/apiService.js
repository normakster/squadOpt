const request = require("request-promise-native");
const debug = require('debug')('app:projectController');

// var Project = require('../models/project');
// var masterOptions = {
//   url: 'http://back_end:3000/api/project/',
//   method: 'GET',
//   headers:{
//     'Accept':'application/json',
//     'Accept-Language':'en-GB,en-US;q=0.8,en;q=0.6'
//   }
// };
// const apiUrl = 'http://backend:3000/squadOpt/api/';


exports.list = async (apiUrl, req, res) => {
  var listOptions = {
    url: apiUrl,
    method: 'GET',
    headers:{
      'Accept':'application/json',
      'Accept-Language':'en-GB,en-US;q=0.8,en;q=0.6'
    }
  };
  try {
    // const listOptions = masterOptions;
    // options.method = 'GET';
    // console.log(listOptions);
    return await request(listOptions, function (err, resp, body) {
      console.log(body);
      return body;
    });

  }
  catch (err) {
    debug(err);
  }
};

exports.read = async (apiUrl, _id) => {
  console.log('In api_Service');
  var readOptions = {
    url: apiUrl,
    method: 'GET',
    headers:{
      'Accept':'application/json',
      'Accept-Language':'en-GB,en-US;q=0.8,en;q=0.6'
    }
  };
  try {
    // const readOptions = masterOptions;
    readOptions.url = readOptions.url + _id;
    return await request(readOptions, function (err, resp, body) {
      console.log('error: ' + err);
      console.log('body: ' + body);
      return body;
    });
  }
  catch (error) {
    debug(error);
  }
};

exports.create = async (apiUrl, obj, targetURL) => {
  const url = apiUrl;
  console.log('Creating object: ' + obj);
  const newObj = JSON.parse(obj);
  try {
    request.post(url, {
        body: newObj,
        json: true
      },
      (error, res, body) => {
        if (error) {
          console.error(error);
          return
        }
        console.log(`statusCode: ${res.statusCode}`);
        // console.log(body);
      }).then(function(res) {
        res.redirect(targetURL);
      });
  }
  catch (err) {
    debug(err);
  }
};

exports.update = async (apiUrl, obj) => {
  var updateOptions = {
    url: apiUrl,
    method: 'PUT',
    headers:{
      'Accept':'application/json',
      'Accept-Language':'en-GB,en-US;q=0.8,en;q=0.6'
    }
  };
  // console.log('Trying to update: ' + JSON.stringify(project));
  console.log('Trying to update: ' + JSON.stringify(obj));
  try {
    // const updateOptions = masterOptions;
    updateOptions.url = updateOptions.url + project._id;
    // updateOptions.method = 'PUT';
    updateOptions.json = JSON.parse(obj);
    return await request(updateOptions, function ( err, resp, body) {
      console.log('error: ' + err);
      console.log('results body: ' + body);
      return body;
    });
  }
  catch (err) {
    debug(err);
  }
};

exports.delete = async (apiUrl, obj) => {
  var deleteOptions = {
    url: apiUrl,
    method: 'DELETE',
    headers:{
      'Accept':'application/json',
      'Accept-Language':'en-GB,en-US;q=0.8,en;q=0.6'
    }
  };
  var _id = JSON.parse(obj)._id;
  // console.log("deleteOptions _id: " + _id);
  try {
    deleteOptions.url = deleteOptions.url + _id;
    // deleteOptions.url = deleteOptions.url + "delete/"+ _id;
    console.log(deleteOptions);
    return await request(deleteOptions, function ( err, resp, body) {
      console.log('error: ' + err);
      console.log('results body: ' + body);
      return body;
    });
  }
  catch (err) {
    debug(err);
  }
};

module.exports = exports;
