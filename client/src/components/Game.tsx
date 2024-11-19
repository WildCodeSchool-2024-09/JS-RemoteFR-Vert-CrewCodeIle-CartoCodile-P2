import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Country, Question } from "../lib/definitions";

export default function Game() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [openHint, setOpenHint] = useState<string>("invisible");
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    Promise.all([
      fetch("http://localhost:3310/api/countries").then((res) => res.json()),
      fetch("http://localhost:3310/api/badcountries").then((res) => res.json()),
    ])
      .then(([countriesData, badCountriesData]) => {
        const generatedQuestions = generateAllQuestions(
          countriesData,
          badCountriesData,
        );
        setQuestions(generatedQuestions);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const generateAllQuestions = (
    countries: Country[],
    badCountries: Country[],
  ) => {
    const questions: Question[] = [];
    for (let i = 0; i < 5; i++) {
      const randomCountry =
        countries[Math.floor(Math.random() * countries.length)];
      const questionType = getQuestionType(randomCountry);
      const correctAnswer = randomCountry.countryName;
      const badAnswers = getRandomBadCountries(badCountries);
      const allAnswers = shuffleArray([correctAnswer, ...badAnswers]);

      questions.push({
        id: randomCountry.id,
        country: randomCountry,
        type: questionType,
        answers: allAnswers,
        hint: randomCountry.hint,
      });
    }
    return questions;
  };

  const getQuestionType = (country: Country) => {
    const questionTypes = [
      { image: country.monumentImage, label: "monument" },
      { image: null, label: "capitale" },
    ];
    return questionTypes[Math.floor(Math.random() * questionTypes.length)];
  };

  const getRandomBadCountries = (badCountries: Country[]) => {
    const shuffledBadCountries = badCountries.sort(() => 0.5 - Math.random());
    const randomBadCountries = shuffledBadCountries.slice(0, 3);
    return randomBadCountries.map((country) => country.countryName);
  };

  const shuffleArray = (array: string[]): string[] => {
    return array.sort(() => 0.5 - Math.random());
  };

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestionClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setOpenHint("invisible");
    } else {
      navigate("/");
    }
  };

  const getButtonClass = (answer: string) => {
    if (!selectedAnswer) return "bg-primary text-secondary";
    if (answer === currentQuestion.country.countryName) return "bg-green-500";
    return "bg-red-500";
  };

  const handleHintClick = () => {
    setOpenHint(openHint === "visible" ? "invisible" : "visible");
  };

  if (questions.length === 0) {
    return <div>Chargement des valises...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col p-4 items-center">
      <h2 className="invisible">
        Type de question: {currentQuestion.type.label}
      </h2>
      <section className="font-Koulen text-lg">
        {currentQuestion.type.label === "capitale" ? (
          <p>{currentQuestion.country.capital}</p>
        ) : (
          <img
            className="resized"
            src={currentQuestion.type.image || ""}
            alt={currentQuestion.type.label}
          />
        )}
      </section>
      <section>
        <section className="flex p-2 justify-center items-center bg-secondary h-12 rounded m-2">
          <h1 className="font-Koulen text-lg ">
            Dans quel pays nous situons nous ?
          </h1>
        </section>
        <button type="button" className="visible" onClick={handleHintClick}>
          <img
            className="pt-2 self-center w-6 m-auto"
            src="\public\images\indice (1).png"
            alt="Indice"
          />
          <p className={openHint}>Indice: {currentQuestion.hint}</p>
        </button>
        <div className="flex flex-col gap-2">
          {currentQuestion.answers.map((answer) => (
            <button
              className={`rounded-lg h-10 uppercase ${getButtonClass(answer)}`}
              type="button"
              key={answer}
              disabled={!!selectedAnswer}
              onClick={() => handleAnswerClick(answer)}
            >
              {answer}
            </button>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="text-secondary font-Koulen bg-accent rounded p-2"
            type="button"
            onClick={handleNextQuestionClick}
          >
            {currentQuestionIndex === questions.length - 1
              ? "Retour à l'accueil"
              : "Question suivante"}
          </button>
        </div>
      </section>
    </div>
  );
}
