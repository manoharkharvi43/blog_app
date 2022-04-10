import React from "react";
import { Route, Routes, useLocation } from "react-router";
import CreateArticle from "../components/CreateArticle";
import Footer from "../components/Footer";
import Login from "../components/Login";
import MyArticles from "../components/MyArticles";
import Navbar from "../components/Navbar";
import SignUp from "../components/SignUp";
import SingleArticle from "../components/SingleArticle";
import Welcome from "../components/Welcome";

function RouteIndex() {
  const location = useLocation();
  return (
    <>
      <Routes>
        {location.pathname !== "/login" && location.pathname !== "/signup" && (
          <Navbar />
        )}

        <Route exact path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/allarticles" element={<MyArticles />} />
        <Route path="/article/:slug" element={<SingleArticle />} />
        <Route path="/articles/create" element={<CreateArticle />} />
        <Route path="/signup" element={<SignUp />} />
        {location.pathname !== "/login" && location.pathname !== "/signup" && (
          <Footer />
        )}
      </Routes>
    </>
  );
}

export default RouteIndex;
