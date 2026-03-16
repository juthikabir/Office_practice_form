// Dashboard Page Script - Info Grid Only

// MOBILE SUBMENU POPUP FUNCTIONS

function isMobileView() {
    return window.innerWidth <= 768;
}

function createMobilePopup() {
    if (document.getElementById('mobileSubmenuPopup')) return;
    document.body.insertAdjacentHTML('beforeend', '<div id="mobileSubmenuPopup" class="mobile-submenu-popup"></div>');
    document.addEventListener('click', function(e) {
        const popup = document.getElementById('mobileSubmenuPopup');
        const sidebar = document.querySelector('.page-sidebar');
        if (popup && !popup.contains(e.target) && !sidebar.contains(e.target)) {
            closeMobilePopup();
        }
    });
}

function showMobilePopup(clickedElement, submenuItems) {
    createMobilePopup();
    const popup = document.getElementById('mobileSubmenuPopup');
    const rect = clickedElement.getBoundingClientRect();
    popup.style.top = rect.top + 'px';
    popup.innerHTML = '';

    submenuItems.forEach(function(item) {
        const div = document.createElement('div');
        div.className = 'mobile-submenu-popup-item';
        div.textContent = item.text;
        div.setAttribute('data-page', item.dataPage);
        if (item.element.classList.contains('is-active')) div.classList.add('is-active');
        div.addEventListener('click', function(e) {
            e.stopPropagation();
            document.querySelectorAll('.submenu-item-link').forEach(function(i) { i.classList.remove('is-active'); });
            document.querySelectorAll('.mobile-submenu-popup-item').forEach(function(i) { i.classList.remove('is-active'); });
            this.classList.add('is-active');
            item.element.classList.add('is-active');
            document.querySelectorAll('.menu-item-link').forEach(function(l) { l.classList.remove('is-active'); });
            closeMobilePopup();
        });
        popup.appendChild(div);
    });

    popup.classList.add('show');
}

function closeMobilePopup() {
    const popup = document.getElementById('mobileSubmenuPopup');
    if (popup) popup.classList.remove('show');
}
// MAIN INITIALIZATION

document.addEventListener('DOMContentLoaded', function() {

    // Sidebar dropdown toggle
    const menuLinksWithDropdown = document.querySelectorAll('.menu-item-link[data-bs-toggle="dropdown"]');

    menuLinksWithDropdown.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const submenu = this.nextElementSibling;
            if (submenu && submenu.classList.contains('dropdown-menu')) {
                if (isMobileView()) {
                    const submenuItems = [];
                    submenu.querySelectorAll('.submenu-item-link').forEach(function(item) {
                        submenuItems.push({ text: item.textContent.trim(), dataPage: item.getAttribute('data-page'), element: item });
                    });
                    const popup = document.getElementById('mobileSubmenuPopup');
                    if (popup && popup.classList.contains('show')) {
                        closeMobilePopup();
                    } else {
                        showMobilePopup(this, submenuItems);
                    }
                } else {
                    document.querySelectorAll('.dropdown-menu').forEach(function(menu) {
                        if (menu !== submenu) {
                            menu.classList.remove('is-visible', 'show');
                            if (menu.previousElementSibling) menu.previousElementSibling.classList.remove('is-expanded');
                        }
                    });
                    this.classList.toggle('is-expanded');
                    submenu.classList.toggle('is-visible');
                    submenu.classList.toggle('show');
                }
            }
            return false;
        });
    });

    //Regular menu links
    const regularMenuLinks = document.querySelectorAll('.menu-item-link[data-page]');
    regularMenuLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.dropdown-menu').forEach(function(menu) {
                menu.classList.remove('is-visible', 'show');
                if (menu.previousElementSibling) menu.previousElementSibling.classList.remove('is-expanded');
            });
            closeMobilePopup();
            document.querySelectorAll('.menu-item-link').forEach(function(l) { l.classList.remove('is-active'); });
            this.classList.add('is-active');
        });
    });

    const submenuItemEls = document.querySelectorAll('.submenu-item-link');
    submenuItemEls.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            submenuItemEls.forEach(function(i) { i.classList.remove('is-active'); });
            this.classList.add('is-active');
            document.querySelectorAll('.menu-item-link').forEach(function(l) { l.classList.remove('is-active'); });
        });
    });

    window.addEventListener('resize', function() {
        if (!isMobileView()) closeMobilePopup();
    });
});