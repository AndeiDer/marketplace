document.addEventListener('DOMContentLoaded', () => {
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registrationForm = document.getElementById('registration-form');
    const switchLinks = document.querySelectorAll('.switch-link a');
    const registerPasswordInput = document.getElementById('register-password');
    const registerConfirmPasswordInput = document.getElementById('register-confirm-password');
    const passwordMatchError = document.getElementById('password-match-error');
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const loginError = document.createElement('div');
    loginError.className = 'error-message';
    loginError.style.color = 'red';
    loginForm.insertBefore(loginError, loginForm.querySelector('.submit-button'));

    function showLoginForm() {
        loginForm.classList.add('active');
        registrationForm.classList.remove('active');
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        passwordMatchError.style.display = 'none';
        loginError.textContent = '';
    }

    function showRegistrationForm() {
        registrationForm.classList.add('active');
        loginForm.classList.remove('active');
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        passwordMatchError.style.display = 'none';
        loginError.textContent = '';
    }

    loginTab.addEventListener('click', (e) => {
        e.preventDefault();
        showLoginForm();
    });

    registerTab.addEventListener('click', (e) => {
        e.preventDefault();
        showRegistrationForm();
    });

    switchLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = link.getAttribute('data-tab');
            if (targetTab === 'register') {
                showRegistrationForm();
            } else if (targetTab === 'login') {
                showLoginForm();
            }
        });
    });

    registrationForm.addEventListener('submit', (e) => {
        const password = registerPasswordInput.value;
        const confirmPassword = registerConfirmPasswordInput.value;

        if (password !== confirmPassword) {
            e.preventDefault();
            passwordMatchError.style.display = 'block';
        } else {
            passwordMatchError.style.display = 'none';
            console.log('Паролі співпадають, можна відправляти дані.');
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        loginError.textContent = '';

        const email = loginEmailInput.value.trim();
        const password = loginPasswordInput.value;

        if (!email || !password) {
            loginError.textContent = 'Будь ласка, заповніть всі поля.';
            return;
        }

        // Перенаправлення відбувається завжди після заповнення полів (для локального тестування)
        console.log('Спроба входу з email:', email, 'та паролем:', password);
        console.log('Вхід імітовано! Перенаправлення...');
        window.location.href = 'profile.html';
    });
});