import Image11 from "../../../assets/1 1.svg";

export const ContactLandingPage = () => {
  return (
    <div className="contact-landing" id="Contacto">
      <div className="contact-landing-content">
        <div className="contact">
          <div className="first-text">Ponte en contacto</div>
          <img src={Image11} alt="" className="contact-image" />
          <div className="social-links">
            <span className="secnd-text">Conecta con nosotros:</span>
            <ul className="social-media">
              <li>
                <a href="">
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="submit-form">
          <h4 className="third-text">Contacto</h4>
          <form className="landing-form">
            <div className="input-box">
              <input type="text" className="input-contact" id="name" />
              <label htmlFor="name">Nombre</label>
            </div>
            <div className="input-box">
              <input type="email" className="input-contact" id="email" />
              <label htmlFor="email">Correo electronico</label>
            </div>
            <div className="input-box">
              <input type="tel" className="input-contact" id="tel" />
              <label htmlFor="tel">Télefono</label>
            </div>
            <div className="input-box">
              <textarea
                name=""
                className="input-contact"
                id="message"
                cols={30}
                rows={10}
              ></textarea>
              <label htmlFor="message">Mensaje</label>
            </div>
            <input type="submit" className="btn-contact" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};
