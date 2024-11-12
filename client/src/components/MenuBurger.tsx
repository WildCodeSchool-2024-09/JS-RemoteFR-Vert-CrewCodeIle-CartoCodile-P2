import { useState } from "react";

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
          <span className="burgerLine" />
          <span className="burgerLine" />
          <span className="burgerLine" />
        </button>

        <ul className={openBurger}>
          <li>
            <a href="home" className="text-secondary">
              Accueil
            </a>
          </li>
          <li>
            <a href="about" className="text-secondary">
              A propos
            </a>
          </li>
        </ul>
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
