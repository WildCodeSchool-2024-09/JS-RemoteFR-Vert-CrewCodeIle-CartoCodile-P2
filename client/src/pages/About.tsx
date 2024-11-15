import ClientCard from "../components/ClientCard";

export default function About() {
  return (
    <main>
      <h2 className="m-auto mt-4 w-fit font font-Koulen text-3xl text-primary">
        NOTRE EQUIPE
      </h2>
      <section className="flex flex-col lg:flex-row items-center justify-center gap-2 my-4 ">
        <ClientCard
          profilepic="https://randomuser.me/api/portraits/men/26.jpg"
          clientName="Patrick Chombier"
          clientJob="Professeur de Géographie"
        />
        <ClientCard
          profilepic="https://randomuser.me/api/portraits/men/31.jpg"
          clientName="Francis Laglanne"
          clientJob="Géographe"
        />
        <ClientCard
          profilepic="https://randomuser.me/api/portraits/women/52.jpg"
          clientName="Marjorie Poulain"
          clientJob="Urbaniste"
        />
        <ClientCard
          profilepic="https://randomuser.me/api/portraits/women/75.jpg"
          clientName="Sandrine Jabon"
          clientJob="Climatologue"
        />
      </section>
      <section>
        <h2 className="m-auto my-4 w-fit font font-Koulen text-3xl text-primary">
          NOTRE PROJET
        </h2>
        <p className="m-auto mb-5 w-64 lg:w-80 text-lg font-NotoSans">
          Cartocodile est une jeune entreprise qui a soif de vous faire
          découvrir une application ludique. A travers des questions variées,
          parcourez la planète pour en savoir plus sur les pays du monde entier
          !
        </p>
      </section>
    </main>
  );
}
