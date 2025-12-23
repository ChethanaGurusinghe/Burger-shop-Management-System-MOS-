const slideContainer = document.querySelector(".carousel-slide");
const slides = document.querySelectorAll(".carousel-slide img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let counter = 0;
const size = slides[0].clientWidth;

nextBtn.addEventListener("click", () => {
    counter++;
    if (counter >= slides.length) counter = 0;
    slideContainer.style.transform = `translateX(-${size * counter}px)`;
});

prevBtn.addEventListener("click", () => {
    counter--;
    if (counter < 0) counter = slides.length - 1;
    slideContainer.style.transform = `translateX(-${size * counter}px)`;
});

setInterval(() => {
    counter++;
    if (counter >= slides.length) counter = 0;
    slideContainer.style.transform = `translateX(-${size * counter}px)`;
}, 4000);
