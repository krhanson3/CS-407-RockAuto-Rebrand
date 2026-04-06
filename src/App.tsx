import NavBar from "./components/navbar";
import Footer from "./components/footer";
import AppRouter from "./router/AppRouter";
import { HashRouter } from "react-router-dom";

export default function App() {
  return (
    <HashRouter>
      <NavBar />

      <div className="page">
        <AppRouter />
        <Footer />
      </div>
    </HashRouter>
  );
}
