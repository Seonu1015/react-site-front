import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./HomePage";
import StartPage from "./StartPage";
import SignUp from "./user/SignUp";

import MainPage from "./main/MainPage";
import UpdateLink from "./link/UpdateLink";
import FilterPage from "./link/FilterPage";
import CatListPage from "./manage/CatListPage";
import LinkListPage from "./manage/LinkListPage";

const RouterPage = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        {sessionStorage.getItem("email") ? (
          <>
            <Route path="" element={<MainPage />} />
            <Route path="/flt/*" element={<FilterPage />} />
            <Route path="/mc" element={<CatListPage />} />
            <Route path="/ml" element={<LinkListPage />} />
          </>
        ) : (
          <Route path="" element={<StartPage />} />
        )}
      </Route>

      {/* USER */}
      <Route path="/join" element={<SignUp />} />

      {/* LINK */}
      <Route path="/link/update" element={<UpdateLink />} />
    </Routes>
  );
};

export default RouterPage;
