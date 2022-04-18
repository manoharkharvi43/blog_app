import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import secureStorage from "../../secureStorage";
import { useNavigate } from "react-router";
import { connect, useDispatch } from "react-redux";
import { loginAction, logoutAction } from "../../redux/actions/loginAction";
import LOGO from "../../assets/white_logo1.png";
const Navbar = ({ isAdmin }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const styles = {
    color: "white",
    opacity: 0.8
  };
  return (
    <nav
      className="topbar topbar-inverse topbar-expand-md topbar-sticky"
      style={{
        backgroundColor: "transparent"
      }}
    >
      <div
        className="container"
        style={{
          width: "90%"
        }}
      >
        <div className="topbar-left">
          <button className="topbar-toggler">☰</button>
          {/* <Link className="topbar-brand" to="/"> */}
          {/* <img
            className="logo-default"
            src={LOGO}
            alt="logo"
            style={{
              width: 150,
              height: 150,
              marginTop: 40,
              objectFit: "contain"
            }}
          />{" "} */}
          {/* <img
            className="logo-inverse"
            src={LOGO}
            alt="logo"
            style={{
              width: 150,
              height: 150,
              marginTop: 40,
              objectFit: "contain"
            }}
          /> */}
          {/* </Link> */}
        </div>

        <div className="topbar-right">
          <ul className="topbar-nav nav">
            <li className="nav-item">
              <Link className="nav-link" to="/home" style={styles}>
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
                <a className="nav-link" style={styles}>
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
