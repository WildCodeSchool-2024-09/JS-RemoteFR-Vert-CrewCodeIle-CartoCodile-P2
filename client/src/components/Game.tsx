import { useEffect, useState } from "react";
import type { Country, Question } from "./lib/definitions";

export default function Game() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [hint, setHint] = useState<string>("");

  const [openHint, setOpenHint] = useState("invisible");

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3310/api/countries").then((res) => {
        return res.json();
      }),
      fetch("http://localhost:3310/api/badcountries").then((res) => {
        return res.json();
      }),
    ])
      .then(([countriesData, badCountriesData]) => {
        generateQuestion(countriesData, badCountriesData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Mélanger les réponses
  const shuffleArray = (array: string[]): string[] => {
    return array.sort(() => 0.5 - Math.random());
  };

  const generateQuestion = (countries: Country[], badcountries: Country[]) => {
    const randomCountry =
      countries[Math.floor(Math.random() * countries.length)];
    const questionType = getQuestionType(randomCountry);
    const countryHint = randomCountry.hint;
    const correctAnswer = randomCountry.countryName;
    const badAnswers = getRandomBadCountries(badcountries);
    const allAnswers = shuffleArray([correctAnswer, ...badAnswers]);

    setQuestion({
      id: randomCountry.id,
      country: randomCountry,
      type: questionType,
    });
    setAnswers(allAnswers);
    setHint(countryHint);
  };

  const getQuestionType = (country: Country) => {
    const questionTypes = [
      { image: country.monumentImage, label: "monument" },
      { image: null, label: "capitale" },
    ];
    return questionTypes[Math.floor(Math.random() * questionTypes.length)];
  };

  // Fonction pour avoir 3 mauvaises réponses dans le QCM
  const getRandomBadCountries = (badcountries: Country[]) => {
    const shuffledBadCountries = badcountries.sort(() => 0.5 - Math.random());
    const randomBadCountries = shuffledBadCountries.slice(0, 3);
    return randomBadCountries.map((country) => country.countryName);
  };

  if (!question) {
    return <div>Chargement des valises...</div>;
  }

  const handleClick = () => {
    openHint === "visible" ? setOpenHint("invisible") : setOpenHint("visible");
  };

  return (
    <div className="flex flex-col p-4 items-center">
      <h2 className="invisible">Type de question: {question.type.label}</h2>
      <section className="font-Koulen text-lg">
        {question.type.label === "capitale" ? (
          <p>{question.country.capital}</p>
        ) : (
          <img
            className="resized"
            src={question.type.image || ""}
            alt={question.type.label}
          />
        )}
      </section>
      <section>
        <section className="flex p-2 justify-center items-center bg-secondary h-12 rounded m-2">
          <h1 className="font-Koulen text-lg ">
            Dans quel pays nous situons nous ?
          </h1>
        </section>
        <button type="button" onClick={handleClick} className="visible">
          <p>
            <img
              className="pt-2 self-center w-6 m-auto"
              src="\public\images\indice (1).png"
              alt="Indice"
            />
          </p>
          <p className={openHint}>Indice: {hint}</p>
        </button>
        <div className="flex flex-col gap-2">
          {answers.map((answer) => (
            <button
              className="bg-primary text-secondary rounded-lg h-10 uppercase"
              type="button"
              key={answer}
            >
              {answer}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
