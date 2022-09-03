import React, { useState, useContext } from "react";
import { Context } from "Store";
import { Button, Form } from "@douyinfe/semi-ui";
import { IconMailStroked, IconKeyStroked } from "@douyinfe/semi-icons";
// reactstrap components
import { Card, CardBody, Container, Row, Col } from "reactstrap";
import server from "server";

const LoginPage = (props) => {
  const [state, dispatch] = useContext(Context);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    console.log(values);
    setLoading(true);
    server
      .login({ email: values.email, password: values.password })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          dispatch({ type: "SET_USER", payload: res.data.data });
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <main>
        <section className="section section-shaped section-lg section-fullscreen">
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form onSubmit={(values) => handleSubmit(values)}>
                      <h3 className="text-center">Sign in</h3>
                      <Form.Input
                        label="E-mail"
                        field="email"
                        size="large"
                        prefix={<IconMailStroked />}
                        showClear
                        disabled={loading}
                      ></Form.Input>
                      <Form.Input
                        label="Password"
                        field="password"
                        mode="password"
                        size="large"
                        prefix={<IconKeyStroked />}
                        showClear
                        disabled={loading}
                      ></Form.Input>
                      <div className="text-center">
                        <Button
                          className="mt-4"
                          size="large"
                          theme="solid"
                          htmlType="submit"
                          loading={loading}
                        >
                          Sign in
                        </Button>
                        {/* <Button className="my-4" color="primary" type="button">
                          Sign in
                        </Button> */}
                      </div>
                    </Form>
                  </CardBody>
                </Card>
                <Row className="mt-3">
                  <Col xs="6">
                    <a
                      className="text-light"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <small>Forgot password?</small>
                    </a>
                  </Col>
                  <Col className="text-right" xs="6">
                    <a
                      className="text-light"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <small>Create new account</small>
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
};

export default LoginPage;
