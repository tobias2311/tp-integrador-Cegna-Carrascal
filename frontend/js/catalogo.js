const FALLBACK_PRODUCTS = [
  {
    name: "Remera deportiva",
    category: "indumentaria",
    description: "Prenda liviana para entrenar con comodidad.",
    price: 24900,
    image: "assets/indumentaria.svg",
  },
  {
    name: "Short de entrenamiento",
    category: "indumentaria",
    description: "Diseño versátil para actividades al aire libre o gimnasio.",
    price: 18900,
    image: "assets/indumentaria.svg",
  },
  {
    name: "Campera deportiva",
    category: "indumentaria",
    description: "Una capa liviana para el inicio y el final de cada rutina.",
    price: 42900,
    image: "assets/indumentaria.svg",
  },
  {
    name: "Pelota de fútbol",
    category: "equipamiento",
    description: "Un básico para partidos y prácticas recreativas.",
    price: 32900,
    image: "assets/equipamiento.svg",
  },
  {
    name: "Bandas elásticas",
    category: "equipamiento",
    description: "Set de bandas para sumar variedad al entrenamiento.",
    price: 15900,
    image: "assets/equipamiento.svg",
  },
  {
    name: "Mancuernas",
    category: "equipamiento",
    description: "Par de mancuernas para sumar ejercicios de fuerza.",
    price: 28900,
    image: "assets/equipamiento.svg",
  },
  {
    name: "Botella deportiva",
    category: "equipamiento",
    description: "Botella reutilizable para llevar a cada actividad.",
    price: 9900,
    image: "assets/equipamiento.svg",
  },
];

let products = [...FALLBACK_PRODUCTS];
let currentCategory = "todas";

const API_BASE_URL = "http://localhost:3000";
const productGrid = document.querySelector("#product-grid");
const resultsCount = document.querySelector("#results-count");
const filterButtons = document.querySelectorAll(".filter-button");
const catalogTitle = document.querySelector("#catalog-title");
const demoNote = document.querySelector(".demo-note");

const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const categoryLabels = {
  indumentaria: "Indumentaria",
  equipamiento: "Equipamiento",
};

const sectionTitles = {
  todas: "Catálogo",
  indumentaria: "Indumentaria",
  equipamiento: "Equipo",
};

function createProductCard(product) {
  const article = document.createElement("article");
  article.className = "product-card";

  const imageContainer = document.createElement("div");
  imageContainer.className = "product-image";
  const image = document.createElement("img");
  image.src = product.image || "assets/indumentaria.svg";
  image.alt = product.name;
  image.loading = "lazy";
  imageContainer.append(image);

  const info = document.createElement("div");
  info.className = "product-info";

  const category = document.createElement("p");
  category.className = "product-category";
  category.textContent = categoryLabels[product.category] ?? product.category;

  const name = document.createElement("h3");
  name.className = "product-name";
  name.textContent = product.name;

  const description = document.createElement("p");
  description.className = "product-description";
  description.textContent = product.description || "";

  const price = document.createElement("p");
  price.className = "product-price";
  price.textContent = currencyFormatter.format(product.price);

  info.append(category, name, description, price);
  article.append(imageContainer, info);
  return article;
}

function renderProducts(selectedCategory = currentCategory) {
  currentCategory = selectedCategory;
  catalogTitle.textContent = sectionTitles[selectedCategory];

  const visibleProducts = selectedCategory === "todas"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  resultsCount.textContent = `${visibleProducts.length} productos`;

  productGrid.replaceChildren();

  if (visibleProducts.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.className = "empty-state";
    emptyState.textContent = "No hay productos disponibles en esta categoría.";
    productGrid.append(emptyState);
    return;
  }

  visibleProducts.forEach((product) => {
    productGrid.append(createProductCard(product));
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-selected", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });

    renderProducts(button.dataset.category);
  });
});

async function loadProductsFromApi() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }
    const data = await response.json();
    if (Array.isArray(data.payload) && data.payload.length > 0) {
      products = data.payload;
      if (demoNote) {
        demoNote.textContent = "Conectado a la API: catálogo sincronizado desde la base de datos.";
      }
      renderProducts(currentCategory);
    }
  } catch (_error) {
    console.info("Servidor backend no disponible, usando catálogo local de respaldo.");
    if (demoNote) {
      demoNote.textContent = "Vista local: servidor backend desconectado. Mostrando datos de respaldo.";
    }
  }
}

// Renderizado inicial con datos locales y sincronización asíncrona con la API
renderProducts();
loadProductsFromApi();
