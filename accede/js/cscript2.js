function isMobileView() {
  return window.innerWidth <= 768;
}

function createMobilePopup() {
  if (document.getElementById("mobileSubmenuPopup")) return;
  document.body.insertAdjacentHTML(
    "beforeend",
    '<div id="mobileSubmenuPopup" class="mobile-submenu-popup"></div>',
  );
  document.addEventListener("click", function (e) {
    const popup = document.getElementById("mobileSubmenuPopup");
    const sidebar = document.querySelector(".page-sidebar");
    if (popup && !popup.contains(e.target) && !sidebar.contains(e.target))
      closeMobilePopup();
  });
}

function showMobilePopup(clickedElement, submenuItems) {
  createMobilePopup();
  const popup = document.getElementById("mobileSubmenuPopup");
  const rect = clickedElement.getBoundingClientRect();
  popup.style.top = rect.top + "px";
  popup.innerHTML = "";
  submenuItems.forEach(function (item) {
    const div = document.createElement("div");
    div.className = "mobile-submenu-popup-item";
    div.textContent = item.text;
    div.setAttribute("data-page", item.dataPage);
    if (item.element.classList.contains("is-active"))
      div.classList.add("is-active");
    div.addEventListener("click", function (e) {
      e.stopPropagation();
      document
        .querySelectorAll(".submenu-item-link")
        .forEach((i) => i.classList.remove("is-active"));
      document
        .querySelectorAll(".mobile-submenu-popup-item")
        .forEach((i) => i.classList.remove("is-active"));
      this.classList.add("is-active");
      item.element.classList.add("is-active");
      document
        .querySelectorAll(".menu-item-link")
        .forEach((l) => l.classList.remove("is-active"));
      closeMobilePopup();
    });
    popup.appendChild(div);
  });
  popup.classList.add("show");
}

function closeMobilePopup() {
  const popup = document.getElementById("mobileSubmenuPopup");
  if (popup) popup.classList.remove("show");
}

document.addEventListener("DOMContentLoaded", function () {
 
  // Date Pickers
let startFp;
let endFp;

startFp = flatpickr("#startDatePicker", {
  dateFormat: "Y-m-d",
  allowInput: false,
  disableMobile: true,
  appendTo: document.body,
  static: false,
  onOpen: function () {
    if (endFp) endFp.close();
  },
});

endFp = flatpickr("#endDatePicker", {
  dateFormat: "Y-m-d",
  allowInput: false,
  disableMobile: true,
  appendTo: document.body,
  static: false,
  onOpen: function () {
    if (startFp) startFp.close();
  },
});
  

  document
    .getElementById("startCalBtn")
    .addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      startFp.open();
    });
  document.getElementById("endCalBtn").addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    endFp.open();
  });

  document
    .getElementById("startDatePicker")
    .addEventListener("click", function () {
      startFp.open();
    });
  document
    .getElementById("endDatePicker")
    .addEventListener("click", function () {
      endFp.open();
    });

  // Sidebar Dropdown Toggle 
  document
    .querySelectorAll('.menu-item-link[data-bs-toggle="dropdown"]')
    .forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const submenu = this.nextElementSibling;
        if (submenu && submenu.classList.contains("dropdown-menu")) {
          if (isMobileView()) {
            const items = [];
            submenu
              .querySelectorAll(".submenu-item-link")
              .forEach(function (item) {
                items.push({
                  text: item.textContent.trim(),
                  dataPage: item.getAttribute("data-page"),
                  element: item,
                });
              });
            const popup = document.getElementById("mobileSubmenuPopup");
            if (popup && popup.classList.contains("show")) closeMobilePopup();
            else showMobilePopup(this, items);
          } else {
            document
              .querySelectorAll(".dropdown-menu")
              .forEach(function (menu) {
                if (menu !== submenu)
                  menu.classList.remove("is-visible", "show");
              });
            submenu.classList.toggle("is-visible");
            submenu.classList.toggle("show");
          }
        }
      });
    });

  // Regular Menu Links 
  document
    .querySelectorAll(".menu-item-link[data-page]")
    .forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        document
          .querySelectorAll(".dropdown-menu")
          .forEach((m) => m.classList.remove("is-visible", "show"));
        closeMobilePopup();
        document
          .querySelectorAll(".menu-item-link")
          .forEach((l) => l.classList.remove("is-active"));
        this.classList.add("is-active");
      });
    });

  // Submenu Items 
  document.querySelectorAll(".submenu-item-link").forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.stopPropagation();
      document
        .querySelectorAll(".submenu-item-link")
        .forEach((i) => i.classList.remove("is-active"));
      document
        .querySelectorAll(".menu-item-link")
        .forEach((l) => l.classList.remove("is-active"));
      this.classList.add("is-active");
    });
  });

  window.addEventListener("resize", function () {
    if (!isMobileView()) closeMobilePopup();
  });
});
