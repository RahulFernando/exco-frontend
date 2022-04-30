import React from 'react';
import Navbar from '../navbar/Navbar';
import Home from '../../pages/home/Home';
import Lending from '../../pages/lending/Lending';
import { Route, Routes } from 'react-router-dom';

const Layout = () => {
  const routes = [
    {
      id: 'r1',
      path: '/',
      element: <Home />,
    },
    {
      id: 'r1',
      path: '/lending',
      element: <Lending />,
    },
  ];

  return (
    <>
      <Navbar />
      <Routes>
        {routes.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
};

export default Layout;
