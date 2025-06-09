// src/js/utils/transition.js
export function navigateWithTransition(callback) {
  const content = document.getElementById("content");
  content.style.opacity = "0";
  setTimeout(() => {
    callback();
    content.style.opacity = "1";
  }, 300);
}
