
let cuenta = {
    usuario: "gaston",
    saldo: 1000,
    movimientos: JSON.parse(localStorage.getItem('historial')) || []
};


async function cargarDatos() {
    try {
        const resp = await fetch('./data/data.json');
        const data = await resp.json();

        // 1. Cargamos datos fijos
        cuenta.usuario = data.usuario;
        cuenta.cotizacion = data.cotizacionDolar;

        // 2. Lógica de Saldo (Prioridad LocalStorage)
        const saldoGuardado = localStorage.getItem('saldo');
        
        if (saldoGuardado === null) {
            cuenta.saldo = data.saldoInicial;
            localStorage.setItem('saldo', data.saldoInicial);
        } else {
            cuenta.saldo = parseFloat(saldoGuardado);
        }

        // 3. Actualizamos la Interfaz
        // IMPORTANTE: Asegurate que estos IDs existan en tu HTML
        const elDolar = document.getElementById('dolar-valor');
        if (elDolar) elDolar.innerText = cuenta.cotizacion;

        renderizarApp(); 

    } catch (error) {
        console.error("Error en la matriz de datos:", error);
    }
}


function renderizarApp() {
    document.getElementById('saldo-valor').innerText = `$${cuenta.saldo.toLocaleString()}`;
    const lista = document.getElementById('lista-transacciones');
    lista.innerHTML = '';

    cuenta.movimientos.forEach(m => {
        const li = document.createElement('li');
        li.className = m.tipo === 'Depósito' ? 'txt-eco' : 'txt-danger';
        li.innerHTML = `<strong>${m.tipo}:</strong> $${m.monto} <br> <small>${m.fecha}</small>`;
        lista.prepend(li); 
    });

    localStorage.setItem('saldo', cuenta.saldo);
    localStorage.setItem('historial', JSON.stringify(cuenta.movimientos));
}

function operar(tipo) {
    const monto = parseFloat(document.getElementById('monto-input').value);

    if (isNaN(monto) || monto <= 0) {
        Swal.fire('Error', 'Por favor, ingrese un monto válido.', 'error');
        return;
    }

    if (tipo === 'Extracción' && monto > cuenta.saldo) {
        Swal.fire('Fondos Insuficientes', 'No puede retirar más de su saldo actual.', 'warning');
        return;
    }

    tipo === 'Depósito' ? cuenta.saldo += monto : cuenta.saldo -= monto;

    cuenta.movimientos.push({
        tipo,
        monto,
        fecha: new Date().toLocaleString()
    });

    document.getElementById('monto-input').value = '';
    renderizarApp();

    Toastify({
        text: `${tipo} realizado con éxito`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: { background: tipo === 'Depósito' ? "#27ae60" : "#e74c3c" }
    }).showToast();
}


document.getElementById('btn-login').addEventListener('click', () => {
    const pin = document.getElementById('pin-input').value;
    if (pin === "1234") {
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        Swal.fire('Bienvenido', 'Eco-Tech Bank le saluda', 'success');
        renderizarApp();
    } else {
        Swal.fire('Acceso Denegado', 'PIN incorrecto', 'error');
    }
});

document.getElementById('btn-deposito').addEventListener('click', () => operar('Depósito'));
document.getElementById('btn-extraccion').addEventListener('click', () => operar('Extracción'));
document.getElementById('btn-logout').addEventListener('click', () => location.reload());


cargarDatos();