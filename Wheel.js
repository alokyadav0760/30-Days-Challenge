// wheel.js
document.addEventListener('DOMContentLoaded', () => {
  // 1. Data for each category
  const data = {
    cities: ['Delhi','Mumbai','Jaipur','Chennai','Kolkata','Bengaluru'],
    cars: ['Tesla','BMW','Audi','Mercedes','Toyota','Honda'],
    movies: ['Inception','Avengers','Titanic','Parasite','Avatar','Joker'],
    foods: ['Pizza','Sushi','Burger','Pasta','Salad','Tacos']
  };

  // 2. Grab elements
  const selector = document.getElementById('selector');
  const startBtn = document.getElementById('startBtn');
  const wheelContainer = document.getElementById('wheelContainer');
  const spinBtn = document.getElementById('spinBtn');
  const resultDiv = document.getElementById('result');
  const canvas = document.getElementById('wheelCanvas');
  const ctx = canvas.getContext('2d');
  const radius = canvas.width / 2;

  let currentItems = [];
  let startAngle = 0;
  let isSpinning = false;

  // Draw the wheel slices
  function drawWheel(items) {
    const sliceAngle = (2 * Math.PI) / items.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    items.forEach((text, i) => {
      const angle = startAngle + i * sliceAngle;
      ctx.fillStyle = i % 2 === 0 ? '#F472B6' : '#60A5FA';
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, angle, angle + sliceAngle);
      ctx.closePath();
      ctx.fill();

      // Draw text
      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(angle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(text, radius - 10, 5);
      ctx.restore();
    });
  }

  // Spin animation with easing
  function spin() {
    if (isSpinning) return;
    isSpinning = true;
    resultDiv.textContent = '';

    const totalTime = 4000;
    const initialVelocity = Math.random() * 10 + 10;
    let elapsed = 0;

    function animate() {
      elapsed += 30;
      // ease-out: decelerate over time
      const t = elapsed / totalTime;
      const delta = initialVelocity * (1 - Math.pow(t, 2));
      startAngle += (delta * Math.PI / 180);
      drawWheel(currentItems);

      if (elapsed < totalTime) {
        requestAnimationFrame(animate);
      } else {
        // determine winner
        const degrees = (startAngle * 180/Math.PI + 90) % 360;
        const idx = Math.floor((360 - degrees) / (360 / currentItems.length)) % currentItems.length;
        isSpinning = false;
        resultDiv.textContent = `You got: ${currentItems[idx]} 🎉`;
      }
    }
    animate();
  }

  // When “Start” is clicked
  startBtn.addEventListener('click', () => {
    const cat = document.getElementById('category').value;
    if (!cat) {
      alert('Please select a category first!');
      return;
    }
    currentItems = data[cat];
    selector.classList.add('hidden');
    wheelContainer.classList.remove('hidden');
    startAngle = 0;
    drawWheel(currentItems);
  });

  // When “Spin” is clicked
  spinBtn.addEventListener('click', spin);
});
