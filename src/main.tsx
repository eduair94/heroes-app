import ReactDOM from "react-dom/client";
import "./styles.css";
import { HeroesApp } from "./HeroesApp";
import { BrowserRouter } from "react-router-dom";
import { baseUrl } from "./helpers";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={baseUrl}>
    <HeroesApp />
  </BrowserRouter>,
);
