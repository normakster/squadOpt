'use strict';
const debug = require('debug')('app:Controller');
const mongoose = require('mongoose');
const GenObj = require('../models/model');

// var players = {};
// var player = "";

exports.setModel = function(obj) {
  GenObj = obj;
}

exports.list = function(req,res,next) {
  GenObj.find({  }, (err, players) => {
    if (err) return res.status(500).send("There was a problem finding anything.");;
    if (!players) return res.status(404).send("No player found.");
    res.status(200).send(players);
  });
};

exports.create = async  (req, resp) => {
    try{
      await GenObj.create( req.body, (err, player) => {
        if (err) return resp.status(500).send("There was a problem adding the information to the database.");
        return resp.status(200).send(player);
      });
    }
    catch (err) {
      debug(err);
    }
  };

exports.read = function(req,res,next) {
  if( req.params._id ) {
    GenObj.findById( req.params._id, (err, player) => {
        if (err) return res.status(500).send("There was a problem finding the player.");
        if (!player) return res.status(404).send("No player found.");
        console.log('sending: '+player);
        res.status(200).send(player);
    });
  }
};

exports.update = function(req,res,next) {
    GenObj.findByIdAndUpdate( req.body._id, req.body, (err, player) => {
      if (err) return res.status(500).send("There was a problem updating the player.");;
      if (!player) return res.status(404).send("No player found.");
      console.log('sending: '+player);
      res.status(200).send(player);
    });
  };

exports.delete = async  (req, res) => {
    GenObj.findByIdAndRemove( req.params._id, (err, player) => {
      if (err) return res.status(500).send("There was a problem deleting the player.");
      return res.status(200).send(player);
    });
  };
