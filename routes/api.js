'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

const ERROR_RESPONSE = "error";

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function(req, res) {
      const input = req.query.input;

      let inputNum = convertHandler.getNum(input);
      let inputUnit = convertHandler.getUnit(input);

      if(inputNum === ERROR_RESPONSE && inputUnit === ERROR_RESPONSE) {
        res.json("invalid number and unit");
        return;
      } else if(inputNum === ERROR_RESPONSE) {
        res.json("invalid number");
        return;
      } else if(inputUnit === ERROR_RESPONSE) {
        res.json("invalid unit");
        return;
      } 

      let outputNum = convertHandler.convert(inputNum, inputUnit);
      if(outputNum === ERROR_RESPONSE) {
        res.json("invalid number and unit");
        return;
      }
      let outputUnit = convertHandler.getReturnUnit(inputUnit);
      if(outputUnit === ERROR_RESPONSE) {
        res.json("invalid unit");
        return;
      }

      let outputString = convertHandler.getString(inputNum, inputUnit, outputNum, outputUnit);

      let data = {
        initNum: inputNum,
        initUnit: inputUnit,
        returnNum: outputNum,
        returnUnit: outputUnit,
        string: outputString
      };
      
      res.json(data);
    });
};
