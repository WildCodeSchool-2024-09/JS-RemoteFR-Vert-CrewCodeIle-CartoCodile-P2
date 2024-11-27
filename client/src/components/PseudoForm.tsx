import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePseudo } from "../context/PseudoData";
import type { userData } from "../lib/definitions";

export default function PseudoForm() {
  const [pseudo, setPseudo] = useState<string>("");
  const navigate = useNavigate();
  const pseudoArray = usePseudo();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userData>();

  const onSubmit: SubmitHandler<userData> = (userPseudo) => {
    pseudoArray.pop();
    pseudoArray.push(userPseudo);

    return navigate("/Gamepage");
  };

  return (
    <article className="p-4 bg-secondary rounded-md flex flex-col items-center w-80 gap-6 lg:gap-9 lg:w-96 lg:h-80">
      <h2 className="font-Koulen text-xl lg:text-2xl text-primary font-semibold">
        PRET A JOUER ?
      </h2>
      <p className="font-NotoSans text-sm lg:text-xl text-primary">
        Entre ton pseudo et c'est parti !
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
        action=""
      >
        <label
          htmlFor="userPseudo"
          className="font-Koulen text-l lg:text-xl text-primary"
        >
          Quel est ton pseudo ?
        </label>
        <input
          {...register("userPseudo", {
            required: "Le champ est requis",
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: "Pas de caractères spéciaux",
            },
            minLength: {
              value: 2,
              message: "Le champ doit contenir 2 lettres minimum",
            },
            maxLength: {
              value: 14,
              message: "Le champ doit contenir 14 lettres maximum",
            },
          })}
          className="mb-4 pb-2 px-2 border-slate-400 border font-NotoSans"
          type="text"
          placeholder="Tape ton nom"
          value={pseudo}
          onChange={(event) => setPseudo(event.target.value)}
        />
        {errors?.userPseudo && (
          <span className="text-red-700">{errors.userPseudo?.message}</span>
        )}
        <button
          type="submit"
          className="text-secondary font-Koulen bg-gradient-to-r from-accent via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-xl px-8 py-2.5 text-center me-2 mb-2"
        >
          Jouer
        </button>
      </form>
    </article>
  );
}
