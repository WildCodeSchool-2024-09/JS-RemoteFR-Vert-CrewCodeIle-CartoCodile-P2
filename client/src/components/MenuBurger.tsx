import { useState } from "react";
import { Link } from "react-router-dom";

export default function MenuBurger() {
  const [openBurger, setOpenBurger] = useState("invisible");

  const handleClick = () => {
    openBurger === "invisible"
      ? setOpenBurger("visible")
      : setOpenBurger("invisible");
  };

  return (
    <>
      <nav className="p-4">
        <button className="menuBurger" type="button" onClick={handleClick}>
          <span className="burgerLine lg:invisible" />
          <span className="burgerLine lg:invisible" />
          <span className="burgerLine lg:invisible" />
        </button>
        <div className={openBurger}>
          <ul className="lg:flex lg:flex-row lg:gap-8">
            <li>
              <Link
                to="/"
                className="text-secondary text-lg font-Koulen lg:visible"
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/About"
                className="text-secondary text-lg font-Koulen lg:visible"
              >
                A propos
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <style>
        {`.burgerLine {
          display:block;
          width:3em;
          height:0.3em;
          background-color:white;
          margin-bottom:0.5em;
          }

          .menuBurger{
           margin-top:0.5em;
      }`}
      </style>
    </>
  );
}
