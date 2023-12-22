import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "../styles.css";

const SingleMovie = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleShow = async () => {
    setShowModal(true);
    await fetchReviews();
  };

  const handleClose = () => setShowModal(false);

  const handleRatingChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg1OTg4MGI5ODkwODAwMTg0ODg3NzEiLCJpYXQiOjE3MDMyNTQxNDQsImV4cCI6MTcwNDQ2Mzc0NH0.o9cuIANtPuJgKFszosgyZWJpwsZ0hj2X8U7ZMlLoH4s",
        },
        body: JSON.stringify({
          movie: props.movieId,
          rate: rating,
          comment: comment,
        }),
      });

      if (response.ok) {
        console.log("Recensione inviata con successo!");
        await fetchReviews();
        handleClose();
      } else {
        console.error("Errore nell'invio della recensione:", response.status);
      }
    } catch (error) {
      console.error("Errore nell'invio della recensione:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${props.movieId}`, {
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg1OTg4MGI5ODkwODAwMTg0ODg3NzEiLCJpYXQiOjE3MDMyNTQxNDQsImV4cCI6MTcwNDQ2Mzc0NH0.o9cuIANtPuJgKFszosgyZWJpwsZ0hj2X8U7ZMlLoH4s",
        },
      });

      if (response.ok) {
        const reviewsData = await response.json();
        setReviews(reviewsData);
      } else {
        console.error("Errore nella richiesta API per ottenere le recensioni");
      }
    } catch (error) {
      console.error("Errore nella richiesta API:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <img src={props.img} className="poster" alt="description" onClick={handleShow} />

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Reviews:</h5>
          <ul>
            {reviews.map((review) => (
              <li key={review._id}>{`Rating: ${review.rate}, Comment: ${review.comment}`}</li>
            ))}
          </ul>

          <Form onSubmit={handleReviewSubmit}>
            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control as="select" value={rating} onChange={handleRatingChange}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control as="textarea" rows={3} value={comment} onChange={handleCommentChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Review
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};


export default SingleMovie;