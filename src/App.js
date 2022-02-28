import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Ghipy from "./Components/Ghipy";
import Header from "./Components/Header";
import Loadmore from "./Components/Loadmore";
import { MyFavorites } from "./Components/pages/MyFavorites";

export default function App() {
  return (
    <div>
      {/* <Router> */}
      {/* <Switch> */}
      <main>
        <Route exact path="/">
          <Ghipy />
        </Route>
        {/* <Route path="/MyFavorites">
          <MyFavorites />
        </Route> */}
        <Route path="/Loadmore">
          <Loadmore />
        </Route>
        {/* </Switch> */}
        {/* </Router> */}
      </main>
    </div>
  );
}
