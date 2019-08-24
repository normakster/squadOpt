'use strict';
const util = require('./utilController');
const debug = require('debug')('app:Controller');
const mongoose = require('mongoose');
const Model = require('../models/model');

var models = {};
var model = "";

exports.list = function(req,res,next) {
  Model.find({  }, (err, models) => {
    if (err) return res.status(500).send("There was a problem finding anything.");;
    if (!models) return res.status(404).send("No model found.");
    res.status(200).send(models);
  });
};

exports.create = async  (req, resp) => {
    try{
      await Model.create( req.body, (err, model) => {
        if (err) return resp.status(500).send("There was a problem adding the information to the database.");
        return resp.status(200).send(model);
      });
    }
    catch (err) {
      debug(err);
    }
  };

exports.read = function(req,res,next) {
  if( req.params._id ) {
    Model.findById( req.params._id, (err, model) => {
        if (err) return res.status(500).send("There was a problem finding the model.");
        if (!model) return res.status(404).send("No model found.");
        console.log('sending: '+model);
        res.status(200).send(model);
    });
  }
};

exports.update = function(req,res,next) {
    Model.findByIdAndUpdate( req.body._id, req.body, (err, model) => {
      if (err) return res.status(500).send("There was a problem updating the model.");;
      if (!model) return res.status(404).send("No model found.");
      console.log('sending: '+model);
      res.status(200).send(model);
    });
  };

exports.delete = async  (req, res) => {
    Model.findByIdAndRemove( req.params._id, (err, model) => {
      if (err) return res.status(500).send("There was a problem deleting the model.");
      return res.status(200).send(model);
    });
  };
