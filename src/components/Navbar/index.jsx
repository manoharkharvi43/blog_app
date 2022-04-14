import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import secureStorage from "../../secureStorage";
import { useNavigate } from "react-router";
import { connect, useDispatch } from "react-redux";
import { loginAction, logoutAction } from "../../redux/actions/loginAction";

const Navbar = ({ isAdmin }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  return (
    <nav className="topbar topbar-inverse topbar-expand-md topbar-sticky">
      <div className="container">
        <div className="topbar-left">
          <button className="topbar-toggler">☰</button>
          <Link className="topbar-brand" to="/">
            {/* <img
              className="logo-default"
              src={`${process.env.PUBLIC_URL}/assets/img/logo.png`}
              alt="logo"
            />
            <img
              className="logo-inverse"
              src={`${process.env.PUBLIC_URL}/assets/img/logo-light.png`}
              alt="logo"
            /> */}
          </Link>
        </div>
        <div className="topbar-right">
          <ul className="topbar-nav nav">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link classname="nav-link" to="/article/create">
                  Write New Article
                </Link>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <a className="nav-link">
                  Hey Gopal!
                  <i className="fa fa-caret-down" />
                </a>
                <div className="nav-submenu">
                  <Link classname="nav-link" to="/allarticles">
                    My articles
                  </Link>
                  <a
                    style={{
                      color: "dodgerblue",
                      cursor: "pointer"
                    }}
                    className="nav-link"
                    onClick={() => {
                      secureStorage.clear();
                      navigate("/login");
                      dispatch(logoutAction());
                    }}
                  >
                    Logout
                  </a>
                </div>
              </li>
            )}
            {!isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            {/* {isAdmin && (
              <>
                {" "}
                <li className="nav-item">
                  <a className="nav-link" href="/signup">
                    Signup
                  </a>
                </li>
              </>
            )} */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    isAdmin: state.loginActionReducer.isLoggedIn
  };
};
export default connect(mapStateToProps)(Navbar);
