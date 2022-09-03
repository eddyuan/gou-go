import React, { useState, useContext } from "react";
import { Context } from "Store";
import { Link } from "react-router-dom";
import server from "server";
// reactstrap components

import { Badge, Card } from "reactstrap";

import { Rating, Button } from "@douyinfe/semi-ui";

const ReviewCard = (props) => {
  const review = props.review;
  const [state, dispatch] = useContext(Context);
  const [loading, setLoading] = useState(false);
  const onDelete = () => {
    // server
  };
  return (
    <>
      <div className="review-card py-4">
        <div className="review-img-container">
          <div className="img-wrapper">
            <img
              className="review-avatar"
              src={review.author_img_url}
              alt="review-avatar"
            />
          </div>
        </div>
        <div className="review-content ml-3">
          <h6>{review.author_name}</h6>
          <div className="mb-2">
            <Rating
              disabled
              size="small"
              allowHalf
              defaultValue={review.rating}
            />
          </div>
          <div>{review.body}</div>
          {state.user.id === review.user_id && (
            <div className="mt-2">
              <Button type="danger" loading={loading} onClick={onDelete}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
      <hr className="m-0" />
    </>
  );
};

export default ReviewCard;
