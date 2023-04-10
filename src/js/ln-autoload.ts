function prepareToggleButtons() {
    let btns = document.querySelectorAll('.ln-nav-toggle-btn');
    btns.forEach(btn => {
        if(btn.hasAttribute("data-ln-target")) {
            btn.addEventListener('click', () => {
                let target = document.querySelector(btn.getAttribute("data-ln-target"));
                if(target !== null) {
                    target.classList.toggle('ln-initial');
                }
            })
        }
    });
}


window.onload = () => {
    prepareToggleButtons();
}