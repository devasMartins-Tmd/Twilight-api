/**
 * @desc Test for delete controller functions
 */

const sinon = require('sinon');
const request = require('request');
const chai = require('chai');
const { expect } = chai;
const assert = require('assert');
// const { deleteAPost } = require('./delete');

describe('Test for delete', function () {
  let API = `http://localhost:8505/welcome`;
  it('post delete', function (done) {
    request.get(`${API}`, (err, res, body) => {
      expect(res.statusCode === 200).to.be.true;
      expect(JSON.parse(body).all instanceof Array).to.be.true;
      assert.equal(JSON.parse(body).done, true);
      done();
    });
  });
});
