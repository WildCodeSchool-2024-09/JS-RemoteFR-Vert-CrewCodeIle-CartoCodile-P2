import Footer from "../components/Footer";
import Header from "../components/Header";
import PseudoForm from "../components/PseudoForm";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<section className="flex flex-col items-center">
					<PseudoForm />
				</section>
			</main>
      <Footer/>
		</>
	);
}
