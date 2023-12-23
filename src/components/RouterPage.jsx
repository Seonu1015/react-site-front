import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import StartPage from "./StartPage";

import SignUp from "./user/SignUp";
import MainPage from "./main/MainPage";

import UpdateLink from "./link/UpdateLink";
import UpdateUser from "./user/UpdateUser";

const RouterPage = () => {
  return (
    <Routes>
      {sessionStorage.getItem("email") ? (
        <Route path="/" element={<HomePage />}>
          <Route path="" element={<MainPage />} />
          <Route path="/user/update" element={<UpdateUser />} />
        </Route>
      ) : (
        <Route path="/" element={<StartPage />} />
      )}

      {/* USER */}
      <Route path="/join" element={<SignUp />} />

      {/* LINK */}
      <Route path="/link/update" element={<UpdateLink />} />
    </Routes>
  );
};

export default RouterPage;
