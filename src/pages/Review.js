import React from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/Review.css";
import StarRating from "../components/StarRating";
import MyDropzone from "../components/MyDropzone";

const CATEGORIES = [
  { label: "Fitnesss Rating", value: "fitnessRating" },
  { label: "Lodging", value: "lodging" },
  { label: "Dining", value: "dining" },
  { label: "Public Areas", value: "publicAreas" },
  { label: "Entertainment", value: "entertainmentRating" }
];

class Review extends React.Component {
  static contextType = AuthContext;
  state = {
    categories: {
      fitnessRating: "1",
      lodging: "1",
      excursions: "1",
      dining: "1",
      service: "1",
      publicAreas: "1",
      value: "1",
      entertainmentRating: "1"
    },
    averageRating: 0,
    shipName: "",
    reviewBody: "",
    shipImage: ""
  };

  handleInputChange = field => e => this.setState({ [field]: e.target.value });

  fileSelectedHandler = event =>
    this.setState({ shipImage: event.target.files[0] });

  handleSubmitReview = async e => {
    e.preventDefault();
    const { shipName, averageRating, reviewBody, shipImage } = this.state;
    const shipData = { shipName, shipImage };
    const reviewData = { body: reviewBody, rating: averageRating };
    const formData = new FormData();
    Object.keys(shipData).forEach(key =>
      formData.append(`ship[${key}]`, shipData[key])
    );
    Object.keys(reviewData).forEach(key =>
      formData.append(`review[${key}]`, reviewData[key])
    );
    await axios.post("reviews", formData, {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: this.context.token
      }
    });
  };

  handleRatingSelection = stateId => val => {
    const { categories } = this.state;
    const newCategories = { ...categories, [stateId]: val };
    const ratings = Object.values(newCategories);
    const averageRating = Math.ceil(
      ratings.reduce((acc, rating) => acc + +rating, 0) / ratings.length
    );
    this.setState({ categories: newCategories, averageRating });
  };

  render() {
    const { averageRating, categories } = this.state;

    return (
      <div>
        <div className="r-img">
          <p className="r-t">
            We'd love to hear your opinion. Your feedback helps fellow cruisers
            choose the best cruise for their needs. Thank you.{" "}
          </p>
          <Form style={{ marginLeft: "80px" }} className="r-input">
            <div controlId="formGrid">
              <Form.Label style={{ padding: "1rem" }}>
                Which ship were you on?
              </Form.Label>
              <Form.Control
                onChange={this.handleInputChange("shipName")}
                placeholder="Begin typing your ship name…"
              />
            </div>
            <div controlId="formGrid">
              <Form.Label style={{ padding: "1rem" }}>
                Which itinerary did you go on?
              </Form.Label>
              <Form.Control placeholder="Itinerary" />
            </div>
            <div controlId="formGrid">
              <Form.Label style={{ padding: "1rem" }}>
                On which dates did you cruise?
              </Form.Label>
              <Form.Control type="date" placeholder="" />
            </div>
          </Form>
        </div>
        <div className="m-r-p">
          <h4>Choose Overal Rating</h4>
          <StarRating style={{ height: "32px" }} value={averageRating} />
          <h5>Rate item by item:</h5>
          {CATEGORIES.map(({ value, label }) => (
            <div>
              <label style={{ font: "lato, sans-serif" }}>{label}</label>
              <StarRating
                category={value}
                value={categories[value]}
                handleRating={this.handleRatingSelection(value)}
              />
            </div>
          ))}
          <div>
            <div>
              <h5 style={{ padding: "1rem" }}> Write your review:</h5>
              <textarea
                style={{ width: "582px", height: "330px" }}
                aria-label="With textarea"
              ></textarea>
            </div>
            <MyDropzone fileSelectedHandler={this.fileSelectedHandler} />
            <button onClick={this.handleSubmitReview} class="btn btn-primary">
              Post Review
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Review;
