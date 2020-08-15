import request from 'supertest'
import app from '../config/app'

describe('Body parser middleware', () => {
  test('should parse body as json with body parser of express', async () => {
    app.post('/test-body-parser', (req, res) => {
      res.send(req.body)
    })

    await request(app).post('/test-body-parser').send({ name: 'Tadeu' }).expect({ name: 'Tadeu' })
  })
})
