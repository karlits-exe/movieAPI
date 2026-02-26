const express = require("express");
const movieController = require("../controllers/movie");
const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

router.post("/addMovie", verify, verifyAdmin, movieController.addMovie);
router.get("/getMovies", verify, movieController.getMovies);
router.get("/getMovies/:id", verify, movieController.getMovieById);
router.patch("/updateMovie/:id", verify, verifyAdmin, movieController.updateMovie);
router.delete("/deleteMovie/:id", verify, verifyAdmin, movieController.deleteMovie);
router.patch("/addComment/:id", verify, movieController.addComment)
router.get("/getComments/:id", verify, verifyAdmin, movieController.getComments)
module.exports = router;
