let products = [];
let currentCategory = "todas";
let catalogStatus = "loading";
const cart = [];

const API_BASE_URL = "http://localhost:3000";
const productGrid = document.querySelector("#product-grid");
const resultsCount = document.querySelector("#results-count");
const filterButtons = document.querySelectorAll(".filter-button");
const catalogTitle = document.querySelector("#catalog-title");
const demoNote = document.querySelector(".demo-note");
const cartCountLabel = document.querySelector("#cart-count");

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
  image.src = product.image;
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

  const addToCartButton = document.createElement("button");
  addToCartButton.className = "add-to-cart-button";
  addToCartButton.type = "button";
  addToCartButton.textContent = "Agregar al carrito";
  addToCartButton.setAttribute("aria-label", `Agregar ${product.name} al carrito`);
  addToCartButton.addEventListener("click", () => {
    cart.push(product);
    cartCountLabel.textContent = `Carrito: ${cart.length} ${cart.length === 1 ? "producto" : "productos"}`;
  });

  info.append(category, name, description, price, addToCartButton);
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
    const emptyMessages = {
      loading: "Cargando productos...",
      empty: "No hay productos cargados en esta categoría.",
      unavailable: "No se pudieron cargar los productos. Verificá que la API y la base de datos estén disponibles.",
    };
    emptyState.textContent = emptyMessages[catalogStatus]
      ?? "No hay productos disponibles en esta categoría.";
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
    if (response.status === 404) {
      products = [];
      catalogStatus = "empty";
      if (demoNote) {
        demoNote.textContent = "API conectada, pero no hay productos cargados en la base de datos.";
      }
      renderProducts(currentCategory);
      return;
    }

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data.payload)) {
      throw new Error("La API devolvió una respuesta sin una lista de productos.");
    }

    products = data.payload;
    catalogStatus = products.length > 0 ? "loaded" : "empty";
    if (demoNote) {
      demoNote.textContent = "Conectado a la API: productos cargados desde la base de datos.";
    }
    renderProducts(currentCategory);
  } catch (error) {
    console.error("Error cargando productos desde la API:", error);
    products = [];
    catalogStatus = "unavailable";
    if (demoNote) {
      demoNote.textContent = "No fue posible consultar los productos en la API y la base de datos.";
    }
    renderProducts(currentCategory);
  }
}

renderProducts();
loadProductsFromApi();
