/* eslint-disable no-undef */
import { should } from 'chai';
import request from 'supertest';
import app from '../../app';

const BASE_ROUTE = '/api/v1/rate';
const bookSlug = 'becoming-1630184942938';

should();

describe('Rate Routes', () => {
  describe('Throw Error', () => {
    it('should throw when a user that not logged in tries to rate a book item', async () => {
      const response = await request(app)
        .post(`${BASE_ROUTE}/${bookSlug}`);
      response.statusCode.should.equal(500);
      response.body.success.should.equal(false);
      response.body.message.should.equal("Can't access route, please make sure you are logged in");
    });
  });
});
