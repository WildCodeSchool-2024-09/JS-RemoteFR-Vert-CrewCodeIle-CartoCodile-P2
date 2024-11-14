export default function Footer() {
  return (
    <section className="bg-primary p-4 flex flex-col gap-2">
      <ul className="flex justify-between">
        <li>
          <a href="contact" className="text-secondary">
            CONTACT
          </a>
        </li>
        <li>
          <a href="CGU_conditions" className="text-secondary">
            CGU ET CONDITIONS
          </a>
        </li>
      </ul>
      <span className="text-secondary self-center">
        &copy; Copyright by Cartocodile
      </span>
    </section>
  );
}
