const Rules = () => {
  return (
    <section className="bg-secondary hover:animate-spin p-4 rounded-lg my-4 flex flex-col gap-4 w-80">
      <h2 className="text-xl font-semibold mb-2 text-primary font-Koulen">
        LES REGLES ?
      </h2>
      <ul className="list-disc pl-4">
        <li className="text-sm text-primary mb-2 font-NotoSans">
          Le but est de répondre aux questions pour arriver à la fin du voyage !
        </li>
        <li className="text-sm text-primary mb-2 font-NotoSans">
          Vous avez le choix entre 4 réponses possibles par question.
        </li>
        <li className="text-sm text-primary mb-2 font-NotoSans">
          Un indice est disponible en cliquant sur le point d'interrogation sous
          la photo.
        </li>
        <li className="text-sm text-primary mb-2 font-NotoSans">
          Si vous bloquez sur une question, vous pouvez passer à la suivante
          sans y répondre.
        </li>
      </ul>
    </section>
  );
};
export default Rules;
