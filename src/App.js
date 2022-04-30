import './App.css';
import Navbar from './components/navbar/Navbar';
import { ThemeProvider } from '@emotion/react';

import theme from './theme.js';
import Layout from './components/layout/Layout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
