import './App.css';
import { ThemeProvider } from '@emotion/react';

import theme from './theme.js';
import Layout from './components/layout/Layout';

function App() {
  return (
    <div className='app_container'>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </div>
  );
}

export default App;
