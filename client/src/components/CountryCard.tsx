export default function CountryCard() {
  return (
    <div className="flex justify-center">
      <section className="bg-primary rounded-lg flex flex-col my-2 w-11/12 p-16">
        <img
          className="self-center rounded-md"
          src="https://picsum.photos/650/400"
          alt="un monument"
        />
        <h2 className="self-center m-8 mb-8 text-secondary">PAYS</h2>
        <span className="text-secondary">CAPITALE:</span>
        <span className="text-secondary">NOMBRE D'HABITANTS:</span>
        <span className="text-secondary">METEO ACTUELLE:</span>
        <span className="text-secondary">MONNAIE:</span>
        <span className="text-secondary">HEURE LOCALE:</span>
        <button
          className="mt-8 bg-accent w-60 self-center rounded-md h-12 text-secondary"
          type="button"
        >
          QUESTION SUIVANTE
        </button>
      </section>
    </div>
  );
}
