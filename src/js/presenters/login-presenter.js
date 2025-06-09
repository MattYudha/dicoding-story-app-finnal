// src/js/presenters/login-presenter.js
import { login } from "../api.js";
import { saveToken } from "../utils/auth.js";

export default class LoginPresenter {
  constructor(view) {
    this.view = view;
  }

  async login({ email, password }) {
    try {
      const response = await login({ email, password });
      if (response.error) throw new Error(response.message);
      
      saveToken(response.loginResult.token);
      
      // Save user data for welcome message
      localStorage.setItem('userData', JSON.stringify({
        name: response.loginResult.name || email.split('@')[0],
        email: email
      }));
      
      this.view.showMessage("Login berhasil!");
      window.location.hash = "#/";
    } catch (error) {
      if (error.message === "User not found") {
        this.view.showMessage(
          "Pengguna tidak ditemukan. Silakan registrasi terlebih dahulu."
        );
      } else {
        this.view.showMessage(`Login gagal: ${error.message}`);
      }
    }
  }
}