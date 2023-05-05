const request = require("supertest");
const assert = require('assert');
const view = require('./routers/view.js')

describe('views', function() {
  var server;
  beforeEach(function() {
    // Clears the cache so a new server instance is used for each test.
    delete require.cache[require.resolve('./server.js')];
    server = require("./server.js");
  });

  // afterEach(function() {
  //     server.close();
  // });

  describe('getSensorId', function() {
    it('sensorID를 출력하기를 기대함', function(done) {
      // assert.equal(  , -1 );
      request(server).get('./view/getSesnor/#f3r1q')
      .end(function(err, res) {
        // console.log(res.text)
        assert.equal(res.text, "Hello World!\n");
        done();
    })
    });
  });
});