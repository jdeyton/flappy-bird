
const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');

describe('Server', () => {
  it('should serve the index.html file', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('<html>');
        done();
      });
  });
});
