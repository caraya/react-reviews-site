const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Review = new Schema({
    review_title: {
      type: String,
      required: true
    },
    review_url: {
      type: String,
      required: true
    },
    review_type: {
      type: String
    },
    review_description: {
      type: String
    },
    review_sugested_by: {
      type: String
    },
    review_sugested_date: {
      type: Date
    }
});

module.exports = mongoose.model('Review', Review);
