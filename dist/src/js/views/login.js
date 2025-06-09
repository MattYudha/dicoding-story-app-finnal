// src/js/views/login.js
import LoginPresenter from "../presenters/login-presenter.js"; // dari src/js/views/ ke src/js/presenters/login-presenter.js
import { createElement } from "../utils/dom.js"; // dari src/js/views/ ke src/js/utils/dom.js

export default class LoginView {
  constructor() {
    this.presenter = new LoginPresenter(this);
  }

  async init() {
    const content = createElement("div", { class: "auth-container" });
    content.innerHTML = `
      <h2>Login</h2>
      <form id="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" required aria-required="true">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" required aria-required="true">
        </div>
        <button type="submit" aria-label="Masuk ke akun">Login</button>
      </form>
      <p>Belum punya akun? <a href="#/register" aria-label="Daftar akun baru">Register di sini</a></p>
    `;
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").appendChild(content);

    document
      .getElementById("login-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        await this.presenter.login({ email, password });
      });
  }

  showMessage(message) {
    alert(message);
  }
}
