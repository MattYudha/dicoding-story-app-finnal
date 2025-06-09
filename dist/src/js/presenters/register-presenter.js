// src/js/presenters/register-presenter.js
import { register } from "../api.js";
import { saveToken } from "../utils/auth.js";
import { login } from "../api.js";

export default class RegisterPresenter {
  constructor(view) {
    this.view = view;
  }

  async register({ name, email, password }) {
    try {
      const response = await register({ name, email, password });
      if (response.error) throw new Error(response.message);
      
      const loginResponse = await login({ email, password });
      saveToken(loginResponse.loginResult.token);
      
      // Save user data for welcome message
      localStorage.setItem('userData', JSON.stringify({
        name: name,
        email: email
      }));
      
      this.view.showMessage("Registrasi berhasil! Anda telah login.");
      window.location.hash = "#/";
    } catch (error) {
      if (error.message === "Email is already taken") {
        this.view.showMessage(
          "Email sudah terdaftar. Silakan login atau gunakan email lain."
        );
      } else if (error.message === "terjadi kesalahan pada server kami") {
        this.view.showMessage(
          "Server sedang bermasalah. Silakan coba lagi nanti."
        );
      } else {
        this.view.showMessage(`Registrasi gagal: ${error.message}`);
      }
    }
  }
}