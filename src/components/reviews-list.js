import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Review = props => (
  <details style={{margin: 20}}>
      <summary>{props.review.review_title}</summary>

      <p>URL for resource: <a href={props.review.review_url}>{props.review.review_url}</a></p>

      <p>Type of content: {props.review.review_type}</p>

      <p>Suggested by: {props.review.review_suggested_by} on {props.review.review_suggested_by}</p>

      <p>Why should we review this item as a community:</p>
      <section className="description">{props.review.review_description}</section>

      <p><Link to={"/edit/"+props.review._id}>Edit Item</Link></p>
  </details>

)

export default class ReviewsList extends Component {

    constructor(props) {
      super(props);
      this.state = {reviews: []};
    }

    componentDidMount() {
      axios.get('http://localhost:3010/reviews/')
      .then(response => {
        this.setState({ reviews: response.data });
      })
      .catch(function (error){
        console.log(error);
      })
    }

    reviewList() {
      return this.state.reviews.map(function(currentReview, i){
        return <Review review={currentReview} key={i} />;
      })
    }

    render() {
      return (
        <div>
          <h3>Items To Review</h3>
          { this.reviewList() }
        </div>
      )
    }
}
