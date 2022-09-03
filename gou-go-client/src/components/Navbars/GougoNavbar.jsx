import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from 'Store';
import { Link } from 'react-router-dom';

import { IconUserCircleStroked, IconServerStroked } from '@douyinfe/semi-icons';
import { Nav, Button, Dropdown, Toast, Modal, Form } from '@douyinfe/semi-ui';

import SignInModule from 'views/modules/SignInModule';

const GougoNavbar = (props) => {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  const [state, dispatch] = useContext(Context);

  const [loginV, setLoginV] = useState(false);

  const [loginMode, setLoginMode] = useState(1);

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

          <Nav.Footer>
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
                  onCancel={toggleLoginV}
                  maskClosable={false}
                  footer={<div className='pt-8'></div>}
                >
                  <SignInModule mode={loginMode} onSuccess={onSignedIn} />
                </Modal>
              </>
            )}
          </Nav.Footer>
        </Nav>
      </div>
      <div className='nav-spacer'></div>
    </>
  );
};

export default GougoNavbar;
