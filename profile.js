document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            console.log('Вихід...');
            window.location.href = 'auth.html';
        });
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (event) => {
            navLinks.classList.toggle('show');
            event.stopPropagation(); // Зупиняємо спливання події, щоб не спрацював обробник на document одразу
        });

        document.addEventListener('click', (event) => {
            const isClickInsideMenu = navLinks.contains(event.target);
            const isClickInsideToggle = menuToggle.contains(event.target);
            const isMenuOpen = navLinks.classList.contains('show');

            if (isMenuOpen && !isClickInsideMenu && !isClickInsideToggle) {
                navLinks.classList.remove('show');
            }
        });
    }
});