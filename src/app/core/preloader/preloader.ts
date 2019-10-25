const body = document.querySelector('body');
const preloader = document.querySelector('.preloader');

const h = document.querySelector('h1');

body.style.overflow = 'hidden';

function remove() {
    preloader.addEventListener('transitionend', function () {
        preloader.className = 'preloader-hidden';
    });

    preloader.className += ' preloader-hidden-add preloader-hidden-add-active';
}

function loadSuccess() {

    h.classList.add('text-dark');
    h.innerText = '启动成功，请稍候...';
}

export function loadError(mes: string) {
    h.classList.add('text-danger');
    h.innerText = mes + ',启动失败！';
}


(<any>window).appBootstrap = () => {
    loadSuccess();
    remove();
    body.style.overflow = '';
};
