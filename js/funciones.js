async function obtenerCotizacionesDestacadas() {
  const monedas = [
    "bitcoin",
    "ethereum",
    "litecoin",
    "solana",
    "chainlink",
    "sandbox",
    "polkadot",
  ];
  const vs_currencies = "usd";
  const include_market_cap = true;
  const include_24hr_vol = true;
  const include_24hr_change = true;

  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${monedas.join()}&vs_currencies=${vs_currencies}&include_market_cap=${include_market_cap}&include_24hr_vol=${include_24hr_vol}&include_24hr_change=${include_24hr_change}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return Object.entries(data).map(([nombre, info]) => ({
      nombre,
      precio: `$${info.usd.toFixed(2)}`,
      cambio: info.usd_24h_change
        ? `${info.usd_24h_change.toFixed(2)}%`
        : "N/A",
      volumen: info.usd_24h_vol ? `$${info.usd_24h_vol.toFixed(2)}` : "N/A",
      marketCap: info.usd_market_cap
        ? `$${info.usd_market_cap.toFixed(2)}`
        : "N/A",
    }));
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return [];
  }
}

// Función para generar dinámicamente la sección de cotizaciones destacadas en el DOM
async function generarCotizacionesDestacadas() {
  const carouselInner = document.querySelector(
    "#cotizacionesCarousel .carousel-inner"
  );

  try {
    const cotizacionesDestacadas = await obtenerCotizacionesDestacadas();

    // Dividir las cotizaciones en grupos de 4
    const cotizacionesGrupos = [];
    for (let i = 0; i < cotizacionesDestacadas.length; i += 4) {
      cotizacionesGrupos.push(cotizacionesDestacadas.slice(i, i + 4));
    }

    cotizacionesGrupos.forEach((grupo, grupoIndex) => {
      const item = document.createElement("div");
      item.className =
        grupoIndex === 0 ? "carousel-item active" : "carousel-item";

      const row = document.createElement("div");
      row.className = "row";

      grupo.forEach((cotizacion) => {
        const col = document.createElement("div");
        col.className = "col-md-3 cotizacion-destacada";

        const card = document.createElement("div");
        card.className = "card";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const nombre = document.createElement("h2");
        nombre.textContent =
          cotizacion.nombre.charAt(0).toUpperCase() +
          cotizacion.nombre.slice(1);

        const precio = document.createElement("p");
        precio.textContent = `Precio: ${cotizacion.precio}`;

        const cambio = document.createElement("p");
        cambio.textContent = `Cambio: ${cotizacion.cambio}`;

        const volumen = document.createElement("p");
        volumen.textContent = `Volumen: ${cotizacion.volumen}`;

        const marketCap = document.createElement("p");
        marketCap.textContent = `Market Cap: ${cotizacion.marketCap}`;

        cardBody.appendChild(nombre);
        cardBody.appendChild(precio);
        cardBody.appendChild(cambio);
        card.appendChild(cardBody);
        col.appendChild(card);
        row.appendChild(col);
      });

      item.appendChild(row);
      carouselInner.appendChild(item);
    });

    // Agrega el evento de clic a todas las cotizaciones
    const cotizaciones = document.querySelectorAll(
      "#cotizacionesCarousel .cotizacion-destacada"
    );
    cotizaciones.forEach((cotizacion, i) => {
      cotizacion.addEventListener("click", () =>
        mostrarDetallesCotizacion(cotizacionesDestacadas[i])
      );
    });
  } catch (error) {
    console.error("Error al generar cotizaciones destacadas:", error);
  }
}

// Llama a la función para generar las cotizaciones destacadas al cargar la página
document.addEventListener('DOMContentLoaded', function () {
  generarCotizacionesDestacadas();
});

// Nueva función para mostrar detalles al hacer clic
function mostrarDetallesCotizacion(cotizacion) {
  // Utilizamos Sweet Alert para mostrar información detallada
  Swal.fire({
    title: `Detalles de ${cotizacion.nombre.charAt(0).toUpperCase()+cotizacion.nombre.slice(1)}`,
    html: `<p>Precio: ${cotizacion.precio}</p>
      <p>Cambio (%): ${cotizacion.cambio}</p>
      <p>Volumen: ${cotizacion.volumen}</p>`,
    icon: "info",
  });

  // Utilizamos Toastify para mostrar una notificación
  Toastify({
    text: `Detalles de ${cotizacion.nombre}: Precio: ${cotizacion.precio}, Cambio (%): ${cotizacion.cambio}`,
    duration: 5000,
    gravity: "bottom",
    position: "left",
  }).showToast();
}

// Array de novedades
const ultimasNovedades = [
  {
    titulo: "Lo último en Noticias Financieras",
    descripcion:
      "Mantente al tanto de las últimas novedades en el mundo financiero. Descubre análisis, tendencias y consejos para optimizar tus estrategias de inversión.",
    enlace: "#",
  },
  {
    titulo: "Actualizaciones Diarias del Mercado",
    descripcion:
      "Sigue de cerca los movimientos del mercado financiero y su impacto en la economía global. Analizamos las noticias más relevantes para tu toma de decisiones informada.",
    enlace: "#",
  },
  {
    titulo: "Perspectivas del Mercado Financiero",
    descripcion:
      "Explora las perspectivas y proyecciones actuales del mercado financiero. Nuestros expertos desglosan la información para brindarte una visión clara y precisa de lo que está sucediendo en el mundo financiero.",
    enlace: "#",
  },
];

// Función para generar dinámicamente las tarjetas de novedades
function generarUltimasNovedades() {
  const ultimasNovedadesContainer = document.getElementById("ultimasNovedades");

  ultimasNovedades.forEach((novedad) => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    const card = document.createElement("div");
    card.className = "card animate__animated animate__fadeIn";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const titulo = document.createElement("h2");
    titulo.textContent = novedad.titulo;

    const descripcion = document.createElement("p");
    descripcion.textContent = novedad.descripcion;

    const enlace = document.createElement("a");
    enlace.className = "btn btn-primary";
    enlace.href = novedad.enlace;
    enlace.textContent = "Leer mas";

    cardBody.appendChild(titulo);
    cardBody.appendChild(descripcion);
    cardBody.appendChild(enlace);
    card.appendChild(cardBody);
    col.appendChild(card);
    ultimasNovedadesContainer.appendChild(col);
  });
}

// Llama a la función para generar las tarjetas al cargar la página
const ultimasNovedadesContainer = document.getElementById("ultimasNovedadesContainer");

if (ultimasNovedadesContainer) {
  generarUltimasNovedades(); // Llamar a la función solo si el contenedor existe
}
