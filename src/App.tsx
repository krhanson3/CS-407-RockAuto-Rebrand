import NavBar from "./components/navbar";
import AppRouter from "./router/AppRouter";
import { HashRouter } from "react-router-dom";

export default function App() {
  return (
    <HashRouter>
      <NavBar />
      <AppRouter />
    </HashRouter>
  );
}
