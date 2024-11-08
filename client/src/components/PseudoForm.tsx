export default function PseudoForm() {
  return (
    <article className="bg-secondary rounded-md flex flex-col items-center gap-6 w-64">
      <h2 className="font-Koulen text-xl">PRET A JOUER ?</h2>
      <p className="font-NotoSans">Entre ton pseudo et c'est parti !</p>
      <form className="flex flex-col items-center" action="">
        <label htmlFor="pseudo" className="font-Koulen text-l">
          Quel est ton pseudo ?
        </label>
        <input
          name="pseudo"
          className="mb-4 pb-2 px-2 border-slate-400 border font-NotoSans "
          type="text"
          placeholder="Tape ton nom"
        />
        <button
          type="submit"
          className="m-2 p-4 w-32 bg-accent rounded-md text-secondary font-Koulen text-xl"
        >
          JOUER
        </button>
      </form>
    </article>
  );
}
