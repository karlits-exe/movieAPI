const Movie = require("../models/Movie");
const { errorHandler } = require("../auth");

module.exports.addMovie = (req, res) => {
  let newMovie = new Movie({
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    description: req.body.description,
    genre: req.body.genre,
  });

  return newMovie
    .save()
    .then((movie) => res.status(201).send(movie))
    .catch((err) => errorHandler(err, req, res));
};

module.exports.getMovies = (req, res) => {
  return Movie.find({})
    .then((movie) => res.status(200).send({ movies: movie }))
    .catch((err) => errorHandler(err, req, res));
};

module.exports.getMovieById = (req, res) => {
  return Movie.findById({ _id: req.params.id }).then((result) =>
    res.status(200).send(result),
  );
};

module.exports.updateMovie = (req, res) => {
  let updateMovie = {
    title: req.body.title,
    directory: req.body.director,
    year: req.body.year,
    description: req.body.description,
    genra: req.body.genre,
  };

  return Movie.findByIdAndUpdate(req.params.id, updateMovie, {
    new: true,
  })
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: "No movie found" });
      }
      return res
        .status(200)
        .send({ message: "Movie updated successfully", updatedMovie: result });
    })
    .catch((err) => errorHandler(err, req, res));
};

module.exports.deleteMovie = (req, res) => {
  return Movie.findByIdAndDelete({ _id: req.params.id })
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: "Movie not found" });
      }

      return res.status(200).send({ message: "Movie deleted successfully" });
    })
    .catch((err) => errorHandler(err, req, res));
};

module.exports.addComment = (req, res) => {
  return Movie.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        comments: {
          userId: req.user.id,
          comment: req.body.comment,
        },
      },
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: "Movie not found" });
      }

      return res.status(200).send({
        message: "Comment added successfully",
        updatedMovie: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({ error: err.message });
    });
};

module.exports.getComments = (req, res) => {
  return Movie.findById({ _id: req.params.id })
    .select("-_id comments")
    .then((result) => {
        if(!result){
            return res.status(404).send({ message: "Movie not found" });
        }
        return res.status(200).send(result)
    });
};
