import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import CreateArtice from "./components/CreateArticle";
import Login from "./components/Login";
import MyArticles from "./components/MyArticles";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp/index";
import SingleArticle from "./components/SingleArticle";
import Welcome from "./components/Welcome";
import secureStorage from "./secureStorage";
import * as serviceWorker from "./serviceWorker";

const Main = withRouter(({ location }) => {
  const [isAdmin, setIsAdmin] = useState("");
  useEffect(() => {
    const id = secureStorage.getItem("user-id");
    setIsAdmin(id);
    console.log(id, "id");
  }, []);

  useEffect(() => {
    console.log(isAdmin, "isAdmin");
  }, [isAdmin]);

  return (
    <div>
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Navbar
          onClickLogout={() => {
            setIsAdmin("");
            window.location.reload();
          }}
        />
      )}

      {isAdmin ? (
        <>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/home" component={Welcome} />
          <Route path="/article/:slug" component={SingleArticle} />
          <Route path="/articles/create" component={CreateArtice} />
          <Route path="/allarticles" component={MyArticles} />
          <Route path="/signup" component={SignUp} />
        </>
      ) : (
        <>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route
            path="/login"
            render={({ history }) => (
              <Login
                onLogin={() => {
                  history.push("/home");
                }}
              ></Login>
            )}
          />

          <Route exact path="/home" component={Welcome} />
        </>
      )}

      {/* {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Footer />
      )} */}
    </div>
  );
});

ReactDOM.render(
  <ToastProvider>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </ToastProvider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
