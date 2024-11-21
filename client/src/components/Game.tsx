import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Country, GoodCountryQuestion } from "../lib/definitions";

/**
 * Le jeu est basé sur 5 questions
 */
const number_of_questions = 5;

export default function Game() {
  const [goodCountries, setGoodCountries] = useState<GoodCountryQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isOpenHint, setIsOpenHint] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    const baseUrl = import.meta.env.VITE_API_URL;

    Promise.all([
      fetch(`${baseUrl}/api/countries`).then((res) => res.json()),
      fetch(`${baseUrl}/api/badcountries`).then((res) => res.json()),
    ])
      .then(([countriesData, badCountriesData]) => {
        const generatedQuestions = generateAllQuestions(
          countriesData,
          badCountriesData,
        );
        setGoodCountries(generatedQuestions);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const generateAllQuestions = (
    countries: Country[],
    badCountries: Country[],
  ) => {
    /**
     * C'est la fonction pour recréer un tableau dans lequel je viens piocher mes questions pour le jeu afin d'éviter d'avoir deux fois la même question
     */
    const goodCountries: GoodCountryQuestion[] = [];
    for (let i = 0; i < number_of_questions; i++) {
      const randomCountry =
        countries[Math.floor(Math.random() * countries.length)];
      const questionType = getQuestionType(randomCountry);
      const correctAnswer = randomCountry.countryName;
      const badAnswers = getRandomBadCountries(badCountries);
      /**
       * C'est la fonction qui mélange les réponses du QCM pour ne pas que la bonne réponse soit toujours au même endroit
       */
      const allAnswers = shuffleArray([correctAnswer, ...badAnswers]);

      goodCountries.push({
        id: randomCountry.id,
        country: randomCountry,
        type: questionType,
        answers: allAnswers,
        hint: randomCountry.hint,
      });
    }
    return goodCountries;
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
    if (currentQuestionIndex < goodCountries.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setIsOpenHint(false);
    } else {
      return navigate("/");
    }
  };

  const getButtonClass = (answer: string) => {
    if (!selectedAnswer) return "bg-primary text-secondary";
    if (answer === currentQuestion.country.countryName) return "bg-green-500";
    return "bg-red-500";
  };

  const handleHintClick = () => {
    setIsOpenHint((prev) => !prev);
  };

  if (goodCountries.length === 0) {
    return <div>Chargement des valises...</div>;
  }

  const currentQuestion = goodCountries[currentQuestionIndex];

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
            src={
              currentQuestion.type.image ||
              "/images/business-concept-glass-world-laptop.jpg"
            }
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
            src="/images/indice (1).png"
            alt="Indice"
          />
          {isOpenHint && <p className="mt-2">Indice: {currentQuestion.hint}</p>}
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
            {currentQuestionIndex === goodCountries.length - 1
              ? "Retour à l'accueil"
              : "Question suivante"}
          </button>
        </div>
      </section>
    </div>
  );
}
