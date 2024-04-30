'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function(req, res) {
      const input = req.query.input;

      let inputNum = convertHandler.getNum(input);
      let inputUnit = convertHandler.getUnit(input);

      if(!inputNum && !inputUnit) {
        res.json("invalid number and unit");
      } else if(!inputNum) {
        res.json("invalid number");
      } else if(!inputUnit) {
        res.json("invalid unit");
      } else {
        let outputNum = convertHandler.convert(inputNum, inputUnit);
        let outputUnit = convertHandler.getReturnUnit(inputUnit);
        let outputString = convertHandler.getString(inputNum, inputUnit, outputNum, outputUnit);

        let data = {
          initNum: inputNum,
          initUnit: inputUnit,
          returnNum: outputNum,
          returnUnit: outputUnit,
          string: outputString
        };
        res.json(data);
      }
    });
};
