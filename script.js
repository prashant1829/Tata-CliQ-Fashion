// Hero Banner Slider
const heroSlider = document.querySelector(".slider");
const heroSlides = document.querySelectorAll(".slide");
let heroIndex = 0;
let heroInterval;

const heroFirstClone = heroSlides[0].cloneNode(true);
const heroLastClone = heroSlides[heroSlides.length - 1].cloneNode(true);

heroSlider.appendChild(heroFirstClone);
heroSlider.insertBefore(heroLastClone, heroSlides[0]);

heroSlider.style.transform = `translateX(-100%)`;

function moveHeroSlide(next = true) {
  heroIndex = next ? heroIndex + 1 : heroIndex - 1;
  heroSlider.style.transition = "transform 0.5s ease-in-out";
  heroSlider.style.transform = `translateX(-${(heroIndex + 1) * 100}%)`;

  setTimeout(() => {
    if (heroIndex >= heroSlides.length) {
      heroIndex = 0;
      heroSlider.style.transition = "none";
      heroSlider.style.transform = `translateX(-100%)`;
    } else if (heroIndex < 0) {
      heroIndex = heroSlides.length - 1;
      heroSlider.style.transition = "none";
      heroSlider.style.transform = `translateX(-${(heroIndex + 1) * 100}%)`;
    }
  }, 500);
}

heroInterval = setInterval(() => moveHeroSlide(true), 5000);

document
  .querySelector(".left-arrow")
  .addEventListener("click", () => moveHeroSlide(false));
document
  .querySelector(".right-arrow")
  .addEventListener("click", () => moveHeroSlide(true));

// Best Brands & Westside Slider
document.querySelectorAll(".best-brands-container").forEach((container) => {
  const wrapper = container.querySelector(".brand-slider-wrapper");
  const brandSlider = wrapper.querySelector(".brand-slider");
  const brands = wrapper.querySelectorAll(".brand");
  const prevBtn = container.querySelector(".prev-btn");
  const nextBtn = container.querySelector(".next-btn");

  let index = 0;
  const totalImages = brands.length;
  const visibleImages = 4;
  const brandWidth = brands[0].offsetWidth + 15;
  let sliderInterval;

  for (let i = 0; i < visibleImages; i++) {
    let clone = brands[i].cloneNode(true);
    brandSlider.appendChild(clone);
  }

  function updateBrandSlider() {
    brandSlider.style.transition = "transform 0.5s ease-in-out";
    brandSlider.style.transform = `translateX(-${index * brandWidth}px)`;

    if (index >= totalImages) {
      setTimeout(() => {
        brandSlider.style.transition = "none";
        index = 0;
        brandSlider.style.transform = `translateX(0px)`;
      }, 500);
    }
  }

  function stopAutoSlide() {
    clearInterval(sliderInterval);
  }

  nextBtn.addEventListener("click", () => {
    stopAutoSlide();
    index++;
    updateBrandSlider();
  });

  prevBtn.addEventListener("click", () => {
    stopAutoSlide();
    if (index === 0) {
      index = totalImages;
      brandSlider.style.transition = "none";
      brandSlider.style.transform = `translateX(-${index * brandWidth}px)`;
      setTimeout(() => {
        index--;
        brandSlider.style.transition = "transform 0.5s ease-in-out";
        updateBrandSlider();
      }, 50);
    } else {
      index--;
      updateBrandSlider();
    }
  });
});

// Search Bar Placeholder Auto Change
const searchInput = document.querySelector(".search-bar input");
const placeholderTexts = ["Products", "Brands", "Categories"];
let placeholderIndex = 0;

function changePlaceholder() {
  searchInput.setAttribute(
    "placeholder",
    `Search for ${placeholderTexts[placeholderIndex]}`
  );
  placeholderIndex = (placeholderIndex + 1) % placeholderTexts.length;
}

setInterval(changePlaceholder, 3000);

changePlaceholder();
