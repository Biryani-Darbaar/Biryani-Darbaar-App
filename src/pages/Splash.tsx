import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const SplashScreen: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push("/SignIn");
    }, 5000);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <div className="bg-primary h-screen flex items-center justify-center">
      <div className="flex flex-col items-center w-full">
        <div className="rounded-full border-4 border-white py-4 px-1 flex items-center justify-center">
          <img
            src="/assets/images/logo.png"
            alt="App Logo"
            className="w-40 m-4"
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;