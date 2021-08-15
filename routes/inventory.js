const express = require("express");
const jwt = require("jsonwebtoken");
const collectionName = "carsInventory";
const routes = express.Router();

const { signup, signin } = require('../controllers/auth');
routes.post('/signup', signup);
routes.post('/signin', signin);
//
const dbo = require("../db/conn");
const ObjectID = require('mongodb').ObjectID;

// Get all inventory data
routes.route("/inventory").get(function (req, res) {
  let db_connect = dbo.getDb("cars");
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Please login!"
    });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    db_connect.collection(collectionName).find({}).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });
});

// Create new inventory record
routes.route("/inventory/add").post(function (req, res) {
  let db_connect = dbo.getDb("cars");
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Please login!"
    });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    let carsObj = {
      car_make: req.body.car_make,
      car_year: req.body.car_year,
      car_model: req.body.car_model,
      car_color: req.body.car_color,
      car_sales_price: req.body.car_sales_price,
      car_cost: req.body.car_cost,
    };
    db_connect.collection(collectionName).insertOne(carsObj, function (err, res) {
      if (err) throw err;
    });
    return res.status(201).json({
      success: true,
      message: "Successfully added a new car in the inventory!"
      });
   });
});

// Delete inventory record by id
routes.route("/:id").delete((req, res) => {
  let db_connect = dbo.getDb("cars");
  const _id = new ObjectID(req.params.id);
  console.log(_id);
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Please login!"
    });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    db_connect.collection(collectionName).deleteOne({_id:_id}, function(err,res){
      if(err) throw err;
      console.log('1 car is deleted')
    });
     return res.status(200).json({
      success: true,
      message: "Successfully Deleted!"
      });
 });
});

module.exports = routes;
