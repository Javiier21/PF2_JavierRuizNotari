// Función para obtener cotizaciones de la API de CoinGecko según la categoría
async function obtenerCotizacionesCategoria(categoria) {
    try {
      let monedas;
      
      // Determina las monedas según la categoría
      switch (categoria) {
        case 'main':
          monedas = ["bitcoin", "ethereum", "litecoin"];
          break;
        case 'ai':
          monedas = ["singularitynet", "matrix-ai-network", "fetch-ai"];
          break;
        case 'nft':
          monedas = ["decentraland", "enjincoin", "flow"];
          break;
        default:
          monedas = [];
      }
  
      // Realiza la llamada a la API de CoinGecko
      const vs_currencies = "usd";
      const include_market_cap = true;
      const include_24hr_vol = true;
      const include_24hr_change = true;
    
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${monedas.join()}&vs_currencies=${vs_currencies}&include_market_cap=${include_market_cap}&include_24hr_vol=${include_24hr_vol}&include_24hr_change=${include_24hr_change}`;
    
      const response = await fetch(url);
      const data = await response.json();
  
      // Transforma los datos según tu estructura
      return Object.entries(data).map(([nombre, info]) => ({
        nombre,
        simbolo: nombre.toUpperCase(), // Ajusta según la respuesta real de la API
        precio: `$${info.usd.toFixed(2)}`,
      }));
    } catch (error) {
      throw new Error(`Error al obtener cotizaciones de ${categoria}: ${error.message}`);
    }
  }

  
  
  // Llamamos a la función para actualizar las cotizaciones al cargar la página
  window.addEventListener('load', async () => {
    await actualizarCotizacionesCategoria('main', 'mainCryptosList');
    await actualizarCotizacionesCategoria('ai', 'aiCryptosList');
    await actualizarCotizacionesCategoria('nft', 'nftCryptosList');
  });
  
  // Función para obtener y actualizar dinámicamente las cotizaciones de una categoría
  async function actualizarCotizacionesCategoria(categoria, containerId) {
    try {
      const cotizaciones = await obtenerCotizacionesCategoria(categoria); // Necesitas implementar esta función
      const container = document.getElementById(containerId);
  
      // Limpiamos el contenido actual
      container.innerHTML = '';
  
      // Generamos dinámicamente las cotizaciones
      cotizaciones.forEach((cotizacion) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `${cotizacion.nombre.charAt(0).toUpperCase() + cotizacion.nombre.slice(1)} (${cotizacion.simbolo}): ${cotizacion.precio}`;
        
        container.appendChild(listItem);
      });
    } catch (error) {
      console.error(`Error al actualizar cotizaciones de ${categoria}:`, error);
    }
  }

  // En funciones.js
function obtenerImagenCripto(nombre) {
    // Puedes agregar más casos según las criptomonedas que necesites
    switch (nombre) {
      case "bitcoin":
        return "../img/btc.png";
      case "ethereum":
        return "../img/eth.png";
      case "litecoin":
        return "../img/ltc.png";
      // Agrega más casos según sea necesario
      default:
        return ""; // Puedes establecer una imagen predeterminada o una URL genérica aquí
    }
  }
  
  // Llamamos a la función para actualizar las cotizaciones al cargar la página
  window.addEventListener('load', async () => {
    await actualizarCotizacionesCategoria('main', 'mainCryptosList');
    await actualizarCotizacionesCategoria('ai', 'aiCryptosList');
    await actualizarCotizacionesCategoria('nft', 'nftCryptosList');
  });

  // Nueva función para generar cotizaciones destacadas dinámicamente
async function generarCotizacionesDestacadas() {
    const cotizacionesDestacadasContainer = document.getElementById(
      "cotizacionesDestacadasContainer"
    );
  
    try {
      // Obtener datos de la API de CoinGecko
      const cotizacionesAPI = await obtenerCotizacionesDestacadas();
  
      // Filtrar las cotizaciones para incluir solo Bitcoin, Ethereum y Litecoin
      const cotizacionesFiltradas = cotizacionesAPI.filter((cotizacion) => {
        const criptoNombre = cotizacion.nombre.toLowerCase();
        return (
          criptoNombre === "bitcoin" ||
          criptoNombre === "ethereum" ||
          criptoNombre === "litecoin"
        );
      });
  
      // Limpiamos el contenedor antes de agregar dinámicamente
      cotizacionesDestacadasContainer.innerHTML = "";
  
      cotizacionesFiltradas.forEach((cotizacion) => {
        const col = document.createElement("div");
        col.className = "col-md-4";
  
        const card = document.createElement("div");
        card.className = "card animate__animated animate__fadeIn";
  
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
  
        const nombre = document.createElement("h2");
        nombre.textContent = cotizacion.nombre.charAt(0).toUpperCase() + cotizacion.nombre.slice(1);
  
        const precio = document.createElement("p");
        precio.textContent = `Precio: ${cotizacion.precio}`;
  
        const cambio = document.createElement("p");
        cambio.textContent = `Cambio (%): ${cotizacion.cambio}`;
  
        const imgCrypto = document.createElement("img");
        imgCrypto.className = "img-crypto img-fluid";
        imgCrypto.src = obtenerImagenCripto(cotizacion.nombre.toLowerCase()); // Función para obtener la imagen según el nombre
        imgCrypto.alt = cotizacion.nombre;
  
        cardBody.appendChild(nombre);
        cardBody.appendChild(precio);
        cardBody.appendChild(cambio);
        cardBody.appendChild(imgCrypto);
        card.appendChild(cardBody);
        col.appendChild(card);
  
        cotizacionesDestacadasContainer.appendChild(col);
      });
    } catch (error) {
      console.error("Error al generar cotizaciones destacadas:", error);
    }
  }
  
  // Llama a la función para generar las cotizaciones destacadas al cargar la página
  generarCotizacionesDestacadas();