import React, { useState, useEffect, useContext } from 'react';

import { Context } from 'Store';

// reactstrap components
import { Container, Row, Col } from 'reactstrap';

import { useLocation } from 'react-router-dom';

import { Rating, Button, SideSheet, Form } from '@douyinfe/semi-ui';
import { IconPrizeStroked } from '@douyinfe/semi-icons';
import ReviewCard from 'components/ReviewCard';

const SitterPage = (props) => {
  const location = useLocation();
  const [state, dispatch] = useContext(Context);
  const [sitter, setSitter] = useState({ ...location.state.sitter });
  const [bookVisible, setBookVisible] = useState(false);

  useEffect(() => {});

  const toggleBookVisible = () => {
    setBookVisible(!bookVisible);
  };

  return (
    <>
      {/* <GougoNavbar /> */}
      <main className='sitter-page pt-6'>
        {/* <img className="sitter-hero" src={sitter.img_url} alt="" /> */}
        <section className='section'>
          <Container>
            <Row>
              <Col md='4 mb-4'>
                <div className='img-wrapper'>
                  <img className='sitter-feature' src={sitter.img_url} alt='' />
                </div>
              </Col>
              <Col md='8'>
                <div>
                  <h2>
                    {sitter.first_name} {sitter.last_name}
                  </h2>
                  <div>{sitter.postcode}</div>
                  <div className='price'>
                    <span className='amount'>
                      ${(sitter.price / 100).toFixed(2)}
                    </span>
                    <span className='unit'> / hr</span>
                  </div>
                  <div className='mt-2 d-flex align-items-center'>
                    <Rating disabled allowHalf defaultValue={sitter.rating} />
                    <span className='ms-3 mb-1'>
                      {sitter.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className='mt-3 mb-4'>
                    <span className='bg-lighter rounded p-2'>
                      {sitter.description}
                    </span>
                  </div>
                  <h5>Dog Size</h5>
                  <div>
                    <IconPrizeStroked /> Up to: {sitter.dog_weight.toFixed(1)}kg
                  </div>
                  <div className='mt-4'>
                    <Button
                      size='large'
                      theme='solid'
                      onClick={toggleBookVisible}
                    >
                      Book now
                    </Button>
                  </div>
                  <SideSheet
                    title='Creat Booking'
                    visible={bookVisible}
                    onCancel={toggleBookVisible}
                  >
                    {state.user && state.user.pets && state.user.pets.length && (
                      <Form>
                        <Form.CheckboxGroup type='card'>
                          {state.user.pets.map((pet) => {
                            return (
                              <Form.Checkbox value={pet.id}>
                                {pet.name}
                              </Form.Checkbox>
                            );
                          })}
                          <Form.Input></Form.Input>
                        </Form.CheckboxGroup>
                      </Form>
                    )}

                    <p>This is the content of a basic sidesheet.</p>
                    <p>Here is more content...</p>
                  </SideSheet>

                  <hr />
                  <h4 className='mt-3'>
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
        <section className='section section-components'></section>
      </main>
    </>
  );
};

export default SitterPage;
