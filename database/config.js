const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Connected to the Database.");
  } catch (error) {
    console.log(error);
    throw new Error("Error in database.");
  }
};

module.exports = {
  dbConnection,
};
