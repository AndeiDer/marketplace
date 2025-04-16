let initialProducts = [];

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
        { id: 1, name: 'Iphone 16 Pro Max', price: 70000, category: 'smartphone', image: 'images/iphon.jpg', description: 'Сучасний смартфон з потужним процесором та яскравим екраном.',
       features: [
            
                            'Діагональ дисплея 6,9',
            
                            'Процесор: Snapdragon 888',
            
                            'Оперативна пам\'ять: 8 ГБ',
            
                            'Вбудована пам\'ять: 128 ГБ',
            
                            'Камера: 64 Мп'
            
                        ] },
            
                
                { id: 2, name: 'MacBook Air 13', price: 36800, category: 'laptop', image: 'images/mac.jpg', description: 'Легкий та потужний ноутбук для роботи та розваг.',
        
                    features: [
        
                        'Діагональ екрану 13,3',
        
                        'Процесор: Intel Core 7',
        
                        'Оперативна пам\'ять: 8 ГБ',
        
                        'Вбудована пам\'ять: 256 ГБ SSD',
        
                        'Відеокарта: Intel Iris Xe Graphics'
        
                    ]
        
                },
        
                { id: 3, name: 'Xiaome Tv A Pro32', price: 22200, category: 'tv', image: 'images/xiaomitv.jpg', description: 'Великий телевізор з високою роздільною здатністю для кіноперегляду.', features: [
        
                        'Діагональ: 55"',
        
                        'Роздільна здатність: 4K UHD',
        
                        'Технологія: LED',
        
                        'Smart TV: Так',
        
                        'HDR: Так'
        
                    ] },
        
                { id: 4, name: 'Asus Zenbook S16', price: 26500, category: 'laptop', image: 'images/asus.jpg', description: 'Ноутбук з потужною відеокартою для ігор.', features: [
        
                        'Екран: 15.6" IPS',
        
                        'Процесор: AMD Ryzen 7',
        
                        'Оперативна пам\'ять: 16 ГБ',
        
                        'Вбудована пам\'ять: 512 ГБ SSD',
        
                        'Відеокарта: NVIDIA GeForce RTX 3050'
        
                    ] },
        
                { id: 5, name: 'Xiaomi Redmi Note 14 ', price: 6000, category: 'smartphone', image: 'images/xiaomi.jpg', description: 'Акумулятор: 5500 (незнімний)Камера: 108 (f/1.7, ширококутна) + 2 ...Корпус: пластик;196,5 г;товщина 8,16 ммNFC: + (підтримку безконтактної оплати уточнюйте у магазинах)Рік 01.2025', features: [
        
                        'Екран: 6,67',
        
                        'AMOLED;2400х1080',
        
                        '120 Гц',
        
                        'Память: 256 ГБ',
        
                        'ОЗП: 8 ГБ'
        
                    ] },
        
                { id: 6, name: 'LED Ergo 32GPS', price: 11300, category: 'tv', image: 'images/led.jpg', description: 'Телевізор з підтримкою 4K та Smart TV.', features: [
        
                        'Діагональ: 60"',
        
                        'Роздільна здатність: 4K UHD',
        
                        'Технологія: QLED',
        
                        'Smart TV: Так',
        
                        'Частота оновлення: 120 Гц'
        
                    ] },
        
                { id: 7, name: 'Samsung Galaxy Book 5', price: 25020, category: 'laptop', image: 'images/sams.jpg', description: 'Ультрабук для бізнесу з високою автономністю.', features: [
        
                        'Екран: 13.3" IPS',
        
                        'Процесор: Intel Core i7',
        
                        'Оперативна пам\'ять: 16 ГБ',
        
                        'Вбудована пам\'ять: 512 ГБ SSD',
        
                        'Автономність: до 12 годин'
        
                    ] },
        
                { id: 8, name: 'Samsung', price: 8990, category: 'smartphone', image: 'images/samsung.jpg', description: 'Флагманський смартфон з передовою камерою та продуктивністю.', features: [
        
                           " Співвідношення сторін 20:9 Дисплей 6.6" ,
            " PLS , сенсорний ємнісний Роздільна здатність екрану 2408x108  Матеріал екрану Скло"
        
                    ] },
        
                { id: 9, name: 'Xiaome TV A50', price: 51300, category: 'tv', image: 'images/tvx.jpg', description: 'Преміальний OLED телевізор з неперевершеною якістю зображення.', features: [
        
                        'Діагональ: 65"',
        
                        'Роздільна здатність: 4K UHD',
        
                        'Технологія: OLED',
        
                        'Smart TV: Так',
        
                        'Підтримка Dolby Vision'
        
                    ] },
        
                { id: 10, name: 'UD 32DW521', price: 17300, category: 'tv', image: 'images/ud.jpg', description: 'Доступний Smart TV з гарним співвідношенням ціни та якості.', features: [
        
                        'Діагональ: 43"',
        
                        'Роздільна здатність: Full HD',
        
                        'Технологія: LED',
        
                        'Smart TV: Так',
        
                        'Вбудовані динаміки: 20 Вт'
        
              ]
     },
     { id: 11, name: 'Lenovo Tab P12', price: 11300, category: 'tvs', image: 'images/lenovo.jpg', description: 'Крутий планшет від lenovo.', features: [
        
                        'Діагональ: 65"',
        
                        'Роздільна здатність: 4K UHD',
        
                        'Технологія: OLED',
        
                        'Smart TV: Так',
        
                        'Підтримка Dolby Vision'
        
                    ] }
        
        
            ];
    initialProducts = [...products];

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
    const getQueryParam = (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    };

    const filterByCategoryFromURL = () => {
        const categoryFromURL = getQueryParam('category');
        const allProductsCheckbox = document.querySelector('.category-filter input[value="all"]');
        const categoryCheckboxes = document.querySelectorAll('.category-filter input[name="category"]:not([value="all"])');

        if (categoryFromURL) {
            if (categoryFromURL === 'all') {
                if (allProductsCheckbox) {
                    allProductsCheckbox.checked = true;
                }
                categoryCheckboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });
            } else {
                if (allProductsCheckbox) {
                    allProductsCheckbox.checked = false;
                }
                categoryCheckboxes.forEach(checkbox => {
                    checkbox.checked = (checkbox.value === categoryFromURL);
                });
            }
            filterProducts();
        } else {
            // Якщо параметр category відсутній, показуємо всі товари
            if (allProductsCheckbox) {
                allProductsCheckbox.checked = true;
            }
            categoryCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            filterProducts();
        }
    };

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
    filterByCategoryFromURL();


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
        });  // Зупиняємо спливання кліку всередині бічної панелі, щоб кліки на її елементи не закривали її
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
