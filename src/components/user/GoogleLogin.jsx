import React from "react";

import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const GoogleLogin = () => {
  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then(async (data) => {
        const user = data.user;
        const email = user.email;
        const photoURL = user.photoURL;

        // console.log(email + "\n" + photoURL);
        const res = await axios.post("/user/login", { email, password: "0" });
        console.log(res.data);
        if (res.data === 0) {
          await axios.post("/user/insert", {
            email,
            photo: photoURL,
          });
        }
        sessionStorage.setItem("email", email);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Button
        className="w-100 d-flex justify-content-center align-items-center"
        variant="outline-dark"
        size="lg"
        onClick={handleGoogleLogin}
      >
        <FcGoogle className="me-2" />
        Google
      </Button>
    </div>
  );
};

export default GoogleLogin;
