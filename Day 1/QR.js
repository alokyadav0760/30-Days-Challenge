const input = document.getElementById('text-input');
const genBtn = document.getElementById('generate-btn');
const dlBtn = document.getElementById('download-btn');
const qrContainer = document.getElementById('qrcode');
let qr; // will hold the QRCode instance

genBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) return alert('Please enter some text or URL.');

  // Clear any existing QR
  qrContainer.innerHTML = '';

  // Generate new QR code
  qr = new QRCode(qrContainer, {
    text,
    width: 200,
    height: 200,
    colorDark : '#000000',
    colorLight : '#ffffff',
  });

  // Show download button
  dlBtn.style.display = 'inline-block';
});

dlBtn.addEventListener('click', () => {
  if (!qr) return;
  // The QR library creates a <canvas> by default; grab its data URL
  const canvas = qrContainer.querySelector('canvas');
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'qrcode.png';
  link.click();
});
