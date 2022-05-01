import { useEffect, useState } from 'react';
import Context from './auth-context';

import { getUserDetails } from '../helpers/util';

const AuthProvider = (props) => {
  const [userName, setUserName] = useState();
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [userRole, setUserRole] = useState();

  const loginHandler = async (userName, token) => {
    localStorage.setItem('userName', userName);
    localStorage.setItem('token', token);
    setUserName(localStorage.getItem('userName'));
    setToken(localStorage.getItem('token'));
    const { user_id, user_role } = await getUserDetails(token);
    setUserId(user_id);
    setUserRole(user_role);
  };

  const logoutHandler = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    setUserName(null);
    setToken(null);
  };

  useEffect(() => {
    const fetch = async () => {
      const { user_id, user_role } = await getUserDetails(localStorage.getItem('token'));
      setUserId(user_id);
      setUserRole(user_role);
    };

    if (localStorage.getItem('userName') && localStorage.getItem('token')) {
      setUserName(localStorage.getItem('userName'));
      setToken(localStorage.getItem('token'));
    }

    fetch();
  }, []);

  const context = {
    user: {
      user_name: userName,
      token: token,
      user_role: userRole,
      user_id: userId,
    },
    login: loginHandler,
    logout: logoutHandler,
  };

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};

export default AuthProvider;
