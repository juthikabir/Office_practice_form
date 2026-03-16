// Check if viewport is mobile size
function isMobileView() {
  return window.innerWidth <= 768;
}

// Create the mobile submenu popup element (only once)
function createMobilePopup() {
  if (document.getElementById("mobileSubmenuPopup")) return;
  document.body.insertAdjacentHTML(
    "beforeend",
    '<div id="mobileSubmenuPopup" class="mobile-submenu-popup"></div>',
  );
  // Close popup when clicking outside sidebar
  document.addEventListener("click", function (e) {
    const popup = document.getElementById("mobileSubmenuPopup");
    const sidebar = document.querySelector(".page-sidebar");
    if (popup && !popup.contains(e.target) && !sidebar.contains(e.target))
      closeMobilePopup();
  });
}

// Show mobile submenu popup near clicked sidebar item
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

// Hide mobile submenu popup
function closeMobilePopup() {
  const popup = document.getElementById("mobileSubmenuPopup");
  if (popup) popup.classList.remove("show");
}

   //DOM READY

document.addEventListener("DOMContentLoaded", function () {

       //SUMMARY DATE PICKERS
    
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

       //CAR CHART DATE PICKERS
       
  let carStartFp;
  let carEndFp;

  carStartFp = flatpickr("#carStartDatePicker", {
    dateFormat: "Y-m",
    allowInput: false,
    disableMobile: true,
    appendTo: document.body,
    static: false,
    onOpen: function () {
      if (carEndFp) carEndFp.close();
    },
  });

  carEndFp = flatpickr("#carEndDatePicker", {
    dateFormat: "Y-m",
    allowInput: false,
    disableMobile: true,
    appendTo: document.body,
    static: false,
    onOpen: function () {
      if (carStartFp) carStartFp.close();
    },
  });

  document
    .getElementById("carStartCalBtn")
    .addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      carStartFp.open();
    });
  document
    .getElementById("carEndCalBtn")
    .addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      carEndFp.open();
    });
  document
    .getElementById("carStartDatePicker")
    .addEventListener("click", function () {
      carStartFp.open();
    });
  document
    .getElementById("carEndDatePicker")
    .addEventListener("click", function () {
      carEndFp.open();
    });

       //FINDING CHART DATE PICKERS
    
  let findingStartFp;
  let findingEndFp;

  findingStartFp = flatpickr("#findingStartDatePicker", {
    dateFormat: "Y-m",
    allowInput: false,
    disableMobile: true,
    appendTo: document.body,
    static: false,
    onOpen: function () {
      if (findingEndFp) findingEndFp.close();
    },
  });

  findingEndFp = flatpickr("#findingEndDatePicker", {
    dateFormat: "Y-m",
    allowInput: false,
    disableMobile: true,
    appendTo: document.body,
    static: false,
    onOpen: function () {
      if (findingStartFp) findingStartFp.close();
    },
  });

  document
    .getElementById("findingStartCalBtn")
    .addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      findingStartFp.open();
    });
  document
    .getElementById("findingEndCalBtn")
    .addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      findingEndFp.open();
    });
  document
    .getElementById("findingStartDatePicker")
    .addEventListener("click", function () {
      findingStartFp.open();
    });
  document
    .getElementById("findingEndDatePicker")
    .addEventListener("click", function () {
      findingEndFp.open();
    });

    // COA CHART DATE PICKERS
  let coaStartFp;
  let coaEndFp;

  coaStartFp = flatpickr("#coaStartDatePicker", {
    dateFormat: "Y-m",
    allowInput: false,
    disableMobile: true,
    appendTo: document.body,
    static: false,
    onOpen: function () { if (coaEndFp) coaEndFp.close(); },
  });

  coaEndFp = flatpickr("#coaEndDatePicker", {
    dateFormat: "Y-m",
    allowInput: false,
    disableMobile: true,
    appendTo: document.body,
    static: false,
    onOpen: function () { if (coaStartFp) coaStartFp.close(); },
  });

  document.getElementById("coaStartCalBtn").addEventListener("click", function (e) {
    e.preventDefault(); e.stopPropagation(); coaStartFp.open();
  });
  document.getElementById("coaEndCalBtn").addEventListener("click", function (e) {
    e.preventDefault(); e.stopPropagation(); coaEndFp.open();
  });
  document.getElementById("coaStartDatePicker").addEventListener("click", function () { coaStartFp.open(); });
  document.getElementById("coaEndDatePicker").addEventListener("click", function () { coaEndFp.open(); });

  // AUDIT TOP10 CHART DATE PICKERS
  let auditStartFp;
  let auditEndFp;

  auditStartFp = flatpickr("#auditStartDatePicker", {
    dateFormat: "Y-m",
    allowInput: false,
    disableMobile: true,
    appendTo: document.body,
    static: false,
    onOpen: function () { if (auditEndFp) auditEndFp.close(); },
  });

  auditEndFp = flatpickr("#auditEndDatePicker", {
    dateFormat: "Y-m",
    allowInput: false,
    disableMobile: true,
    appendTo: document.body,
    static: false,
    onOpen: function () { if (auditStartFp) auditStartFp.close(); },
  });

  document.getElementById("auditStartCalBtn").addEventListener("click", function (e) {
    e.preventDefault(); e.stopPropagation(); auditStartFp.open();
  });
  document.getElementById("auditEndCalBtn").addEventListener("click", function (e) {
    e.preventDefault(); e.stopPropagation(); auditEndFp.open();
  });
  document.getElementById("auditStartDatePicker").addEventListener("click", function () { auditStartFp.open(); });
  document.getElementById("auditEndDatePicker").addEventListener("click", function () { auditEndFp.open(); });


       //CHART 1: 월별 CAR 발생현황 (Area Chart - 2024Y fill + 2025Y dashed)
   
  const carCanvas = document.getElementById("carMonthlyChart");
  const carCtx = carCanvas.getContext("2d");

  // Blue gradient fill for 2024Y area
  const carGradient = carCtx.createLinearGradient(0, 0, 0, 220);
  carGradient.addColorStop(0, "rgba(91,141,238,0.38)");
  carGradient.addColorStop(1, "rgba(91,141,238,0.02)");

  new Chart(carCanvas, {
    type: "line",
    data: {
      labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
      datasets: [
        {
          // 2024Y — solid blue filled area
          label: "2024Y",
          data: [95, 72, 88, 65, 98, 100],
          borderColor: "#5b8dee",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          fill: true,
          backgroundColor: carGradient,
          tension: 0.45,
        },
        {
          // 2025Y — dashed gray line, no fill
          label: "2025Y",
          data: [58, 62, 70, 55, 68, 60],
          borderColor: "#b0b8c9",
          borderWidth: 2,
          borderDash: [6, 4],
          pointRadius: 0,
          pointHoverRadius: 4,
          fill: false,
          backgroundColor: "transparent",
          tension: 0.45,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false }, // custom legend in HTML
        tooltip: {
          backgroundColor: "#fff",
          titleColor: "#333",
          bodyColor: "#555",
          borderColor: "#e4e6f0",
          borderWidth: 1,
          padding: 10,
          cornerRadius: 8,
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { color: "#999", font: { size: 12 } },
        },
        y: {
          min: 30,
          max: 100,
          grid: { color: "#f0f0f5" },
          border: { display: false },
          ticks: {
            color: "#999",
            font: { size: 11 },
            stepSize: 20,
          },
        },
      },
    },
  });

 
       //CHART 2: 월별 Finding (Multi-line - 4 categories)
  
  const findingCanvas = document.getElementById("findingMonthlyChart");

  new Chart(findingCanvas, {
    type: "line",
    data: {
      labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
      datasets: [
        {
          // 예방조치 — orange
          label: "예방조치",
          data: [20, 18, 22, 80, 15, 25],
          borderColor: "#f5a623",
          backgroundColor: "transparent",
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#f5a623",
          fill: false,
          tension: 0.3,
        },
        {
          // 시스템개선 — green
          label: "시스템개선",
          data: [55, 20, 40, 75, 10, 40],
          borderColor: "#4caf50",
          backgroundColor: "transparent",
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#4caf50",
          fill: false,
          tension: 0.3,
        },
        {
          // 시정조치 — purple
          label: "시정조치",
          data: [85, 20, 15, 12, 82, 68],
          borderColor: "#b06bee",
          backgroundColor: "transparent",
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#b06bee",
          fill: false,
          tension: 0.3,
        },
        {
          // 긴급조치 — blue
          label: "긴급조치",
          data: [40, 45, 50, 88, 35, 28],
          borderColor: "#3b82f6",
          backgroundColor: "transparent",
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#3b82f6",
          fill: false,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false }, // custom legend in HTML
        tooltip: {
          backgroundColor: "#fff",
          titleColor: "#333",
          bodyColor: "#555",
          borderColor: "#e4e6f0",
          borderWidth: 1,
          padding: 10,
          cornerRadius: 8,
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { color: "#999", font: { size: 12 } },
        },
        y: {
          min: 0,
          max: 100,
          grid: { color: "#f0f0f5" },
          border: { display: false },
          ticks: {
            color: "#999",
            font: { size: 11 },
            stepSize: 20,
          },
        },
      },
    },
  });



  // CHART 3: 월별 CoA 등록율 (Stacked Bar)
  const coaLabels = [
    "시늄시스...", "시늄시스...", "시늄시스...", "시늄시스...", "시늄시스...",
    "시늄시스...", "시늄시스...", "시늄시스...", "시늄시스...", "시늄시스..."
  ];

  new Chart(document.getElementById("coaMonthlyChart"), {
    type: "bar",
    data: {
      labels: coaLabels,
      datasets: [
        {
          label: "자재",
          data: [18, 22, 15, 20, 25, 18, 22, 16, 30, 14],
          backgroundColor: "#7c6fe0",
          borderRadius: 0,
          borderSkipped: false,
        },
        {
          label: "설비",
          data: [14, 16, 12, 18, 14, 16, 10, 14, 12, 10],
          backgroundColor: "#f28b7d",
          borderRadius: 0,
          borderSkipped: false,
        },
        {
          label: "품질",
          data: [20, 18, 16, 22, 18, 20, 18, 20, 16, 8],
          backgroundColor: "#4dc8c8",
          borderRadius: 0,
          borderSkipped: false,
        },
        {
          label: "공정",
          data: [16, 12, 10, 14, 16, 10, 14, 12, 18, 6],
          backgroundColor: "#f5a623",
          borderRadius: 2,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#fff",
          titleColor: "#333",
          bodyColor: "#555",
          borderColor: "#e4e6f0",
          borderWidth: 1,
          padding: 10,
          cornerRadius: 8,
        },
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: "#999",
            font: { size: 11 },
            maxRotation: 0,
          },
        },
        y: {
          stacked: true,
          min: 0,
          grid: { color: "#f0f0f5" },
          border: { display: false },
          ticks: { color: "#999", font: { size: 11 }, stepSize: 20 },
        },
      },
    },
  });


  // CHART 4: Audit Top10 (Grouped Bar)
  const auditLabels = [
    "시늄시스...", "시늄시스...", "시늄시스...", "시늄시스...", "시늄시스...",
    "시늄시스...", "시늄시스...", "시늄시스...", "시늄시스...", "시늄시스..."
  ];

  new Chart(document.getElementById("auditTop10Chart"), {
    type: "bar",
    data: {
      labels: auditLabels,
      datasets: [
        {
          label: "1분기",
          data: [20, 70, 60, 30, 20, 90, 20, 80, 50, 70],
          backgroundColor: "#a5b4fc",
          borderRadius: 3,
          borderSkipped: false,
          barPercentage: 0.7,
          categoryPercentage: 0.6,
        },
        {
          label: "2분기",
          data: [35, 65, 50, 25, 10, 40, 55, 20, 60, 75],
          backgroundColor: "#f0abfc",
          borderRadius: 3,
          borderSkipped: false,
          barPercentage: 0.7,
          categoryPercentage: 0.6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#fff",
          titleColor: "#333",
          bodyColor: "#555",
          borderColor: "#e4e6f0",
          borderWidth: 1,
          padding: 10,
          cornerRadius: 8,
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: "#999",
            font: { size: 11 },
            maxRotation: 0,
          },
        },
        y: {
          min: 0,
          max: 100,
          grid: { color: "#f0f0f5" },
          border: { display: false },
          ticks: { color: "#999", font: { size: 11 }, stepSize: 20 },
        },
      },
    },
  });
  
  
       //SIDEBAR DROPDOWN TOGGLE
   
  document
    .querySelectorAll('.menu-item-link[data-bs-toggle="dropdown"]')
    .forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const submenu = this.nextElementSibling;
        if (submenu && submenu.classList.contains("dropdown-menu")) {
          if (isMobileView()) {
            // Show floating popup on mobile
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
            // Toggle inline submenu on desktop
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

  
       //REGULAR MENU LINKS (no submenu)
    
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


       //SUBMENU ITEM CLICK
    
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

       //RESIZE — close mobile popup on desktop resize
    
  window.addEventListener("resize", function () {
    if (!isMobileView()) closeMobilePopup();
  });
}); // end DOMContentLoaded
