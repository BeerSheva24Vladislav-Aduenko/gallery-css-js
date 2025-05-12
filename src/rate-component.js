export default class RateComponent {
  #starsNumber;
  constructor(starsNumber = 5) {
    this.#starsNumber = starsNumber;
  }
  render(parent, rate) {
    //TODO
    //renders appropriate number of full stars, number of empty stars and if needed
    //one half filled star inside parent element
    //if fractional part less than 0.25 the number should be floored (no half filled star)
    //if fractional part greater than 0.75 the number should be ceiled (no half filled star)
    //other cases fractional part should be presented as half filled star


    const { fullStars, halfStars, emptyStars } = this.#calculateRate(rate);
    const rateContainer = document.createElement("div");
    rateContainer.className = "rate-row";

    for (let i = 0; i < fullStars; i++) {
      rateContainer.innerHTML += `<i class="fa-solid fa-star"></i>`;
    }
    if (halfStars) {
      rateContainer.innerHTML += `<i class="fa-regular fa-star-half-stroke"></i>`;
    }
    for (let i = 0; i < emptyStars; i++) {
      rateContainer.innerHTML += `<i class="fa-regular fa-star"></i>`;
    }

    const ratingText = document.createElement("p");
    ratingText.textContent = `Рейтинг: ${rate}`;
    rateContainer.appendChild(ratingText);
    parent.appendChild(rateContainer);
  }

  #calculateRate(rate) {
    let fullStars = Math.floor(rate);
    const fractionalPart = rate - fullStars;
    let halfStars = 0;

    if (fractionalPart >= 0.25 && fractionalPart <= 0.75) {
      halfStars = 1;
    } else if (fractionalPart > 0.75) {
      fullStars ++;
    }
    const emptyStars = this.#starsNumber - fullStars - halfStars;

    return {
      fullStars,
      halfStars,
      emptyStars,
    };
  }
}
