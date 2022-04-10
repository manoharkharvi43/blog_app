import { createBrowserHistory } from "history";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouteIndex from "./routes/route";

function App() {
  const history = createBrowserHistory();
  return (
    <>
      <BrowserRouter history={history}>
        <RouteIndex />
      </BrowserRouter>
    </>
  );
}

export default App;
