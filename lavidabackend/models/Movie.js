import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,

      required: true,
    },

    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    user: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,

      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    cast: [
      {
        type: String,
      },
    ],
    reviews: [reviewSchema],
    detail: {
      type: String,
      required: true,
    },
    genre: {
      type: ObjectId,
      required: true,
      ref: "Genre",
    },
  },
  { timestamps: true }
);

//model created with the above schema
const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
