import { useEffect, useState } from "react";
import type { GoodCountryQuestion } from "../lib/definitions";
import type { CountryCardType } from "../lib/definitions";

export default function CountryCard({
  currentQuestion,
  setIsOpenCard,
  isOpenCard,
}: {
  setIsOpenCard: (isOpenCard: boolean) => void;
  isOpenCard: boolean;
  currentQuestion: GoodCountryQuestion;
}) {
  const countriesData = import.meta.env.VITE_API_URL_COUNTRIES;
  const [countriesDetails, setCountriesDetails] =
    useState<CountryCardType | null>(null);
  const [isClosed, setIsClosed] = useState(false);

  const handleIsOpenCardIsClosed = () => {
    setIsOpenCard(!isOpenCard);
    setIsClosed(!isClosed);
  };

  useEffect(() => {
    fetch(`${countriesData}`)
      .then((res) => res.json())
      .then((data) =>
        setCountriesDetails(
          data.find((c: CountryCardType) => c.id === currentQuestion.id),
        ),
      );
  }, [currentQuestion]);

  return (
    <div className="flex justify-center">
      {!isClosed && countriesDetails && (
        <section className="bg-indigo-900 rounded-lg flex flex-col my-2 w-11/12 p-4 lg:w-2/5">
          <img
            className="self-center rounded-md lg:w-3/6"
            src={countriesDetails.flag}
            alt="un monument"
          />
          <section
            className="flex flex-col gap-4 lg:gap-1"
            key={currentQuestion.id}
          >
            <h2 className="self-center m-8 mb-8 text-secondary lg:mb-3 lg:text-xl">
              {countriesDetails.countryName}
            </h2>
            <section className="flex flex-col lg:pl-12 lg:gap-2">
              <span className="text-secondary">
                CAPITALE : {countriesDetails.capital}
              </span>
              <span className="text-secondary">
                NOMBRE D'HABITANTS : {countriesDetails.population}
              </span>
              <span className="text-secondary">
                METEO ACTUELLE : {countriesDetails.weather.description},{" "}
                {countriesDetails.weather.temperature}
              </span>
              <span className="text-secondary">
                MONNAIE : {countriesDetails.currency}
              </span>
              <span className="text-secondary">
                DECALAGE HORAIRE : {countriesDetails.timeShift}
              </span>
            </section>
          </section>
          <button
            className="mt-8 bg-accent w-fit p-4 mx-auto self-center rounded-md text-secondary lg:w-fit lg:py-2
             text-secondary lg:text-2xl font-Koulen bg-accent rounded p-2 
             relative overflow-hidden 
             hover:scale-105 hover:shadow-lg 
             before:absolute before:top-0 before:left-0 before:w-0 before:h-full
             before:bg-white/20 before:transition-all before:duration-300 before:ease-out 
             hover:before:w-full 
             transition-all duration-300"
            type="button"
            onClick={handleIsOpenCardIsClosed}
          >
            FERMER
          </button>
        </section>
      )}
    </div>
  );
}
