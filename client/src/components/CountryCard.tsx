import { useEffect, useState } from "react";
import type { GoodCountryQuestion } from "../lib/definitions";
import type { CountryCardType } from "../lib/definitions";

export default function CountryCard({
  currentQuestion,
}: { currentQuestion: GoodCountryQuestion }) {
  const countriesData = import.meta.env.VITE_API_URL;
  const [countriesDetails, setCountriesDetails] =
    useState<CountryCardType | null>(null);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    fetch(`${countriesData}/api/countries`)
      .then((res) => res.json())
      .then((data) =>
        setCountriesDetails(
          data.find((c: CountryCardType) => c.id === currentQuestion.id),
        ),
      );
  }, [currentQuestion.id]);

  return (
    <div className="flex justify-center">
      {!isClosed && countriesDetails && (
        <section className="bg-primary rounded-lg flex flex-col my-2 w-11/12 p-16">
          <img
            className="self-center rounded-md"
            src={countriesDetails.flag}
            alt="un monument"
          />
          <section key={currentQuestion.id}>
            <h2 className="self-center m-8 mb-8 text-secondary">
              {countriesDetails.countryName}
            </h2>
            <span className="text-secondary">
              CAPITALE: {countriesDetails.capital}
            </span>
            <span className="text-secondary">
              NOMBRE D'HABITANTS:{countriesDetails.population}
            </span>
            <span className="text-secondary">
              METEO ACTUELLE:{countriesDetails.weather.description},{" "}
              {countriesDetails.weather.temperature}
            </span>
            <span className="text-secondary">
              MONNAIE:{countriesDetails.currency}
            </span>
            <span className="text-secondary">
              HEURE LOCALE:{countriesDetails.localTime}
            </span>
          </section>
          <button
            className="mt-8 bg-accent w-60 self-center rounded-md h-12 text-secondary"
            type="button"
            onClick={() => setIsClosed(!isClosed)}
          >
            FERMER
          </button>
        </section>
      )}
    </div>
  );
}
