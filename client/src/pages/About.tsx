import data from "../assets/data/clientdata.json";
import ClientCard from "../components/ClientCard";
import type { ClientType } from "../lib/definitions";

export default function About() {
  const ClientList: ClientType[] = data;

  return (
    <main>
      <h2 className="m-auto mt-4 w-fit font font-Koulen text-3xl text-primary">
        NOTRE EQUIPE
      </h2>
      <section className="flex flex-col lg:flex-row items-center justify-center gap-2 my-4 ">
        {ClientList?.map((c: ClientType) => (
          <ClientCard
            key={c.id}
            profilepic={c.profilepic}
            clientName={c.clientName}
            clientJob={c.clientJob}
          />
        ))}
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
