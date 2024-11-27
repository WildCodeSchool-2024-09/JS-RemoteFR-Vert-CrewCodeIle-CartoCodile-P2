import "./App.css";
import "./index.css";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PseudoProvider from "./context/PseudoData";

export default function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <PseudoProvider>
        <Outlet />
      </PseudoProvider>
      <Footer />
    </div>
  );
}
