import { initRouter } from './router.js';
import { initDB } from './db.js';
import { Workbox } from 'workbox-window';

async function init() {
  await initDB();
  initRouter();
  setupInstallPrompt();

  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js');

    wb.addEventListener('installed', (event) => {
      if (event.isUpdate) {
        if (confirm('New app update is available! Click OK to refresh.')) {
          window.location.reload();
        }
      }
    });

    wb.register();
  }
}

function setupInstallPrompt() {
  let deferredPrompt;
  const installBtn = document.getElementById('install-app-btn');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    if (installBtn) {
      installBtn.style.display = 'flex';
    }
  });

  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const result = await deferredPrompt.userChoice;
        if (result.outcome === 'accepted') {
          installBtn.style.display = 'none';
        }
        deferredPrompt = null;
      }
    });
  }

  // Hide install button if app is already installed
  if (window.matchMedia('(display-mode: standalone)').matches) {
    if (installBtn) {
      installBtn.style.display = 'none';
    }
  }
}

init();