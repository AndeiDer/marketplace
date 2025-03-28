document.addEventListener('DOMContentLoaded', () => {
    const editProfileForm = document.getElementById('edit-profile-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const addressInput = document.getElementById('address');

    // Отримання даних користувача з localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        nameInput.value = user.name;
        emailInput.value = user.email;
        addressInput.value = user.address;
    } else {
        // Перенаправлення на сторінку входу, якщо користувач не авторизований
        window.location.href = 'login.html';
    }

    editProfileForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Запобігаємо стандартному надсиланню форми

        const updatedUser = {
            name: nameInput.value,
            email: emailInput.value,
            address: addressInput.value
        };

        // Збереження оновлених даних користувача в localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Перенаправлення на сторінку особистого кабінету
        window.location.href = 'profile.html';
    });
});