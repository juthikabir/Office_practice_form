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
  popup.style.top = clickedElement.getBoundingClientRect().top + "px";
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

//  TABLE POSITION


function adjustTablePosition() {
  const filterSection = document.querySelector(".filter-section");
  const tableContent = document.querySelector(".table-content");
  if (filterSection && tableContent) {
    tableContent.style.top =
      filterSection.getBoundingClientRect().bottom + "px";
  }
}

//  CUSTOM DROPDOWNS

function initializeCustomDropdowns() {
  document.querySelectorAll(".custom-dropdown").forEach(function (dropdown) {
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

  const startPicker = flatpickr(dateInputs[0], {
    dateFormat: "Y-m-d",
    allowInput: true,
    disableMobile: true,
    clickOpens: false,
    onChange: function (selectedDates) {
      if (selectedDates.length > 0) {
        const min = new Date(selectedDates[0]);
        min.setDate(min.getDate() + 1);
        endPicker.set("minDate", min);
        if (
          endPicker.selectedDates.length > 0 &&
          endPicker.selectedDates[0] <= selectedDates[0]
        )
          endPicker.clear();
      }
      const endVal = dateInputs[1].value.trim();
      if (endVal) coaTable.filterByDate(dateInputs[0].value.trim(), endVal);
    },
  });

  const endPicker = flatpickr(dateInputs[1], {
    dateFormat: "Y-m-d",
    allowInput: true,
    disableMobile: true,
    clickOpens: false,
    onChange: function () {
      const startVal = dateInputs[0].value.trim();
      if (startVal) coaTable.filterByDate(startVal, dateInputs[1].value.trim());
    },
  });

  dateInputs[0].parentElement
    .querySelector(".bi-calendar3")
    .addEventListener("click", () => startPicker.open());
  dateInputs[1].parentElement
    .querySelector(".bi-calendar3")
    .addEventListener("click", () => endPicker.open());

  return { startPicker, endPicker };
}

function initializeQuickDateButtons(pickers) {
  if (!pickers) return;
  const { startPicker, endPicker } = pickers;
  const btns = document.querySelectorAll(".btn-date-quick-modern");
  const dateInputs = document.querySelectorAll(".filter-date-input-modern");
  if (btns.length < 4) return;

  function setRange(daysBack) {
    const today = new Date();
    const from = new Date();
    if (daysBack === 0) {
      startPicker.setDate(today, true);
      endPicker.setDate(today, true);
    } else if (daysBack > 0) {
      from.setDate(today.getDate() - daysBack);
      startPicker.setDate(from, true);
      endPicker.setDate(today, true);
    } else {
      from.setMonth(today.getMonth() + daysBack);
      startPicker.setDate(from, true);
      endPicker.setDate(today, true);
    }
    coaTable.filterByDate(
      dateInputs[0].value.trim(),
      dateInputs[1].value.trim(),
    );
  }

  btns[0].addEventListener("click", () => setRange(0));
  btns[1].addEventListener("click", () => setRange(7));
  btns[2].addEventListener("click", () => setRange(-1));
  btns[3].addEventListener("click", () => setRange(-2));
}

//  DATA

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

const coaColumns = [
  { key: "no", label: "번호", align: "center", width: "60px" },
  { key: "date", label: "입고일", align: "center", width: "110px" },
  { key: "companyType", label: "업체구분", align: "center", width: "90px" },
  { key: "companyName", label: "업체명", align: "center", width: "130px" },
  { key: "partCode", label: "Part 코드", align: "center", width: "120px" },
  { key: "partName", label: "Part 명 (품명)", align: "left" },
  { key: "sn", label: "S/N", align: "center", width: "90px" },
  { key: "equipment", label: "설비", align: "center", width: "140px" },
  { key: "status", label: "상태", align: "center", width: "80px" },
];

//  DataTable CLASS

class DataTable {
  // runs once when you write:  new DataTable(...)
  constructor(columns, data) {
    // grab the existing HTML elements from index.html
    this.totalCountEl = document.getElementById("dt-total-count");
    this.theadRow = document.getElementById("dt-thead-row");
    this.tbody = document.getElementById("dt-tbody");
    this.pagination = document.getElementById("dt-pagination");

    this.columns = columns;
    this.data = data; 
    this.filtered = data.slice(); // working copy used for display
    this.currentPage = 1;
    this.perPage = 5; // rows shown per page

    this.buildHeaders(); 
    this.render(); 
  }

  // fills the <thead> row 
  buildHeaders() {
    this.theadRow.innerHTML = this.columns
      .map((col) => {
        const w = col.width ? `style="width:${col.width}"` : "";
        return `<th ${w}>${col.label}</th>`;
      })
      .join("");
  }

  // fills <tbody> rows, pagination buttons, and total count
  render() {
    const total = this.filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / this.perPage));
    if (this.currentPage > totalPages) this.currentPage = totalPages;  //Page overflow handle

    const start = (this.currentPage - 1) * this.perPage;
    const pageRows = this.filtered.slice(start, start + this.perPage); //show current page data

    // update total count text
    this.totalCountEl.textContent = `총 ${total}건`;

    // fill tbody rows
    if (pageRows.length === 0) {
      this.tbody.innerHTML = `<tr><td colspan="${this.columns.length}" class="dt-empty">데이터가 없습니다.</td></tr>`;
    } else {
      this.tbody.innerHTML = pageRows
        .map((row) => {
          const cells = this.columns
            .map((col) => {
              const val = row[col.key] !== undefined ? row[col.key] : "";
              const cls = col.key === "status" ? this.statusClass(val) : "";
              return `<td style="text-align:${col.align || "center"}" class="${cls}">${val}</td>`;
            })
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("");
    }

    // fill pagination buttons
    this.pagination.innerHTML = "";
    if (totalPages > 1) {
      this.addPageBtn("&#8249;", this.currentPage - 1, this.currentPage === 1);
      for (let i = 1; i <= totalPages; i++) {
        this.addPageBtn(i, i, false, i === this.currentPage);
      }
      this.addPageBtn(
        "&#8250;",
        this.currentPage + 1,
        this.currentPage === totalPages,
      );
    }
  }

  // creates one pagination button and appends it
  addPageBtn(label, page, disabled, active = false) {
    const btn = document.createElement("button");
    btn.className = "dt-page-btn" + (active ? " active" : "");
    btn.innerHTML = label;
    btn.disabled = disabled;
    btn.addEventListener("click", () => {
      this.currentPage = page;
      this.render();
    });
    this.pagination.appendChild(btn);
  }

  // filters data when BOTH date values are filled
  filterByDate(startVal, endVal) {
    if (!startVal || !endVal) {
      this.filtered = this.data.slice();
      this.currentPage = 1;
      this.render();
      return;
    }

    const start = this.toDate(startVal);
    const end = this.toDate(endVal);

    this.filtered = this.data.filter((row) => { //check each row
      const d = this.toDate(row.date); //convert each row into data
      return d >= start && d <= end;
    });

    this.currentPage = 1;
    this.render();
  }

  // clears all filters and shows full data again
  reset() {
    this.filtered = this.data.slice();
    this.currentPage = 1;
    this.render();
  }

  // "2025-01-15" → Date (no timezone shift)
  toDate(str) {
    const [y, m, d] = str.split("-");
    return new Date(+y, +m - 1, +d);
  }

  // status value → CSS class name
  statusClass(val) {
    const map = {
      정상: "dt-status-normal",
      반출: "dt-status-return",
      재측정: "dt-status-remeasure",
      불량: "dt-status-defect",
      "-": "dt-status-dash",
    };
    return map[val] || "";
  }
}

//  MAIN


let coaTable;

document.addEventListener("DOMContentLoaded", function () {
  initializeCustomDropdowns();

  // create the table — reads elements from HTML, fills with data
  coaTable = new DataTable(coaColumns, allSampleData);

  // excel button — already in HTML, just attach the event
  document
    .getElementById("btnExcelDownload")
    .addEventListener("click", function () {
      alert("엑셀 다운로드 기능은 서버 연동 후 지원됩니다.");
    });

  if (typeof flatpickr !== "undefined") {
    const pickers = initializeDatePickers();  //Creates data input fields
    if (pickers) initializeQuickDateButtons(pickers);
  }

  // 검색 button
  document
    .querySelector(".btn-breadcrumb-primary")
    .addEventListener("click", function () {
      const inputs = document.querySelectorAll(".filter-date-input-modern");
      coaTable.filterByDate(inputs[0].value.trim(), inputs[1].value.trim());
    });

  // 초기화 button
  document
    .querySelector(".btn-breadcrumb-secondary")
    .addEventListener("click", function () {
      document
        .querySelectorAll(".filter-date-input-modern")
        .forEach((input) => {
          if (input._flatpickr) input._flatpickr.clear();
          else input.value = "";
        });
      coaTable.reset();
    });

  // sidebar dropdown toggle
  document
    .querySelectorAll('.menu-item-link[data-bs-toggle="dropdown"]')
    .forEach(function (link) {
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

  // regular menu links
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

  // submenu item links
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
