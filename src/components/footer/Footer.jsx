import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <h1 className="footer__title">Leandro Ezequiel Raymondi Rossa</h1>

        <ul className="footer__list">
          <li>
            <a href="#about" className="footer__link">
              Sobre mí
            </a>
          </li>

          <li>
            <a href="#portfolio" className="footer__link">
              Portfolio
            </a>
          </li>

          {/* <li>
            <a href="#testimonials" className="footer__link">
              Testimonials
            </a>
          </li> */}
        </ul>

        <div className="footer__social">
          {/* <a
            href="https://www.facebook.com/"
            className="footer__social-link"
            target="_blank"
          >
            <i className="bx bxl-facebook"></i>
          </a> */}

          <a
            href="https://www.linkedin.com/in/leandroraymondi/"
            className="footer__social-link"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bx bxl-linkedin"></i>
          </a>

          <a
            href="https://github.com/LeandroRaymondi/"
            className="footer__social-link"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bx bxl-github"></i>
          </a>
        </div>

        <span className="footer__copy">
          &#169; LeandroRaymondi. Todos los derechos reservados
        </span>
      </div>
    </footer>
  );
};

export default Footer;
