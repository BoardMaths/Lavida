import mongoose from "mongoose";
const Schema = mongoose.Schema;

const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: 32,
    trim: true,
  },
});

//model created with the above schema
const Genre = mongoose.model("Genre", genreSchema);

export default Genre;
