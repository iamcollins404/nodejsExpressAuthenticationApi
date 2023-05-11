const mongoose = require("mongoose");

module.exports = (MONGODB_URI) => {
  // db connection
  // connect to db
  mongoose.connect( MONGODB_URI , { useNewUrlParser: true });
  
  const db = mongoose.connection;
  
  db.on("error", (error) => {
    console.log(error);
  });

  db.once("open", () => {
    console.log("database connected and now up and running");
  });
};