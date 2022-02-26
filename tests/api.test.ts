import request from 'supertest'
import app from '../src/app'
import { posts } from '../data/example-data'

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          message: 'API - 👋🌎🌍🌏',
        },
        done
      )
  })
})

describe('GET /api/v1/emojis', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/emojis')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, ['😀', '😳', '🙄'], done)
  })
})

describe('GET /api/v1/posts', () => {
  it('returns all posts with their comments', (done) => {
    request(app)
      .get('/api/v1/posts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, posts, done)
  })
})

describe('GET /api/v1/posts/1/comments', () => {
  it('returns all comments for the post with id 1', (done) => {
    request(app)
      .get('/api/v1/posts/1/comments')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, posts.find((post) => post.id === 1).comments, done)
  })
})

describe('POST /api/v1/posts', () => {
  it('adds a new post', (done) => {
    const newPost = {
      userId: 10,
      title: 'laboriosam dolor voluptates',
      body: 'doloremque ex facilis sit sint culpa\nsoluta assumenda eligendi non ut eius\nsequi ducimus vel quasi\nveritatis est dolores',
    }
    request(app)
      .post('/api/v1/posts')
      .set('Accept', 'application/json')
      .send()
      .expect('Content-Type', /json/)
      .expect(200, posts, done)
  })
})
