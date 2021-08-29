/* eslint-disable no-undef */
import { should } from 'chai';
import request from 'supertest';
import app from '../../app';
import model from '../../database/models';

should();

const BASE_ROUTE = '/api/v1/books';
const { Book } = model;

describe('Book Routes', () => {
  after(async () => { await Book.destroy({ where: {} }); });
  describe('Get Featured Book Route', () => {
    it('should return all featured books', async () => {
      const response = await request(app)
        .get(`${BASE_ROUTE}/featured`);
      response.statusCode.should.equal(200);
      response.body.success.should.equal(true);
      response.body.should.have.property('data');
    });
    it('should return 20 featured books and paginate 15 per page', async () => {
      const response = await request(app)
        .get(`${BASE_ROUTE}/featured`);

      response.statusCode.should.equal(200);
      response.body.success.should.equal(true);
      response.body.data.should.have.property('books');
      response.body.data.should.have.property('totalItems');
      response.body.data.totalItems.should.be.equal(20);
      response.body.data.books.should.have.lengthOf(15);
    });
    context('Search Routes', () => {
      it('should return searched book items', async () => {
        const response = await request(app)
          .get(`${BASE_ROUTE}/search?query=michelle&&filter=author`);

        response.statusCode.should.equal(200);
        response.body.success.should.equal(true);
        response.body.should.have.property('data');
        response.body.message.should.equal('Books fetched successfully');
      });
      it('should throw error if search query is undefined', async () => {
        const response = await request(app)
          .get(`${BASE_ROUTE}/search`);

        response.statusCode.should.equal(400);
        response.body.success.should.equal(false);
        response.body.should.have.property('error');
        response.body.message.should.equal('search query cannot be empty');
      });
      it('should throw error if search filter is undefined', async () => {
        const response = await request(app)
          .get(`${BASE_ROUTE}/search?query=michelle`);

        response.statusCode.should.equal(400);
        response.body.success.should.equal(false);
        response.body.should.have.property('error');
        response.body.message.should.equal('search filter cannot be empty, You can filter by author, title etc');
      });
    });
  });
});
