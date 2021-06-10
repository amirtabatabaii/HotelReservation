import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/index";

function App() {
  return (
    <Suspense fallback={null}>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          {/* Home */}
          <Route exact path={process.env.PUBLIC_URL + "/"} component={Home} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
