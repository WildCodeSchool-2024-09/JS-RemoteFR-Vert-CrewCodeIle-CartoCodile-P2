import { useState } from "react";
import { Link } from "react-router-dom";

export default function PseudoForm() {
  const [pseudo, setPseudo] = useState<string>("");

  return (
    <article className="p-4 bg-secondary rounded-md flex flex-col items-center gap-6 w-80 lg:w-80">
      <h2 className="font-Koulen text-xl text-primary font-semibold">
        PRET A JOUER ?
      </h2>
      <p className="font-NotoSans text-primary">
        Entre ton pseudo et c'est parti !
      </p>
      <form className="flex flex-col items-center" action="">
        <label htmlFor="pseudo" className="font-Koulen text-l text-primary">
          Quel est ton pseudo ?
        </label>
        <input
          name="pseudo"
          className="mb-4 pb-2 px-2 border-slate-400 border font-NotoSans "
          type="text"
          placeholder="Tape ton nom"
          value={pseudo}
          onChange={(event) => setPseudo(event.target.value)}
        />
      </form>
      {pseudo.length >= 2 ? (
        <Link to="/Gamepage">
          <button
            type="button"
            className="text-secondary font-Koulen bg-gradient-to-r from-accent via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-xl px-8 py-2.5 text-center me-2 mb-2"
          >
            JOUER
          </button>
        </Link>
      ) : (
        <button
          type="button"
          className="text-secondary font-Koulen bg-gradient-to-r from-slate-500 via-slate-500 to-slate-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 shadow-lg shadow-slate-500/50 dark:shadow-lg dark:shadow-slate-800/80 font-medium rounded-lg text-xl px-8 py-2.5 text-center me-2 mb-2"
        >
          JOUER
        </button>
      )}
    </article>
  );
}
