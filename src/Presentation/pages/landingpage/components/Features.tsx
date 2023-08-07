import Speaker from "../../../assets/Speaker Angle 1.svg";

export const FeaturesLandingPage = () => {
  return (
    <div className="features-landing">
      <div className="features-landing-content">
        <div className="features-image-container">
          <img src={Speaker} alt="" />
        </div>
        <div className="features-title">
          <h1>Nuestros Servicios</h1>
        </div>
        <div className="features-subtitle">
          <p>
            Moda y Estilo Italino es una empresa destacada que se dedica a
            diseñar e innovar productos revolucionarios en el ámbito de la
            confección y la moda.
          </p>
        </div>
        <div className="features-row">
          <div className="features-column">
            <div className="features-card">
              <div className="icon-wrapper">
                <i className="fa-solid fa-pencil"></i>
              </div>
              <h3>Diseñadores</h3>
              <p>Construimos los mejores diseños personalizados</p>
            </div>
          </div>
          <div className="features-column">
            <div className="features-card">
              <div className="icon-wrapper">
                <i className="fa-solid fa-gears"></i>
              </div>
              <h3>Desarrolladores</h3>
              <p>
                Nos apasiona crear diseños bellos y funcionales para satisfacer
                a nuestros clientes
              </p>
            </div>
          </div>
          <div className="features-column">
            <div className="features-card">
              <div className="icon-wrapper">
                <i className="fa-solid fa-bag-shopping"></i>
              </div>
              <h3>Productos</h3>
              <p>
                Disponemos de una amplia variedad de catálogos que destacan por
                ofrecer productos de la más alta calidad, diseño y moda
              </p>
            </div>
          </div>
          <div className="features-column">
            <div className="features-card">
              <div className="icon-wrapper">
                <i className="fa-solid fa-hammer"></i>
              </div>
              <h3>Servicios</h3>
              <p>
                Ofrecemos una amplia gama de servicios que te permitirán
                personalizar e innovar tu producto de manera excepcional.
              </p>
            </div>
          </div>
          <div className="features-column">
            <div className="features-card">
              <div className="icon-wrapper">
                <i className="fa-solid fa-medal"></i>
              </div>
              <h3>Calidad</h3>
              <p>
                Nuestros productos y servicios se distinguen por ser de la más
                alta calidad, habiendo sido expuestos al mercado con el objetivo
                de brindar garantía y beneficio a nuestros apreciados clientes
              </p>
            </div>
          </div>
          <div className="features-column">
            <div className="features-card">
              <div className="icon-wrapper">
                <i className="fa-solid fa-camera"></i>
              </div>
              <h3>Diseños Personalizados</h3>
              <p>
                Somos expertos en personalizar tu marca con diseños
                espectaculares que destacarán y cautivarán la atención.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
