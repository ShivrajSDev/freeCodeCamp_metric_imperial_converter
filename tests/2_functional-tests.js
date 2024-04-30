const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    this.timeout(5000);

    test('Test GET /api/convert with valid input', function() {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=10L')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.string, '10 liters converts to 2.64172 gallons');
                assert.equal(JSON.stringify(res.body), '{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}');
            });

        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=5.4/3lbs')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.string, '1.8 pounds converts to 0.81647 kilograms');
                assert.equal(JSON.stringify(res.body), '{"initNum":1.8,"initUnit":"lbs","returnNum":0.81647,"returnUnit":"kg","string":"1.8 pounds converts to 0.81647 kilograms"}');
            });

        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=1/2km')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.string, '0.5 kilometers converts to 0.31069 miles');
                assert.equal(JSON.stringify(res.body), '{"initNum":0.5,"initUnit":"km","returnNum":0.31069,"returnUnit":"mi","string":"0.5 kilometers converts to 0.31069 miles"}');
            });
    });

    test('Test GET /api/convert with invalid input unit', function() {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=32g')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body, 'invalid unit');
            });

        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=32kilo')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body, 'invalid unit');
            });
    });

    test('Test GET /api/convert with invalid number', function() {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=3/7.2/4kg')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body, 'invalid number');
            });
        
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=16//2mi')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body, 'invalid number');
            });
        
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=150.25//mi')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body, 'invalid number');
            });
    });

    test('Test GET /api/convert with invalid number and unit', function() {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=3/7.2/4kilomegagram')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body, 'invalid number and unit');
            });
    });

    test('Test GET /api/convert with no number', function() {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=gal')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.string, '1 gallons converts to 3.78541 liters');
                assert.equal(JSON.stringify(res.body), '{"initNum":1,"initUnit":"gal","returnNum":3.78541,"returnUnit":"L","string":"1 gallons converts to 3.78541 liters"}');
            });

        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=L')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.string, '1 liters converts to 0.26417 gallons');
                assert.equal(JSON.stringify(res.body), '{"initNum":1,"initUnit":"L","returnNum":0.26417,"returnUnit":"gal","string":"1 liters converts to 0.26417 gallons"}');
            });

        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=lbs')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.string, '1 pounds converts to 0.45359 kilograms');
                assert.equal(JSON.stringify(res.body), '{"initNum":1,"initUnit":"lbs","returnNum":0.45359,"returnUnit":"kg","string":"1 pounds converts to 0.45359 kilograms"}');
            });

        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=kg')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds');
                assert.equal(JSON.stringify(res.body), '{"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}');
            });

        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=mi')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.string, '1 miles converts to 1.60934 kilometers');
                assert.equal(JSON.stringify(res.body), '{"initNum":1,"initUnit":"mi","returnNum":1.60934,"returnUnit":"km","string":"1 miles converts to 1.60934 kilometers"}');
            });

        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=km')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.string, '1 kilometers converts to 0.62137 miles');
                assert.equal(JSON.stringify(res.body), '{"initNum":1,"initUnit":"km","returnNum":0.62137,"returnUnit":"mi","string":"1 kilometers converts to 0.62137 miles"}');
            });
    });
});
