// MADPLAN javascript
function selectDay(index) {
    const days = document.querySelectorAll('.day');
    days.forEach((day, i) => {
        day.classList.toggle('day--active', i === index);
    });
}

function toggleStar(el) {
    const active = el.classList.toggle('active');
    el.textContent = active ? '★' : '☆';
}
