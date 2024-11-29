import LogoTitre from "./LogoTitre";
import MenuBurger from "./MenuBurger";

export default function Header() {
  return (
    <section className="bg-primary flex justify-end lg:justify-between">
      <LogoTitre />
      <MenuBurger />
    </section>
  );
}
