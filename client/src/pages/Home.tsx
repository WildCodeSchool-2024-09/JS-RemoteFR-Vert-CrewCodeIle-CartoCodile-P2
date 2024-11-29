import FunFactCard from "../components/FunFactCard";
import PseudoForm from "../components/PseudoForm";
import Rules from "../components/Rules";

export default function Home() {
  return (
    <main className="flex flex-col">
      <article className="my-8 flex flex-col items-center gap-4 lg:flex-row justify-evenly">
        <section>
          <PseudoForm />
        </section>
        <section>
          <Rules />
        </section>
      </article>
      <section className="flex flex-row justify-center lg:justify-end mb-8 lg:mr-10">
        <FunFactCard />
      </section>
    </main>
  );
}
