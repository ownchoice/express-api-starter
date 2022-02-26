// This is just an example, you may delete this file

// import { v4 as uuid } from 'uuid'
import {
  posts as importedPosts,
  comments as importedComments,
} from '../../data/example-data'
import { Post, Comment, PostWithoutId, CommentWithoutId } from '../types'

let posts: Post[] = importedPosts
let comments: Comment[] = importedComments

const getPosts = (): Post[] => {
  return posts
}

const findPostById = (id: number): Post | undefined => {
  const post = posts.find((d) => d.id === id)
  return post
}

const addPost = (post: PostWithoutId) => {
  const id: number = posts.slice(-1)[0].id + 1
  const newPost = { id, ...post }
  posts.push(newPost)
  return newPost
}

const addPostComment = (
  postId: number,
  comment: CommentWithoutId
): Post | undefined => {
  const commentId: number = comments.slice(-1)[0].id + 1
  const post = posts.find((d) => d.id === postId)
  if (post) {
    posts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.concat({ id: commentId, ...comment }),
        }
      } else {
        return post
      }
    })

    return posts.find((d) => d.id === postId)
  } else {
    return undefined
  }
}

export default {
  getPosts,
  findPostById,
  addPost,
  addPostComment,
}
