//refernces to the HTML elements
const galleryItems = document.querySelectorAll(".gallery_item");
const detailedContainerImage = document.querySelector(".detailedContainer_image");
const detailedContainerTitle = document.querySelector(".detailedContainer_title");
const hidden = document.querySelector(".hidden");
const close = document.querySelector(".close");
//functions
function setDetails(itemElement) {
    detailedContainerImage.src = itemElement.getAttribute("data-detailed-image");
    detailedContainerTitle.innerHTML = itemElement.getAttribute("data-detailed-title");
    hidden.classList.remove("hidden");
    animate();
}
function animate() {
    detailedContainerImage.classList.remove("animation-left");
    detailedContainerTitle.classList.remove("animation-right");
    setTimeout(addAnimationClasses);
    
}
function toggleAnimations(element) {
    element.classList.toggle("animation-left");
    element.classList.toggle("animation-right"); 
}
function addAnimationClasses() {
    detailedContainerImage.classList.add("animation-left");
    detailedContainerTitle.classList.add("animation-right"); 
}


//actions
galleryItems.forEach((item,index) => item.addEventListener("click", () => setDetails(galleryItems[index])));

close.addEventListener("click", () => {
    hidden.classList.add("hidden");
  });