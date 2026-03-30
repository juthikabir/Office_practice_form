//  MOBILE HELPERS
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
  submenuItems.forEach((item) => {
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

// TABLE POSITION
function adjustTablePosition() {
  const filterSection = document.querySelector(".filter-section");
  const tableContent = document.querySelector(".table-content");
  if (filterSection && tableContent) {
    const filterBottom = filterSection.getBoundingClientRect().bottom;
    tableContent.style.top = filterBottom + "px";
  }
}

//  CUSTOM DROPDOWNS
function initializeCustomDropdowns() {
  const dropdowns = document.querySelectorAll(".custom-dropdown");
  dropdowns.forEach(function (dropdown) {
    const selected = dropdown.querySelector(".custom-dropdown-selected");
    const items = dropdown.querySelectorAll(".custom-dropdown-item");
    selected.addEventListener("click", function (e) {
      e.stopPropagation();
      document.querySelectorAll(".custom-dropdown").forEach(function (other) {
        if (other !== dropdown) other.classList.remove("active");
      });
      dropdown.classList.toggle("active");
    });
    items.forEach(function (item) {
      item.addEventListener("click", function (e) {
        e.stopPropagation();
        selected.textContent = this.textContent;
        dropdown.classList.remove("active");
        items.forEach((i) => i.classList.remove("selected"));
        this.classList.add("selected");
      });
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".custom-dropdown")) {
      document
        .querySelectorAll(".custom-dropdown")
        .forEach((d) => d.classList.remove("active"));
    }
  });
}

//  DATE PICKERS
function initializeDatePickers() {
  const dateInputs = document.querySelectorAll(".filter-date-input-modern");
  if (dateInputs.length < 2) return null;

  const startDatePicker = flatpickr(dateInputs[0], {
    dateFormat: "Y-m-d",
    allowInput: true,
    disableMobile: true,
    clickOpens: false,
    onChange: function (selectedDates) {
      if (selectedDates.length > 0) {
        const min = new Date(selectedDates[0]);
        min.setDate(min.getDate() + 1);
        endDatePicker.set("minDate", min);
        if (
          endDatePicker.selectedDates.length > 0 &&
          endDatePicker.selectedDates[0] <= selectedDates[0]
        )
          endDatePicker.clear();
      }
      applyDateFilter();
    },
  });

  const endDatePicker = flatpickr(dateInputs[1], {
    dateFormat: "Y-m-d",
    allowInput: true,
    disableMobile: true,
    clickOpens: false,
    onChange: function () {
      applyDateFilter();
    },
  });

  const startIcon = dateInputs[0].parentElement.querySelector(".bi-calendar3");
  if (startIcon)
    startIcon.addEventListener("click", () => startDatePicker.open());
  const endIcon = dateInputs[1].parentElement.querySelector(".bi-calendar3");
  if (endIcon) endIcon.addEventListener("click", () => endDatePicker.open());

  return { startDatePicker, endDatePicker };
}

function initializeQuickDateButtons(pickers) {
  if (!pickers) return;
  const { startDatePicker, endDatePicker } = pickers;
  const btns = document.querySelectorAll(".btn-date-quick-modern");
  if (btns.length < 4) return;

  function setRange(daysBack) {
    const today = new Date();
    const from = new Date();
    if (daysBack === 0) {
      startDatePicker.setDate(today, true);
      endDatePicker.setDate(today, true);
    } else if (daysBack > 0) {
      from.setDate(today.getDate() - daysBack);
      startDatePicker.setDate(from, true);
      endDatePicker.setDate(today, true);
    } else {
      from.setMonth(today.getMonth() + daysBack);
      startDatePicker.setDate(from, true);
      endDatePicker.setDate(today, true);
    }
    applyDateFilter();
  }

  btns[0].addEventListener("click", () => setRange(0));
  btns[1].addEventListener("click", () => setRange(7));
  btns[2].addEventListener("click", () => setRange(-1));
  btns[3].addEventListener("click", () => setRange(-2));
}

//  DATA ARRAY
const allSampleData = [
  {
    no: 10,
    date: "2025-01-05",
    companyType: "APS",
    companyName: "세진정밀",
    partCode: "C03340520",
    partName: "(R)PAT_SUS Wall Liner_Al203+5F",
    sn: "1234565",
    equipment: "Ohters-Ohters",
    status: "-",
  },
  {
    no: 9,
    date: "2025-01-18",
    companyType: "APS",
    companyName: "세진정밀",
    partCode: "C03340520",
    partName: "(R)PAT_SUS Wall Liner_Al203+5F",
    sn: "1234565",
    equipment: "Ohters-Ohters",
    status: "반출",
  },
  {
    no: 8,
    date: "2025-02-03",
    companyType: "APS",
    companyName: "세진정밀",
    partCode: "C03340520",
    partName: "(R)PAT_SUS Wall Liner_Al203+5F",
    sn: "1234565",
    equipment: "Ohters-Ohters",
    status: "재측정",
  },
  {
    no: 7,
    date: "2025-02-14",
    companyType: "APS",
    companyName: "세진정밀",
    partCode: "C03340520",
    partName: "(R)PAT_SUS Wall Liner_Al203+5F",
    sn: "1234565",
    equipment: "Ohters-Ohters",
    status: "불량",
  },
  {
    no: 6,
    date: "2025-02-27",
    companyType: "APS",
    companyName: "세진정밀",
    partCode: "C03340520",
    partName: "(R)PAT_SUS Wall Liner_Al203+5F",
    sn: "1234565",
    equipment: "Ohters-Ohters",
    status: "정상",
  },
  {
    no: 5,
    date: "2025-03-08",
    companyType: "APS",
    companyName: "세진정밀",
    partCode: "C03340520",
    partName: "(R)PAT_SUS Wall Liner_Al203+5F",
    sn: "1234565",
    equipment: "Ohters-Ohters",
    status: "정상",
  },
  {
    no: 4,
    date: "2025-03-15",
    companyType: "APS",
    companyName: "세진정밀",
    partCode: "C03340520",
    partName: "(R)PAT_SUS Wall Liner_Al203+5F",
    sn: "1234565",
    equipment: "Ohters-Ohters",
    status: "정상",
  },
  {
    no: 3,
    date: "2025-03-22",
    companyType: "APS",
    companyName: "세진정밀",
    partCode: "C03340520",
    partName: "(R)PAT_SUS Wall Liner_Al203+5F",
    sn: "1234565",
    equipment: "Ohters-Ohters",
    status: "정상",
  },
  {
    no: 2,
    date: "2025-04-02",
    companyType: "APS",
    companyName: "세진정밀",
    partCode: "C03340520",
    partName: "(R)PAT_SUS Wall Liner_Al203+5F",
    sn: "1234565",
    equipment: "Ohters-Ohters",
    status: "불량",
  },
  {
    no: 1,
    date: "2025-04-10",
    companyType: "APS",
    companyName: "세진정밀",
    partCode: "C03340520",
    partName: "(R)PAT_SUS Wall Liner_Al203+5F",
    sn: "1234565",
    equipment: "Ohters-Ohters",
    status: "불량",
  },
];

//  COLUMN DEFINITIONS
const coaColumns = [
  { 
    key: "no", 
    label: "번호", 
    align: "center", 
    width: "60px" 
  },
  { 
    key: "date", 
    label: "입고일", 
    align: "center", 
    width: "110px" 
  },
  { 
    key: "companyType", 
    label: "업체구분", 
    align: "center", 
    width: "90px" 
  },
  { 
    key: "companyName", 
    label: "업체명", 
    align: "center", 
    width: "130px" 
  },
  { 
    key: "partCode", 
    label: "Part 코드", 
    align: "center", 
    width: "120px" 
  },
  { key: "partName", 
    label: "Part 명 (품명)", 
    align: "left" 
  },
  { 
    key: "sn", 
    label: "S/N", 
    align: "center", 
    width: "90px" 
  },
  { 
    key: "equipment", 
    label: "설비", 
    align: "center", 
    width: "140px" 
  },
  { 
    key: "status", 
    label: "상태", 
    align: "center", 
    width: "80px" 
  },
];

//  TABLE STATE
let currentData = allSampleData.slice();
let currentPage = 1;
const perPage = 10;

//  RENDER TABLE  —  array loop → HTML table
function statusClass(val) {
  const map = {
    정상: "dt-status-normal",
    반출: "dt-status-return",
    재측정: "dt-status-remeasure",
    불량: "dt-status-defect",
    "-": "dt-status-dash",
  };
  return map[val] || "";
}

function renderTable(data, columns, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * perPage;
  const pageRows = data.slice(start, start + perPage);

  // header — loop columns array
  const headerCells = columns
    .map((col) => {
      const w = col.width ? `style="width:${col.width}"` : "";
      return `<th ${w}>${col.label}</th>`;
    })
    .join("");

  // body — loop data array
  const bodyRows = pageRows.length
    ? pageRows
        .map((row) => {
          const cells = columns
            .map((col) => {
              const val = row[col.key] !== undefined ? row[col.key] : "";
              const cls = col.key === "status" ? statusClass(val) : "";
              return `<td style="text-align:${col.align || "center"}" class="${cls}">${val}</td>`;
            })
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("")
    : `<tr><td colspan="${columns.length}" class="dt-empty">데이터가 없습니다.</td></tr>`;

  // pagination buttons
  let pagBtns = "";
  if (totalPages > 1) {
    pagBtns += `<button class="dt-page-btn" data-page="${currentPage - 1}" ${currentPage === 1 ? "disabled" : ""}>&#8249;</button>`;
    for (let i = 1; i <= totalPages; i++) {
      pagBtns += `<button class="dt-page-btn ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</button>`;
    }
    pagBtns += `<button class="dt-page-btn" data-page="${currentPage + 1}" ${currentPage === totalPages ? "disabled" : ""}>&#8250;</button>`;
  }

  // inject into DOM
  container.innerHTML = `
    <div class="dt-wrapper">
      <div class="dt-info-bar">
        <span class="dt-total-count">총 ${total}건</span>
        <button class="dt-btn-excel" id="btnExcelDownload">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="3" width="20" height="18" rx="2" fill="#e8f5e9" stroke="#4caf50" stroke-width="1.5"/>
            <path d="M8 8l2.5 4-2.5 4M16 8l-2.5 4 2.5 4" stroke="#4caf50" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M2 9h20" stroke="#4caf50" stroke-width="1" stroke-opacity="0.4"/>
          </svg>
          엑셀 다운로드
        </button>
      </div>
      <div class="dt-table-wrap">
        <table class="dt-table">
          <thead><tr>${headerCells}</tr></thead>
          <tbody>${bodyRows}</tbody>
        </table>
      </div>
      <div class="dt-pagination">${pagBtns}</div>
    </div>
  `;

  // excel button event
  document
    .getElementById("btnExcelDownload")
    .addEventListener("click", function () {
      alert("엑셀 다운로드 기능은 서버 연동 후 지원됩니다.");
    });

  // pagination click events
  container.querySelectorAll(".dt-page-btn:not([disabled])").forEach((btn) => {
    btn.addEventListener("click", function () {
      currentPage = parseInt(this.dataset.page, 10);
      renderTable(currentData, coaColumns, containerSelector);
    });
  });
}

//  DATE FILTER
function parseLocalDate(str) {
  if (!str) return null;
  const parts = str.split("-");
  if (parts.length !== 3) return null;
  return new Date(
    parseInt(parts[0], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[2], 10),
  );
}

function applyDateFilter() {
  const dateInputs = document.querySelectorAll(".filter-date-input-modern");
  const startVal = dateInputs[0] ? dateInputs[0].value.trim() : "";
  const endVal = dateInputs[1] ? dateInputs[1].value.trim() : "";

  if (!startVal || !endVal) {
    currentData = allSampleData.slice();
    currentPage = 1;
    renderTable(currentData, coaColumns, ".table-content");
    return;
  }

  const startDate = parseLocalDate(startVal);
  const endDate = parseLocalDate(endVal);

  let filtered = allSampleData.filter(function (row) {
    const rowDate = parseLocalDate(row.date);
    if (!rowDate) return false;
    if (startDate && rowDate < startDate) return false;
    if (endDate && rowDate > endDate) return false;
    return true;
  });

  filtered = filtered
    .slice()
    .sort((a, b) => parseLocalDate(a.date) - parseLocalDate(b.date));

  currentData = filtered;
  currentPage = 1;
  renderTable(currentData, coaColumns, ".table-content");
}

//  MAIN
document.addEventListener("DOMContentLoaded", function () {
  initializeCustomDropdowns();

  if (typeof flatpickr !== "undefined") {
    const pickers = initializeDatePickers();
    if (pickers) initializeQuickDateButtons(pickers);
  }

  // Render table from array
  renderTable(allSampleData, coaColumns, ".table-content");

  // 검색 button
  const searchBtn = document.querySelector(".btn-breadcrumb-primary");
  if (searchBtn) {
    searchBtn.addEventListener("click", function () {
      applyDateFilter();
    });
  }

  // 초기화 button
  const resetBtn = document.querySelector(".btn-breadcrumb-secondary");
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      const dateInputs = document.querySelectorAll(".filter-date-input-modern");
      dateInputs.forEach(function (input) {
        if (input._flatpickr) input._flatpickr.clear();
        else input.value = "";
      });
      currentData = allSampleData.slice();
      currentPage = 1;
      renderTable(currentData, coaColumns, ".table-content");
    });
  }

  // Sidebar dropdown toggle
  const menuLinksWithDropdown = document.querySelectorAll(
    '.menu-item-link[data-bs-toggle="dropdown"]',
  );
  menuLinksWithDropdown.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const submenu = this.nextElementSibling;
      if (!submenu || !submenu.classList.contains("dropdown-menu")) return;

      if (isMobileView()) {
        const items = [];
        submenu.querySelectorAll(".submenu-item-link").forEach((item) => {
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
        document.querySelectorAll(".dropdown-menu").forEach(function (menu) {
          if (menu !== submenu) {
            menu.classList.remove("is-visible", "show");
            if (menu.previousElementSibling)
              menu.previousElementSibling.classList.remove("is-expanded");
          }
        });
        this.classList.toggle("is-expanded");
        submenu.classList.toggle("is-visible");
        submenu.classList.toggle("show");
      }
    });
  });

  // Regular menu links
  document
    .querySelectorAll(".menu-item-link[data-page]")
    .forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelectorAll(".dropdown-menu").forEach(function (menu) {
          menu.classList.remove("is-visible", "show");
          if (menu.previousElementSibling)
            menu.previousElementSibling.classList.remove("is-expanded");
        });
        closeMobilePopup();
        document
          .querySelectorAll(".menu-item-link")
          .forEach((l) => l.classList.remove("is-active"));
        this.classList.add("is-active");
      });
    });

  // Submenu item links
  document.querySelectorAll(".submenu-item-link").forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.stopPropagation();
      document
        .querySelectorAll(".submenu-item-link")
        .forEach((i) => i.classList.remove("is-active"));
      this.classList.add("is-active");
      document
        .querySelectorAll(".menu-item-link")
        .forEach((l) => l.classList.remove("is-active"));
    });
  });

  window.addEventListener("resize", function () {
    if (!isMobileView()) closeMobilePopup();
    adjustTablePosition();
  });

  adjustTablePosition();
});
