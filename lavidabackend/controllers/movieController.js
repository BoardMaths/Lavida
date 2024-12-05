import Movie from "../models/Movie.js";

const createMovie = asyncHandler(async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();

    res.json(savedMovie);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

const getAllMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.find({});

    res.json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

const getSpecificMovie = asyncHandler(async (req, res) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.id });

    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.json(movie);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

const getNewMovies = asyncHandler(async (req, res) => {
  try {
    const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(10);

    res.json(newMovies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

const getRandomMovies = asyncHandler(async (req, res) => {
  try {
    const randomMovies = await Movie.aggregate([{ $sample: { size: 10 } }]);

    res.json(randomMovies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

const getTopMovies = asyncHandler(async (req, res) => {
  try {
    const topRatedMovies = await Movie.find()
      .sort({ numReviews: -1 })
      .limit(10);

    res.json(topRatedMovies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

const updateMovie = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedMovie)
      return res.status(404).json({ error: "Movie not found" });

    res.json(updatedMovie);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

const movieReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const movie = await Movie.findById(req.params.id);

    if (movie) {
      const alreadyReviewed = movie.reviews.find(
        (r) => r.user.toString() === req.user.id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error(`${req.user.username}Movie already reviewed by you`);
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      movie.reviews.push(review);
      movie.numReviews = movie.reviews.length;
      movie.rating =
        movie.reviews.reduce((acc, item) => acc + item.rating, 0) /
        movie.reviews.length;
      await movie.save();
      res.status(201).json({ message: "Review Added" });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

const deleteMovie = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const deleteMovie = await Movie.findByIdAndDelete(id);

    if (!deleteMovie) return res.status(404).json({ error: "Movie not found" });

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: " Internal server error " });
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  try {
    const { movieId, reviewId } = req.body;

    const movie = await Movie.findById(movieId);

    if (!movie) return res.status(404).json({ error: "Movie not found" });

    const reviewIndex = movie.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );

    if (reviewIndex === -1)
      return res.status(404).json({ error: "Comment not found" });

    movie.reviews.splice(reviewIndex, 1);
    movie.numReviews = movie.reviews.length;

    movie.rating =
      movie.reviews.length > 0
        ? movie.reviews.reduce((acc, item) => acc + item.rating, 0) /
          movie.reviews.length
        : 0;
    await movie.save();
    res.json({ message: "Comment Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

export {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteMovie,
  deleteComment,
  getNewMovies,
  getTopMovies,
  getRandomMovies,
};

/*








import asyncHandler from "../middlewares/asyncHandler.js";











updateGenre, removeGenre, listGenres, readGenre









*/