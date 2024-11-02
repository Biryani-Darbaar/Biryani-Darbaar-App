import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const useLogout = (setIsAuthenticated: (isAuth: boolean) => void) => {
  const history = useHistory();

  const logout = useCallback(async () => {
    try {
      await axios.post('http://localhost:3000/logout'); // Use POST method for logout
      setIsAuthenticated(false); // Set the authentication state to false
      alert('Signed out successfully');
      history.replace('/'); // Redirect to default page
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Error signing out. Please try again.');
    }
  }, [setIsAuthenticated, history]);

  return logout;
};

export default useLogout;
