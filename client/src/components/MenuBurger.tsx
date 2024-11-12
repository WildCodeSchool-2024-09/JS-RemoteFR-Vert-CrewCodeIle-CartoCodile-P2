import { Link } from "react-router-dom";

export default function MenuBurger() {
  return (
    <nav className="p-4">
      <ul>
        <li className="show hover:animate-spin">
          <Link to="/" className="text-secondary">
            Accueil
          </Link>
        </li>
        <li className="show hover:animate-spin">
          <Link to="/About" className="text-secondary">
            A propos
          </Link>
        </li>
      </ul>
    </nav>
  );
}
