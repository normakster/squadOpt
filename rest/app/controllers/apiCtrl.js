'use strict';
const debug = require('debug')('app:Controller');
const mongoose = require('mongoose');
const Player = require('../models/player');
var request = require("request-promise-native");
const os = require("os");

const hostname = os.hostname();
var players = {};
var player = "";

// SERVICES
// exports.list = function(req,res,next) {
exports.list = async (req,res,next) => {
  return await Player.find({  }, (err, players) => {
    if (err) return res.status(500).send("There was a problem finding anything.");;
    if (!players) return res.status(404).send("No player found.");
    res.status(200).send(players);
    console.log('found: '+players);
    // return players;
  });
};

exports.add = async  (req, resp) => {
    try{
      await Player.create( req.body, (err, player) => {
        if (err) return resp.status(500).send("There was a problem adding the information to the database.");
        return resp.status(200).send(player);
        // resp.redirect('/squadOpt/player');
      });
    }
    catch (err) {
      debug(err);
    }
  };

exports.read = async (req,res,next) => {
  if( req.params._id ) {
    await Player.findById( req.params._id, (err, player) => {
        if (err) return res.status(500).send("There was a problem finding the player.");
        if (!player) return res.status(404).send("No player found.");
        console.log('sending: '+player);
        res.status(200).send(player);
    });
  }
};

exports.update = async (req,res,next) => {
    await Player.findByIdAndUpdate( req.body._id, req.body, (err, player) => {
      if (err) return res.status(500).send("There was a problem updating the player.");;
      if (!player) return res.status(404).send("No player found.");
      console.log('sending: '+player);
      res.status(200).send(player);
    });
  };

exports.delete = async  (req, res) => {
    Player.findByIdAndRemove( req.params._id, (err, player) => {
      if (err) return res.status(500).send("There was a problem deleting the player.");
      return res.status(200).send(player);
    });
  };



  // VIEWS
  exports.renderAdd = (req, res) => {
    res.render('addPlayer', { title: 'Adding a Player' });
  };

  exports.renderEdit = (req, res) => {
    exports.read(req,res).then(function(results){
      player = results;
      console.log('player: '+player);
      res.render('editPlayer', { player: player, title: 'Editting a Player' });
    })
  };

  exports.commitEdit = function (req, res, next) {
    try {
      console.log("Body:  "+JSON.stringify(req.body));
      exports.update(req,res).then(function(){
        res.redirect('/squadOpt/player');
      });
    }
    catch (err) {
      debug(err);
    }
  };

  // exports.renderList = async (req, res, next) => {
  exports.renderList = function (req, res, next) {
    try {
      exports.list(req, res, next).then(function(results){
      // var players = exports.list(req, res, next);
        // if(results == null) {
        //   res.redirect('/');
        // }
        console.log('returned: '+results);
        // players = JSON.stringify(results);
        // players = JSON.parse(results);
        players = results;
        console.log('players: '+players);
        res.render('playerList', { players: players, title: 'Players List', hostname });
      });
    }
    catch (err) {
      debug(err);
    }
  };
