// Create clock ticks
const ticksContainer = document.getElementById('ticks');
for (let i = 0; i < 60; i++) {
    const tick = document.createElement('div');
    tick.className = i % 5 === 0 ? 'tick major' : 'tick';
    tick.style.transform = `rotate(${i * 6}deg) translateX(-50%)`;
    ticksContainer.appendChild(tick);
}

const hourHand = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');
const secondHand = document.getElementById('secondHand');
const digitalTime = document.getElementById('digitalTime');
const dateDisplay = document.getElementById('dateDisplay');
const uptimeDisplay = document.getElementById('uptime');

const startTime = Date.now();

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    // Smooth second hand movement
    const secondDegrees = ((seconds + milliseconds / 1000) * 6);
    const minuteDegrees = ((minutes + seconds / 60) * 6);
    const hourDegrees = ((hours % 12 + minutes / 60) * 30);

    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;

    // Update digital time
    const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    digitalTime.textContent = timeString;

    // Update date
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const dateString = `${days[now.getDay()]} ${months[now.getMonth()]} ${now.getDate()} ${now.getFullYear()}`;
    dateDisplay.textContent = dateString;

    // Update uptime
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const uptimeHours = Math.floor(elapsed / 3600);
    const uptimeMinutes = Math.floor((elapsed % 3600) / 60);
    const uptimeSeconds = elapsed % 60;
    uptimeDisplay.textContent = `${String(uptimeHours).padStart(2, '0')}:${String(uptimeMinutes).padStart(2, '0')}:${String(uptimeSeconds).padStart(2, '0')}`;

    requestAnimationFrame(updateClock);
}

updateClock();