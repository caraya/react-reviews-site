import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'foundation-sites/dist/css/foundation.min.css'

import CreateReview from "./components/create-review";
import EditReview from "./components/edit-review";
import ReviewsList from "./components/reviews-list";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="top-bar foundation-5-top-bar">
          <div className="top-bar-title">
            <Link to="/"><strong>Items to review</strong></Link>
          </div>
          <div className="right">
            <Link to="/create">Create Review</Link>
          </div>
        </div>

        <Route path="/" exact component={ReviewsList} />
        <Route path="/edit/:id" component={EditReview} />
        <Route path="/create" component={CreateReview} />
      </Router>
    );
  }
}

export default App;
