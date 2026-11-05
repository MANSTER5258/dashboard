// =======================================================
// 1. MODO OSCURO (Fase 4 - Comportamiento manual)
// =======================================================
const btnThemeToggle = document.getElementById('btn-theme-toggle');
const body = document.body;

// Detectar si la computadora del usuario ya está en modo oscuro
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Cambiar el icono al inicio si ya está oscuro
if (systemPrefersDark) {
    btnThemeToggle.textContent = '☀️';
}

btnThemeToggle.addEventListener('click', () => {
    if (systemPrefersDark) {
        // Si la PC es oscura, el botón fuerza el modo claro
        body.classList.toggle('light-theme');
        btnThemeToggle.textContent = body.classList.contains('light-theme') ? '🌙' : '☀️';
    } else {
        // Si la PC es clara, el botón fuerza el modo oscuro
        body.classList.toggle('dark-theme');
        btnThemeToggle.textContent = body.classList.contains('dark-theme') ? '☀️' : '🌙';
    }
});

// =======================================================
// 2. VENTANA MODAL Y ESTADOS DE BOTÓN (Fases 3, 4 y 5)
// =======================================================
const modal = document.getElementById('confirm-modal');
const btnDelete = document.getElementById('btn-delete');
const btnCancelModal = document.getElementById('btn-cancel-modal');
const btnConfirmModal = document.getElementById('btn-confirm-modal');

// Abrir modal al hacer clic en "Eliminar"
btnDelete.addEventListener('click', () => {
    modal.showModal(); 
});

// Cerrar modal con el botón "Cancelar"
btnCancelModal.addEventListener('click', () => {
    modal.close();
});

// Acción destructiva: Simulación de estado "Loading" y bloqueo
btnConfirmModal.addEventListener('click', () => {
    btnConfirmModal.classList.add('loading');
    btnConfirmModal.disabled = true;

    setTimeout(() => {
        btnConfirmModal.classList.remove('loading');
        btnConfirmModal.disabled = false;
        modal.close();
        
        const fila = btnDelete.closest('tr');
        if(fila) fila.remove();
    }, 2000);
});

// =======================================================
// 3. DRAWER / PANEL DESLIZANTE DE CONFIGURACIÓN (Fase 3)
// =======================================================
const drawer = document.getElementById('config-drawer');
const btnCloseDrawer = document.getElementById('btn-close-drawer');
const configLink = document.querySelectorAll('.sidebar a')[2]; // El tercer enlace es "Configuración"
const drawerForm = document.querySelector('.drawer-body');
const btnSaveConfig = drawerForm.querySelector('button[type="submit"]');

// Abrir drawer al hacer clic en el menú lateral
configLink.addEventListener('click', (e) => {
    e.preventDefault(); 
    drawer.style.display = 'flex';
});

// Cerrar drawer
btnCloseDrawer.addEventListener('click', () => {
    drawer.style.display = 'none';
});

// Simular guardado de configuración con estado "Loading"
drawerForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    btnSaveConfig.classList.add('loading');
    btnSaveConfig.disabled = true;

    setTimeout(() => {
        btnSaveConfig.classList.remove('loading');
        btnSaveConfig.disabled = false;
        drawer.style.display = 'none';
        drawerForm.reset(); 
    }, 1500);
});