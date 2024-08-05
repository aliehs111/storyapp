// src/utils/auth.js//this is not being used because it was causing errors in App.js//leaving it here now to implement later.
import { jwtDecode } from 'jwt-decode'; // Use named import

// Check if the token is expired
export const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  return decodedToken.exp * 1000 < Date.now();
};
