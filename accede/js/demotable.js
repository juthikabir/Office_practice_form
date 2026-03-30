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
    if (item.element.classList.contains("is-active"))
      div.classList.add("is-active");

    div.addEventListener("click", function (e) {
      e.stopPropagation();
      document
        .querySelectorAll(".submenu-item-link")
        .forEach((i) => i.classList.remove("is-active"));

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

// ✅ NEW CLASS TABLE

class DataTable {
  constructor({ container, columns, data, perPage = 10 }) {
    this.container = document.querySelector(container);
    this.columns = columns;
    this.fullData = data;
    this.filteredData = [...data];
    this.currentPage = 1;
    this.perPage = perPage;

    this.render();
  }

  getStatusClass(val) {
    const map = {
      정상: "dt-status-normal",
      반출: "dt-status-return",
      재측정: "dt-status-remeasure",
      불량: "dt-status-defect",
      "-": "dt-status-dash",
    };
    return map[val] || "";
  }

  render() {
    const total = this.filteredData.length;
    const totalPages = Math.max(1, Math.ceil(total / this.perPage));

    if (this.currentPage > totalPages) {
      this.currentPage = totalPages;
    }

    const start = (this.currentPage - 1) * this.perPage;
    const pageRows = this.filteredData.slice(start, start + this.perPage);

    const headerCells = this.columns
      .map((col) => {
        const w = col.width ? `style="width:${col.width}"` : "";
        return `<th ${w}>${col.label}</th>`;
      })
      .join("");

    const bodyRows = pageRows.length
      ? pageRows
          .map((row) => {
            const cells = this.columns
              .map((col) => {
                const val = row[col.key] ?? "";
                const cls =
                  col.key === "status" ? this.getStatusClass(val) : "";
                return `<td style="text-align:${col.align || "center"}" class="${cls}">${val}</td>`;
              })
              .join("");
            return `<tr>${cells}</tr>`;
          })
          .join("")
      : `<tr><td colspan="${this.columns.length}" class="dt-empty">데이터가 없습니다.</td></tr>`;

    let pagBtns = "";
    if (totalPages > 1) {
      pagBtns += `<button class="dt-page-btn" data-page="${
        this.currentPage - 1
      }" ${this.currentPage === 1 ? "disabled" : ""}>&#8249;</button>`;
      for (let i = 1; i <= totalPages; i++) {
        pagBtns += `<button class="dt-page-btn ${
          i === this.currentPage ? "active" : ""
        }" data-page="${i}">${i}</button>`;
      }
      pagBtns += `<button class="dt-page-btn" data-page="${
        this.currentPage + 1
      }" ${this.currentPage === totalPages ? "disabled" : ""}>&#8250;</button>`;
    }

    this.container.innerHTML = `
      <div class="dt-wrapper">
        <div class="dt-info-bar">
          <span class="dt-total-count">총 ${total}건</span>
          <button class="dt-btn-excel">엑셀 다운로드</button>
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

    this.bindEvents();
  }

  bindEvents() {
    this.container
      .querySelectorAll(".dt-page-btn:not([disabled])")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          this.currentPage = parseInt(btn.dataset.page);
          this.render();
        });
      });
  }

  setData(newData) {
    this.filteredData = newData;
    this.currentPage = 1;
    this.render();
  }

  reset() {
    this.filteredData = [...this.fullData];
    this.currentPage = 1;
    this.render();
  }
}

// DATA + COLUMNS

const allSampleData = [
  /* SAME DATA (keep yours) */
];
const coaColumns = [
  /* SAME COLUMNS (keep yours) */
];

let table;

// DATE HELPERS

function parseLocalDate(str) {
  if (!str) return null;
  const parts = str.split("-");
  if (parts.length !== 3) return null;
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

// FILTER
function applyDateFilter() {
  const dateInputs = document.querySelectorAll(".filter-date-input-modern");
  const startVal = dateInputs[0]?.value.trim();
  const endVal = dateInputs[1]?.value.trim();

  if (!startVal || !endVal) {
    table.reset();
    return;
  }

  const startDate = parseLocalDate(startVal);
  const endDate = parseLocalDate(endVal);

  const filtered = allSampleData.filter((row) => {
    const rowDate = parseLocalDate(row.date);
    if (!rowDate) return false;
    if (startDate && rowDate < startDate) return false;
    if (endDate && rowDate > endDate) return false;
    return true;
  });

  table.setData(filtered);
}


// MAIN

document.addEventListener("DOMContentLoaded", function () {
  // CREATE TABLE (IMPORTANT)
  table = new DataTable({
    container: ".table-content",
    columns: coaColumns,
    data: allSampleData,
  });

  // Search
  const searchBtn = document.querySelector(".btn-breadcrumb-primary");
  if (searchBtn) {
    searchBtn.addEventListener("click", applyDateFilter);
  }

  // Reset
  const resetBtn = document.querySelector(".btn-breadcrumb-secondary");
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      const dateInputs = document.querySelectorAll(".filter-date-input-modern");
      dateInputs.forEach((input) => {
        if (input._flatpickr) input._flatpickr.clear();
        else input.value = "";
      });
      table.reset();
    });
  }

  adjustTablePosition();
});
