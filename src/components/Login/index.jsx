import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useToasts } from "react-toast-notifications";
import { loginAction } from "../../redux/actions/loginAction";
import secureStorage from "../../secureStorage";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickLogin = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    fetch("https://gopal-blog-backend.herokuapp.com/api/login", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          addToast(response.message, { appearance: "success" });
          dispatch(loginAction());
          secureStorage.setItem("user-id", username);
          navigate("/home");
        } else {
          addToast(response.message, { appearance: "error" });
        }
      })
      .catch(error => {
        console.log(error);
        addToast(error.message, { appearance: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (username !== "" && password !== "") {
      setDisabled(false);
    } else setDisabled(true);
  }, [username, password]);
  return (
    <div
      className="mh-fullscreen bg-img center-vh p-20"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/bg-girl.jpg)`
      }}
    >
      <div
        className="card card-shadowed p-50 w-400 mb-0"
        style={{ maxWidth: "100%" }}
      >
        <h5 className="text-uppercase text-center">Admin Login</h5>
        <br />
        <br />
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={val => {
                setUsername(val.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={val => {
                setPassword(val.target.value);
              }}
            />
          </div>
          <div className="form-group flexbox py-10">
            <label className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                defaultChecked
              />
              <span className="custom-control-indicator" />
              <span className="custom-control-description">Remember me</span>
            </label>
            {/* <a className="text-muted hover-primary fs-13" href="#">
              Forgot password?
            </a> */}
          </div>
          <div className="form-group">
            <button
              className="btn btn-bold btn-block btn-primary"
              type="submit"
              disabled={disabled || loading ? true : false}
              onClick={onClickLogin}
            >
              {loading ? "Loading...." : "Login"}
            </button>
          </div>
        </form>
        <hr className="w-30" />
        {/* <p className="text-center text-muted fs-13 mt-20">Don't have an account? <Link to="/signup">Sign up</Link></p> */}
      </div>
    </div>
  );
};

export default Login;
