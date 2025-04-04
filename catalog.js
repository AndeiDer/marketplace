document.addEventListener('DOMContentLoaded', () => {
    const productList = document.querySelector('.product-list');
    const categoryFilterContainer = document.querySelector('.category-filter');
    const categoryCheckboxes = document.querySelectorAll('.category-filter input[type="checkbox"]');
    const sortFilter = document.getElementById('price-sort');
    const productDetailsModal = document.getElementById('product-details');
    const productDetailsContent = document.getElementById('product-details-content');
    const closeDetails = document.querySelector('.close-details');
    const messageDiv = document.getElementById('message');
    const filterToggle = document.querySelector('.filter-toggle'); // Отримуємо елемент бургер-меню
    const sidebar = document.querySelector('.sidebar'); // Отримуємо бічну панель
    const container = document.querySelector('.container'); 
   
    const products = [
        { id: 1, name: 'Смартфон 1', price: 500, category: 'smartphone', image: 'images/smartphone1.jpg', description: 'Сучасний смартфон з потужним процесором та яскравим екраном.' , 
            features: [
            'Екран: 6.5" IPS',
            'Процесор: Snapdragon 888',
            'Оперативна пам\'ять: 8 ГБ',
            'Вбудована пам\'ять: 128 ГБ',
            'Камера: 64 Мп'
        ] },
        { id: 2, name: 'Ноутбук 1', price: 800, category: 'laptop', image: 'images/laptop1.jpg', description: 'Легкий та потужний ноутбук для роботи та розваг.',
            features: [
                'Екран: 6.5" IPS',
                'Процесор: Snapdragon 888',
                'Оперативна пам\'ять: 8 ГБ',
                'Вбудована пам\'ять: 128 ГБ',
                'Камера: 64 Мп'
            ] 
         },
        { id: 3, name: 'Телевізор 1', price: 1200, category: 'tv', image: 'images/tv1.jpg', description: 'Великий телевізор з високою роздільною здатністю для кіноперегляду.' , features: [
            'Екран: 6.5" IPS',
            'Процесор: Snapdragon 888',
            'Оперативна пам\'ять: 8 ГБ',
            'Вбудована пам\'ять: 128 ГБ',
            'Камера: 64 Мп'
        ]  },
        { id: 4, name: 'Ноутбук 2', price: 1500, category: 'laptop', image: 'images/laptop2.jpg', description: 'Ноутбук з потужною відеокартою для ігор.' , features: [
            'Екран: 6.5" IPS',
            'Процесор: Snapdragon 888',
            'Оперативна пам\'ять: 8 ГБ',
            'Вбудована пам\'ять: 128 ГБ',
            'Камера: 64 Мп'
        ]  },
        { id: 5, name: 'Смартфон 2', price: 600, category: 'smartphone', image: 'images/smartphone2.jpg', description: 'Смартфон з великим обсягом пам\'яті та якісною камерою.' , features: [
            'Екран: 6.5" IPS',
            'Процесор: Snapdragon 888',
            'Оперативна пам\'ять: 8 ГБ',
            'Вбудована пам\'ять: 128 ГБ',
            'Камера: 64 Мп'
        ]  },
        { id: 6, name: 'Телевізор 2', price: 1300, category: 'tv', image: 'images/tv2.jpg', description: 'Телевізор з підтримкою 4K та Smart TV.' , features: [
            'Екран: 6.5" IPS',
            'Процесор: Snapdragon 888',
            'Оперативна пам\'ять: 8 ГБ',
            'Вбудована пам\'ять: 128 ГБ',
            'Камера: 64 Мп'
        ]  },
        { id: 7, name: 'Ноутбук 3', price: 15020, category: 'laptop', image: 'images/laptop2.jpg', description: 'Ноутбук з потужною відеокартою для ігор.'  , features: [
            'Екран: 6.5" IPS',
            'Процесор: Snapdragon 888',
            'Оперативна пам\'ять: 8 ГБ',
            'Вбудована пам\'ять: 128 ГБ',
            'Камера: 64 Мп'
        ] },
        { id: 8, name: 'Смартфон 3', price: 1600, category: 'smartphone', image: 'images/smartphone2.jpg', description: 'Смартфон з великим обсягом пам\'яті та якісною камерою.' , features: [
            'Екран: 6.5" IPS',
            'Процесор: Snapdragon 888',
            'Оперативна пам\'ять: 8 ГБ',
            'Вбудована пам\'ять: 128 ГБ',
            'Камера: 64 Мп'
        ]  },
        { id: 9, name: 'Телевізор 3', price: 51300, category: 'tv', image: 'images/tv2.jpg', description: 'Телевізор з підтримкою 4K та Smart TV.' , features: [
            'Екран: 6.5" IPS',
            'Процесор: Snapdragon 888',
            'Оперативна пам\'ять: 8 ГБ',
            'Вбудована пам\'ять: 128 ГБ',
            'Камера: 64 Мп'
        ]  },
        { id: 10, name: 'Телевізор 4', price: 7300, category: 'tv', image: 'images/tv2.jpg', description: 'Телевізор з підтримкою 4K та Smart TV.'  , features: [
            'Екран: 6.5" IPS',
            'Процесор: Snapdragon 888',
            'Оперативна пам\'ять: 8 ГБ',
            'Вбудована пам\'ять: 128 ГБ',
            'Камера: 64 Мп'
        ] }
    ];


    
    const uniqueCategories = ['Усі товари', ...Array.from(new Set(products.map(product => product.category)))];

   
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
        const allProductsCheckbox = document.querySelector('.category-filter input[value="all"]');
        const categoryCheckboxes = Array.from(document.querySelectorAll('.category-filter input[name="category"]:not([value="all"])'));
        const selectedCategories = categoryCheckboxes
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        let filteredProducts = products;

        if (allProductsCheckbox.checked) {
            filteredProducts = products;
        } else if (selectedCategories.length > 0) {
            filteredProducts = products.filter(product =>
                selectedCategories.includes(product.category)
            );
        } else {
            filteredProducts = products;
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

    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    sortFilter.addEventListener('change', filterProducts);

    closeDetails.addEventListener('click', () => {
        productDetailsModal.style.display = 'none';
    });

    productList.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-details')) {
            const productId = parseInt(event.target.dataset.id);
            const product = products.find(p => p.id === productId);

            if (product) {
                let featuresHTML = '';
                if (Array.isArray(product.features) && product.features.length > 0) {
                    featuresHTML = '<h3>Характеристики:</h3><ul>';
                    product.features.forEach(feature => {
                        featuresHTML += `<li>${feature}</li>`;
                    });
                    featuresHTML += '</ul>';
                } else if (typeof product.features === 'object' && product.features !== null) {
                    featuresHTML = '<h3>Характеристики:</h3><ul>';
                    for (const key in product.features) {
                        if (product.features.hasOwnProperty(key)) {
                            featuresHTML += `<li>${key}: ${product.features[key]}</li>`;
                        }
                    }
                    featuresHTML += '</ul>';
                }
            
                productDetailsContent.innerHTML = `
                    <h2>${product.name}</h2>
                    <img src="${product.image}" alt="${product.name}">
                    <p>Ціна: ${product.price} грн</p>
                    <p>Опис: ${product.description || 'Опис відсутній'}</p>
                    ${featuresHTML}
                    <button class="add-to-cart-details" data-id="${product.id}">Додати в кошик</button>
                `;
                productDetailsModal.style.display = 'block';
            

                const addToCartModalButton = productDetailsContent.querySelector('.add-to-cart-details');
                if (addToCartModalButton) {
                    addToCartModalButton.addEventListener('click', () => {
                        const productIdToAdd = parseInt(addToCartModalButton.dataset.id);
                        const productToAdd = products.find(p => p.id === productIdToAdd);

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
        }



        if (event.target.classList.contains('add-to-cart')) {
            const productId = parseInt(event.target.dataset.id);
            const productToAdd = products.find(p => p.id === productId);

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

    renderProducts(products);
  

    // Логіка для бургер-меню фільтрів
    if (filterToggle && sidebar) {
        filterToggle.addEventListener('click', (event) => {
            event.stopPropagation(); // Зупиняємо спливання події кліку з бургер-меню
            sidebar.classList.toggle('open');
        });


        // Додаємо слухача подій на головний контейнер
        container.addEventListener('click', (event) => {
            // Перевіряємо, чи бічна панель відкрита і чи клік був за її межами та за межами бургер-меню
            if (sidebar.classList.contains('open') && !sidebar.contains(event.target) && event.target !== filterToggle) {
                sidebar.classList.remove('open');
            }
        });  // Зупиняємо спливання кліку всередині бічної панелі, щоб кліки на її елементи не закривали її
        sidebar.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    menuToggle.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        menuToggle.classList.remove('open');
    });
});

document.addEventListener('click', (event) => {
    const isClickInsideMenu = navLinks.contains(event.target) || menuToggle.contains(event.target);
    if (navLinks.classList.contains('show') && !isClickInsideMenu) {
        navLinks.classList.remove('show');
        menuToggle.classList.remove('open');
    }
});
