const mongoose = require('mongoose');

const mongodbStart = () => {
  DB_URL = process.env.DB_URL;

  try {
    mongoose.connect(DB_URL);
    const connectiondb = mongoose.connection;

    connectiondb.once('open', () => {
      console.log('db connected');
    });
  } catch (error) {
    console.log({ error });
  }

  // mongoose
  //   .connect(
  //     'mongodb+srv://ajithtejagorla:AjithTeja@cluster0.zs79tav.mongodb.net/?retryWrites=true&w=majority'
  //   )
  //   .then(() => {
  //     console.log('db connected');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

module.exports = mongodbStart;
