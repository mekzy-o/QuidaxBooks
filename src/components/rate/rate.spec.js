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
  //   context('Search Routes', () => {
  //     const user = { email: 'emekaofe2@gmail.com', password: '$argon2i$v=19$m=16,t=2,p=1$aGVsbG93b3JsZA$xpGMS+PyJyBLOQj6x1UiyA' };
  //     before(async () => {
  //       await User.create(user);
  //       const db = await request(app)
  //         .post('/api/v1/user/signin')
  //         .send({ email: 'emekaofe2@gmail.com', password: 'maths@1000' });
  //     });

//     it('should throw when a user that not logged in tries to rate a book item', async () => {
//       const response = await request(app)
//         .post(`${BASE_ROUTE}/${bookSlug}`);
//       console.log(response.body);
//       response.statusCode.should.equal(200);
//     //   response.body.success.should.equal(false);
//     //   response.body.message.should.equal("Can't access route, please make sure you are logged in");
//     });
//   });
});
