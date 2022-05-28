// This is just an example, you may delete this file

import validator from 'validator'
import { Comment, CommentWithoutId, PostWithoutId } from './types'

export interface PostFields {
  userId: unknown
  title: unknown
  body: unknown
  comments: unknown
}

export interface CommentFields {
  postId: unknown
  name: unknown
  email: unknown
  body: unknown
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const isNumber = (text: unknown): text is number => {
  return typeof text === 'number' || text instanceof Number
}

const parseString = (param: unknown, paramName: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${paramName}`)
  }

  return param
}

const parseEmail = (param: unknown, paramName: string): string => {
  if (!param || !isString(param) || validator.isEmail(param)) {
    throw new Error(`Incorrect or missing ${paramName}`)
  }

  return param
}

const isValidInteger = (text: unknown): text is number => {
  return (
    (isString(text) && Boolean(Number.parseInt(text, 10))) || isNumber(text)
  )
}

const parseInteger = (param: unknown, paramName: string): number => {
  if (!param || !isValidInteger(param)) {
    throw new Error(`Incorrect or missing ${paramName}`)
  }

  if (isString(param)) {
    return Number.parseInt(param, 10)
  }

  return param
}

// const isDate = (date: string): boolean => {
//   // https://www.regular-expressions.info/dates.html
//   // return /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/.test(date);
//   return Boolean(Date.parse(date))
// }

// const parseDate = (date: unknown): string => {
//   if (!date || !isString(date) || !isDate(date)) {
//     throw new Error('Incorrect or missing date: ' + date)
//   }
//   return date
// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const isArrayOfStrings = (param: any): param is Array<string> => {
//   return Array.isArray(param) && param.every((elem) => isString(elem))
// }

export const toNewPost = (object: PostFields): PostWithoutId => {
  const userId = parseInteger(object.userId, 'userId')
  const title = parseString(object.title, 'title')
  const body = parseString(object.body, 'body')
  // const comments: Comment[] = parseComments(object.comments, 'comments')
  const comments: Comment[] = []

  const newPost: PostWithoutId = {
    userId,
    title,
    body,
    comments,
  }

  return newPost
}

export const toNewComment = (object: CommentFields): CommentWithoutId => {
  const postId = parseInteger(object.postId, 'postId')
  const name = parseString(object.name, 'name')
  const email = parseEmail(object.email, 'email')
  const body = parseString(object.body, 'body')

  const newComment: CommentWithoutId = {
    postId,
    name,
    email,
    body,
  }

  return newComment
}
