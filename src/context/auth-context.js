import React from 'react';

const AuthContext = React.createContext({
  user: { user_name: null, token: null, user_role: null, user_id: null },
  login: (userName, token) => {},
  logout: () => {},
});

export default AuthContext;
