export default function Footer() {
  return (
    <section className="bg-primary p-4 flex flex-col gap-2">
      <ul className="flex justify-between">
        <li>
          <a
            href="mailto:crewcodile@gmail.com?subject=Sujet%20du%20mail&body=Contenu%20du%20message"
            className="text-secondary text-2xl font-Koulen"
          >
            CONTACT
          </a>
        </li>
        <li>
          <a
            href="https://www.francenum.gouv.fr/guides-et-conseils/developpement-commercial/site-web/rediger-des-conditions-generales-dutilisation"
            className="text-secondary text-2xl font-Koulen"
          >
            CGU ET CONDITIONS
          </a>
        </li>
      </ul>
      <span className="text-secondary font-NotoSans self-center">
        &copy; Copyright by Cartocodile
      </span>
    </section>
  );
}
