document.addEventListener('DOMContentLoaded', () => {
    const btnIngresar = document.getElementById('btn-ingresar');
    
    btnIngresar.addEventListener('click', () => {
        const usuarioInput = document.getElementById('user-input').value;
        const pinInput = document.getElementById('pin-input').value;

        // 1. Buscamos en el LocalStorage si hay usuarios registrados
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        // 2. Verificación de credenciales (Hardcoded "tester" para pruebas rápidas)
        const usuarioValido = usuarios.find(u => u.user === usuarioInput && u.pin === pinInput) || 
                             (usuarioInput === "tester" && pinInput === "1234");

        if (usuarioValido) {
            // Guardamos la sesión activa
            localStorage.setItem('usuarioLogueado', JSON.stringify({
                user: usuarioInput,
                loginTime: new Date().getTime()
            }));
            
            // Redirección al dashboard (asegúrate de que la ruta sea correcta)
            window.location.href = './pages/dashboard.html';
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Acceso Denegado',
                text: 'Credenciales de red no válidas.',
                background: '#1a1a2e',
                color: '#fff',
                confirmButtonColor: '#00ff88'
            });
        }
    });
});