import React, { useState, useEffect } from "react";

// reactstrap components
import { Container, Row } from "reactstrap";

// index page sections
import Hero from "./IndexSections/Hero.js";
import Buttons from "./IndexSections/Buttons.js";
import Inputs from "./IndexSections/Inputs.js";
import CustomControls from "./IndexSections/CustomControls.js";
import Menus from "./IndexSections/Menus.js";
import Navbars from "./IndexSections/Navbars.js";
import Tabs from "./IndexSections/Tabs.js";
import Progress from "./IndexSections/Progress.js";
import Pagination from "./IndexSections/Pagination.js";
import Pills from "./IndexSections/Pills.js";
import Labels from "./IndexSections/Labels.js";
import Alerts from "./IndexSections/Alerts.js";
import Typography from "./IndexSections/Typography.js";
import Modals from "./IndexSections/Modals.js";
import Datepicker from "./IndexSections/Datepicker.js";
import TooltipPopover from "./IndexSections/TooltipPopover.js";
import Carousel from "./IndexSections/Carousel.js";
import Icons from "./IndexSections/Icons.js";
import Login from "./IndexSections/Login.js";
import Download from "./IndexSections/Download.js";
import server from "server";

import SitterCard from "components/SitterCard";

const HomePage = (props) => {
  const [sitters, setSitters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    server
      .getSitters()
      .then((res) => {
        console.log(res);
        if (mounted && res.data.success) {
          setSitters(res.data.data);
          setLoading(false);
        }
      })
      .catch((e) => console.log(e));
    return () => (mounted = false);
  }, []);

  return (
    <>
      {/* <GougoNavbar /> */}
      <main>
        <Hero />
        {sitters.map((sitter, i) => {
          return <SitterCard sitter={sitter} key={i} />;
        })}
        <Buttons />
        <Inputs />
        <section className="section">
          <Container>
            <CustomControls />
            <Menus />
          </Container>
        </section>
        <Navbars />
        <section className="section section-components">
          <Container>
            <Tabs />
            <Row className="row-grid justify-content-between align-items-center mt-lg">
              <Progress />
              <Pagination />
            </Row>
            <Row className="row-grid justify-content-between">
              <Pills />
              <Labels />
            </Row>
            <Alerts />
            <Typography />
            <Modals />
            <Datepicker />
            <TooltipPopover />
          </Container>
        </section>
        <Carousel />
        <Icons />
        <Login />
        <Download />
      </main>
      {/* <CardsFooter /> */}
    </>
  );
};

export default HomePage;
