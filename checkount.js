document.addEventListener('DOMContentLoaded', () => {
    const checkoutCartItemsList = document.getElementById('checkout-cart-items');
    const checkoutTotalPriceElement = document.getElementById('checkout-total-price');
    const promoCodeInput = document.getElementById('checkout-promo-code-input');
    const applyPromoCodeButton = document.getElementById('apply-checkout-promo-code');
    const promoCodeStatus = document.getElementById('checkout-promo-code-status');
    const checkoutTotalWithoutDiscount = document.getElementById('checkout-total-without-discount'); // Додано елемент для старої ціни
    const deliverySelect = document.getElementById('delivery');
    const totalPaymentElement = document.getElementById('total-payment');
    const paymentSelect = document.getElementById('payment');
    const cardDetailsDiv = document.getElementById('card-details');

    let cart = [];
    let discount = 0; // Змінна для зберігання розміру знижки
    let deliveryCost = 0;
    let totalOrderPrice = 0; // Змінна для зберігання поточної суми замовлення (з урахуванням знижки)
    let groupedCart = [];



    // Перевіряємо початкове значення способу оплати при завантаженні сторінки
    if (paymentSelect.value === 'card') {
        cardDetailsDiv.style.display = 'block';
    } else {
        cardDetailsDiv.style.display = 'none';
    }

    // Обробник зміни способу оплати
    paymentSelect.addEventListener('change', () => {
        const selectedPayment = paymentSelect.value;
        if (selectedPayment === 'card') {
            cardDetailsDiv.style.display = 'block'; // Показуємо блок з даними картки
        } else {
            cardDetailsDiv.style.display = 'none'; // Приховуємо блок
        }
    });

    try {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (error) {
        console.error('Помилка зчитування кошика з localStorage на сторінці оформлення:', error);
        cart = [];
    }

    if (cart.length === 0) {
        checkoutCartItemsList.innerHTML = '<p>Ваш кошик порожній</p>';
        checkoutTotalPriceElement.textContent = '0';
        totalPaymentElement.textContent = '0 грн';
        return;
    }

    groupedCart = cart.reduce((acc, item) => {
        const existingItem = acc.find(i => i.name === item.name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            acc.push({ ...item, quantity: 1 });
        }
        return acc;
    }, []);

    let totalOrderPriceBeforeDiscount = 0;

    groupedCart.forEach(item => {
        const itemTotalPrice = item.price * item.quantity;
        const listItem = document.createElement('li');
        listItem.classList.add('checkout-cart-item');

        listItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: contain; margin-right: 10px; vertical-align: middle;">
            <span>${item.name} (x${item.quantity}) - ${itemTotalPrice} грн</span>
        `;
        checkoutCartItemsList.appendChild(listItem);
        totalOrderPriceBeforeDiscount += itemTotalPrice;
    });

    // Функція для отримання знижки
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

    // Функція для оновлення загальної суми до сплати
    function updateTotalPayment() {
        const totalPayment = parseFloat(checkoutTotalPriceElement.textContent) + deliveryCost;
        totalPaymentElement.textContent = totalPayment.toFixed(2) + ' грн';
    }

    // Функція для встановлення початкової вартості доставки на основі вибраного значення
    function setInitialDeliveryCost() {
        const selectedDelivery = deliverySelect.value;
        if (selectedDelivery === 'courier') {
            deliveryCost = 500;
        } else if (selectedDelivery === 'post') {
            deliveryCost = 100;
        } else {
            deliveryCost = 0;
        }
        updateTotalPayment(); // Оновлюємо загальну суму одразу після встановлення вартості
    }

    // Функція для застосування знижки та оновлення відображення ціни
    function applyDiscount(promo = null) {
        let currentDiscount = 0;
        let message = 'Введіть промокод для отримання знижки'; // Початкове повідомлення
        promoCodeStatus.style.color = ''; // Скидаємо колір

        if (promo) {
            currentDiscount = getDiscount(promo);
            if (currentDiscount > 0) {
                message = `Промокод "${promo}" застосовано! Знижка ${currentDiscount}%`;
                promoCodeStatus.style.color = 'green';
                localStorage.setItem('appliedPromoCode', promo); // Зберігаємо успішний промокод
            } else {
                message = 'Промокод не дійсний';
                promoCodeStatus.style.color = 'red';
                localStorage.removeItem('appliedPromoCode'); // Видаляємо недійсний промокод
            }
        } else {
            const storedPromoCode = localStorage.getItem('appliedPromoCode');
            if (storedPromoCode) {
                currentDiscount = getDiscount(storedPromoCode);
                promoCodeInput.value = storedPromoCode;
                message = `Застосовано знижку ${currentDiscount}% (з попереднього сеансу)`;
                promoCodeStatus.style.color = 'green';
            }
        }

        totalOrderPrice = totalOrderPriceBeforeDiscount * (1 - currentDiscount / 100);
        checkoutTotalPriceElement.textContent = totalOrderPrice.toFixed(2);
        updateTotalPayment(); // Оновлюємо загальну суму до сплати після застосування знижки
        promoCodeStatus.textContent = message;

        if (currentDiscount > 0) {
            if (checkoutTotalWithoutDiscount) {
                checkoutTotalWithoutDiscount.textContent = `${totalOrderPriceBeforeDiscount.toFixed(2)} грн`;
            }
            discount = currentDiscount; // Оновлюємо глобальну змінну знижки
        } else {
            if (checkoutTotalWithoutDiscount) {
                checkoutTotalWithoutDiscount.textContent = '';
            }
            discount = 0;
        }
    }

    // Обробник зміни способу доставки
    deliverySelect.addEventListener('change', () => {
        const selectedDelivery = deliverySelect.value;
        if (selectedDelivery === 'courier') {
            deliveryCost = 500;
        } else if (selectedDelivery === 'post') {
            deliveryCost = 100;
        } else {
            deliveryCost = 0;
        }
        updateTotalPayment();
    });

    // Обробник натискання на кнопку "Застосувати"
    applyPromoCodeButton.addEventListener('click', () => {
        const promo = promoCodeInput.value.trim();
        applyDiscount(promo);
    });

    // Отримуємо промокод з URL при завантаженні сторінки (якщо є)
    const urlParams = new URLSearchParams(window.location.search);
    const promoCodeFromUrl = urlParams.get('promo');
    if (promoCodeFromUrl) {
        applyDiscount(promoCodeFromUrl);
    } else {
        applyDiscount(); // Відображаємо початкове повідомлення або промокод з localStorage
    }

    // Виводимо початкову загальну суму без знижки
    checkoutTotalPriceElement.insertAdjacentHTML('beforebegin', `<div id="checkout-total-without-discount" style="font-size: 0.9em; color: #777; text-decoration: line-through; text-align: right; margin-bottom: 5px;"></div>`);
    applyDiscount(); // Розраховуємо початкову суму товарів та застосовуємо можливу знижку
    setInitialDeliveryCost(); // Встановлюємо початкову вартість доставки після розрахунку суми
});