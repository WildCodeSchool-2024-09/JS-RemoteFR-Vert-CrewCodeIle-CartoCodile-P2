import CountryCard from "./components/CountryCard";
import Header from "./components/Header";
import "./index.css";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <CountryCard />
      </main>
      <Footer />
    </>
  );
}
