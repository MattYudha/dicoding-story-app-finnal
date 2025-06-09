import { createElement } from '../utils/dom.js';

export default class NotFoundView {
  init() {
    const content = createElement('div', { class: 'not-found-container' });
    content.innerHTML = `
      <h2>404 - Halaman Tidak Ditemukan</h2>
      <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>
      <a href="#/home" class="back-home">Kembali ke Beranda</a>
    `;
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').appendChild(content);
  }
}