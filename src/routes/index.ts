import express from 'express'
import emojis from './emojis'
import postsRouter from './posts'

const router = express.Router()

router.get('/', (_req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  })
})

router.use('/emojis', emojis)
router.use('/posts', postsRouter)

export default router
