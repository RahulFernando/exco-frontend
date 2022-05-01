import JwtDecode from 'jwt-decode';

export const getUserDetails = async (token) => {
  return JwtDecode(token);
};

export const getCount = (cart, type = 0) => {
  const references =
    cart.data?.items.length > 0 &&
    cart.data?.items.filter((item) => item.type === type);

  return references ? references.length : 0;
};
