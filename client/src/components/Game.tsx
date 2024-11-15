import { useEffect, useState } from "react";
import type { Country, Question } from "./lib/definitions";

export default function Game() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [hint, setHint] = useState<string>("");

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
      { image: null, label: "capital" },
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

  return (
    <div>
      <h2>Type de question: {question.type.label}</h2>
      <section>
        {question.type.label === "capital" ? (
          <p>{question.country.capital}</p>
        ) : (
          <img src={question.type.image || ""} alt={question.type.label} />
        )}
      </section>
      <section>
        <h2>Indice: {hint}</h2>
        <div>
          {answers.map((answer) => (
            <button type="button" key={answer}>
              {answer}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
