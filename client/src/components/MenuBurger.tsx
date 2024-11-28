import { useState } from "react";
import { Link } from "react-router-dom";

export default function MenuBurger() {
  const [isOpenMenuBurger, setisOpenMenuBurger] = useState<boolean>(false);

  const handleIsOpenMenuBurger = () => {
    setisOpenMenuBurger(!isOpenMenuBurger);
  };

  return (
    <section className="flex flex-col pr-6">
      <button
        type="button"
        onClick={handleIsOpenMenuBurger}
        className="lg:invisible"
      >
        <section className="flex flex-col gap-2 mt-6 mb-3">
          <span className="bg-white w-12 h-1" />
          <span className="bg-white w-12 h-1" />
          <span className="bg-white w-12 h-1" />
        </section>
      </button>

      {isOpenMenuBurger && (
        <nav>
          <ul className="lg:flex lg:flex-row lg:gap-8">
            <li>
              <Link to="/" className="text-secondary text-lg font-Koulen">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/About" className="text-secondary text-lg font-Koulen">
                A propos
              </Link>
            </li>
          </ul>
          <span className="bg-white w-10 h-2" />
        </nav>
      )}

      <nav className="invisible lg:visible">
        <ul className="lg:flex lg:flex-row lg:gap-8">
          <li>
            <Link
              to="/"
              className="text-secondary text-lg font-Koulen lg:text-2xl"
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              to="/About"
              className="text-secondary text-lg font-Koulen lg:text-2xl"
            >
              A propos
            </Link>
          </li>
        </ul>
        <span className="bg-white w-10 h-2" />
      </nav>
    </section>
  );
}
