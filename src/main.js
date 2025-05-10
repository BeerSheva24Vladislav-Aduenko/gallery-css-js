import GalleryComponent from "./components/GalleryComponent.js";
import QueryFormComponent from "./components/QueryFormComponent.js";
import MoviesApiService from "./services/MoviesApiService.js";

// Ссылки на элементы DOM
const querySection = document.querySelector(".query-section");
const mainElem = document.querySelector(".main");
const detailedContainerImage = document.querySelector(".detailedContainer_image");
const detailedContainerTitle = document.querySelector(".detailedContainer_title");
const hidingButton = document.getElementById("hidingButton");
const galleryElement = document.querySelector(".gallery");
const queryButton = document.getElementById("queryButton");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

// Объекты
const service = new MoviesApiService();
const galleryComponent = new GalleryComponent(galleryElement);

// Функции
function setDetails(itemElement) {
  detailedContainerImage.src = itemElement.getAttribute("data-detailed-image");
  detailedContainerImage.alt = itemElement.getAttribute("data-thumbnail-title");
  detailedContainerTitle.innerHTML = itemElement.getAttribute("data-detailed-title");
  mainElem.classList.remove("none");
  animate();
}

function animate() {
  detailedContainerImage.classList.remove("animation-left");
  detailedContainerTitle.classList.remove("animation-right");
  requestAnimationFrame(() => {
    detailedContainerImage.classList.add("animation-left");
    detailedContainerTitle.classList.add("animation-right");
  });
}

const hideDetails = () => mainElem.classList.add("none");

function showForm() {
  querySection.classList.remove("none");
  mainElem.classList.add("none");
}

function showGallery() {
  querySection.classList.add("none");
  mainElem.classList.remove("none");
}

function updateNavigation() {
  prevButton.disabled = !service.hasPrev();
  nextButton.disabled = !service.hasNext();
}

// Инициализация формы
const queryForm = new QueryFormComponent(querySection, (submittedObj) => {
  service.getData(submittedObj)
    .then(data => {
      galleryComponent.renderThumbnailElements(data);
      showGallery();
      updateNavigation();
      document.querySelectorAll(".gallery img").forEach(elem => {
        elem.addEventListener("error", () => {
          console.warn(`Failed to load image: ${elem.src}`);
          elem.onerror = null;
          elem.src = '.../../images/noImage.webp';
          elem.alt = 'no Image movie poster';
        });
      });
    })
    .catch(error => {
      console.error("Failed to load movies:", error);
    });
}, service.getFormStructureObject());

// Обработчики событий
hidingButton.addEventListener("click", hideDetails);
queryButton.addEventListener("click", showForm);
galleryElement.addEventListener("click", (event) => {
  const item = event.target.closest(".gallery_item");
  if (item) {
    setDetails(item);
  }
});
prevButton.addEventListener("click", () => {
  service.getPrev()
    .then(data => {
      galleryComponent.renderThumbnailElements(data);
      updateNavigation();
    })
    .catch(error => {
      console.error("Failed to load previous page:", error);
    });
});
nextButton.addEventListener("click", () => {
  service.getNext()
    .then(data => {
      galleryComponent.renderThumbnailElements(data);
      updateNavigation();
    })
    .catch(error => {
      console.error("Failed to load next page:", error);
    });
});