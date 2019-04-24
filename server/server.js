const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const reviewRoutes = express.Router();
const PORT = 3010;

let Review = require('./review.model');

app.use(cors());
app.use(bodyParser.json());

app.use('/reviews', reviewRoutes);


mongoose.connect('mongodb+srv://dbuser:userdb@cluster0-rm4id.gcp.mongodb.net/reviews', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

reviewRoutes.route('/').get(function(req, res) {
    Review.find((err, reviews) => {
        if (err) {
            console.log(err);
        } else {
            return res.json(reviews);
        }
    });
});

reviewRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Review.findById(id, function(err, review) {
        res.json(review);
    });
});

reviewRoutes.route('/update/:id').post(function(req, res) {
    Review.findById(req.params.id, function(err, review) {
        if (!review) {
            res.status(404).send("data not found");
        } else {
          review.review_title = req.body.review_title;
          review.review_url = req.body.review_url;
          review.review_type = req.body.review_type;
          review.review_description = req.body.review_description;
          review.review_sugested_by = req.body.review_sugested_by;

         review.save().then(review => {
              res.json('Review updated!');
          })
          .catch(err => {
              res.status(400).send("Update not possible");
          });
        }
    });
});

reviewRoutes.route('/add').post(function(req, res) {
    let review = new Review(req.body);
    review.save()
        .then(review => {
            res.status(200).json({'review': 'review added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new review failed');
        });
});

app.use('/reviews', reviewRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
