//Dashboard Page - Dropdown Menu Handler and Date Picker

// MOBILE SUBMENU POPUP FUNCTIONS

function isMobileView() {
    return window.innerWidth <= 768;
}

function createMobilePopup() {
    if (document.getElementById('mobileSubmenuPopup')) {
        return;
    }
    
    const popupHTML = `
        <div id="mobileSubmenuPopup" class="mobile-submenu-popup"></div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    
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
    
    submenuItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'mobile-submenu-popup-item';
        div.textContent = item.text;
        div.setAttribute('data-page', item.dataPage);
        
        if (item.element.classList.contains('is-active')) {
            div.classList.add('is-active');
        }
        
        div.addEventListener('click', function(e) {
            e.stopPropagation();
            document.querySelectorAll('.submenu-item-link').forEach(i => i.classList.remove('is-active'));
            document.querySelectorAll('.mobile-submenu-popup-item').forEach(i => i.classList.remove('is-active'));
            this.classList.add('is-active');
            item.element.classList.add('is-active');
            document.querySelectorAll('.menu-item-link').forEach(l => l.classList.remove('is-active'));
            console.log('Mobile submenu item clicked:', this.getAttribute('data-page'));
            closeMobilePopup();
        });
        
        popup.appendChild(div);
    });
    
    popup.classList.add('show');
}

function closeMobilePopup() {
    const popup = document.getElementById('mobileSubmenuPopup');
    if (popup) {
        popup.classList.remove('show');
    }
}

// ADJUST TABLE POSITION DYNAMICALLY

function adjustTablePosition() {
    const filterSection = document.querySelector('.filter-section');
    const tableContent = document.querySelector('.table-content');
    if (filterSection && tableContent) {
        const filterBottom = filterSection.getBoundingClientRect().bottom;
        tableContent.style.top = (filterBottom + 20) + 'px';
    }
}

// CUSTOM DROPDOWN FUNCTIONALITY

function initializeCustomDropdowns() {
    const dropdowns = document.querySelectorAll('.custom-dropdown');
    
    dropdowns.forEach(function(dropdown) {
        const selected = dropdown.querySelector('.custom-dropdown-selected');
        const menu = dropdown.querySelector('.custom-dropdown-menu');
        const items = dropdown.querySelectorAll('.custom-dropdown-item');
        
        selected.addEventListener('click', function(e) {
            e.stopPropagation();
            document.querySelectorAll('.custom-dropdown').forEach(function(otherDropdown) {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
            dropdown.classList.toggle('active');
        });
        
        items.forEach(function(item) {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                selected.textContent = this.textContent;
                dropdown.classList.remove('active');
                items.forEach(i => i.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    });
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.custom-dropdown')) {
            document.querySelectorAll('.custom-dropdown').forEach(function(dropdown) {
                dropdown.classList.remove('active');
            });
        }
    });
}

// DATE PICKER INITIALIZATION WITH RANGE VALIDATION

function initializeDatePickers() {
    const dateInputs = document.querySelectorAll('.filter-date-input-modern');
    
    if (dateInputs.length >= 2) {
        const startDateInput = dateInputs[0];
        const endDateInput = dateInputs[1];
        
        const startDatePicker = flatpickr(startDateInput, {
            dateFormat: "Y-m-d",
            allowInput: true,
            disableMobile: true,
            clickOpens: false,
            locale: { firstDayOfWeek: 0 },
            onChange: function(selectedDates, dateStr, instance) {
                if (selectedDates.length > 0) {
                    const selectedDate = selectedDates[0];
                    const minDate = new Date(selectedDate);
                    minDate.setDate(minDate.getDate() + 1);
                    endDatePicker.set('minDate', minDate);
                    if (endDatePicker.selectedDates.length > 0 && endDatePicker.selectedDates[0] <= selectedDate) {
                        endDatePicker.clear();
                    }
                }
            }
        });
        
        const endDatePicker = flatpickr(endDateInput, {
            dateFormat: "Y-m-d",
            allowInput: true,
            disableMobile: true,
            clickOpens: false,
            locale: { firstDayOfWeek: 0 },
            minDate: null
        });
        
        const startIcon = startDateInput.parentElement.querySelector('.bi-calendar3');
        if (startIcon) {
            startIcon.style.cursor = 'pointer';
            startIcon.addEventListener('click', function() { startDatePicker.open(); });
        }
        
        const endIcon = endDateInput.parentElement.querySelector('.bi-calendar3');
        if (endIcon) {
            endIcon.style.cursor = 'pointer';
            endIcon.addEventListener('click', function() { endDatePicker.open(); });
        }
        
        return { startDatePicker, endDatePicker };
    } else {
        dateInputs.forEach(function(input) {
            const fp = flatpickr(input, {
                dateFormat: "Y-m-d",
                allowInput: true,
                disableMobile: true,
                clickOpens: false,
                locale: { firstDayOfWeek: 0 }
            });
            const icon = input.parentElement.querySelector('.bi-calendar3');
            if (icon) {
                icon.style.cursor = 'pointer';
                icon.addEventListener('click', function() { fp.open(); });
            }
        });
        return null;
    }
}

// QUICK DATE BUTTONS FUNCTIONALITY

function initializeQuickDateButtons(startDatePicker, endDatePicker) {
    if (!startDatePicker || !endDatePicker) {
        console.warn('Date pickers not initialized, skipping quick date buttons');
        return;
    }
    
    const quickDateButtons = document.querySelectorAll('.btn-date-quick-modern');
    
    if (quickDateButtons.length >= 4) {
        quickDateButtons[0].addEventListener('click', function() {
            const today = new Date();
            const yesterday = new Date();
            yesterday.setDate(today.getDate() - 1);
            startDatePicker.setDate(yesterday, true);
            endDatePicker.setDate(today, true);
        });
        
        quickDateButtons[1].addEventListener('click', function() {
            const today = new Date();
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(today.getDate() - 7);
            startDatePicker.setDate(sevenDaysAgo, true);
            endDatePicker.setDate(today, true);
        });
        
        quickDateButtons[2].addEventListener('click', function() {
            const today = new Date();
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(today.getMonth() - 1);
            startDatePicker.setDate(oneMonthAgo, true);
            endDatePicker.setDate(today, true);
        });
        
        quickDateButtons[3].addEventListener('click', function() {
            const today = new Date();
            const twoMonthsAgo = new Date();
            twoMonthsAgo.setMonth(today.getMonth() - 2);
            startDatePicker.setDate(twoMonthsAgo, true);
            endDatePicker.setDate(today, true);
        });
        
        console.log('Quick date buttons initialized!');
    }
}

// BUILD CUSTOM TABLE INFO BAR (replaces DataTables default info + buttons row)

function buildTableInfoBar(dtInstance) {
    const tableContent = document.querySelector('.table-content');
    if (!tableContent) return;

    // Wrap the DataTable wrapper in a card if not already done
    const wrapper = document.getElementById('example_wrapper');
    if (!wrapper) return;

    // Create card container
    let tableCard = document.querySelector('.table-card');
    if (!tableCard) {
        tableCard = document.createElement('div');
        tableCard.className = 'table-card';
        wrapper.parentNode.insertBefore(tableCard, wrapper);
        tableCard.appendChild(wrapper);
    }

    // Create info bar above the wrapper
    let infoBar = document.querySelector('.table-info-bar');
    if (!infoBar) {
        infoBar = document.createElement('div');
        infoBar.className = 'table-info-bar';
        tableCard.parentNode.insertBefore(infoBar, tableCard);
    }

    // Total count
    const totalRows = dtInstance.rows().count();
        infoBar.innerHTML = `
        <span class="table-total-count">총 ${totalRows}건</span>
        <button class="btn-excel-download" id="btnExcelDownload">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="3" width="20" height="18" rx="2" fill="#e8f5e9" stroke="#4caf50" stroke-width="1.5"/>
                <path d="M8 8l2.5 4-2.5 4M16 8l-2.5 4 2.5 4" stroke="#4caf50" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M2 9h20" stroke="#4caf50" stroke-width="1" stroke-opacity="0.4"/>
            </svg>
            엑셀 다운로드
        </button>
    `;

    // Excel button triggers DataTables export
    document.getElementById('btnExcelDownload').addEventListener('click', function() {
        dtInstance.button('.buttons-excel').trigger();
    });
}

// MAIN INITIALIZATION

document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard Page loaded!');
    
    // Initialize Custom Dropdowns
    initializeCustomDropdowns();
    console.log('Custom dropdowns initialized!');
    
    // Initialize Date Pickers
    let datePickers = null;
    if (typeof flatpickr !== 'undefined') {
        datePickers = initializeDatePickers();
        console.log('Date pickers initialized!');
        if (datePickers) {
            initializeQuickDateButtons(datePickers.startDatePicker, datePickers.endDatePicker);
        }
    } else {
        console.warn('Flatpickr library not loaded');
    }
    
    // Sidebar dropdown toggle
    const menuLinksWithDropdown = document.querySelectorAll('.menu-item-link[data-bs-toggle="dropdown"]');
    
    menuLinksWithDropdown.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const submenu = this.nextElementSibling;
            
            if (submenu && submenu.classList.contains('dropdown-menu')) {
                if (isMobileView()) {
                    console.log('Mobile view - showing popup');
                    const submenuItems = [];
                    submenu.querySelectorAll('.submenu-item-link').forEach(item => {
                        submenuItems.push({
                            text: item.textContent.trim(),
                            dataPage: item.getAttribute('data-page'),
                            element: item
                        });
                    });
                    const popup = document.getElementById('mobileSubmenuPopup');
                    if (popup && popup.classList.contains('show')) {
                        closeMobilePopup();
                    } else {
                        showMobilePopup(this, submenuItems);
                    }
                } else {
                    console.log('Desktop view - showing dropdown');
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
    
    if (typeof bootstrap !== 'undefined' && bootstrap.Dropdown) {
        menuLinksWithDropdown.forEach(function(link) {
            link.addEventListener('show.bs.dropdown', function(e) { e.preventDefault(); e.stopPropagation(); return false; });
            link.addEventListener('hide.bs.dropdown', function(e) { e.preventDefault(); e.stopPropagation(); return false; });
        });
    }
    
    const regularMenuLinks = document.querySelectorAll('.menu-item-link[data-page]');
    regularMenuLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.dropdown-menu').forEach(function(menu) {
                menu.classList.remove('is-visible', 'show');
                if (menu.previousElementSibling) {
                    menu.previousElementSibling.classList.remove('is-expanded');
                }
            });
            closeMobilePopup();
            document.querySelectorAll('.menu-item-link').forEach(l => l.classList.remove('is-active'));
            this.classList.add('is-active');
        });
    });
    
    const submenuItems = document.querySelectorAll('.submenu-item-link');
    submenuItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            submenuItems.forEach(i => i.classList.remove('is-active'));
            this.classList.add('is-active');
            document.querySelectorAll('.menu-item-link').forEach(l => l.classList.remove('is-active'));
        });
    });
    
    window.addEventListener('resize', function() {
        if (!isMobileView()) {
            closeMobilePopup();
        }
        adjustTablePosition();
    });

    // Table initialization
    loadCSS('https://cdn.datatables.net/buttons/3.1.2/css/buttons.dataTables.css');

    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js', function() {
        loadScript('https://cdn.datatables.net/buttons/3.1.2/js/dataTables.buttons.js', function() {
            loadScript('https://cdn.datatables.net/buttons/3.1.2/js/buttons.html5.js', function() {

                const dtInstance = new DataTable('#example', {
                    ordering: false,
                    // Hide the top info/buttons row, keep only pagination
                    dom: 't<"table-pagination-outside"p>',
                    buttons: [
                        {
                            extend: 'excel',
                            text: 'Excel',
                            filename: 'table_data',
                            className: 'buttons-excel'
                        }
                    ]
                });

                // Build custom info bar with total count + Excel button
                buildTableInfoBar(dtInstance);

                const pagination = document.querySelector('.table-pagination-outside');
                const tableCard = document.querySelector('.table-card');

                if(pagination && tableCard) {
                    tableCard.parentNode.insertBefore(pagination, tableCard.nextSibling);
                }

                // Wrapper padding & margin
                const wrapper = document.getElementById('example_wrapper');
                if (wrapper) {
                    wrapper.style.padding = '0';
                    wrapper.style.margin = '0';
                }

                // Adjust table position AFTER DataTable is fully rendered
                adjustTablePosition();
            });
        });
    });
});

// CSS/JS Loader helpers
function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}