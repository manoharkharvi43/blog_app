import { createBrowserHistory } from "history";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import RouteIndex from "./routes/route";
import "./index.css";
function App() {
  const history = createBrowserHistory();
  return (
    <>
      <Provider store={store}>
        <BrowserRouter history={history}>
          <div
            style={
              {
                // backgroundColor: "#e6ba95"
              }
            }
            className="element"
          >
            <RouteIndex />
          </div>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
