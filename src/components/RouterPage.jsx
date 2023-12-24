import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import StartPage from "./StartPage";

import SignUp from "./user/SignUp";
import MainPage from "./main/MainPage";

import UpdateLink from "./link/UpdateLink";
import UpdateUser from "./user/UpdateUser";
import FilterPage from "./link/FilterPage";

const RouterPage = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        {sessionStorage.getItem("email") ? (
          <>
            <Route path="" element={<MainPage />} />
            <Route path="/flt/*" element={<FilterPage />} />
          </>
        ) : (
          <Route path="" element={<StartPage />} />
        )}
        <Route path="/user/update" element={<UpdateUser />} />
      </Route>

      {/* USER */}
      <Route path="/join" element={<SignUp />} />

      {/* LINK */}
      <Route path="/link/update" element={<UpdateLink />} />
    </Routes>
  );
};

export default RouterPage;
