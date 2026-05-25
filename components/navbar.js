class Navbar extends HTMLElement {
    constructor() {
        //Llama al constructor de la clase padre HTMLElement
        super();
        //Encapsulará el contenido del navbar para que no choque con los estilos generales de las vistas
        this.attachShadow({ mode: 'open' });
        //Con el open se podrá acceder desde otro archivo con querySelector('main-navbar')
    }

    //Se ejecuta cuando el navegador detecta la etiqueta <main-navbar> en el html 
    connectedCallback() {
        this.render();
    }

    render() {
        //Pone todo el contenido CSS y HTML dentro del navbar encapsulado
        this.shadowRoot.innerHTML = `
      <style>
        /*Para que no se borre nada del estilo del navbar, como si se reseteara*/
        :host {
          display: block;
          width: 100%;
          font-family: 'Segoe UI', Roboto, sans-serif;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .navbar {
          background-color: #F1BFCD; /* redNormal */
          padding: 0.8rem 2rem;
          display: flex;
          justify-content: center;
          width: 100%;
          border-bottom: 2px solid #fbebf0; /* redLightActive */
        }

        .container {
          width: 100%;
          max-width: 1200px; 
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .nav-logo-img {
          height: 80px;
          width: auto;
          display: block;
          object-fit: contain; 
          transition: transform 0.3s ease;
        }

        .nav-logo-img:hover {
          transform: scale(1.05);
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
          flex-grow: 1;
          justify-content: center;
        }

        .nav-links a {
          color: #4C4354; /* purpleDarkActive */
          font-weight: bold;
          text-decoration: none !important; 
          font-size: 1rem;
          transition: 0.3s;
          opacity: 0.9;
        }

        .nav-links a:hover {
          opacity: 1;
          color: #887695; /* purpleNormalActive */
        }

        .iconoCarrito {
          width: 25px;
          height: auto;
          transform: translateY(2px);
        }

        .carrito-container {
          display: flex;       
          align-items: center; 
          gap: 8px;              
          text-decoration: none;
          background: #FBEBF0; /* redLightActive */
          padding: 6px 15px;
          border-radius: 20px;
          color: #4C4354;
          font-weight: 600;
          transition: 0.3s;
        }

        .carrito-container:hover {
          background: #E5DEEA; /* purpleLightActive */
        }

        .nav-links li {
          display: flex;
          align-items: center;
        }

        .search-box {
          display: flex;
          align-items: center;
        }

        input {
          padding: 0.5rem 1rem;
          border-radius: 20px 0 0 20px; /*Redondear sólo lado izquierdo*/
          border: 1px solid #E5DEEA; /* purpleLightActive */
          background: #FCFCFF; /* blueLight */
          color: #4C4354;
          outline: none;
          width: 150px;
          transition: 0.3s;
        }

        input::placeholder { 
          color: #AA94BA; /* purpleNormal */
        }

        button {
          padding: 0.5rem 1rem;
          border-radius: 0 20px 20px 0; /* Redondeado solo del lado derecho */
          border: 1px solid #E5DEEA;
          background: #AA94BA; /* purpleNormal */
          color: #FFEFE7; /* whiteNormal */
          cursor: pointer;
          transition: all 0.3s;
        }

        button:hover {
          background: #9985A7; /* purpleNormalHover */
          color: white;
        }

        .user-menu {
          margin-left: 1rem;
          display: flex;
          align-items: center;
        }

        .user-link {
          display: flex;
          align-items: center;
          transition: transform 0.3s ease;
        }

        .user-icon-svg {
          width: 40px;
          height: 40px;
          fill: #AA94BA; /* purpleNormal */
          transition: 0.3s;
        }

        .user-link:hover {
            transform: scale(1.1);
            filter: drop-shadow(0 0 8px #E5DEEA); 
        }
      </style>

      <nav class="navbar">
        <div class="container">
          <a href="/index.html" class="logo">
            <img src="/frontend/imagenes/nicorelogo.png" alt="Logo" class="nav-logo-img">
          </a>
          
          <ul class="nav-links">
            <li><a href="/index.html">Inicio</a></li>
            <li><a href="/frontend/html/catalogo.html">Catálogo</a></li>
            <li><a href="/frontend/html/tipos-flores.html">Tipos de Flores</a></li>
            <li>
                <a href="/frontend/html/carrito.html" class="carrito-container">
                    <img src="/frontend/imagenes/carrito-de-compras.png" class="iconoCarrito" alt="Carrito">
                    <span>Carrito</span>
                </a>
            </li>
            <li><a href="/frontend/html/contacto.html">Contacto</a></li>
          </ul>

          <div style="display: flex; align-items: center;">
            <form class="search-box">
              <input type="text" placeholder="Buscar...">
              <button type="submit">🔍︎​</button>
            </form>

            <div class="user-menu">
              <a href="/frontend/html/user.html" class="user-link">
                <svg class="user-icon-svg" viewBox="0 0 24 24">
                  <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,6c1.93,0,3.5,1.57,3.5,3.5S13.93,13,12,13 s-3.5-1.57-3.5-3.5S10.07,6,12,6z M12,20c-2.03,0-4.43-0.82-6.14-2.88C7.55,15.8,9.68,15,12,15s4.45,0.8,6.14,2.12 C16.43,19.18,14.03,20,12,20z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>
    `;
    }
}
//Nombre de la etiqueta para poner el menú de navegación en cada vista
customElements.define('main-navbar', Navbar);