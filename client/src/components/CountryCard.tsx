import { useEffect, useState } from "react";
import type { GoodCountryQuestion } from "../lib/definitions";
import type { CountryCardType } from "../lib/definitions";

export default function CountryCard({
  questionId,
}: { questionId: GoodCountryQuestion }) {
  const countriesData = import.meta.env.VITE_API_COUNTRIES;
  const [countriesDetails, setCountriesDetails] = useState<
    CountryCardType[] | null
  >(null);

  useEffect(() => {
    fetch(countriesData)
      .then((res) => res.json())
      .then((data) => setCountriesDetails(data));
  });

  return (
    <div className="flex justify-center">
      <section className="bg-primary rounded-lg flex flex-col my-2 w-11/12 p-16">
        <img
          className="self-center rounded-md"
          src="https://picsum.photos/650/400"
          alt="un monument"
        />

        {countriesDetails?.map(
          (c) =>
            c.id === questionId.id && (
              <section key={questionId.id}>
                <h2 className="self-center m-8 mb-8 text-secondary">
                  {c.countryName}
                </h2>
                <span className="text-secondary">CAPITALE: {c.capital}</span>
                <span className="text-secondary">
                  NOMBRE D'HABITANTS:{c.population}
                </span>
                <span className="text-secondary">
                  METEO ACTUELLE:{c.weather.description},{" "}
                  {c.weather.temperature}
                </span>
                <span className="text-secondary">MONNAIE:{c.currency}</span>
                <span className="text-secondary">
                  HEURE LOCALE:{c.localTime}
                </span>
              </section>
            ),
        )}

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
