import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from 'Store';
import { Link } from 'react-router-dom';

import { IconUserCircleStroked, IconServerStroked } from '@douyinfe/semi-icons';
import { Nav, Button, Dropdown, Toast, Modal, Form } from '@douyinfe/semi-ui';

import SignInModule from 'views/modules/SignInModule';

import server from 'server';

const GougoNavbar = (props) => {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  const [state, dispatch] = useContext(Context);

  const [loginV, setLoginV] = useState(false);

  // const [loginLoading, setLoginLoading] = useState(false);

  const [loginMode, setLoginMode] = useState(1);

  // const handleLogin = (values) => {
  //   setLoginLoading(true);
  //   server
  //     .login({
  //       email: values.email,
  //       password: values.password,
  //       save: values.save,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       if (res.data.success) {
  //         dispatch({ type: 'SET_USER', payload: res.data.data });
  //         // navigate(-1);
  //         setLoginV(false);
  //         Toast.success({
  //           content: 'Signed in',
  //           duration: 5,
  //         });
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       if (e.response && e.response.status === 401) {
  //         Toast.error({
  //           content: 'Incorrect credential',
  //           duration: 3,
  //         });
  //       }
  //     })
  //     .then(() => {
  //       setLoginLoading(false);
  //     });
  // };

  const onSignOut = () => {
    dispatch({ type: 'SIGNOUT', payload: {} });
    Toast.success({
      content: 'Signed out',
      duration: 5,
    });
    navigate('/');
  };

  const onSignedIn = (mode) => {
    setLoginV(false);
    Toast.success({
      content:
        mode === 1 ? 'Signed in successfully' : 'Registered successfully',
      duration: 5,
    });
  };

  const toggleLoginV = (mode) => {
    if (mode === 1 || mode === 2) {
      setLoginMode(mode);
    }
    setLoginV(!loginV);
  };

  return (
    <>
      <div className='nav-container'>
        <Nav mode='horizontal' defaultSelectedKeys={['Home']}>
          <Nav.Header>
            <Link to={`/`}>
              <img
                alt='...'
                height={42}
                src={require('assets/img/brand/gougo-logo.png')}
              />
            </Link>
          </Nav.Header>
          {/* <Nav.Item
            itemKey='Home'
            text='首页'
            icon={<IconHome size='large' />}
          />
          <Nav.Item
            itemKey='Live'
            text='直播'
            icon={<IconLive size='large' />}
          />
          <Nav.Item
            itemKey='Setting'
            text='设置'
            icon={<IconSetting size='large' />}
          /> */}
          <Nav.Footer>
            {/* <Button
              theme='borderless'
              icon={<IconBell size='large' />}
              style={{
                color: 'var(--semi-color-text-2)',
                marginRight: '12px',
              }}
            />
            <Button
              theme='borderless'
              icon={<IconHelpCircle size='large' />}
              style={{
                color: 'var(--semi-color-text-2)',
                marginRight: '12px',
              }}
            /> */}
            {state.user && state.user.id ? (
              <>
                <Dropdown
                  trigger={'hover'}
                  position={'bottomLeft'}
                  render={
                    <Dropdown.Menu>
                      <Link to={`/`}>
                        <Dropdown.Item>Profile</Dropdown.Item>
                      </Link>
                      <Dropdown.Item icon={<IconServerStroked />}>
                        Bookings
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={onSignOut}>
                        Sign Out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  }
                >
                  <Button
                    icon={<IconUserCircleStroked />}
                    size='large'
                    style={{
                      color: 'var(--semi-color-text-2)',
                    }}
                    theme='borderless'
                  >
                    {state.user.first_name}
                  </Button>
                </Dropdown>
              </>
            ) : (
              <>
                {/* <Link to={'signin'}> */}

                <Button
                  theme='borderless'
                  style={{ color: 'var(--semi-color-text-2)' }}
                  size='large'
                  onClick={() => toggleLoginV(1)}
                >
                  Sign In
                </Button>
                <Button
                  className='ml-2'
                  size='large'
                  theme='solid'
                  onClick={() => toggleLoginV(2)}
                >
                  Sign up
                </Button>
                <Modal
                  className='glass'
                  title=''
                  visible={loginV}
                  centered
                  // bodyStyle={{ overflow: 'auto', height: 200 }}
                  onCancel={toggleLoginV}
                  maskClosable={false}
                  footer={<div className='pt-8'></div>}
                >
                  <SignInModule mode={loginMode} onSuccess={onSignedIn} />
                  {/* <Form onSubmit={(values) => handleLogin(values)}>
                    <div className='text-center mb-2 mt-3'>
                      <img
                        alt='...'
                        height={42}
                        src={require('assets/img/brand/gougo-logo.png')}
                      />
                    </div>
                    <Form.Input
                      label='E-mail'
                      field='email'
                      size='large'
                      prefix={<IconMailStroked />}
                      showClear
                      disabled={loginLoading}
                      rules={[
                        { required: true, message: 'Required' },
                        { type: 'string', message: 'Invalid E-mail' },
                        {
                          validator: (rule, value) => {
                            var re = /\S+@\S+\.\S+/;
                            return re.test(value);
                          },
                          message: 'Invalid E-mail',
                        },
                      ]}
                    ></Form.Input>
                    <Form.Input
                      label='Password'
                      field='password'
                      mode='password'
                      size='large'
                      prefix={<IconKeyStroked />}
                      showClear
                      disabled={loginLoading}
                      rules={[
                        { required: true, message: 'Required' },
                        { type: 'string', message: 'Invalid Password' },
                        {
                          validator: (rule, value) => value.length >= 6,
                          message: 'Invalid Password',
                        },
                      ]}
                    ></Form.Input>
                    <div className='d-flex aic lh-1'>
                      <Form.Switch
                        field='save'
                        noLabel={true}
                        initValue={true}
                      ></Form.Switch>
                      <span className='ml-2'>Remember</span>
                    </div>
                    <div className='text-center mt-4'>
                      <Button
                        size='large'
                        theme='solid'
                        htmlType='submit'
                        loading={loginLoading}
                      >
                        Sign in
                      </Button>
                    </div>
                    <div className='text-center mt-4'>
                      <Link to='/register'>
                        <Button
                          size='large'
                          theme='borderless'
                          htmlType='submit'
                          loading={loginLoading}
                          style={{ color: 'var(--semi-color-text-2' }}
                        >
                          Register
                        </Button>
                      </Link>
                    </div>
                  </Form> */}
                </Modal>
              </>
            )}
          </Nav.Footer>
        </Nav>
      </div>
      <div className='nav-spacer'></div>
      {/* <header className='header-global'>
        <Navbar
          className='navbar-main navbar-transparent navbar-light headroom'
          expand='lg'
          id='navbar-main'
        >
          <Container>
            <NavbarBrand className='mr-lg-5' to='/' tag={Link}>
              <img
                alt='...'
                src={require('assets/img/brand/gougo-logo-white.png')}
              />
            </NavbarBrand>
            <button className='navbar-toggler' id='navbar_global'>
              <span className='navbar-toggler-icon' />
            </button>
            <UncontrolledCollapse
              toggler='#navbar_global'
              navbar
              className={collapseClasses}
              onExiting={onExiting}
              onExited={onExited}
            >
              <div className='navbar-collapse-header'>
                <Row>
                  <Col className='collapse-brand' xs='6'>
                    <Link to='/'>
                      <img
                        alt='...'
                        src={require('assets/img/brand/gougo-logo.png')}
                      />
                    </Link>
                  </Col>
                  <Col className='collapse-close' xs='6'>
                    <button className='navbar-toggler' id='navbar_global'>
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className='navbar-nav-hover align-items-lg-center' navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle nav>
                    <i className='ni ni-ui-04 d-lg-none mr-1' />
                    <span className='nav-link-inner--text'>Components</span>
                  </DropdownToggle>
                  <DropdownMenu className='dropdown-menu-xl'>
                    <div className='dropdown-menu-inner'>
                      <Media
                        className='d-flex align-items-center'
                        href='https://demos.creative-tim.com/argon-design-system-react/#/documentation/overview?ref=adsr-navbar'
                        target='_blank'
                      >
                        <div className='icon icon-shape bg-gradient-primary rounded-circle text-white'>
                          <i className='ni ni-spaceship' />
                        </div>
                        <Media body className='ml-3'>
                          <h6 className='heading text-primary mb-md-1'>
                            Getting started
                          </h6>
                          <p className='description d-none d-md-inline-block mb-0'>
                            Learn how to use Argon compiling Scss, change brand
                            colors and more.
                          </p>
                        </Media>
                      </Media>
                      <Media
                        className='d-flex align-items-center'
                        href='https://demos.creative-tim.com/argon-design-system-react/#/documentation/colors?ref=adsr-navbar'
                        target='_blank'
                      >
                        <div className='icon icon-shape bg-gradient-success rounded-circle text-white'>
                          <i className='ni ni-palette' />
                        </div>
                        <Media body className='ml-3'>
                          <h6 className='heading text-primary mb-md-1'>
                            Foundation
                          </h6>
                          <p className='description d-none d-md-inline-block mb-0'>
                            Learn more about colors, typography, icons and the
                            grid system we used for Argon.
                          </p>
                        </Media>
                      </Media>
                      <Media
                        className='d-flex align-items-center'
                        href='https://demos.creative-tim.com/argon-design-system-react/#/documentation/alert?ref=adsr-navbar'
                        target='_blank'
                      >
                        <div className='icon icon-shape bg-gradient-warning rounded-circle text-white'>
                          <i className='ni ni-ui-04' />
                        </div>
                        <Media body className='ml-3'>
                          <h5 className='heading text-warning mb-md-1'>
                            Components
                          </h5>
                          <p className='description d-none d-md-inline-block mb-0'>
                            Browse our 50 beautiful handcrafted components
                            offered in the Free version.
                          </p>
                        </Media>
                      </Media>
                    </div>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle nav>
                    <i className='ni ni-collection d-lg-none mr-1' />
                    <span className='nav-link-inner--text'>Examples</span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem to='/landing-page' tag={Link}>
                      Landing
                    </DropdownItem>
                    <DropdownItem to='/profile-page' tag={Link}>
                      Profile
                    </DropdownItem>
                    <DropdownItem to='/login-page' tag={Link}>
                      Login
                    </DropdownItem>
                    <DropdownItem to='/register-page' tag={Link}>
                      Register
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              <Nav className='align-items-lg-center ml-lg-auto' navbar>
                <NavItem>
                  <NavLink
                    className='nav-link-icon'
                    href='https://www.facebook.com/creativetim'
                    id='tooltip333589074'
                    target='_blank'
                  >
                    <i className='fa fa-facebook-square' />
                    <span className='nav-link-inner--text d-lg-none ml-2'>
                      Facebook
                    </span>
                  </NavLink>
                  <UncontrolledTooltip delay={0} target='tooltip333589074'>
                    Like us on Facebook
                  </UncontrolledTooltip>
                </NavItem>
                <NavItem>
                  <NavLink
                    className='nav-link-icon'
                    href='https://www.instagram.com/creativetimofficial'
                    id='tooltip356693867'
                    target='_blank'
                  >
                    <i className='fa fa-instagram' />
                    <span className='nav-link-inner--text d-lg-none ml-2'>
                      Instagram
                    </span>
                  </NavLink>
                  <UncontrolledTooltip delay={0} target='tooltip356693867'>
                    Follow us on Instagram
                  </UncontrolledTooltip>
                </NavItem>
                <NavItem>
                  <NavLink
                    className='nav-link-icon'
                    href='https://twitter.com/creativetim'
                    id='tooltip184698705'
                    target='_blank'
                  >
                    <i className='fa fa-twitter-square' />
                    <span className='nav-link-inner--text d-lg-none ml-2'>
                      Twitter
                    </span>
                  </NavLink>
                  <UncontrolledTooltip delay={0} target='tooltip184698705'>
                    Follow us on Twitter
                  </UncontrolledTooltip>
                </NavItem>
                <NavItem>
                  <NavLink
                    className='nav-link-icon'
                    href='https://github.com/creativetimofficial/argon-design-system-react'
                    id='tooltip112445449'
                    target='_blank'
                  >
                    <i className='fa fa-github' />
                    <span className='nav-link-inner--text d-lg-none ml-2'>
                      Github
                    </span>
                  </NavLink>
                  <UncontrolledTooltip delay={0} target='tooltip112445449'>
                    Star us on Github
                  </UncontrolledTooltip>
                </NavItem>
                {state.user && state.user.id ? (
                  <Dropdown
                    trigger={'hover'}
                    position={'bottomLeft'}
                    render={
                      <Dropdown.Menu>
                        <Link to={`/`}>
                          <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Item icon={<IconServerStroked />}>
                          Bookings
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={onSignOut}>
                          Sign Out
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    }
                  >
                    <Button
                      icon={<IconUserCircleStroked />}
                      style={{ color: 'white' }}
                      theme='borderless'
                    >
                      {state.user.first_name}
                    </Button>
                  </Dropdown>
                ) : (
                  <NavItem className='d-none d-lg-block ml-lg-4'>
                    <Link to={'register'}>
                      <Button size='large' theme='solid'>
                        Register
                      </Button>
                    </Link>
                    <Link to={'signin'} className='ml-2'>
                      <Button style={{ color: 'white' }} size='large'>
                        Sign In
                      </Button>
                    </Link>
                  </NavItem>
                )}
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </header> */}
    </>
  );
  // }
};

export default GougoNavbar;
