import PseudoForm from "../components/PseudoForm";
import Rules from "../components/Rules";

export default function Home() {
  return (
    <main className="my-8 flex flex-col items-center gap-4 lg:flex-row justify-evenly">
      <section>
        <PseudoForm />
      </section>
      <section>
        <Rules />
      </section>
    </main>
  );
}
