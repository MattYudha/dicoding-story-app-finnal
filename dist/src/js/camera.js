// src/js/camera.js
export async function startCamera(videoElement) {
  try {
    // First attempt: try to use the back camera (environment)
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });
    videoElement.srcObject = stream;
    return stream;
  } catch (error) {
    // If the specific camera request fails, try a fallback with general video constraint
    if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
      try {
        console.warn("Environment camera not found, trying fallback to any available camera");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoElement.srcObject = stream;
        return stream;
      } catch (fallbackError) {
        console.error("Fallback camera access also failed:", fallbackError);
        throw fallbackError;
      }
    }
    console.error("Error accessing camera:", error);
    throw error;
  }
}

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

export function stopCamera(stream) {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
}

export function dataURLtoFile(dataURL, filename) {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}