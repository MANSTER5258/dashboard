const btnThemeToggle = document.getElementById('btn-theme-toggle');
const body = document.body;

const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (systemPrefersDark) { btnThemeToggle.textContent = '☀️'; }

btnThemeToggle.addEventListener('click', () => {
    if (systemPrefersDark) {
        body.classList.toggle('light-theme');
        btnThemeToggle.textContent = body.classList.contains('light-theme') ? '🌙' : '☀️';
    } else {
        body.classList.toggle('dark-theme');
        btnThemeToggle.textContent = body.classList.contains('dark-theme') ? '☀️' : '🌙';
    }
});

const modal = document.getElementById('confirm-modal');
const btnDelete = document.getElementById('btn-delete');
const btnCancelModal = document.getElementById('btn-cancel-modal');
const btnConfirmModal = document.getElementById('btn-confirm-modal');

btnDelete.addEventListener('click', () => {
    modal.showModal(); 
    document.body.style.overflow = 'hidden'; // Bloquear scroll de fondo
});

btnCancelModal.addEventListener('click', () => {
    modal.close();
    document.body.style.overflow = 'auto'; // Restaurar scroll
});

btnConfirmModal.addEventListener('click', () => {
    btnConfirmModal.classList.add('loading');
    btnConfirmModal.disabled = true;

    setTimeout(() => {
        btnConfirmModal.classList.remove('loading');
        btnConfirmModal.disabled = false;
        modal.close();
        document.body.style.overflow = 'auto';
        
        const fila = btnDelete.closest('tr');
        if(fila) fila.remove();
    }, 2000);
});

// Cerrar modal al dar clic afuera de su contenido
modal.addEventListener('click', (e) => {
    const dialogDimensions = modal.getBoundingClientRect()
    if (
        e.clientX < dialogDimensions.left || e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top || e.clientY > dialogDimensions.bottom
    ) {
        modal.close();
        document.body.style.overflow = 'auto';
    }
});

// DRAWER (PANEL CONFIGURACIÓN)
const drawer = document.getElementById('config-drawer');
const btnCloseDrawer = document.getElementById('btn-close-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const configLink = document.querySelectorAll('.sidebar a')[2]; 
const drawerForm = document.querySelector('.drawer-body');
const btnSaveConfig = drawerForm.querySelector('button[type="submit"]');

configLink.addEventListener('click', (e) => {
    e.preventDefault(); 
    drawer.style.display = 'flex';
    drawerOverlay.style.display = 'block'; // Mostrar fondo oscuro bloqueador
    document.body.style.overflow = 'hidden'; // Evitar scroll al fondo
});

function closeDrawer() {
    drawer.style.display = 'none';
    drawerOverlay.style.display = 'none'; // Ocultar fondo oscuro
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

btnCloseDrawer.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer); // Clic en lo oscuro cierra el panel

drawerForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    btnSaveConfig.classList.add('loading');
    btnSaveConfig.disabled = true;

    setTimeout(() => {
        btnSaveConfig.classList.remove('loading');
        btnSaveConfig.disabled = false;
        closeDrawer();
        drawerForm.reset(); 
    }, 1500);
});

