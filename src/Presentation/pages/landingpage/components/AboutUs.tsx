import Image24 from "../../../assets/image 24.svg";
import Image7 from "../../../assets/image 7.svg";

export const AboutUsLandingPage = () => {
  return (
    <div className="about-us-landing" id="Nosotros">
      <div className="about-us-landing-content">
        <div className="about-us-title">
          <h1>Nuestra Empresa</h1>
        </div>
        <div className="about-us-body">
          <div className="about-us-image">
            <img src={Image24} alt="" />
            <img src={Image7} alt="" />
          </div>
          <div className="about-us-text">
            <div className="text-title">
              <h3>¿Quienes Somos?</h3>
            </div>
            <div className="text-subtitle">
              <h4>
                Creemos en la capacidad de la <span>creatividad</span> para
                transformar el mundo y en el poder de la{" "}
                <span>colaboración</span> para alcanzar grandes{" "}
                <span>logros</span>
              </h4>
            </div>
            <div className="text">
              <p>
                En Moda y Estilo Italino, nos destacamos como una empresa líder
                en el diseño e innovación de productos que marcan tendencia en
                el dinámico mercado de la confección y la moda. Con una pasión
                inigualable por la excelencia, nos esforzamos por crear insumos
                únicos y vanguardistas que capturan la esencia de la moda
                contemporánea.
              </p>
              <p>
                Nos distinguimos por nuestra constante búsqueda de nuevas ideas
                y enfoques innovadores, impulsados por el deseo de superar las
                expectativas de nuestros clientes. Cada producto que diseñamos
                es meticulosamente creado con la combinación perfecta de estilo,
                calidad y funcionalidad, para brindar soluciones que inspiren y
                potencien la creatividad de los profesionales de la moda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
