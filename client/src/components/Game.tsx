import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { usePseudo } from "../context/PseudoData";
import type { Country, GoodCountryQuestion } from "../lib/definitions";
import CountryCard from "./CountryCard";
import "react-toastify/dist/ReactToastify.css";

/**
 * Le jeu est basé sur 5 questions
 */
const number_of_questions = 5;

export default function Game() {
  const [goodCountries, setGoodCountries] = useState<GoodCountryQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isOpenHint, setIsOpenHint] = useState(false);
  const [isOpenCard, setIsOpenCard] = useState(false);
  const userPseudo = usePseudo();

  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    const goodCountries = import.meta.env.VITE_API_URL_COUNTRIES;
    const badCountries = import.meta.env.VITE_API_URL_BAD_COUNTRIES;

    Promise.all([
      fetch(`${goodCountries}`).then((res) => res.json()),
      fetch(`${badCountries}`).then((res) => res.json()),
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
    const availableCountries = [...countries];

    for (let i = 0; i < number_of_questions; i++) {
      const randomIndex = Math.floor(Math.random() * availableCountries.length);
      const randomCountry = availableCountries.splice(randomIndex, 1)[0];

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
    setIsOpenCard(true);
    if (currentQuestionIndex === 4) {
      toast.success(
        `Bravo ${userPseudo[0].userPseudo} c'est la fin du voyage !`,
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        },
      );
    }
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
    if (!selectedAnswer)
      return "bg-indigo-900 text-secondary hover:bg-indigo-700";
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
      <h3 className="font-Koulen text-4xl text-primary mt-4">
        {currentQuestionIndex + 1} / 5
      </h3>
      <ToastContainer />
      <h2 className="invisible lg:text-3xl">
        Type de question: {currentQuestion.type.label}
      </h2>
      <section className="flex justify-center lg:mb-7 lg:gap-5 font-Koulen text-xl lg:text-6xl">
        {currentQuestion.type.label === "capitale" ? (
          <p>{currentQuestion.country.capital}</p>
        ) : (
          <img
            className="w-80 lg:w-96 lg:h-auto "
            src={
              currentQuestion.type.image ||
              "/images/business-concept-glass-world-laptop.jpg"
            }
            alt={currentQuestion.type.label}
          />
        )}
      </section>
      <section className="w-80 lg:w-auto flex flex-col lg:gap-5 items-center">
        <section className="flex flex-col p-2 items-center bg-secondary h-12 rounded m-2">
          <h2 className="font-Koulen w-80 text-xl lg:mx-8 lg:text-2xl lg:w-auto text-center">
            Dans quel pays nous situons nous ?
          </h2>
        </section>
        <div className="flex flex-col lg:gap-5 items-center m-3">
          <button
            type="button"
            className="visible hover:scale-110 transition-transform duration-20"
            onClick={handleHintClick}
          >
            <img
              className="pt-2 self-center w-6 m-auto"
              src="/images/indice (1).png"
              alt="Indice"
            />
            {isOpenHint && (
              <p className="mt-2 font-NotoSans">
                Indice: {currentQuestion.hint}
              </p>
            )}
          </button>
        </div>
        <div className="flex flex-col w-80 lg:gap-5 lg:w-2/3 lg:flex-row lg:flex-wrap lg:justify-center items-center gap-2">
          {currentQuestion.answers.map((answer) => (
            <button
              className={`rounded-lg lg:text-2xl font-NotoSans text-xl h-10 uppercase ${getButtonClass(answer)} w-80 lg:w-96`}
              type="button"
              key={answer}
              disabled={!!selectedAnswer}
              onClick={() => handleAnswerClick(answer)}
            >
              {answer}
            </button>
          ))}
          {isOpenCard && (
            <section className="backdrop-blur-md inset-0 fixed lg:mx-auto lg:my-auto">
              <div className="my-16">
                <CountryCard
                  currentQuestion={currentQuestion}
                  setIsOpenCard={setIsOpenCard}
                  isOpenCard={isOpenCard}
                />
              </div>
            </section>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="text-secondary lg:text-2xl font-Koulen bg-accent rounded p-2 
            overflow-hidden 
             hover:scale-105 hover:shadow-lg 
             before:absolute before:top-0 before:left-0 before:w-0 before:h-full
             before:bg-white/20 before:transition-all before:duration-300 before:ease-out 
             hover:before:w-full 
             transition-all duration-300"
            type="button"
            onClick={handleNextQuestionClick}
          >
            {currentQuestionIndex === goodCountries.length - 1
              ? "Retour a l'accueil"
              : "Question suivante"}
          </button>
        </div>
      </section>
    </div>
  );
}
