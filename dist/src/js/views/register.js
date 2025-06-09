// src/js/views/register.js
import RegisterPresenter from "../presenters/register-presenter.js";
import { createElement } from "../utils/dom.js";

export default class RegisterView {
  constructor() {
    this.presenter = new RegisterPresenter(this);
  }

  async init() {
    const content = createElement("div", { class: "auth-container" });
    content.innerHTML = `
      <h2>Register</h2>
      <form id="register-form">
        <div class="form-group">
          <label for="name">Nama</label>
          <input type="text" id="name" required aria-required="true">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" required aria-required="true">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" required aria-required="true" minlength="8">
        </div>
        <button type="submit" aria-label="Daftar akun baru">Register</button>
      </form>
      <p>Sudah punya akun? <a href="#/login" aria-label="Masuk ke akun">Login di sini</a></p>
    `;
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").appendChild(content);

    document
      .getElementById("register-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!name || !email || !password) {
          this.showMessage("Semua kolom harus diisi!");
          return;
        }
        await this.presenter.register({ name, email, password });
      });
  }

  showMessage(message) {
    alert(message);
  }
}
