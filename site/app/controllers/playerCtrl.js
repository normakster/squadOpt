'use strict';
const debug = require('debug')('app:Controller');
// const mongoose = require('mongoose');
// const Player = require('../models/player');
var request = require("request-promise-native");
const os = require("os");
var Service = require('../services/apiService');

const hostname = os.hostname();
const apiUrl = 'http://backend:3000/squadOpt/api/';
const targetUrlHome = '/squadOpt/player'
var players = {};
var player = "";

// SERVICES

// VIEWS
exports.renderAdd = (req, res) => {
  res.render('addPlayer', { title: 'Adding a Player' });
};
exports.create = function (req, res, next) {
  try {
    console.log('Sending new Object: ' + JSON.stringify(req.body));
    Service.create(apiUrl, JSON.stringify(req.body),targetUrlHome).then(function(){
      res.redirect(targetUrlHome);
    });
  }
  catch (err) {
    debug(err);
  }
};

exports.renderEdit = (req, res) => {
  try {
    Service.read(apiUrl, req.params._id).then(function(results){
      if(results == null) {
        res.redirect(targetUrlHome);
      }
      player = JSON.parse(results);
      res.render('editPlayer', { player: player, title: 'Editting a Player' });
    });
  }
  catch (err) {
    debug(err);
  }
};
exports.commitEdit = function (req, res, next) {
  try {
    console.log("Body:  "+JSON.stringify(req.body));
    Service.update(apiUrl, JSON.stringify(req.body)).then(function(){
      res.redirect(targetUrlHome);
    });
  }
  catch (err) {
    debug(err);
  }
};

exports.confirmDelete = function (req, res, err) {
  try {
    console.log("Body:  "+JSON.stringify(req.body));
    Service.delete(apiUrl, JSON.stringify(req.body)).then(function(){
      res.redirect(targetUrlHome);
    });
  }
  catch (err) {
    debug(err);
  }
};

// exports.renderList = async (req, res, next) => {
exports.renderList = function (req, res, next) {
  try {
    Service.list(apiUrl).then(function(results){
      if(results == null) {
        res.redirect(targetUrlHome);
      }
      // players = JSON.parse(results);
      players = results;
      // res.render('playerList', { players: players, title: 'Player List', hostname });
    });
  }
  catch (err) {
    debug(err);
  }
};
