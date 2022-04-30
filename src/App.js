import './App.css';
import { ThemeProvider } from '@emotion/react';

import theme from './theme.js';
import Layout from './components/layout/Layout';

// provider
import AuthProvider from './context/auth-provider';

function App() {
  return (
    <div className="app_container">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
