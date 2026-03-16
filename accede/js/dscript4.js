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

//  IMAGE SECTION MANAGEMENT

var imageSections = new Map();
var modalTempImages = [];
var activeSection = null;

function renderPortalImages(wrapper, infoText) {
  var data = imageSections.get(wrapper);
  if (!data) return;

  var images = data.images;
  wrapper.innerHTML = "";

  if (images.length === 0) {
    if (infoText) infoText.style.display = "";
    return;
  }

  if (infoText) infoText.style.display = "none";

  images.forEach(function (imgData) {
    var imgBox = document.createElement("div");
    imgBox.className =
      "position-relative overflow-hidden rounded image-box-120";

    var img = document.createElement("img");
    img.src = imgData.src;
    img.className = "w-100 h-100 object-fit-cover border rounded";
    imgBox.appendChild(img);

    imgBox.addEventListener("click", function () {
      openImageModal(wrapper);
    });

    wrapper.appendChild(imgBox);
  });
}

function renderModalImages() {
  var grid = document.getElementById("modalImageGrid");
  grid.innerHTML = "";

  if (modalTempImages.length === 0) {
    var empty = document.createElement("p");
    empty.textContent = "이미지가 없습니다.";
    empty.className = "color:#aaa; font-size:14px; margin:auto;";
    grid.appendChild(empty);
    return;
  }

  modalTempImages.forEach(function (imgData, index) {
    var imgBox = document.createElement("div");
    imgBox.className =
      "position-relative overflow-hidden rounded image-box-120";

    var img = document.createElement("img");
    img.src = imgData.src;
    img.className = "w-100 h-100 object-fit-cover border rounded";
    imgBox.appendChild(img);

    var deleteBtn = document.createElement("button");
    deleteBtn.className = "modal-delete-btn";
    deleteBtn.innerHTML = "&times;";
    deleteBtn.setAttribute("type", "button");

    (function (i) {
      deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        modalTempImages.splice(i, 1);
        renderModalImages();
      });
    })(index);

    imgBox.appendChild(deleteBtn);
    grid.appendChild(imgBox);
  });
}

function openImageModal(wrapper) {
  var data = imageSections.get(wrapper);
  if (!data) return;

  activeSection = { wrapper: wrapper, infoText: data.infoText };

  modalTempImages = data.images.map(function (img) {
    return { src: img.src, name: img.name };
  });

  renderModalImages();

  var bsModal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("imageViewerModal"),
  );
  bsModal.show();
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

  // ── Regular menu links (no submenu) 
  document
    .querySelectorAll(".menu-item-link[data-page]")
    .forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelectorAll(".dropdown-menu").forEach(function (menu) {
          menu.classList.remove("is-visible", "show");
          if (menu.previousElementSibling) {
            menu.previousElementSibling.classList.remove("is-expanded");
          }
        });
        closeMobilePopup();
        document.querySelectorAll(".menu-item-link").forEach(function (l) {
          l.classList.remove("is-active");
        });
        this.classList.add("is-active");
      });
    });

  // ── Submenu item clicks 
  var submenuItemEls = document.querySelectorAll(".submenu-item-link");
  submenuItemEls.forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.stopPropagation();
      submenuItemEls.forEach(function (i) {
        i.classList.remove("is-active");
      });
      this.classList.add("is-active");
      document.querySelectorAll(".menu-item-link").forEach(function (l) {
        l.classList.remove("is-active");
      });
    });
  });

  // ── Resize: close mobile popup on desktop 
  window.addEventListener("resize", function () {
    if (!isMobileView()) closeMobilePopup();
  });

  // ── IMAGE UPLOAD HANDLING 
  document.querySelectorAll(".change-row").forEach(function (row) {
    var button = row.querySelector(".btn-add-img");
    var fileInput = row.querySelector(".img-file-input");
    var container = row.querySelector(".change-image-cointainer");
    var infoText = row.querySelector(".file-info-text");

    if (!button || !fileInput || !container) return;

    var wrapper = container.querySelector(".image-preview-wrapper");
    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.className =
        "image-preview-wrapper d-flex p-2 flex-wrap gap-3 mx-auto";
      container.appendChild(wrapper);
    }

    imageSections.set(wrapper, { images: [], infoText: infoText });

    button.addEventListener("click", function (e) {
      e.preventDefault();
      fileInput.click();
    });

    fileInput.addEventListener("change", function () {
      var files = Array.from(this.files);
      if (!files.length) return;

      var sectionData = imageSections.get(wrapper);

      files.forEach(function (file) {
        if (!["image/jpeg", "image/png"].includes(file.type)) {
          alert(file.name + " → jpg, png 파일만 업로드 가능합니다.");
          return;
        }
        if (file.size > 50 * 1024 * 1024) {
          alert(file.name + " → 파일 크기는 50MB 이하만 가능합니다.");
          return;
        }

        var reader = new FileReader();
        reader.onload = function (e) {
          sectionData.images.push({ src: e.target.result, name: file.name });
          renderPortalImages(wrapper, infoText);
        };
        reader.readAsDataURL(file);
      });

      fileInput.value = "";
    });
  });

  // ── MODAL BUTTONS 
  document
    .getElementById("modalSaveBtn")
    .addEventListener("click", function () {
      if (activeSection) {
        var data = imageSections.get(activeSection.wrapper);
        if (data) {
          data.images = modalTempImages.map(function (img) {
            return { src: img.src, name: img.name };
          });
          renderPortalImages(activeSection.wrapper, activeSection.infoText);
        }
      }
      var bsModal = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("imageViewerModal"),
      );
      bsModal.hide();
    });

  document
    .getElementById("imageViewerModal")
    .addEventListener("hidden.bs.modal", function () {
      modalTempImages = [];
      activeSection = null;
      document.getElementById("modalImageGrid").innerHTML = "";
    });

  // ── COMMENT TEXTAREA CLEAR BUTTONS 
  // Wraps each .comment-textarea in a relative div and injects a × button
  document.querySelectorAll(".comment-textarea").forEach(function (textarea) {
    // Create wrapper
    var wrapper = document.createElement("div");
    wrapper.className = "textarea-wrapper";

    // Insert wrapper before textarea, then move textarea inside
    textarea.parentNode.insertBefore(wrapper, textarea);
    wrapper.appendChild(textarea);

    // Create × button
    var clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.className = "textarea-clear-btn";
    clearBtn.innerHTML = "&times;";
    clearBtn.title = "지우기";
    wrapper.appendChild(clearBtn);

    // Show × when user types, hide when empty
    textarea.addEventListener("input", function () {
      if (this.value.length > 0) {
        clearBtn.classList.add("visible");
      } else {
        clearBtn.classList.remove("visible");
      }
    });

    // × click: clear textarea and hide button
    clearBtn.addEventListener("click", function () {
      textarea.value = "";
      clearBtn.classList.remove("visible");
      textarea.focus();
    });
  });

  //  H RADIO COMMENT BOX 
  var hCommentWrapper = document.createElement("div");
  hCommentWrapper.className = "h-comment-wrapper";
  hCommentWrapper.style.display = "none";

  var hCommentBox = document.createElement("textarea");
  hCommentBox.className = "h-comment-box";
  hCommentBox.rows = 1;

  var hClearBtn = document.createElement("button");
  hClearBtn.type = "button";
  hClearBtn.className = "h-comment-clear-btn";
  hClearBtn.innerHTML = "&times;";
  hClearBtn.title = "지우기";

  hCommentWrapper.appendChild(hCommentBox);
  hCommentWrapper.appendChild(hClearBtn);

  var hRadio = document.getElementById("inlineRadio8");
  if (hRadio) {
    var hFormCheck = hRadio.closest(".form-check-inline");
    if (hFormCheck) {
      hFormCheck.insertAdjacentElement("afterend", hCommentWrapper);
    }
  }

  document
    .querySelectorAll('input[name="inlineRadioOptions"]')
    .forEach(function (radio) {
      radio.addEventListener("change", function () {
        if (this.value === "H") {
          hCommentWrapper.style.display = "inline-flex";
          hCommentBox.focus();
        } else {
          hCommentWrapper.style.display = "none";
          hCommentBox.value = "";
          hClearBtn.classList.remove("visible");
        }
      });
    });

  hCommentBox.addEventListener("input", function () {
    if (this.value.length > 0) {
      hClearBtn.classList.add("visible");
    } else {
      hClearBtn.classList.remove("visible");
    }
  });

  hClearBtn.addEventListener("click", function () {
    hCommentBox.value = "";
    hClearBtn.classList.remove("visible");
    hCommentBox.focus();
  });
}); // end DOMContentLoaded
