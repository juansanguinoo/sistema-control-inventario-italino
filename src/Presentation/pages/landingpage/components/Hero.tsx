import Bill from "../../../assets/Bill Sitting using laptop 1.svg";

export const HeroLandingPage = () => {
  return (
    <div className="hero-landing">
      <div className="hero-landing-content">
        <div className="content-left">
          <h3>BIENVENIDO</h3>
          <div className="title-left">
            <h1>
              Conoce <span>Italino,</span> Creamos Insumos De Moda Con Estilo Y{" "}
              <span></span>
              <span>Calidad</span>
            </h1>
          </div>
          <p>
            Empresa dedicada al diseño y fabricación de insumos para la
            confección
          </p>
        </div>
        <div className="content-right">
          <div className="right-images">
            <img src={Bill} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
