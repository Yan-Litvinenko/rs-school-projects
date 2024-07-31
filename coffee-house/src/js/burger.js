const burger = () => {
    const menu = document.getElementById('menu');
    const handleMobileMenu = () => menu.classList.toggle('menu-active');

    menu.addEventListener('click', handleMobileMenu);
};

document.addEventListener('DOMContentLoaded', () => burger());
