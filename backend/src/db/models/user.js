import mongoose, { Schema } from 'mongoose'

// Define user schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

// Create user schema
export const User = mongoose.model('user', userSchema)
