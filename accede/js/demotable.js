// STATUS CELL RENDERER 
class StatusRenderer {
  constructor(props) {
    this.el = document.createElement("span");
    this.render(props);
  }
  getElement() {
    return this.el;
  }
  render(props) {
    const val = props.value || "";
    let color = "#333",
      weight = "500";
    if (val === "재측정") {
      color = "#3498db";
      weight = "600";
    } else if (val === "불량") {
      color = "#e53935";
      weight = "600";
    } else if (val === "반출") {
      color = "#555";
      weight = "500";
    } else if (val === "정상") {
      color = "#333";
      weight = "500";
    } else if (val === "-") {
      color = "#999";
      weight = "400";
    }
    this.el.style.color = color;
    this.el.style.fontWeight = weight;
    this.el.style.fontSize = "13px";
    this.el.textContent = val;
  }
}

// MOBILE HELPERS 
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
    tableContent.style.top = filterBottom + 0 + "px";
  }
}

// CUSTOM DROPDOWNS
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

// DATE PICKERS 
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

// GRID INFO BAR
function buildGridInfoBar(totalCount) {
  const tableContent = document.querySelector(".table-content");
  if (!tableContent) return;

  let infoBar = document.querySelector(".table-info-bar");
  if (infoBar) infoBar.remove();

  infoBar = document.createElement("div");
  infoBar.className = "table-info-bar";
  infoBar.innerHTML = `
        <span class="table-total-count">총 ${totalCount}건</span>
        <button class="btn-excel-download" id="btnExcelDownload">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="3" width="20" height="18" rx="2" fill="#e8f5e9" stroke="#4caf50" stroke-width="1.5"/>
                <path d="M8 8l2.5 4-2.5 4M16 8l-2.5 4 2.5 4" stroke="#4caf50" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M2 9h20" stroke="#4caf50" stroke-width="1" stroke-opacity="0.4"/>
            </svg>
            엑셀 다운로드
        </button>
    `;
  tableContent.insertBefore(infoBar, tableContent.firstChild);

  document
    .getElementById("btnExcelDownload")
    .addEventListener("click", function () {
      alert("엑셀 다운로드 기능은 서버 연동 후 지원됩니다.");
    });
}

// UPDATE INFO BAR COUNT
function updateInfoBarCount(count) {
  const countEl = document.querySelector(".table-total-count");
  if (countEl) countEl.textContent = `총 ${count}건`;
}

// SAMPLE DATA (varied dates for filtering demo) 
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

// GLOBAL GRID REFERENCE 
let gridInstance = null;   //stores the grid object

// DATE FILTER LOGIC   Parse a "YYYY-MM-DD" string into a local midnight Date object.

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

// Read the current date inputs, filter allSampleData, update the grid.
// If neither date is filled → restore all rows in original order.
 
function applyDateFilter() {
  if (!gridInstance) return;

  const dateInputs = document.querySelectorAll(".filter-date-input-modern");
  const startVal = dateInputs[0] ? dateInputs[0].value.trim() : "";
  const endVal = dateInputs[1] ? dateInputs[1].value.trim() : "";

  // No dates selected → show everything unsorted (original order)
  if (!startVal && !endVal) {
    gridInstance.resetData(allSampleData);
    updateInfoBarCount(allSampleData.length);
    return;
  }

  const startDate = parseLocalDate(startVal);
  const endDate = parseLocalDate(endVal);

  // Filter rows whose date falls within [startDate, endDate]
  let filtered = allSampleData.filter(function (row) {
    const rowDate = parseLocalDate(row.date);
    if (!rowDate) return false;
    if (startDate && rowDate < startDate) return false;
    if (endDate && rowDate > endDate) return false;
    return true;
  });

  // Sort ascending by date within the filtered set
  filtered = filtered.slice().sort(function (a, b) {
    return parseLocalDate(a.date) - parseLocalDate(b.date);
  });

  gridInstance.resetData(filtered);
  updateInfoBarCount(filtered.length);
}

// TUI GRID INITIALIZATION 
function initializeGrid() {
  const el = document.getElementById("grid");
  if (!el) {
    console.error("#grid element not found");
    return;
  }
  if (typeof tui === "undefined" || typeof tui.Grid === "undefined") {
    console.error("tui.Grid is not loaded");
    return;
  }

  // Build info bar with total count
  buildGridInfoBar(allSampleData.length);

  tui.Grid.applyTheme("default", {
    cell: {
      header: {
        background: "#f7f8fa",
        border: "#e5e7eb",
        text: "#444",
      },
      normal: {
        border: "#f0f0f0",
        text: "#333",
      },
      selectedHeader: {
        background: "#f7f8fa",
      },
      focused: {
        border: "#3498db",
      },
    },
  });

  gridInstance = new tui.Grid({
    el: el,
    data: allSampleData,
    pageOptions: {
      useClient: true,
      perPage: 10,
    },
    bodyHeight: "auto",
    scrollX: false,
    scrollY: false,
    columns: [
      {
        header: "번호",
        name: "no",
        width: 60,
        align: "center",
        sortable: false,
      },
      {
        header: "입고일",
        name: "date",
        width: 110,
        align: "center",
        sortable: false,
      },
      {
        header: "업체구분",
        name: "companyType",
        width: 90,
        align: "center",
        sortable: false,
      },
      {
        header: "업체명",
        name: "companyName",
        width: 130,
        align: "center",
        sortable: false,
      },
      {
        header: "Part 코드",
        name: "partCode",
        width: 120,
        align: "center",
        sortable: false,
      },
      {
        header: "Part 명 (품명)",
        name: "partName",
        align: "left",
        sortable: false,
      },
      {
        header: "S/N",
        name: "sn",
        width: 90,
        align: "center",
        sortable: false,
      },
      {
        header: "설비",
        name: "equipment",
        width: 140,
        align: "center",
        sortable: false,
      },
      {
        header: "상태",
        name: "status",
        width: 80,
        align: "center",
        sortable: false,
        renderer: { type: StatusRenderer },
      },
    ],
    rowHeight: 46,
    columnOptions: {
      resizable: true,
    },
  });

  // Adjust table position after grid renders
  setTimeout(adjustTablePosition, 100);

  return gridInstance;
}

// MAIN 
document.addEventListener("DOMContentLoaded", function () {
  // Custom Dropdowns
  initializeCustomDropdowns();

  // Date Pickers
  if (typeof flatpickr !== "undefined") {
    const pickers = initializeDatePickers();
    if (pickers) initializeQuickDateButtons(pickers);
  }

  // 검색 button → apply date filter on click
  const searchBtn = document.querySelector(".btn-breadcrumb-primary");
  if (searchBtn) {
    searchBtn.addEventListener("click", function () {
      applyDateFilter();
    });
  }

  // 초기화 button → clear both date inputs and restore full table
  const resetBtn = document.querySelector(".btn-breadcrumb-secondary");
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      // Clear flatpickr instances
      const dateInputs = document.querySelectorAll(".filter-date-input-modern");
      dateInputs.forEach(function (input) {
        if (input._flatpickr) input._flatpickr.clear();
        else input.value = "";
      });
      // Restore full unsorted data
      if (gridInstance) {
        gridInstance.resetData(allSampleData);
        updateInfoBarCount(allSampleData.length);
      }
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

  // Initialize TUI Grid
  initializeGrid();
  adjustTablePosition();
});
