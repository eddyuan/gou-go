import React from "react";
import { Link } from "react-router-dom";
// reactstrap components

import { Badge, Card } from "reactstrap";

import { Rating } from "@douyinfe/semi-ui";

const SitterCard = (props) => {
  return (
    <Link to={"/sitter"} state={{ sitter: props.sitter }}>
      <Card className="p-3">
        <div className="sitter-card">
          <div className="sitter-img-container">
            <div className="img-wrapper">
              <img src={props.sitter.img_url} alt="sitter-avatar" />
            </div>
          </div>
          <div className="sitter-content-wrapper px-3">
            <h4 className="mb-0">
              {props.sitter.first_name} {props.sitter.last_name}
            </h4>
            <div>
              <small>{props.sitter.postcode}</small>
            </div>
            <div>
              <Badge color="primary">
                {props.sitter.reviews ? props.sitter.reviews.length : 0} Reviews
              </Badge>
            </div>
            <div className="mt-2">
              <Rating
                size="small"
                disabled
                allowHalf
                defaultValue={props.sitter.rating}
              />
            </div>
            <p>"{props.sitter.description}"</p>
          </div>
          <div className="sitter-meta-wrapper">
            <small>From</small>
            <div className="price">${Math.round(props.sitter.price / 100)}</div>
            <small>per walk</small>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default SitterCard;
