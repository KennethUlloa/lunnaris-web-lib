function progressbarInput(element) {
    element.addEventListener('click', (e) => {
        handleInput(e);
    });
}
function handleInput(e) {
    let offsetX = getRelativeOffset(e);
    e.target.style.setProperty('--ln-progressbar-value', offsetX + '');
}
function getRelativeOffset(e) {
    let rect = e.target.getBoundingClientRect();
    let offsetX = Math.max(e.x - rect.x, 0) / rect.width;
    return offsetX;
}
function toggleClass(source, className) {
    let element = source;
    if (typeof source == 'string') {
        element = document.querySelector(source);
    }
    element.classList.toggle(className);
}
const decimalFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2
});
function formatTime(time) {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
    if (hours === 0) {
        return `${minutes}:${decimalFormatter.format(seconds)}`;
    }
    else {
        return `${hours}:${decimalFormatter.format(minutes)}:${decimalFormatter.format(seconds)}`;
    }
}
