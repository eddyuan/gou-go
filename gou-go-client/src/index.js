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
import React, { useLayoutEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom';

import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
import { LocaleProvider, Layout } from '@douyinfe/semi-ui';

// import 'assets/vendor/nucleo/css/nucleo.css';
// import 'assets/vendor/font-awesome/css/font-awesome.min.css';
// import 'assets/scss/argon-design-system-react.scss?v1.1.0';
import 'assets/scss/app.scss';
import { Store } from 'Store';

import GougoNavbar from 'components/Navbars/GougoNavbar';
import GougoFooter from 'components/Footers/GougoFooter';

// Pages
import HomePage from 'views/HomePage';
import SitterPage from 'views/SitterPage';
import LoginPage from 'views/LoginPage';
import Landing from 'views/examples/Landing.js';
// import Login from "views/examples/Login.js";
import Profile from 'views/examples/Profile.js';
import Register from 'views/examples/Register.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const { Header, Footer, Content } = Layout;

root.render(
  <Store>
    <LocaleProvider locale={en_US}>
      <BrowserRouter>
        <Header>
          <GougoNavbar />
        </Header>
        <Content>
          <Wrapper>
            <Routes>
              <Route path='/' exact element={<HomePage />} />
              <Route path='/sitter' element={<SitterPage />} />
              <Route path='/landing-page' exact element={<Landing />} />
              <Route path='/signin' exact element={<LoginPage />} />
              <Route path='/profile-page' exact element={<Profile />} />
              <Route path='/register-page' exact element={<Register />} />
            </Routes>
          </Wrapper>
        </Content>
        <Footer>
          <GougoFooter />
        </Footer>
      </BrowserRouter>
    </LocaleProvider>
  </Store>
);
