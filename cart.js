let cart = [];
let discount = 0; // Додаємо змінну для знижки
let groupedCart = []; // Визначаємо groupedCart на глобальному рівні

// Функція для оновлення кошика
function updateCart(discount = 0) {
    const cartItems = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    cartItems.innerHTML = '';
    try {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (error) {
        console.error('Помилка зчитування кошика з localStorage:', error);
        cart = [];
    }

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Кошик порожній</p>';
        totalPriceElement.textContent = '0';
        return;
    }

    groupedCart = cart.reduce((acc, item) => { // Оновлюємо groupedCart тут
        const existingItem = acc.find(i => i.name === item.name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            acc.push({ ...item, quantity: 1 });
        }
        return acc;
    }, []);

    groupedCart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center;">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: contain; margin-right: 10px;">
                    <span style="margin-right: 10px;">${item.name}</span>
                    <span>${item.price} грн</span>
                </div>
                <div class="quantity-container">
                    <div class="quantity">
                        <button class="quantity-minus" data-index="${index}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}">
                        <button class="quantity-plus" data-index="${index}">+</button>
                    </div>
                   
                </div>
            </div>
       <button class="remove-from-cart" data-index="${index}">Видалити</button>  `;
        cartItems.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });

    // Застосовуємо знижку, якщо вона є
    if (discount > 0) {
        totalPrice = totalPrice * (1 - discount / 100);
    }

    totalPriceElement.textContent = totalPrice.toFixed(2);

    // Додавання обробників подій для кнопок "Видалити з кошика"
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
    removeFromCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const indexToRemove = parseInt(button.dataset.index);
            const itemToRemove = groupedCart[indexToRemove];
            cart = cart.filter(item => item.name !== itemToRemove.name);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart(discount);
        });
    });

    // Додавання обробників подій для кнопок "+" та "-"
    const quantityMinusButtons = document.querySelectorAll('.quantity-minus');
    quantityMinusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index);
            if (groupedCart[index].quantity > 1) {
                groupedCart[index].quantity--;
                updateCartItemQuantity(index, groupedCart[index].quantity);
                updateCart(discount);
            } else {
                // Видаляємо товар, якщо кількість дорівнює 1
                const itemToRemove = groupedCart[index];
                cart = cart.filter(item => item.name !== itemToRemove.name);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart(discount);
            }
        });
    });

    const quantityPlusButtons = document.querySelectorAll('.quantity-plus');
    quantityPlusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index);
            groupedCart[index].quantity++;
            updateCartItemQuantity(index, groupedCart[index].quantity);
            updateCart(discount);
        });
    });
}

function updateCartItemQuantity(index, quantity) {
    groupedCart[index].quantity = quantity;
    const updatedCart = [];
    groupedCart.forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
            updatedCart.push({ name: item.name, price: item.price, image: item.image });
        }
    });
    cart = updatedCart;
    localStorage.setItem('cart', JSON.stringify(cart));
    // Оновлюємо значення input
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs[index].value = quantity;
}

// Виклик функції для відображення кошика при завантаженні сторінки
updateCart();

// Додаємо обробник подій для кнопки очищення кошика
const clearCartButton = document.querySelector('.clear-cart');
clearCartButton.addEventListener('click', () => {
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
});

// Додавання обробника подій для кнопки "Застосувати промокод"
const applyPromoCodeButton = document.getElementById('apply-promo-code');
const promoCodeInput = document.getElementById('promo-code-input');
const promoCodeMessage = document.getElementById('promo-code-message');

applyPromoCodeButton.addEventListener('click', () => {
    const promoCode = promoCodeInput.value.trim();
    discount = getDiscount(promoCode); // Оновлюємо змінну знижки

    if (discount > 0) {
        promoCodeMessage.textContent = `Промокод застосовано! Знижка ${discount}%`;
        promoCodeMessage.style.color = 'green';
    } else {
        promoCodeMessage.textContent = 'Недійсний промокод';
        promoCodeMessage.style.color = 'red';
    }

    updateCart(discount); // Оновлюємо кошик з урахуванням знижки
});

// Функція для отримання знижки за промокодом
function getDiscount(promoCode) {
    const promoCodes = {
        'Знижка10': 10,
        'Знижка20': 20,
        'Знижка5': 5,
        'Знижка50': 50,
        'АлахБабах': 98.5,
    };

    return promoCodes[promoCode] || 0;
}
