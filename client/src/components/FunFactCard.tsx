import { useEffect, useState } from "react";
import type { FunFactType } from "../lib/definitions";

const FunFactCard = () => {
  const funFactsData = import.meta.env.VITE_API_FUNFACT_URL;
  const [funFacts, setFunFacts] = useState<FunFactType[] | null>(null);
  const [FactIndex, setFactIndex] = useState(0);
  const [popUp, setPopUp] = useState(true);

  useEffect(() => {
    fetch(funFactsData)
      .then((res) => res.json())
      .then((facts) => setFunFacts(facts));
  }, []);

  const funFactsArray = funFacts?.map((f) => f.funFact);

  useEffect(() => {
    const intervalFacts = setInterval(() => {
      setFactIndex(FactIndex + 1);
      if (FactIndex === 9) {
        setFactIndex(0);
      }
    }, 5000);
    return () => clearInterval(intervalFacts);
  }, [FactIndex]);

  return (
    <div className="bg-indigo-900 rounded-md">
      {popUp && (
        <section className="w-80 rounded-lg">
          <div className="font-Koulen text-xl text-secondary flex flex-row justify-between">
            <h1 className="mx-4 pt-2">Fun Fact</h1>
            <button
              type="button"
              className="font-NotoSans text-secondary p-2"
              onClick={() => setPopUp(false)}
            >
              X
            </button>
          </div>
          <p className="text-secondary font-NotoSans mx-4 pb-4">
            {funFactsArray ? funFactsArray[FactIndex] : "Pas de Fun Facts"}
          </p>
        </section>
      )}
    </div>
  );
};

export default FunFactCard;
