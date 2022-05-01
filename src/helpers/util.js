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

export const daysRemains = (from, to) => {
  const difference = Math.abs(from - to);
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  if (Object.keys(timeLeft).length === 0) {
    timeLeft.days = 0;
    timeLeft.hours = 0;
    timeLeft.minutes = 0;
    timeLeft.seconds = 0;
  }
  return timeLeft;
};
