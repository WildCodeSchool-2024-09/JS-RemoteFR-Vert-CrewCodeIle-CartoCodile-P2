export default function LogoTitre() {
  return (
    <section className="bg-primary flex flex-col lg:flex-row lg:gap-4 p-4 items-center">
      <button type="button">
        <a href="/">
          <img
            className="w-32 h-32 mb-4 rounded-md"
            src="/images/logo_Cartocodile.webp"
            alt="un crocodile aventurier"
          />
        </a>
      </button>
      <h1 className="font-Koulen text-4xl text-secondary">CARTOCODILE</h1>
    </section>
  );
}
