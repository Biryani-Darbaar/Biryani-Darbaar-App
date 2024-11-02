import React from "react";
import { useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import CustomButton from "./Button";
const SignOutButton = () => {
  const history = useHistory();

  const handleSignOut = async () => {
    const auth = getAuth();
    await signOut(auth);
    history.push("/");
  };

  return <CustomButton colorType="primary" onClick={handleSignOut}>Sign Out</CustomButton>;
};

export default SignOutButton;
