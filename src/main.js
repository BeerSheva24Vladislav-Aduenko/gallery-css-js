document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery_item");
  const detailedImage = document.querySelector(".detailedContainer_image");
  const detailedTitle = document.querySelector(".detailedContainer_title");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const text = item.querySelector(".gallery_item_description");

      detailedImage.src = img.src;
      detailedTitle.textContent = text.textContent;
    });
  });
});
