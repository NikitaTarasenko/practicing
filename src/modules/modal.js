function showMod(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }

}

function hideMod(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}


function modal(triggerSelector, modalSelector, modalTimerId) {
    //modal

    const modal = document.querySelector(modalSelector),
        modalOpen = document.querySelectorAll(triggerSelector);

    modalOpen.forEach((item) => {
        item.addEventListener('click', () => showMod(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal__close')) {
            hideMod(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modal.classList.contains('show')) {
            hideMod(modalSelector);
        }
    });



    function showModOnScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showMod(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModOnScroll);
        }

    }
    window.addEventListener('scroll', showModOnScroll);
}

export default modal;
export {
    showMod
};
export {
    hideMod
};