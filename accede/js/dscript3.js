// MOBILE SUBMENU POPUP

function isMobileView() {
    return window.innerWidth <= 768;
}

function createMobilePopup() {
    if (document.getElementById('mobileSubmenuPopup')) return;
    document.body.insertAdjacentHTML('beforeend', '<div id="mobileSubmenuPopup" class="mobile-submenu-popup"></div>');
    document.addEventListener('click', function(e) {
        var popup = document.getElementById('mobileSubmenuPopup');
        var sidebar = document.querySelector('.page-sidebar');
        if (popup && !popup.contains(e.target) && !sidebar.contains(e.target)) {
            closeMobilePopup();
        }
    });
}

function showMobilePopup(clickedElement, submenuItems) {
    createMobilePopup();
    var popup = document.getElementById('mobileSubmenuPopup');
    var rect = clickedElement.getBoundingClientRect();
    popup.style.top = rect.top + 'px';
    popup.innerHTML = '';

    submenuItems.forEach(function(item) {
        var div = document.createElement('div');
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
    var popup = document.getElementById('mobileSubmenuPopup');
    if (popup) popup.classList.remove('show');
}

// MAIN INITIALIZATION 

document.addEventListener('DOMContentLoaded', function() {

    // Sidebar dropdown toggle
    document.querySelectorAll('.menu-item-link[data-bs-toggle="dropdown"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            var submenu = this.nextElementSibling;
            if (submenu && submenu.classList.contains('dropdown-menu')) {

                if (isMobileView()) {
                    var submenuItems = [];
                    submenu.querySelectorAll('.submenu-item-link').forEach(function(item) {
                        submenuItems.push({
                            text: item.textContent.trim(),
                            dataPage: item.getAttribute('data-page'),
                            element: item
                        });
                    });
                    var popup = document.getElementById('mobileSubmenuPopup');
                    if (popup && popup.classList.contains('show')) {
                        closeMobilePopup();
                    } else {
                        showMobilePopup(this, submenuItems);
                    }

                } else {
                    // Close other open submenus
                    document.querySelectorAll('.dropdown-menu').forEach(function(menu) {
                        if (menu !== submenu) {
                            menu.classList.remove('is-visible', 'show');
                            if (menu.previousElementSibling) {
                                menu.previousElementSibling.classList.remove('is-expanded');
                            }
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

    // Regular menu links (no submenu)
    document.querySelectorAll('.menu-item-link[data-page]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.dropdown-menu').forEach(function(menu) {
                menu.classList.remove('is-visible', 'show');
                if (menu.previousElementSibling) {
                    menu.previousElementSibling.classList.remove('is-expanded');
                }
            });
            closeMobilePopup();
            document.querySelectorAll('.menu-item-link').forEach(function(l) { l.classList.remove('is-active'); });
            this.classList.add('is-active');
        });
    });

    // Submenu item clicks
    var submenuItemEls = document.querySelectorAll('.submenu-item-link');
    submenuItemEls.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            submenuItemEls.forEach(function(i) { i.classList.remove('is-active'); });
            this.classList.add('is-active');
            document.querySelectorAll('.menu-item-link').forEach(function(l) { l.classList.remove('is-active'); });
        });
    });

    // Resize: close mobile popup on desktop
    window.addEventListener('resize', function() {
        if (!isMobileView()) closeMobilePopup();
    });

    // Live score total update
    document.querySelectorAll('.score-input-box').forEach(function(input) {
        input.addEventListener('input', updateTotalScore);
    });

    updateTotalScore();
});

// RESULT DROPDOWN 

$(document).ready(function() {
    $('.js-example-basic-single').select2({
        minimumResultsForSearch: Infinity,
        width: '100%'
    });

    $('.js-example-basic-single').each(function() {
        applyResultColor(this);
    });

    $('.js-example-basic-single').on('change', function() {
        applyResultColor(this);
    });
});

function applyResultColor(el) {
    var rendered = $(el).next('.select2-container').find('.select2-selection__rendered');
    if ($(el).val() === 'WY') {
        rendered.css('color', 'red');
    } else {
        rendered.css('color', '');
    }
}

// LIVE SCORE SUM 

function updateTotalScore() {
    var total = 0;
    document.querySelectorAll('.score-input-box').forEach(function(input) {
        var v = parseInt(input.value, 10);
        if (!isNaN(v)) total += v;
    });
    var el = document.getElementById('totalScore');
    if (el) el.textContent = total;
}

