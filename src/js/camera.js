// src/js/camera.js

/**
 * Memulai kamera dan menampilkannya di elemen video.
 * Mencoba kamera belakang terlebih dahulu, lalu beralih jika gagal.
 * @param {HTMLVideoElement} videoElement - Elemen <video> untuk menampilkan pratinjau.
 * @returns {Promise<MediaStream>} - Promise yang resolve dengan objek MediaStream.
 */
export async function startCamera(videoElement) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }, // Prioritaskan kamera belakang
    });
    videoElement.srcObject = stream;
    return stream;
  } catch (error) {
    if (
      error.name === "NotFoundError" ||
      error.name === "DevicesNotFoundError"
    ) {
      console.warn("Kamera belakang tidak ditemukan, mencoba kamera depan.");
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({
          video: true, // Gunakan kamera apa pun yang tersedia
        });
        videoElement.srcObject = fallbackStream;
        return fallbackStream;
      } catch (fallbackError) {
        console.error("Gagal mengakses kamera fallback:", fallbackError);
        throw fallbackError;
      }
    }
    console.error("Error saat mengakses kamera:", error);
    throw error;
  }
}

/**
 * Mengambil gambar dari elemen video dan menampilkannya di canvas.
 * @param {HTMLVideoElement} videoElement - Elemen video yang sedang berjalan.
 * @param {HTMLCanvasElement} canvasElement - Elemen canvas untuk menggambar frame.
 * @returns {string} - Data URL dari gambar yang diambil (format JPEG).
 */
export function captureImage(videoElement, canvasElement) {
  const context = canvasElement.getContext("2d");
  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;
  context.drawImage(
    videoElement,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );
  return canvasElement.toDataURL("image/jpeg");
}

/**
 * Menghentikan semua trek (video) dari MediaStream.
 * @param {MediaStream} stream - Objek stream yang ingin dihentikan.
 */
export function stopCamera(stream) {
  if (stream && typeof stream.getTracks === "function") {
    stream.getTracks().forEach((track) => track.stop());
    console.log("Aliran kamera berhasil dihentikan.");
  }
}

/**
 * Mengubah Data URL menjadi objek File.
 * @param {string} dataURL - String Data URL dari gambar.
 * @param {string} filename - Nama file yang diinginkan.
 * @returns {File} - Objek File yang bisa di-upload.
 */
export function dataURLtoFile(dataURL, filename) {
  const arr = dataURL.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    throw new Error("Data URL tidak valid");
  }
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
