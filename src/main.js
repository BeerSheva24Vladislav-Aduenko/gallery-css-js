document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery_item");
  const detailedImage = document.querySelector(".detailedContainer_image");
  const detailedTitle = document.querySelector(".detailedContainer_title");
  const hidden = document.querySelector(".hidden");
  const close = document.querySelector(".close");

  close.addEventListener("click", () => {
    hidden.classList.add("hidden");
  
  });

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const text = item.querySelector(".gallery_item_description");

      hidden.classList.remove("hidden");
      detailedImage.classList.remove("animate__backInLeft");
      detailedTitle.classList.remove("animate__backInLeft");

      detailedImage.classList.add("animate__animated", "animate__backOutRight");
      detailedTitle.classList.add("animate__animated", "animate__backOutRight");


      detailedImage.addEventListener(
        "animationend",
        () => {
          detailedImage.classList.remove("animate__backOutRight");
          detailedImage.src = img.src;
          detailedImage.classList.add("animate__backInLeft");
          detailedImage.removeEventListener("animationend");
          close.classList.add("animate__backInLeft");
        },
        {
          once: true,
        }
      );

      detailedTitle.addEventListener(
        "animationend",
        () => {
          detailedTitle.classList.remove("animate__backOutRight");
          detailedTitle.textContent = text.textContent;
          detailedTitle.classList.add("animate__backInLeft");
          detailedTitle.removeEventListener("animationend");
        },
        {
          once: true,
        }
      );
    });
  });
});
