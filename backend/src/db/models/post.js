import mongoose, { Schema } from 'mongoose'

// Define post schema
const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    contents: String,
    tags: [String],
  },
  { timestamps: true },
)

// Create post schema
export const Post = mongoose.model('post', postSchema)
