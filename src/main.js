
import serviceObj from "./services/MockService.js";
import GalleryComponent from "./components/GalleryComponent.js";

const galleryElement = document.querySelector(".gallery");
const gallery = new GalleryComponent(galleryElement);

serviceObj.getData().then(data => gallery.renderThumbnailElements(data));