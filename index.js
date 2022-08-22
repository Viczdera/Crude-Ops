const express = require("express");
const dotenv = require("dotenv");
const mongo_db = require("mongoose");
const app = express();
//add morgan
const route_users= require("./Routes/users")



dotenv.config();

//connect db
mongo_db.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, () => {
  console.log("Connected to DB Dera");
});

app.use(express.json());


app.use("/users",route_users)

//run port
app.listen(8000, () => {
  console.log("Dera's server running");
});
