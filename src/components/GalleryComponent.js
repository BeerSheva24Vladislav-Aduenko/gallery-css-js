export default class GalleryComponent {
  #galleryElement;

  constructor(galleryElement, subject) {
    this.#galleryElement = galleryElement;
  }
  renderThumbnailElements(data) {
    this.#galleryElement.innerHTML = getThumbnailItems(data);
  }
}
function getThumbnailItems(data) {
  const res = data.map(getItem);
  return res.join("");
}
function getItem({ description, name, reference_image_id }) {
  const res = `<li class="gallery_item" data-detailed-image="${name} data-detailed-title="${description}">
               <img src="${`https://cdn2.thecatapi.com/images/${reference_image_id}.jpg`}" alt="${name}" class="gallery_item_image">
                <figcaption class="gallery_item_title">${name}</figcaption>
               </li>`;
  return res;
}


