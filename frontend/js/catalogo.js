const products = [
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
    name: "Botella deportiva",
    category: "equipamiento",
    description: "Botella reutilizable para llevar a cada actividad.",
    price: 9900,
    image: "assets/equipamiento.svg",
  },
];

const productGrid = document.querySelector("#product-grid");
const resultsCount = document.querySelector("#results-count");
const filterButtons = document.querySelectorAll(".filter-button");
const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});
const categoryLabels = {
  indumentaria: "Indumentaria",
  equipamiento: "Equipamiento",
};

function createProductCard(product) {
  const article = document.createElement("article");
  article.className = "product-card";

  const imageContainer = document.createElement("div");
  imageContainer.className = "product-image";
  const image = document.createElement("img");
  image.src = product.image;
  image.alt = "";
  image.loading = "lazy";
  imageContainer.append(image);

  const info = document.createElement("div");
  info.className = "product-info";

  const category = document.createElement("p");
  category.className = "product-category";
  category.textContent = categoryLabels[product.category];

  const name = document.createElement("h3");
  name.className = "product-name";
  name.textContent = product.name;

  const description = document.createElement("p");
  description.className = "product-description";
  description.textContent = product.description;

  const price = document.createElement("p");
  price.className = "product-price";
  price.textContent = currencyFormatter.format(product.price);

  info.append(category, name, description, price);
  article.append(imageContainer, info);
  return article;
}

function renderProducts(selectedCategory = "todas") {
  const visibleProducts = selectedCategory === "todas"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  resultsCount.textContent = `${visibleProducts.length} productos de ejemplo`;

  productGrid.replaceChildren();

  if (visibleProducts.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.className = "empty-state";
    emptyState.textContent = "No hay productos para mostrar.";
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

renderProducts();
