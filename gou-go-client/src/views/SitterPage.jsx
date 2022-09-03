/*!

=========================================================
* Argon Design System React - v1.1.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect, useParams } from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

import { useLocation } from "react-router-dom";

// core components
// import GougoNavbar from 'components/Navbars/GougoNavbar.js';
// import CardsFooter from 'components/Footers/CardsFooter.js';

// index page sections
// import Hero from "./IndexSections/Hero.js";
// import Buttons from "./IndexSections/Buttons.js";
// import Inputs from "./IndexSections/Inputs.js";
// import CustomControls from "./IndexSections/CustomControls.js";
// import Menus from "./IndexSections/Menus.js";
// import Navbars from "./IndexSections/Navbars.js";
// import Tabs from "./IndexSections/Tabs.js";
// import Progress from "./IndexSections/Progress.js";
// import Pagination from "./IndexSections/Pagination.js";
// import Pills from "./IndexSections/Pills.js";
// import Labels from "./IndexSections/Labels.js";
// import Alerts from "./IndexSections/Alerts.js";
// import Typography from "./IndexSections/Typography.js";
// import Modals from "./IndexSections/Modals.js";
// import Datepicker from "./IndexSections/Datepicker.js";
// import TooltipPopover from "./IndexSections/TooltipPopover.js";
// import Carousel from "./IndexSections/Carousel.js";
// import Icons from "./IndexSections/Icons.js";
// import Login from "./IndexSections/Login.js";
// import Download from "./IndexSections/Download.js";
// import server from "api.js";

// import SitterCard from "components/SitterCard";
import { Rating } from "@douyinfe/semi-ui";
import { IconPrizeStroked } from "@douyinfe/semi-icons";
import ReviewCard from "components/ReviewCard";

const SitterPage = (props) => {
  // componentDidMount() {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   this.refs.main.scrollTop = 0;
  //   server
  //     .getSitters()
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((e) => console.log(e));
  // }

  const location = useLocation();
  const [sitter, setSitter] = useState({ ...location.state.sitter });
  // const [loading, setLoading] = useState(true);
  // const { from } = location.state;
  // console.log(location.state.sitter);
  // let { id } = useParams();

  useEffect(() => {});

  return (
    <>
      {/* <GougoNavbar /> */}
      <main className="sitter-page pt-6">
        {/* <img className="sitter-hero" src={sitter.img_url} alt="" /> */}
        <section className="section">
          <Container>
            <Row>
              <Col md="4 mb-4">
                <div className="img-wrapper">
                  <img className="sitter-feature" src={sitter.img_url} alt="" />
                </div>
              </Col>
              <Col md="8">
                <div>
                  <h2>
                    {sitter.first_name} {sitter.last_name}
                  </h2>
                  <div>{sitter.postcode}</div>
                  <div className="price">
                    <span className="amount">
                      ${(sitter.price / 100).toFixed(2)}
                    </span>
                    <span className="unit"> / hr</span>
                  </div>
                  <div className="mt-2 d-flex align-items-center">
                    <Rating disabled allowHalf defaultValue={sitter.rating} />
                    <span className="ms-3 mb-1">
                      {sitter.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="mt-3 mb-4">
                    <span className="bg-lighter rounded p-2">
                      {sitter.description}
                    </span>
                  </div>
                  <h5>Dog Size</h5>
                  <div>
                    <IconPrizeStroked /> Up to: {sitter.dog_weight.toFixed(1)}kg
                  </div>
                  <hr />
                  <h4 className="mt-3">
                    Reviews ({sitter.reviews ? sitter.reviews.length : 0})
                  </h4>
                  <div>
                    {sitter.reviews.map((review, i) => {
                      return <ReviewCard review={review} key={i} />;
                    })}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section section-components"></section>
      </main>
    </>
  );
};

export default SitterPage;
