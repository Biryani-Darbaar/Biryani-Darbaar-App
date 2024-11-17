import React from "react";
import { useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import CustomButton from "./Button";
import axios from "axios";
const SignOutButton = () => {
  const history = useHistory();

  const handleSignOut = async () => {
    const auth = getAuth();
    await signOut(auth);
    const res = await axios.post("http://localhost:4200/logout");
    console.log("Sign out response:", res);
    sessionStorage.clear();
    history.push("/");
  };

  return <CustomButton colorType="primary" onClick={handleSignOut}>Sign Out</CustomButton>;
};

export default SignOutButton;
