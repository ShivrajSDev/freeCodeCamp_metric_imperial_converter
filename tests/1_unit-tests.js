const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();
const ERROR_RESPONSE = "error";

suite('Unit Tests', function(){
    suite('Numerical input', function() {
        test('Can read whole number input', function() {
            assert.strictEqual(convertHandler.getNum('3mi'), 3);
            assert.strictEqual(convertHandler.getNum('5mi'), 5);
            assert.strictEqual(convertHandler.getNum('15mi'), 15);
            assert.strictEqual(convertHandler.getNum('-5mi'), ERROR_RESPONSE);
        });

        test('Can read decimal number input', function() {
            assert.strictEqual(convertHandler.getNum('3.5mi'), 3.5);
            assert.strictEqual(convertHandler.getNum('5.25mi'), 5.25);
            assert.strictEqual(convertHandler.getNum('25.0325mi'), 25.0325);
            assert.strictEqual(convertHandler.getNum('-3.5mi'), ERROR_RESPONSE);
        });

        test('Can read fractional input', function() {
            assert.strictEqual(convertHandler.getNum('3/2mi'), 1.5);
            assert.strictEqual(convertHandler.getNum('5/4mi'), 1.25);
            assert.approximately(convertHandler.getNum('1/3mi'), 0.33333, 0.00001);
            assert.strictEqual(convertHandler.getNum('-3/2mi'), ERROR_RESPONSE);
            assert.strictEqual(convertHandler.getNum('3/-2mi'), ERROR_RESPONSE);
        });

        test('Can read fractional input with a decimal', function() {
            assert.strictEqual(convertHandler.getNum('4/2.5mi'), 1.6);
            assert.strictEqual(convertHandler.getNum('6.5/2mi'), 3.25);
            assert.strictEqual(convertHandler.getNum('9.375/3.75mi'), 2.5);
            assert.equal(convertHandler.getNum('-4/2.5mi'), ERROR_RESPONSE);
            assert.equal(convertHandler.getNum('4/-2.5mi'), ERROR_RESPONSE);
            assert.equal(convertHandler.getNum('-4/-2.5mi'), ERROR_RESPONSE);
        });

        test('Error when reading a double fraction', function() {
            assert.equal(convertHandler.getNum('4/2/2mi'), ERROR_RESPONSE);
            assert.equal(convertHandler.getNum('6//2mi'), ERROR_RESPONSE);
            assert.equal(convertHandler.getNum('150.25//mi'), ERROR_RESPONSE);
        });

        test('Default value of 1 if no numerical input was provided', function() {
            assert.strictEqual(convertHandler.getNum('gal'), 1);
            assert.strictEqual(convertHandler.getNum('L'), 1);
            assert.strictEqual(convertHandler.getNum('lbs'), 1);
            assert.strictEqual(convertHandler.getNum('kg'), 1);
            assert.strictEqual(convertHandler.getNum('mi'), 1);
            assert.strictEqual(convertHandler.getNum('km'), 1);
        });
    });

    suite('Unit input', function() {
        test('Can read valid input unit', function() {
            assert.equal(convertHandler.getUnit('3.1gal'), "gal");
            assert.equal(convertHandler.getUnit('3.1GAL'), "gal");
            assert.equal(convertHandler.getUnit('3.1L'), "L");
            assert.equal(convertHandler.getUnit('3.1l'), "L");
            assert.equal(convertHandler.getUnit('3.1lbs'), "lbs");
            assert.equal(convertHandler.getUnit('3.1LBS'), "lbs");
            assert.equal(convertHandler.getUnit('3.1kg'), "kg");
            assert.equal(convertHandler.getUnit('3.1KG'), "kg");
            assert.equal(convertHandler.getUnit('3.1mi'), "mi");
            assert.equal(convertHandler.getUnit('3.1MI'), "mi");
            assert.equal(convertHandler.getUnit('3.1km'), "km");
            assert.equal(convertHandler.getUnit('3.1KM'), "km");
        });

        test('Error when reading an invalid input unit', function() {
            assert.equal(convertHandler.getUnit('3.1'), ERROR_RESPONSE);
            assert.equal(convertHandler.getUnit('3.1g'), ERROR_RESPONSE);
            assert.equal(convertHandler.getUnit('3.1ga'), ERROR_RESPONSE);
            assert.equal(convertHandler.getUnit('3.1li'), ERROR_RESPONSE);
            assert.equal(convertHandler.getUnit('3.1liters'), ERROR_RESPONSE);
            assert.equal(convertHandler.getUnit('3.1lb'), ERROR_RESPONSE);
            assert.equal(convertHandler.getUnit('3.1pounds'), ERROR_RESPONSE);
            assert.equal(convertHandler.getUnit('3.1k'), ERROR_RESPONSE);
            assert.equal(convertHandler.getUnit('3.1kilos'), ERROR_RESPONSE);
            assert.equal(convertHandler.getUnit('3.1kilogram'), ERROR_RESPONSE);
            assert.equal(convertHandler.getUnit('3.1m'), ERROR_RESPONSE);
            assert.equal(convertHandler.getUnit('3.1miles'), ERROR_RESPONSE);
            assert.equal(convertHandler.getUnit('3.1kilometers'), ERROR_RESPONSE);
        });

        test('Can return the correct return unit for each valid input unit', function() {
            assert.equal(convertHandler.getReturnUnit('gal'), "L");
            assert.equal(convertHandler.getReturnUnit('L'), "gal");
            assert.equal(convertHandler.getReturnUnit('lbs'), "kg");
            assert.equal(convertHandler.getReturnUnit('kg'), "lbs");
            assert.equal(convertHandler.getReturnUnit('mi'), "km");
            assert.equal(convertHandler.getReturnUnit('km'), "mi");
        });

        test('Can return the spelled-out string unit for each valid input unit', function() {
            assert.equal(convertHandler.spellOutUnit('gal'), "gallons");
            assert.equal(convertHandler.spellOutUnit('L'), "liters");
            assert.equal(convertHandler.spellOutUnit('lbs'), "pounds");
            assert.equal(convertHandler.spellOutUnit('kg'), "kilograms");
            assert.equal(convertHandler.spellOutUnit('mi'), "miles");
            assert.equal(convertHandler.spellOutUnit('km'), "kilometers");
        }); 
    });

    suite('Conversion', function() {
        test('Can convert gal to L', function() {
            assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001);
            assert.approximately(convertHandler.convert(4, 'gal'), 15.14164, 0.00001);
        });

        test('Can convert L to gal', function() {
            assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.00001);
            assert.approximately(convertHandler.convert(15, 'L'), 3.96258, 0.00001);
        });

        test('Can convert lbs to kg', function() {
            assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.00001);
            assert.approximately(convertHandler.convert(1.8, 'lbs'), 0.81647, 0.00001);
        });

        test('Can convert kg to lbs', function() {
            assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.00001);
            assert.approximately(convertHandler.convert(5.5, 'kg'), 12.12543, 0.00001);
        });

        test('Can convert mi to km', function() {
            assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
            assert.approximately(convertHandler.convert(2.5, 'mi'), 4.02335, 0.00001);
        });

        test('Can convert km to mi', function() {
            assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.00001);
            assert.approximately(convertHandler.convert(5, 'km'), 3.10686, 0.00001);
        });
    });
});