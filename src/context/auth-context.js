import React from 'react';

const AuthContext = React.createContext({
  user: { user_name: null, token: null },
  login: (userName, token) => {},
  logout: () => {},
});

export default AuthContext;
