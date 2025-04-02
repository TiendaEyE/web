document.addEventListener('DOMContentLoaded', () => {
    // Inicializar localStorage si no existe
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }

    // Manejar registro
    if (document.getElementById('registerForm')) {
        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const users = JSON.parse(localStorage.getItem('users'));
            const newUser = {
                nombre: document.getElementById('nombre').value,
                telefono: document.getElementById('telefono').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                pedidos: [] // Inicializar array de pedidos al registrar
            };

            // Verificar si el usuario ya existe
            const userExists = users.some(user => user.email === newUser.email);
            if (userExists) {
                showError('El correo ya está registrado');
                return;
            }

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            window.location.href = 'login.html';
        });
    }

    // Manejar login (con inicialización de pedidos)
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const users = JSON.parse(localStorage.getItem('users'));
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const user = users.find(u => u.email === email && u.password === password);
            if (!user) {
                showError('Credenciales incorrectas');
                return;
            }

            // Inicializar pedidos si no existen
            if (!user.pedidos) user.pedidos = [];

            // Guardar sesión
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'NUEVO.html';
        });
    }

    function showError(message) {
        const errorDiv = document.getElementById('error-message');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => errorDiv.style.display = 'none', 3000);
    }
    // Modificar la función de login para inicializar pedidos si no existen
if(document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users'));
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const user = users.find(u => u.email === email && u.password === password);
        if(!user) {
            showError('Credenciales incorrectas');
            return;
        }
        
        // Inicializar pedidos si no existen
        if(!user.pedidos) user.pedidos = [];
        
        // Guardar sesión
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'NUEVO.html';
    });
}
});