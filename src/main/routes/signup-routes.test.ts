import request from 'supertest'
import app from '../config/app'

describe('Signup Routes', () => {
  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Tadeu',
        email: 'tadeu.tupiz@gmail.com',
        password: '123456',
        passwordConfirmation: '123456',
      })
      .expect(200)
  })
})
