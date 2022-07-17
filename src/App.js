

import React, { Suspense,lazy } from "react";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Detail from "./pages/detail/detail";
import { HOME, NEWS_DETAIL } from "./utils/routes";
const Home=lazy(()=>import('./pages/home/home'))
function App() {
  return (
    <Router>
      <Suspense fallback={<div style={{display:"flex"}} />}>
        <Routes>
          <Route exact="true" path={HOME} element={<Home/>}/>
          <Route exact="true" path={NEWS_DETAIL} element={<Detail/>}/>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
