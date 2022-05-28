// This is just an example, you may delete this file

import express from 'express'
import postService from '../services/postService'
import { toNewPost, toNewComment, PostFields, CommentFields } from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(postService.getPosts())
})

router.get('/:id', (req, res) => {
  const post = postService.findPostById(Number.parseInt(req.params.id, 10))

  if (post) {
    res.send(post)
  } else {
    res.sendStatus(404)
  }
})

router.post('/', (req, res) => {
  try {
    const newPost = toNewPost(req.body as PostFields)
    const addedPost = postService.addPost(newPost)
    res.json(addedPost)
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message)
    }
  }
})

router.get('/:id/comments', (req, res) => {
  const post = postService.findPostById(Number.parseInt(req.params.id, 10))

  if (post) {
    res.send(post.comments)
  } else {
    res.sendStatus(404)
  }
})

router.post('/:id/comments', (req, res) => {
  try {
    const newComment = toNewComment(req.body as CommentFields)
    const updatedPost = postService.addPostComment(
      Number.parseInt(req.params.id, 10),
      newComment
    )
    res.json(updatedPost)
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message)
    }
  }
})

export default router
