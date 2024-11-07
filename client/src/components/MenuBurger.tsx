export default function MenuBurger() {
  return (
    <nav className="p-4">
      <ul>
        <li className="show">
          <a href="home" className="text-secondary">
            Accueil
          </a>
        </li>
        <li className="show">
          <a href="about" className="text-secondary">
            A propos
          </a>
        </li>
      </ul>
    </nav>
  );
}
