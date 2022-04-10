import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import secureStorage from "../../secureStorage";

const Navbar = ({ onClickLogout }) => {
  const [isAdmin, setIsAdmin] = useState("");
  useEffect(() => {
    const id = secureStorage.getItem("user-id");
    setIsAdmin(id);
  }, []);
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
                <Link classname="nav-link" to="/articles/create">
                  Write New Article
                </Link>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <a className="nav-link">
                  Hey Goapal!
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
                      onClickLogout();
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
            {isAdmin && (
              <>
                {" "}
                <li className="nav-item">
                  <a className="nav-link" href="/signup">
                    Signup
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
