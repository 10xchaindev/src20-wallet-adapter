import "virtual:uno.css";
import "@unocss/reset/tailwind.css";

import { render } from "preact";
import Router, { Route } from "preact-router";

import "./index.css";
import HomePage from "./app";
import Layout from "./components/Layout";

render(
  <Layout>
    <Router>
      <Route path="/" component={HomePage} />
    </Router>
  </Layout>,
  document.getElementById("app")!
);
