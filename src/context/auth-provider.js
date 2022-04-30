import { useEffect, useState } from 'react';
import Context from './auth-context';

const AuthProvider = (props) => {
  const [userName, setUserName] = useState();
  const [token, setToken] = useState();

  const loginHandler = (userName, token) => {
    localStorage.setItem('userName', userName);
    localStorage.setItem('token', token);
    setUserName(localStorage.getItem('userName'));
    setToken(localStorage.getItem('token'));
  };

  const logoutHandler = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    setUserName(null);
    setToken(null);
  };

  useEffect(() => {
    if (localStorage.getItem('userName') && localStorage.getItem('token')) {
      setUserName(localStorage.getItem('userName'));
      setToken(localStorage.getItem('token'));
    }
  }, []);

  const context = {
    user: {
      user_name: userName,
      token: token,
    },
    login: loginHandler,
    logout: logoutHandler,
  };

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};

export default AuthProvider;
