import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import CreateArticle from "../components/CreateArticle";
import Footer from "../components/Footer";
import Login from "../components/Login";
import MyArticles from "../components/MyArticles";
import Navbar from "../components/Navbar";
import SignUp from "../components/SignUp";
import SingleArticle from "../components/SingleArticle";
import Welcome from "../components/Welcome";
import { Navigate, useLocation } from "react-router";
import { connect, useDispatch } from "react-redux";
import { loginAction } from "../redux/actions/loginAction";
import secureStorage from "../secureStorage";

function RouteIndex({ isLoggedIn }) {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(isLoggedIn, "isLoggedInisLoggedIn");
    const id = secureStorage.getItem("user-id");
    if (id) {
      dispatch(loginAction());
    }
  }, []);
  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Navbar />
      )}
      <Routes>
        {isLoggedIn ? (
          <>
            {" "}
            <Route exact path="/" element={<Navigate to="/home" />} />
            <Route exact path="/home" element={<Welcome />} />
            <Route path="/allarticles" element={<MyArticles />} />
            <Route exact path="/article/:id" element={<SingleArticle />} />
            <Route path="/article/create" element={<CreateArticle />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route exact path="/" element={<Navigate to="/home" />} />
            <Route exact path="/home" element={<Welcome />} />
            <Route exact path="/article/:id" element={<SingleArticle />} />
          </>
        )}
      </Routes>
      {/* {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Footer />
      )} */}
    </>
  );
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.loginActionReducer.isLoggedIn
  };
};

export default connect(mapStateToProps)(RouteIndex);
