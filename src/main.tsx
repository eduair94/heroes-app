import ReactDOM from "react-dom/client";
import "./styles.css";
import { HeroesApp } from "./HeroesApp";
import { BrowserRouter } from "react-router-dom";
const baseUrl = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={baseUrl}>
    <HeroesApp />
  </BrowserRouter>,
);
