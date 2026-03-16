// MOBILE SUBMENU POPUP

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
    var popup = document.getElementById("mobileSubmenuPopup");
    var sidebar = document.querySelector(".page-sidebar");
    if (popup && !popup.contains(e.target) && !sidebar.contains(e.target)) {
      closeMobilePopup();
    }
  });
}

function showMobilePopup(clickedElement, submenuItems) {
  createMobilePopup();
  var popup = document.getElementById("mobileSubmenuPopup");
  var rect = clickedElement.getBoundingClientRect();
  popup.style.top = rect.top + "px";
  popup.innerHTML = "";

  submenuItems.forEach(function (item) {
    var div = document.createElement("div");
    div.className = "mobile-submenu-popup-item";
    div.textContent = item.text;
    div.setAttribute("data-page", item.dataPage);
    if (item.element.classList.contains("is-active"))
      div.classList.add("is-active");

    div.addEventListener("click", function (e) {
      e.stopPropagation();
      document.querySelectorAll(".submenu-item-link").forEach(function (i) {
        i.classList.remove("is-active");
      });
      document
        .querySelectorAll(".mobile-submenu-popup-item")
        .forEach(function (i) {
          i.classList.remove("is-active");
        });
      this.classList.add("is-active");
      item.element.classList.add("is-active");
      document.querySelectorAll(".menu-item-link").forEach(function (l) {
        l.classList.remove("is-active");
      });
      closeMobilePopup();
    });

    popup.appendChild(div);
  });

  popup.classList.add("show");
}

function closeMobilePopup() {
  var popup = document.getElementById("mobileSubmenuPopup");
  if (popup) popup.classList.remove("show");
}

// MAIN INITIALIZATION

document.addEventListener("DOMContentLoaded", function () {
  // ── Sidebar dropdown toggle
  document
    .querySelectorAll('.menu-item-link[data-bs-toggle="dropdown"]')
    .forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var submenu = this.nextElementSibling;
        if (submenu && submenu.classList.contains("dropdown-menu")) {
          if (isMobileView()) {
            var submenuItems = [];
            submenu
              .querySelectorAll(".submenu-item-link")
              .forEach(function (item) {
                submenuItems.push({
                  text: item.textContent.trim(),
                  dataPage: item.getAttribute("data-page"),
                  element: item,
                });
              });
            var popup = document.getElementById("mobileSubmenuPopup");
            if (popup && popup.classList.contains("show")) {
              closeMobilePopup();
            } else {
              showMobilePopup(this, submenuItems);
            }
          } else {
            document
              .querySelectorAll(".dropdown-menu")
              .forEach(function (menu) {
                if (menu !== submenu) {
                  menu.classList.remove("is-visible", "show");
                  if (menu.previousElementSibling) {
                    menu.previousElementSibling.classList.remove("is-expanded");
                  }
                }
              });

            this.classList.toggle("is-expanded");
            submenu.classList.toggle("is-visible");
            submenu.classList.toggle("show");
          }
        }

        return false;
      });
    });

  // ── Resize: close mobile popup on desktop
  window.addEventListener("resize", function () {
    if (!isMobileView()) closeMobilePopup();
  });

  // ── COMMENT TEXTAREA CLEAR BUTTONS
  document.querySelectorAll(".comment-textarea").forEach(function (textarea) {
    var wrapper = document.createElement("div");
    wrapper.className = "textarea-wrapper";
    textarea.parentNode.insertBefore(wrapper, textarea);
    wrapper.appendChild(textarea);

    var clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.className = "textarea-clear-btn";
    clearBtn.innerHTML = "&times;";
    clearBtn.title = "지우기";
    wrapper.appendChild(clearBtn);

    textarea.addEventListener("input", function () {
      if (this.value.length > 0) {
        clearBtn.classList.add("visible");
      } else {
        clearBtn.classList.remove("visible");
      }
    });

    clearBtn.addEventListener("click", function () {
      textarea.value = "";
      clearBtn.classList.remove("visible");
      textarea.focus();
    });
  });
}); 

// ── File Upload Function

var uploadBtn = document.getElementById("fileUploadBtn");
var fileInput = document.getElementById("fileInput");
var fileBox = document.getElementById("fileBox");
var fileName = document.getElementById("fileName");
var deleteFile = document.getElementById("deleteFile");

// Open file dialog
uploadBtn.addEventListener("click", function () {
  fileInput.click();
});

// When file selected
fileInput.addEventListener("change", function () {
  if (this.files.length > 0) {
    fileName.textContent = this.files[0].name;
    fileBox.classList.add("show");
  }
});

// Delete file
deleteFile.addEventListener("click", function () {
  fileInput.value = "";
  fileName.textContent = "";
  fileBox.classList.remove("show");
});

// Checkbox Logic

const parentCheckbox = document.getElementById("parentCheckbox");
const childCheckboxes = document.querySelectorAll(".child-checkbox");
const selectedCompanyDiv = document.querySelector(".selected-company");

function updateParentCheckbox() {
    const allChecked = Array.from(childCheckboxes).every(c => c.checked);
    parentCheckbox.checked = allChecked;
}

function updateSelectedTags() {
    selectedCompanyDiv.innerHTML = "";
    childCheckboxes.forEach(function (child) {
        if (child.checked) {
            const num = child.getAttribute("data-number");
            const tag = document.createElement("span");
            tag.className = "selected-tag";
            tag.textContent = num + " ×";

            // Clicking the tag unchecks the corresponding checkbox
            tag.addEventListener("click", function () {
                child.checked = false;
                updateParentCheckbox();
                updateSelectedTags();
            });

            selectedCompanyDiv.appendChild(tag);
        }
    });
}

// Parent checkbox toggles all children
parentCheckbox.addEventListener("change", function () {
    childCheckboxes.forEach(c => c.checked = this.checked);
    updateSelectedTags();
});

// Each child drives the parent and tags
childCheckboxes.forEach(function (child) {
    child.addEventListener("change", function () {
        updateParentCheckbox();
        updateSelectedTags();
    });
});

// Set initial state on page load
updateParentCheckbox();
updateSelectedTags();