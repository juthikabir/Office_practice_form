// Dashboard Page - Dropdown Menu Handler and Date Picker

// MOBILE SUBMENU POPUP FUNCTIONS

function isMobileView() {
  return window.innerWidth <= 768;
}

function createMobilePopup() {
  if (document.getElementById("mobileSubmenuPopup")) return;
  const popupHTML = `<div id="mobileSubmenuPopup" class="mobile-submenu-popup"></div>`;
  document.body.insertAdjacentHTML("beforeend", popupHTML);
  document.addEventListener("click", function (e) {
    const popup = document.getElementById("mobileSubmenuPopup");
    const sidebar = document.querySelector(".page-sidebar");
    if (popup && !popup.contains(e.target) && !sidebar.contains(e.target)) {
      closeMobilePopup();
    }
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

// CUSTOM DROPDOWN FUNCTIONALITY

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
      document.querySelectorAll(".custom-dropdown").forEach(function (d) {
        d.classList.remove("active");
      });
    }
  });
}

// DATE PICKER INITIALIZATION WITH RANGE VALIDATION

function initializeDatePickers() {
  const dateInputs = document.querySelectorAll(".filter-date-input-modern");
  if (dateInputs.length >= 2) {
    const startDateInput = dateInputs[0];
    const endDateInput = dateInputs[1];
    const startDatePicker = flatpickr(startDateInput, {
      dateFormat: "Y-m-d",
      allowInput: true,
      disableMobile: true,
      clickOpens: false,
      locale: { firstDayOfWeek: 0 },
      onChange: function (selectedDates) {
        if (selectedDates.length > 0) {
          const selectedDate = selectedDates[0];
          const minDate = new Date(selectedDate);
          minDate.setDate(minDate.getDate() + 1);
          endDatePicker.set("minDate", minDate);
          if (
            endDatePicker.selectedDates.length > 0 &&
            endDatePicker.selectedDates[0] <= selectedDate
          ) {
            endDatePicker.clear();
          }
        }
      },
    });
    const endDatePicker = flatpickr(endDateInput, {
      dateFormat: "Y-m-d",
      allowInput: true,
      disableMobile: true,
      clickOpens: false,
      locale: { firstDayOfWeek: 0 },
      minDate: null,
    });
    const startIcon =
      startDateInput.parentElement.querySelector(".bi-calendar3");
    if (startIcon) {
      startIcon.style.cursor = "pointer";
      startIcon.addEventListener("click", function () {
        startDatePicker.open();
      });
    }
    const endIcon = endDateInput.parentElement.querySelector(".bi-calendar3");
    if (endIcon) {
      endIcon.style.cursor = "pointer";
      endIcon.addEventListener("click", function () {
        endDatePicker.open();
      });
    }
    return { startDatePicker, endDatePicker };
  }
  return null;
}

// QUICK DATE BUTTONS FUNCTIONALITY

function initializeQuickDateButtons(startDatePicker, endDatePicker) {
  if (!startDatePicker || !endDatePicker) return;
  const quickDateButtons = document.querySelectorAll(".btn-date-quick-modern");
  if (quickDateButtons.length >= 4) {
    quickDateButtons[0].addEventListener("click", function () {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      startDatePicker.setDate(yesterday, true);
      endDatePicker.setDate(today, true);
    });
    quickDateButtons[1].addEventListener("click", function () {
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      startDatePicker.setDate(sevenDaysAgo, true);
      endDatePicker.setDate(today, true);
    });
    quickDateButtons[2].addEventListener("click", function () {
      const today = new Date();
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(today.getMonth() - 1);
      startDatePicker.setDate(oneMonthAgo, true);
      endDatePicker.setDate(today, true);
    });
    quickDateButtons[3].addEventListener("click", function () {
      const today = new Date();
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(today.getMonth() - 2);
      startDatePicker.setDate(twoMonthsAgo, true);
      endDatePicker.setDate(today, true);
    });
  }
}

// X-BAR CHART INITIALIZATION

function initializeXBarChart() {
  const canvas = document.getElementById("xBarChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const xBarLabels = [
    "04/01",
    "04/02",
    "04/03",
    "04/04",
    "04/05",
    "04/10",
    "04/14",
    "04/15",
    "04/16",
    "04/17",
    "04/17",
    "04/19",
    "04/22",
    "04/23",
    "04/24",
    "04/25",
    "04/26",
    "04/29",
    "04/29",
    "04/30",
  ];
  const xBarData = [
    50.0, 50.1, 50.3, 50.5, 50.3, 50.3, 50.3, 50.2, 50.3, 50.3, 50.7, 50.3,
    50.1, 49.3, 50.4, 50.3, 50.2, 50.2, 50.7, 49.9,
  ];
  const UCL = 51.2,
    CL = 50.0,
    LCL = 48.8;

  new Chart(ctx, {
    type: "line",
    data: {
      labels: xBarLabels,
      datasets: [
        {
          label: "X-Bar",
          data: xBarData,
          borderColor: "#3a8fe8",
          backgroundColor: "transparent",
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: "#3a8fe8",
          tension: 0.1,
          order: 1,
        },
        {
          label: "UCL=51.20",
          data: Array(xBarLabels.length).fill(UCL),
          borderColor: "#e03e3e",
          borderWidth: 1.5,
          borderDash: [5, 4],
          pointRadius: 0,
          tension: 0,
          order: 2,
        },
        {
          label: "CL=50.00",
          data: Array(xBarLabels.length).fill(CL),
          borderColor: "#27ae60",
          borderWidth: 1.5,
          borderDash: [5, 4],
          pointRadius: 0,
          tension: 0,
          order: 2,
        },
        {
          label: "LCL=48.80",
          data: Array(xBarLabels.length).fill(LCL),
          borderColor: "#e03e3e",
          borderWidth: 1.5,
          borderDash: [5, 4],
          pointRadius: 0,
          tension: 0,
          order: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: { legend: { display: false }, tooltip: { enabled: true } },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { font: { size: 11 }, color: "#888" },
        },
        y: {
          min: 48.0,
          max: 52.0,
          border: { display: false },
          ticks: { stepSize: 0.5, font: { size: 11 }, color: "#888" },
          grid: { color: "rgba(0,0,0,0.05)" },
          title: {
            display: true,
            text: "WEIGHT (G)",
            font: { size: 11 },
            color: "#888",
          },
        },
      },
      layout: { padding: { right: 90, left: 0, top: 10, bottom: 0 } },
    },
    plugins: [
      {
        id: "referenceLineLabels",
        afterDraw(chart) {
          const {
            ctx,
            scales: { x, y },
          } = chart;
          const lines = [
            { value: UCL, label: "UCL=51.20", color: "#e03e3e" },
            { value: CL, label: "CL=50.00", color: "#27ae60" },
            { value: LCL, label: "LCL=48.80", color: "#e03e3e" },
          ];
          ctx.save();
          ctx.font = "11px sans-serif";
          lines.forEach(({ value, label, color }) => {
            const yPos = y.getPixelForValue(value);
            ctx.fillStyle = color;
            ctx.fillText(label, x.right + 8, yPos + 4);
          });
          ctx.restore();
        },
      },
    ],
  });
}

// R-BAR CHART INITIALIZATION

function initializeRBarChart() {
  const canvas = document.getElementById("rBarChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const rBarLabels = [
    "04/24",
    "04/23",
    "04/25",
    "04/27",
    "04/08",
    "04/19",
    "04/10",
    "04/21",
    "04/25",
    "04/25",
    "04/25",
    "04/22",
    "04/25",
    "04/25",
    "04/23",
    "00/05",
  ];
  const rBarData = [
    4.3, 4.1, 2.8, 3.8, 4.3, 6.2, 4.5, 3.6, 4.4, 4.6, 4.4, 4.0, 4.2, 3.8, 4.0,
    4.5,
  ];

  const UCL_R = 9.2,
    RBAR = 4.4,
    LCL_R = 0.2;

  // Both 0.0 and 0.2 are excluded from afterBuildTicks to avoid Chart.js
  // placing them only ~3px apart. Both are drawn manually in afterDraw:
  // 0.2 is locked to its natural position (exactly on the LCL line),
  // and 0.0 is nudged downward if it would overlap 0.2.
  const explicitTicks = [0.0, 4.4, 6.2, 8.4, 11.0];

  new Chart(ctx, {
    type: "line",
    data: {
      labels: rBarLabels,
      datasets: [
        {
          label: "",
          data: rBarData,
          borderColor: "#3a8fe8",
          backgroundColor: "transparent",
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: "#3a8fe8",
          tension: 0.1,
          order: 1,
        },
        {
          label: "",
          data: Array(rBarLabels.length).fill(UCL_R),
          borderColor: "#e03e3e",
          borderWidth: 1.5,
          borderDash: [5, 4],
          pointRadius: 0,
          pointHoverRadius: 0,
          tension: 0,
          order: 2,
        },
        {
          label: "",
          data: Array(rBarLabels.length).fill(RBAR),
          borderColor: "#27ae60",
          borderWidth: 1.5,
          borderDash: [5, 4],
          pointRadius: 0,
          pointHoverRadius: 0,
          tension: 0,
          order: 2,
        },
        {
          label: "",
          data: Array(rBarLabels.length).fill(LCL_R),
          borderColor: "#e03e3e",
          borderWidth: 1.5,
          borderDash: [5, 4],
          pointRadius: 0,
          pointHoverRadius: 0,
          tension: 0,
          order: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true, filter: (item) => item.datasetIndex === 0 },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { font: { size: 11 }, color: "#888" },
        },
        y: {
          min: -2.5,
          max: 12.0,
          border: { display: false },
          afterBuildTicks(axis) {
            axis.ticks = explicitTicks.map((v) => ({ value: v }));
          },
          ticks: {
            font: { size: 11 },
            color: "#888",
            callback(value) {
              const rounded = parseFloat(parseFloat(value).toFixed(1));
              // 0.0 and 0.2 labels are drawn manually in afterDraw — suppress them here
              if (rounded === 0.0 || rounded === 0.2) return "";
              return explicitTicks.includes(rounded) ? rounded.toFixed(1) : "";
            },
          },
          grid: {
            color(context) {
              const v = parseFloat(parseFloat(context.tick.value).toFixed(1));
              return v === 0.0 ? "#c8c8c8" : "rgba(0,0,0,0.05)";
            },
          },
        },
      },
      layout: { padding: { right: 90, left: 0, top: 10, bottom: 16 } },
    },
    plugins: [
      {
        id: "rReferenceLineLabels",
        afterDraw(chart) {
          const {
            ctx,
            scales: { x, y },
          } = chart;

          const MIN_GAP = 14;
          const y02 = y.getPixelForValue(0.2);
          const y00 = y.getPixelForValue(0.0);
          const y00_drawn = Math.max(y00, y02 + MIN_GAP);

          // Right-side control line labels
          ctx.save();
          ctx.font = "11px sans-serif";
          ctx.textAlign = "left";
          [
            { value: UCL_R, label: "UCL=9.2", color: "#e03e3e" },
            { value: RBAR, label: "R BAR 4.4", color: "#27ae60" },
            { value: LCL_R, label: "LCL=0.2", color: "#e03e3e" },
          ].forEach(({ value, label, color }) => {
            ctx.fillStyle = color;
            ctx.fillText(label, x.right + 8, y.getPixelForValue(value) + 4);
          });
          ctx.restore();

          // 3. Left-side tick labels: 0.2 on LCL line, 0.0 nudged below
          ctx.save();
          ctx.font = "11px sans-serif";
          ctx.textAlign = "right";
          ctx.fillStyle = "#888";
          ctx.fillText("0.2", x.left - 4, y02 + 4);
          ctx.fillText("0.0", x.left - 4, y00_drawn + 4);
          ctx.restore();
        },
      },
    ],
  });
}

// 협력사 기준 HISTOGRAM + NORMAL CURVE CHART

function initializeHyeobryeopsaChart() {
  const canvas = document.getElementById("hyeobryeopsaChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const binCenters = [
    49.2, 49.5, 49.8, 50.1, 50.4, 50.7, 51.0, 51.3, 51.6, 51.9, 52.2, 52.5,
    52.8, 53.1, 53.4, 53.7, 54.0, 54.3, 54.6, 54.9,
  ];
  const frequencies = [
    0.2, 0.5, 1.2, 2.5, 3.8, 5.2, 6.5, 7.2, 7.0, 6.2, 5.0, 3.5, 2.2, 1.2, 0.6,
    0.3, 0.15, 0.08, 0.04, 0.02,
  ];
  const mean = 51.3,
    std = 0.9;
  const curveData = binCenters.map((x) => {
    const exp = -0.5 * Math.pow((x - mean) / std, 2);
    return (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(exp) * 10;
  });
  const USL_LINE = 7.8;

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: binCenters.map((v) => v.toFixed(1)),
      datasets: [
        {
          type: "bar",
          label: "",
          data: frequencies,
          backgroundColor: "rgba(66,133,244,0.75)",
          borderColor: "rgba(66,133,244,0.9)",
          borderWidth: 1,
          barPercentage: 0.95,
          categoryPercentage: 1.0,
          order: 2,
        },
        {
          type: "line",
          label: "",
          data: curveData,
          borderColor: "#27ae60",
          borderWidth: 2.5,
          pointRadius: 0,
          tension: 0.4,
          fill: false,
          order: 1,
        },
        {
          type: "line",
          label: "",
          data: Array(binCenters.length).fill(USL_LINE),
          borderColor: "#27ae60",
          borderWidth: 1.5,
          borderDash: [4, 3],
          pointRadius: 0,
          tension: 0,
          fill: false,
          order: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            font: { size: 11 },
            color: "#888",
            callback(val, index) {
              return [0, 3, 7, 11, 15, 19].includes(index)
                ? binCenters[index].toFixed(0)
                : "";
            },
          },
        },
        y: {
          min: 0,
          max: 9,
          border: { display: false },
          afterBuildTicks(axis) {
            axis.ticks = [0, 3.0, 5.5].map((v) => ({ value: v }));
          },
          ticks: {
            font: { size: 11 },
            color: "#888",
            callback(value) {
              if (value === 0) return "50";
              if (value === 3.0) return "3.00";
              if (value === 5.5) return "5.50";
              return "";
            },
          },
          grid: { color: "rgba(0,0,0,0.05)" },
        },
      },
      layout: { padding: { right: 100, left: 10, top: 10, bottom: 0 } },
    },
    plugins: [
      {
        id: "hyeobryeopsaLabels",
        afterDraw(chart) {
          const {
            ctx,
            scales: { x, y },
          } = chart;
          ctx.save();
          const uslY = y.getPixelForValue(USL_LINE);
          ctx.fillStyle = "#27ae60";
          ctx.font = "bold 11px sans-serif";
          ctx.fillText("USL=152.20", x.right + 8, uslY + 4);
          ctx.fillStyle = "#888";
          ctx.font = "11px sans-serif";
          ctx.fillText("LSL", x.left - 32, y.top + 4);
          ctx.restore();
        },
      },
    ],
  });
}

// MAIN INITIALIZATION

document.addEventListener("DOMContentLoaded", function () {
  initializeCustomDropdowns();

  let datePickers = null;
  if (typeof flatpickr !== "undefined") {
    datePickers = initializeDatePickers();
    if (datePickers)
      initializeQuickDateButtons(
        datePickers.startDatePicker,
        datePickers.endDatePicker,
      );
  }

  if (typeof Chart !== "undefined") {
    initializeXBarChart();
    initializeRBarChart();
    initializeHyeobryeopsaChart();
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
      if (submenu && submenu.classList.contains("dropdown-menu")) {
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
      }
      return false;
    });
  });

  if (typeof bootstrap !== "undefined" && bootstrap.Dropdown) {
    menuLinksWithDropdown.forEach(function (link) {
      link.addEventListener("show.bs.dropdown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      });
      link.addEventListener("hide.bs.dropdown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      });
    });
  }

  const regularMenuLinks = document.querySelectorAll(
    ".menu-item-link[data-page]",
  );
  regularMenuLinks.forEach(function (link) {
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

  const submenuItems = document.querySelectorAll(".submenu-item-link");
  submenuItems.forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.stopPropagation();
      submenuItems.forEach((i) => i.classList.remove("is-active"));
      this.classList.add("is-active");
      document
        .querySelectorAll(".menu-item-link")
        .forEach((l) => l.classList.remove("is-active"));
    });
  });

  window.addEventListener("resize", function () {
    if (!isMobileView()) closeMobilePopup();
  });
});
