document.addEventListener('DOMContentLoaded', () => {
    const productList = document.querySelector('#recommended-products');
    const productDetailsModal = document.getElementById('product-details');
    const productDetailsContent = document.getElementById('product-details-content-inner');
    const closeDetails = document.querySelector('.close-details');
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('show');
        });
    }

    const featuredProducts = [
        { id: 1, name: 'Смартфон 1', price: 500, image: 'images/smartphone1.jpg', description: 'Сучасний смартфон з потужним процесором та яскравим екраном.' },
        { id: 2, name: 'Ноутбук 1', price: 800, image: 'images/laptop1.jpg', description: 'Легкий та потужний ноутбук для роботи та розваг.' },
        { id: 3, name: 'Телевізор 1', price: 1200, image: 'images/tv1.jpg', description: 'Великий телевізор з високою роздільною здатністю для кіноперегляду.' }
    ];

    featuredProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
productItem.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h2>${product.name}</h2>
    <p>Ціна: ${product.price} грн</p>
    <button class="view-details" data-id="${product.id}">Детальніше</button>
    <button class="add-to-cart" data-id="${product.id}">Додати в кошик</button>
`;
productList.appendChild(productItem);
});

productList.addEventListener('click', (event) => {
    if (event.target.classList.contains('view-details')) {
        const productId = parseInt(event.target.dataset.id);
        const product = featuredProducts.find(p => p.id === productId);

        if (product) {
            productDetailsContent.innerHTML = `
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}">
                <p>Ціна: ${product.price} грн</p>
                <p>Опис: ${product.description || 'Опис відсутній'}</p>
                <button class="add-to-cart-details" data-id="${product.id}">Додати в кошик</button>
            `;
        
                productDetailsModal.style.display = 'block';

                const addToCartDetailsButton = document.querySelector('.add-to-cart-details');
                addToCartDetailsButton.addEventListener('click', () => {
                    const productId = parseInt(addToCartDetailsButton.dataset.id);
                    const productToAdd = featuredProducts.find(p => p.id === productId);

                    if (productToAdd) {
                        let cart = JSON.parse(localStorage.getItem('cart')) || [];
                        cart.push(productToAdd);
                        localStorage.setItem('cart', JSON.stringify(cart));

                        const messageDiv = document.createElement('div');
                        messageDiv.classList.add('added-to-cart-message');
                        messageDiv.textContent = `Товар "${productToAdd.name}" додано до кошика!`;
                        messageDiv.style.position = 'fixed';
                        messageDiv.style.top = '20px';
                        messageDiv.style.right = '20px';
                        messageDiv.style.background = '#e0f7fa';
                        messageDiv.style.padding = '10px';
                        messageDiv.style.borderRadius = '5px';
                        document.body.appendChild(messageDiv);

                        setTimeout(() => {
                            messageDiv.remove();
                        }, 1000);
                    }
                });
            }
        }

        if (event.target.classList.contains('add-to-cart')) {
            const productId = parseInt(event.target.dataset.id);
            const productToAdd = featuredProducts.find(p => p.id === productId);

            if (productToAdd) {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push(productToAdd);
                localStorage.setItem('cart', JSON.stringify(cart));

                const messageDiv = document.createElement('div');
                messageDiv.classList.add('added-to-cart-message');
                messageDiv.textContent = `Товар "${productToAdd.name}" додано до кошика!`;
                messageDiv.style.position = 'fixed';
                messageDiv.style.top = '20px';
                messageDiv.style.right = '20px';
                messageDiv.style.background = '#e0f7fa';
                messageDiv.style.padding = '10px';
                messageDiv.style.borderRadius = '5px';
                document.body.appendChild(messageDiv);

                setTimeout(() => {
                    messageDiv.remove();
                }, 1000);
            }
        }
    });

    closeDetails.addEventListener('click', () => {
        productDetailsModal.style.display = 'none';
    });

    // Логіка слайдера
    const sliderItems = document.querySelectorAll('.slider-item');
    let currentSlide = 0;

    function showSlide(index) {
        sliderItems.forEach(item => item.classList.remove('active'));
        sliderItems[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % sliderItems.length;
        showSlide(currentSlide);
    }

    // Запуск слайдера кожні 5 секунд
    showSlide(currentSlide);
    setInterval(nextSlide, 5000);

    // Код для встановлення висоти рекомендованих товарів
    const recommendedProducts = document.querySelectorAll('#recommended-products .product-item');
    let maxHeight = 0;

    recommendedProducts.forEach(product => {
        maxHeight = Math.max(maxHeight, product.offsetHeight);
    });

    recommendedProducts.forEach(product => {
        product.style.height = `${maxHeight}px`;
    });

    // Код для створення контейнера зображення
    const imageContainer = document.createElement('div');
    imageContainer.style.width = '300px';
    imageContainer.style.height = '300px';
    imageContainer.style.overflow = 'hidden';

    const img = document.createElement('img');
    img.src = product.image; // Використовуйте product з featuredProducts
    img.alt = product.name; // Використовуйте product з featuredProducts
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';

    imageContainer.appendChild(img);

    // ... (ваш код, де ви додаєте imageContainer до DOM) ...
});
