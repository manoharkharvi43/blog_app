import { createBrowserHistory } from "history";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import RouteIndex from "./routes/route";

function App() {
  const history = createBrowserHistory();
  return (
    <>
      <Provider store={store}>
        <BrowserRouter history={history}>
          <RouteIndex />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
