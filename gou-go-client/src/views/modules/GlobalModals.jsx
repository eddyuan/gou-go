import React, { useState, useContext } from 'react';
import { Context } from 'Store';

import {
  Button,
  Toast,
  Form,
  RadioGroup,
  Radio,
  Modal,
} from '@douyinfe/semi-ui';

import server from 'server';

import { IconMailStroked, IconKeyStroked } from '@douyinfe/semi-icons';

const GlobalModals = (props) => {
  const [state, dispatch] = useContext(Context);

  const [loginLoading, setLoginLoading] = useState(false);
  const [petLoading, setPetLoading] = useState(false);

  const onModeChange = (e) => {
    if (e.target.value === 1) {
      dispatch({ type: 'SHOW_SIGNIN' });
    } else {
      dispatch({ type: 'SHOW_SIGNUP' });
    }
  };

  const handleSubmit = async (values) => {
    setLoginLoading(true);
    try {
      let res;
      const _mode = state.signVisible;
      if (_mode === 1) {
        res = await server.login({
          ...values,
        });
      } else if (_mode === 2) {
        res = await server.register({
          ...values,
        });
      }
      if (res?.data?.success) {
        dispatch({ type: 'SET_USER', payload: res.data.data });
        dispatch({ type: 'HIDE_SIGN' });
        Toast.success({
          content:
            _mode === 1 ? 'Signed in successfully' : 'Registered successfully',
          duration: 5,
        });
        props.onSuccess?.(_mode);
      }
    } catch (e) {
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
  };

  const hideSignModal = () => {
    dispatch({ type: 'HIDE_SIGN' });
  };

  const onPetSubmit = (value) => {
    setPetLoading(true);
    server
      .petAdd(value)
      .then((res) => {
        console.log(res);
        if (res.data?.success) {
          dispatch({
            type: 'SET_USER',
            payload: {
              ...state.user,
              pets: [res.data.data, ...state.user.pets],
            },
          });
          dispatch({
            type: 'HIDE_PET',
          });
          Toast.success({
            content: 'Pet added',
            duration: 5,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .then(() => {
        setPetLoading(false);
      });
  };

  const hidePetModal = () => {
    dispatch({ type: 'HIDE_PET' });
  };

  const BREEDS = [
    'Labrador Retriever',
    'French Bulldog',
    'German Shepherd',
    'Golden Retriever',
    'English Bulldog',
    'Poodle',
    'Beagle',
    'Rottweiler',
    'Other',
  ];

  return (
    <>
      {props.children}

      {/* Pet modal */}
      <Modal
        className='glass'
        title='Add a pet'
        visible={state.petVisible && !!state.user?.id}
        centered
        onCancel={hidePetModal}
        maskClosable={false}
        footer={<div></div>}
      >
        <Form onSubmit={onPetSubmit}>
          <Form.Input
            field='name'
            label="Pet's name"
            rules={[{ required: true, message: 'Required' }]}
          />
          <div className='d-flex'>
            <Form.Select
              field='age'
              label='Age'
              initValue={1}
              fieldClassName='flex-1'
              className='w-100'
              disabled={petLoading}
              rules={[{ required: true, message: 'Required' }]}
            >
              {[...Array(29)].map((x, i) => {
                return (
                  <Form.Select.Option value={i + 1} key={i + 1}>
                    {i + 1}
                  </Form.Select.Option>
                );
              })}
            </Form.Select>
            <Form.Select
              field='breed'
              label='Breed'
              fieldClassName='flex-2'
              className='w-100'
              fieldStyle={{ marginLeft: '12px' }}
              disabled={petLoading}
              rules={[{ required: true, message: 'Required' }]}
            >
              {BREEDS.map((breed, i) => {
                return (
                  <Form.Select.Option value={breed} key={i}>
                    {breed}
                  </Form.Select.Option>
                );
              })}
            </Form.Select>
          </div>
          <div className='d-flex'>
            <Form.Select
              field='sex'
              label='Gender'
              fieldClassName='flex-1'
              className='w-100'
              disabled={petLoading}
              rules={[{ required: true, message: 'Required' }]}
            >
              <Form.Select.Option value={1}>Male</Form.Select.Option>
              <Form.Select.Option value={2}>Female</Form.Select.Option>
            </Form.Select>
            <Form.InputNumber
              fieldClassName='flex-2'
              className='w-100'
              fieldStyle={{ marginLeft: '12px' }}
              innerButtons
              field='weight'
              label='Weight (lb)'
              disabled={petLoading}
              rules={[{ required: true, message: 'Required' }]}
            />
          </div>
          <div className='text-center mt-4'>
            <Button
              size='large'
              theme='solid'
              htmlType='submit'
              loading={petLoading}
            >
              Add
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Sign modal */}
      <Modal
        className='glass'
        title=''
        visible={
          (state.signVisible === 1 || state.signVisible === 2) &&
          !state.user?.id
        }
        centered
        onCancel={hideSignModal}
        maskClosable={false}
        footer={<div className='pt-8'></div>}
      >
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
              value={state.signVisible}
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
          {state.signVisible === 2 && (
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

          <div className='d-flex aic lh-1'>
            <Form.Switch
              field='save'
              noLabel={true}
              initValue={true}
            ></Form.Switch>
            <span className='ml-2'>Remember Me</span>
          </div>
          <div className='text-center mt-4'>
            <Button
              size='large'
              theme='solid'
              htmlType='submit'
              loading={loginLoading}
            >
              {state.signVisible === 1 ? 'Sign In' : 'Sign up'}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default GlobalModals;
