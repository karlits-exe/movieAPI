const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movie')


const app = express()
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const corsOptions = {
    origin: [],
    credentials: true,
    optoinSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/users", userRoutes);
app.use("/movies", movieRoutes);


mongoose.connect(
  "mongodb+srv://admin:admin1234@rodriguezdb.gduc8wf.mongodb.net/movie?appName=RodriguezDB",
);

mongoose.connection.once('open', () => {
    console.log("Now connected to MongoDB Atlas");
});

if(require.main === module){
    app.listen(4000, () => console.log(`Server running at port ${4000}`))
}

module.exports = { app, mongoose };