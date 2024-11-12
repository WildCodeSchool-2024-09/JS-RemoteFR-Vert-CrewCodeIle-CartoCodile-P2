import CountryCard from "./components/CountryCard";
import "./App.css";
import "./index.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <Header />
      <Home />
      <main>
        <CountryCard />
      </main>
      <Footer />
    </>
  );
}
