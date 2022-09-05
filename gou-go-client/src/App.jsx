import React, { useLayoutEffect } from 'react';

import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
import { LocaleProvider, Layout } from '@douyinfe/semi-ui';

import { Store } from 'Store';

import GougoNavbar from 'components/Navbars/GougoNavbar';
import GougoFooter from 'components/Footers/GougoFooter';

import GlobalModals from 'views/modules/GlobalModals';
// Pages
import HomePage from 'views/HomePage';
import SitterPage from 'views/SitterPage';
import ProfilePage from 'views/ProfilePage';

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};
export const App = () => {
  const { Header, Footer, Content } = Layout;

  return (
    <Store>
      <LocaleProvider locale={en_US}>
        <GlobalModals>
          <BrowserRouter>
            <Header>
              <GougoNavbar />
            </Header>
            <Content>
              <Wrapper>
                <Routes>
                  <Route path='/' exact element={<HomePage />} />
                  <Route path='/sitter/:id' element={<SitterPage />} />
                  <Route path='/profile' element={<ProfilePage />} />
                  {/* <Route path='/landing-page' exact element={<Landing />} />
                <Route path='/signin' exact element={<LoginPage />} />
                <Route path='/profile-page' exact element={<Profile />} />
                <Route path='/register-page' exact element={<Register />} /> */}
                </Routes>
              </Wrapper>
            </Content>
            <Footer>{/* <GougoFooter /> */}</Footer>
          </BrowserRouter>
        </GlobalModals>
      </LocaleProvider>
    </Store>
  );
};