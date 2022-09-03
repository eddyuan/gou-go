import React, { useState, useContext } from 'react';
import { Context } from 'Store';

import { Button, Toast, Form, RadioGroup, Radio } from '@douyinfe/semi-ui';

import server from 'server';

import { IconMailStroked, IconKeyStroked } from '@douyinfe/semi-icons';

const SignInModule = (props) => {
  const [state, dispatch] = useContext(Context);

  //   const [loginV, setLoginV] = useState(false);

  const [loginLoading, setLoginLoading] = useState(false);
  const [mode, setMode] = useState(props.mode || 1);

  const onModeChange = (e) => {
    setMode(e.target.value);
  };

  //   const handleSubmit = (value) => {
  //     if (mode === 1) {
  //       handleLogin(value);
  //     } else {
  //       console.log(value);
  //     }
  //   };

  const handleSubmit = async (values) => {
    setLoginLoading(true);
    try {
      let res;
      const _mode = mode;
      if (_mode === 1) {
        res = await server.login({
          ...values,
        });
      } else {
        res = await server.register({
          ...values,
        });
      }
      if (res && res.data.success) {
        dispatch({ type: 'SET_USER', payload: res.data.data });
        props.onSuccess(_mode);
      }
    } catch (e) {
      console.log(e);
      if (e.response && e.response.status === 401) {
        Toast.error({
          content: 'Incorrect credential',
          duration: 3,
        });
      } else if (e.response && e.response.data && e.response.data.message) {
        Toast.error({
          content: e.response.data.message.toString(),
          duration: 3,
        });
      }
    }
    setLoginLoading(false);
    //   .then((res) => {
    //     console.log(res);
    //     if (res.data.success) {
    //       dispatch({ type: 'SET_USER', payload: res.data.data });
    //       // navigate(-1);
    //       props.onSuccess();
    //       Toast.success({
    //         content: 'Signed in',
    //         duration: 5,
    //       });
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     if (e.response && e.response.status === 401) {
    //       Toast.error({
    //         content: 'Incorrect credential',
    //         duration: 3,
    //       });
    //     }
    //   })
    //   .then(() => {
    //     setLoginLoading(false);
    //   });
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div className='text-center mb-2 mt-3'>
          <img
            alt='...'
            height={42}
            src={require('assets/img/brand/gougo-logo.png')}
          />
        </div>
        <div className='d-flex jcc'>
          <RadioGroup
            className='lh-1 pt-0 pb-0 text-center mx-auto'
            field='action'
            noLabel={true}
            type='button'
            buttonSize='middle'
            value={mode}
            aria-label='sign mode'
            name='action'
            onChange={onModeChange}
          >
            <Radio value={1}>Sign In</Radio>
            <Radio value={2}>Sign Up</Radio>
          </RadioGroup>
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
              validator: (rule, value) => String(value).length >= 6,
              message: 'Invalid Password',
            },
          ]}
        ></Form.Input>
        {mode === 2 && (
          <>
            <Form.Input
              label='First Name'
              field='first_name'
              mode='password'
              size='large'
              disabled={loginLoading}
              rules={[
                { required: true, message: 'Required' },
                { type: 'string', message: 'Invalid Password' },
              ]}
            ></Form.Input>
            <Form.Input
              label='Last Name'
              field='last_name'
              mode='password'
              size='large'
              disabled={loginLoading}
              rules={[
                { required: true, message: 'Required' },
                { type: 'string', message: 'Invalid Password' },
              ]}
            ></Form.Input>
          </>
        )}
        {/* {mode === 2 && (
          <Form.Input
            label='Confirm Password'
            field='confirm_password'
            mode='password'
            size='large'
            prefix={<IconKeyStroked />}
            showClear
            disabled={loginLoading}
            rules={[
              { required: true, message: 'Required' },
              { type: 'string', message: 'Invalid Password' },
              {
                validator: (rule, value) => String(value).length >= 6,
                message: 'Invalid Password',
              },
            ]}
          ></Form.Input>
        )} */}
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
            {mode === 1 ? 'Sign In' : 'Sign up'}
          </Button>
        </div>
        {/* <div className='text-center mt-4'>
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
        </div> */}
      </Form>
    </div>
  );
};

export default SignInModule;
