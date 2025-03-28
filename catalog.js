document.addEventListener('DOMContentLoaded', () => {
    const productList = document.querySelector('.product-list');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('price-sort');
    const productDetailsModal = document.getElementById('product-details');
    const productDetailsContent = document.getElementById('product-details-content');
    const closeDetails = document.querySelector('.close-details');
    const messageDiv = document.getElementById('message');

    const products = [
        { id: 1, name: 'Смартфон 1', price: 500, category: 'smartphone', image: 'images/smartphone1.jpg', description: 'Сучасний смартфон з потужним процесором та яскравим екраном.' },
        { id: 2, name: 'Ноутбук 1', price: 800, category: 'laptop', image: 'images/laptop1.jpg', description: 'Легкий та потужний ноутбук для роботи та розваг.' },
        { id: 3, name: 'Телевізор 1', price: 1200, category: 'tv', image: 'images/tv1.jpg', description: 'Великий телевізор з високою роздільною здатністю для кіноперегляду.' },
        { id: 4, name: 'Ноутбук 2', price: 1500, category: 'laptop', image: 'images/laptop2.jpg', description: 'Ноутбук з потужною відеокартою для ігор.' },
        { id: 5, name: 'Смартфон 2', price: 600, category: 'smartphone', image: 'images/smartphone2.jpg', description: 'Смартфон з великим обсягом пам\'яті та якісною камерою.' },
        { id: 6, name: 'Телевізор 2', price: 1300, category: 'tv', image: 'images/tv2.jpg', description: 'Телевізор з підтримкою 4K та Smart TV.' },
        { id: 7, name: 'Ноутбук 3', price: 15020, category: 'laptop', image: 'images/laptop2.jpg', description: 'Ноутбук з потужною відеокартою для ігор.' },
        { id: 8, name: 'Смартфон 3', price: 1600, category: 'smartphone', image: 'images/smartphone2.jpg', description: 'Смартфон з великим обсягом пам\'яті та якісною камерою.' },
        { id: 9, name: 'Телевізор 3', price: 51300, category: 'tv', image: 'images/tv2.jpg', description: 'Телевізор з підтримкою 4K та Smart TV.' },
        { id: 10, name: 'Телевізор 4', price: 7300, category: 'tv', image: 'images/tv2.jpg', description: 'Телевізор з підтримкою 4K та Smart TV.' }
    ];

    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get('category');

    if (categoryFromUrl) {
        categoryFilter.value = categoryFromUrl;
    }

    function renderProducts(productsToRender) {
        productList.innerHTML = '';
        productsToRender.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Ціна: ${product.price} грн</p>
                <div class="product-actions">
                    <button class="view-details" data-id="${product.id}">Детальніше</button>
                    <button class="add-to-cart" data-id="${product.id}">Додати в кошик</button>
                </div>
            `;
            productList.appendChild(productItem);
        });
    }

    function filterProducts() {
        const selectedCategory = categoryFilter.value;
        let filteredProducts = products;

        if (selectedCategory !== 'all') {
            filteredProducts = products.filter(product => product.category === selectedCategory);
        }

        sortProducts(filteredProducts);
    }

    function sortProducts(productsToSort) {
        const selectedSort = sortFilter.value;

        switch (selectedSort) {
            case 'asc':
                productsToSort.sort((a, b) => a.price - b.price);
                break;
            case 'desc':
                productsToSort.sort((a, b) => b.price - a.price);
                break;
        }

        renderProducts(productsToSort);
    }

    function showMessage(message) {
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';

        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    }

    categoryFilter.addEventListener('change', filterProducts);
    sortFilter.addEventListener('change', filterProducts);

    closeDetails.addEventListener('click', () => {
        productDetailsModal.style.display = 'none';
    });

    // Обробка подій для productList
    productList.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-details')) {
            const productId = parseInt(event.target.dataset.id);
            const product = products.find(p => p.id === productId);

            if (product) {
                productDetailsContent.innerHTML = `
                    <h2>${product.name}</h2>
                    <img src="${product.image}" alt="${product.name}">
                    <p>Ціна: ${product.price} грн</p>
                    <p>Опис: ${product.description || 'Опис відсутній'}</p>
                `;
                productDetailsModal.style.display = 'block';
            }
        }

        if (event.target.classList.contains('add-to-cart')) {
            const productId = parseInt(event.target.dataset.id);
            const productToAdd = products.find(p => p.id === productId);

            if (productToAdd) {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push(productToAdd);
                localStorage.setItem('cart', JSON.stringify(cart));

                // Створення повідомлення
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

                // Приховування повідомлення через 1 секунду
                setTimeout(() => {
                    messageDiv.remove();
                }, 1000);
            }
        }
    });

    // Перший рендер продуктів
    filterProducts();
});