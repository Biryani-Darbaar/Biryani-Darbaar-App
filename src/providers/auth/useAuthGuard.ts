import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useAuthGuard = (isAuthenticated: boolean) => {
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.replace('/VerifyPhoneNumber');
    }
  }, [isAuthenticated, history]);
};

export default useAuthGuard;