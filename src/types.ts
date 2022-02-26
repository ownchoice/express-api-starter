// These types are only used for the examples, you may delete them

export interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface Post {
  userId: number
  id: number
  title: string
  body: string
  comments: Comment[]
}

// Define special omit for unions
// For reference:
// https://github.com/microsoft/TypeScript/issues/42680
// https://fullstackopen.com/en/part9/react_with_types#full-entries
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never

export type PostWithoutId = UnionOmit<Post, 'id'>
export type CommentWithoutId = UnionOmit<Comment, 'id'>

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}
