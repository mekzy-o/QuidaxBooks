/* eslint-disable no-undef */
import { should } from 'chai';
import request from 'supertest';
import app from '../../app';
import model from '../../database/models';

should();

const BASE_ROUTE = '/api/v1/user';
const { User } = model;

describe('Authentication Routes', () => {
  after(async () => { await User.destroy({ where: {} }); });
  describe('Signup Route', () => {
    it('should create a new user by posting to /signup route', async () => {
      const response = await request(app)
        .post(`${BASE_ROUTE}/signup`)
        .send({
          email: 'emekaofe@chekkit.com',
          password: '123456789',
        });

      response.statusCode.should.equal(201);
      response.body.success.should.equal(true);
      response.body.should.have.property('data');
    });

    it('should return an error if user is already registered', async () => {
      const response = await request(app)
        .post(`${BASE_ROUTE}/signup`)
        .send({
          email: 'emekaofe@chekkit.com',
          password: '123456789',
        });

      response.statusCode.should.equal(400);
      response.body.success.should.equal(false);
      response.body.message.should.equal('User with this email already exists');
    });
  });

  describe('Login Route', () => {
    it('should throw an error for wrong password', async () => {
      const response = await request(app)
        .post(`${BASE_ROUTE}/signin`)
        .send({
          email: 'emekaofe@chekkit.com',
          password: '1234567',
        });

      response.statusCode.should.equal(400);
      response.body.success.should.eql(false);
      response.body.message.should.equal('Invalid Account details, Please try again');
    });

    it('should throw an error for wrong email', async () => {
      const response = await request(app)
        .post(`${BASE_ROUTE}/signin`)
        .send({
          email: 'emekaof@chekkit.com',
          password: '123456789',
        });

      response.statusCode.should.equal(400);
      response.body.success.should.eql(false);
      response.body.message.should.equal('User with this email does not exist');
    });
    it('should login in user successful', async () => {
      const response = await request(app)
        .post(`${BASE_ROUTE}/signin`)
        .send({
          email: 'emekaofe@chekkit.com',
          password: '123456789',
        });
      response.statusCode.should.equal(200);
      response.body.success.should.eql(true);
      response.body.message.should.eql('You have successfully logged in');
      response.body.should.have.property('data');
    });
  });
});
