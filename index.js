// index.js

// Функціонал слайдера
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 3000); // Зміна слайдів кожні 3 секунди

// Додаємо обробник подій для випадаючого меню категорій
const categoryButton = document.querySelector('.category-button');
const categoryContent = document.querySelector('.category-content');

categoryButton.addEventListener('click', () => {
    categoryContent.style.display = categoryContent.style.display === 'block' ? 'none' : 'block';
});

// Закриваємо випадаюче меню при кліку поза ним
document.addEventListener('click', (event) => {
    if (!event.target.matches('.category-button')) {
        if (categoryContent.style.display === 'block') {
            categoryContent.style.display = 'none';
        }
    }
});