import React, {Component} from 'react';
import axios from 'axios';

export default class EditReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      review_title: '',
      review_url: '',
      review_type: '',
      review_description: '',
      review_sugested_by: '',
    }

    this.onChangeReviewTitle = this.onChangeReviewTitle.bind(this);
    this.onChangeReviewUrl = this.onChangeReviewUrl.bind(this);
    this.onChangeReviewType = this.onChangeReviewType.bind(this);
    this.onChangeReviewDescription = this.onChangeReviewDescription.bind(this);
    this.onChangeReviewSugestedBy = this.onChangeReviewSugestedBy.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeReviewTitle(e) {
    this.setState({review_title: e.target.value});
  }

  onChangeReviewUrl(e) {
    this.setState({review_url: e.target.value});
  }

  onChangeReviewType(e) {
    this.setState({review_type: e.target.value});
  }

  onChangeReviewDescription(e) {
    this.setState({review_description: e.target.value});
  }

  onChangeReviewSugestedBy(e) {
    this.setState({review_sugested_by: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Review Title: ${this.state.review_title}`);
    console.log(`Review URL: ${this.state.review_url}`);
    console.log(`Type: ${this.state.review_type}`);
    console.log(`Review Description: ${this.state.review_description}`);
    console.log(`sugested by: ${this.state.review_sugested_by}`);

    const newReview = {
      review_title: this.state.review_title,
      review_url: this.state.review_url,
      review_type: this.state.review_url,
      review_description: this.state.review_description,
      review_sugested_by: this.state.review_sugested_by,
    };

    axios.post('http://localhost:3010/reviews/update/' +this.props.match.params.id, newReview)
      .then(res => console.log(res.data));

      this.setState({
        review_title: '',
        review_url: '',
        review_type: '',
        review_description: '',
        review_sugested_by: '',
      })

      this.props.history.push('/');
  }


  componentDidMount() {
    axios.get('http://localhost:3010/reviews/' + this.props.match.params.id)
    .then(response => {
      this.setState({
        review_title: response.data.review_title,
        review_url: response.data.review_url,
        review_type: response.data.review_url,
        review_description: response.data.review_description,
        review_sugested_by: response.data.review_sugested_by,
      });
    })
    .catch(function (error){
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
        <h2>Edit Review Item</h2>
          <div className='grid-container'>
            <div className='grid-x grid-padding-x'>
              <div className='medium-6 cell'>
                <label>Name of item to review
                  <input  type="text"
                          placeholder="Item Title"
                          value={this.state.review_title}
                          onChange={this.onChangeReviewTitle}/>
                </label>
              </div>
              <div className='medium-6 cell'>
                <label>URL for item
                  <input    type='text'
                            placeholder = 'URL of item to re view'
                            value = {this.state.review_url}
                            onChange = {this.onChangeReviewUrl} />
                </label >
              </div>

              <div className='medium-6 cell'>
                <label>Type of resource
                  <input  type="text"
                          placeholder="Item Type"
                          value={this.state.review_type}
                          onChange={this.onChangeReviewType}/>
                </label>
              </div>

              <div className = 'medium-12 cell'>
                <label>Why should we review this as a group ?
                  <textarea   placeholder = 'None'
                              rows = '5'
                              value = {this.state.review_description}
                              onChange = {this.onChangeReviewDescription} > </textarea>
                </label>
              </div>

              <div className='medium-12 cell'>
                <label>Sugested By</label>
                  <input  type="text"
                          placeholder="sugested by"
                          defaultValue={this.state.review_sugested_by}
                          onChange={this.onChangeReviewSugestedBy}/>
              </div>

            </div>

            <input  type = 'submit'
                    className = 'button'
                    value = 'Edit Review Item'
                    onClick={this.onSubmit}/>
          </div>
        </form>
      </div>
    )
  }
}
