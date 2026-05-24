class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                width: 100%;
                font-family: 'Segoe UI', Roboto, sans-serif;
            }

            .footer {
                background: #AA94BA; /* purpleNormal */
                color: #FCFCFF; /* blueLight */
                padding: 3rem 1rem 1rem 1rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                border-top: 4px solid #F1BFCD; /* redNormal como borde decorativo */
            }

            .footer-content {
                display: flex;
                justify-content: center;
                width: 100%;
                max-width: 1200px;
                margin-bottom: 2rem;
                flex-wrap: wrap;
                gap: 30px;
            }

            .footer-section {
                flex: 1;
                min-width: 200px;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }

            .footer-logo {
                height: 80px; 
                margin-bottom: 10px;
            }

            .brand-col .lema {
                font-size: 1.1rem;
                font-style: italic;
                font-weight: bold;
                color: #FFEFE7; /* whiteNormal */
                margin: 0;
            }

            .contact-col h4, .social-col h4 {
                margin: 0 0 15px 0;
                color: #DEE2FF; /* blueNormal */
                font-size: 1.1rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .contact-item {
                font-size: 0.9rem;
                margin-bottom: 8px;
                color: #F2EFF5; /* purpleLightHover */
            }

            .social-icons {
                display: flex;
                gap: 15px;
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .icon {
                color: #DEE2FF; /* blueNormal */
                font-size: 28px;
                transition: 0.3s;
                text-decoration: none;
            }

            .icon:hover { color: #F1BFCD; transform: scale(1.1); }

            .footer-bottom {
                border-top: 1px solid rgba(222, 226, 255, 0.3);
                width: 100%;
                max-width: 1200px;
                padding-top: 1.5rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }

            .bottom-menu {
                display: flex;
                gap: 20px;
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .bottom-menu a {
                color: #DEE2FF;
                font-weight: bold;
                text-decoration: none !important; 
                font-size: 1rem;
                transition: 0.3s;
                opacity: 0.8;
            }

            .bottom-menu a:hover{
                opacity: 1;
                color: #F1BFCD;
            }

            .copyright {
                color: #F2EFF5;
                font-size: 0.75rem;
                opacity: 0.7;
            }
        </style>

        <footer class="footer">
            <div class="footer-content">
                <div class="footer-section brand-col">
                    <img src="/frontend/imagenes/nicorelogo.png" alt="Logo" class="footer-logo">
                    <p class="lema">Flores eternas hechas con amor y dedicación</p>
                </div>

                <div class="footer-section contact-col">
                    <h4>Contáctanos</h4>
                    <span class="contact-item">📍 Calle Principal #123</span>
                    <span class="contact-item">📞 +57 300 000 0000</span>
                    <span class="contact-item">✉️ contacto@tufloreria.com</span>
                </div>

                <div class="footer-section social-col">
                    <h4>Síguenos</h4>
                    <ul class="social-icons">
                        <li><a href="#" class="icon"><ion-icon name="logo-instagram"></ion-icon></a></li>
                        <li><a href="#" class="icon"><ion-icon name="logo-facebook"></ion-icon></a></li>
                        <li><a href="https://wa.me/573206104806?text=Hola,%20quiero%20hacer%20un%20pedido" target="_blank" class="icon"><ion-icon name="logo-whatsapp"></ion-icon></a></li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <ul class="bottom-menu">
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="/frontend/html/tipos-flores.html">Tipos de flores</a></li>
                    <li><a href="/frontend/html/carrito.html">Carrito</a></li>
                </ul>
                <p class="copyright">© 2026 Nicore | Diseñado con fines académicos</p>
            </div>
        </footer>
    `;
  }
}
customElements.define('main-footer', Footer);