const mongoose = require('mongoose');

// const Schema = mongoose.Schema();

const fileSchema = mongoose.Schema(
  {
    //   originalname: {
    //     type: String,
    //     required: true,
    //   },
    filename: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('File', fileSchema);
