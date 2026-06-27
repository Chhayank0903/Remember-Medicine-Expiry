// MediGuard Application Logic
// System Reference Date: June 27, 2026

const REFERENCE_DATE = new Date("2026-06-27");

// Seed Stock Data (Default if localStorage is empty)
const SEED_MEDICINES = [
  {
    id: "med-1",
    name: "Amoxicillin",
    brand: "Alkem Labs",
    category: "Antibiotic",
    batch: "B-234",
    expiry: "2026-07-04", // 7 days from reference date
    qty: 40,
    location: "Health Centre",
    owner: "ASHA Worker Sunita"
  },
  {
    id: "med-2",
    name: "ORS Sachet",
    brand: "FDC Ltd",
    category: "Other",
    batch: "ORS-889",
    expiry: "2026-03-15", // Expired
    qty: 15,
    location: "Kirana Store",
    owner: "Ramesh Prasad"
  },
  {
    id: "med-3",
    name: "Polio Vaccine",
    brand: "Serum Institute",
    category: "Vaccine",
    batch: "PV-102",
    expiry: "2026-07-15", // 18 days from reference date
    qty: 10,
    location: "Health Centre",
    owner: "Nurse Anita"
  },
  {
    id: "med-4",
    name: "Paracetamol 650mg",
    brand: "Micro Labs (Dolo)",
    category: "Painkiller",
    batch: "PM-772",
    expiry: "2027-08-15", // Safe
    qty: 200,
    location: "Home",
    owner: "Dadi Kamla"
  },
  {
    id: "med-5",
    name: "Benadryl Cough Syrup",
    brand: "Kenvue",
    category: "Syrup",
    batch: "CS-301",
    expiry: "2026-05-30", // Expired
    qty: 5,
    location: "Home",
    owner: "Grandpa Raj"
  },
  {
    id: "med-6",
    name: "Cetirizine 10mg",
    brand: "Cipla",
    category: "Other",
    batch: "CT-990",
    expiry: "2028-10-01", // Safe
    qty: 120,
    location: "Kirana Store",
    owner: "Ramesh Prasad"
  }
];

// Localization Dictionary
const i18n = {
  en: {
    tagline: "ASHA & Community Health Assistant",
    total_tracked: "Total Tracked",
    expired_count: "Expired",
    expiring_soon: "Expiring Soon",
    safe_count: "Safe Stock",
    urgent_alerts: "Urgent Expiry Alerts",
    search_placeholder: "Search medicine, brand, batch...",
    filter_status: "Status",
    all: "All Statuses",
    expired_only: "🔴 Expired",
    expiring_only: "🟡 Expiring Soon",
    safe_only: "🟢 Safe",
    filter_location: "Location",
    all_locations: "All Locations",
    loc_health_centre: "Health Centre",
    loc_home: "Home / Elder Care",
    loc_kirana: "Kirana Store",
    filter_category: "Category",
    all_categories: "All Categories",
    cat_antibiotic: "Antibiotic",
    cat_vaccine: "Vaccine",
    cat_syrup: "Syrup",
    cat_painkiller: "Painkiller",
    cat_other: "Other",
    add_new_medicine: "Add New Medicine",
    download_report: "Download CSV Report",
    tracked_medicines: "Tracked Stock",
    agent_helper: "Your Expiry Assistant",
    chip_expiring_week: "Expiring this week?",
    chip_expired_health: "Expired at Health Centre?",
    chip_expired_amox: "What to do with expired Amoxicillin?",
    chip_how_to_add: "How to add via chat?",
    chat_input_placeholder: "Type a message or add medicine...",
    modal_add_title: "Register Medicine",
    lbl_med_name: "Medicine Name",
    lbl_category: "Category",
    lbl_brand: "Brand / Manufacturer",
    lbl_batch: "Batch Number",
    lbl_expiry: "Expiry Date",
    lbl_expiry_hint: "Date when this medicine expires",
    lbl_qty: "Quantity (Pills/Bottles)",
    lbl_location: "Storage Location",
    lbl_owner: "Owner / Contact Name",
    btn_cancel: "Cancel",
    btn_save: "Save Medicine",
    owner_placeholder: "e.g., ASHA Worker Sunita",
    med_name_placeholder: "e.g., Paracetamol",
    med_alert_days: "will expire in {days} days.",
    med_alert_expired: "has expired. Do not use. Dispose safely."
  },
  hi: {
    tagline: "आशा और सामुदायिक स्वास्थ्य सहायक",
    total_tracked: "कुल दवाएं",
    expired_count: "समाप्त (Expired)",
    expiring_soon: "जल्द समाप्त (30 दिन)",
    safe_count: "सुरक्षित स्टॉक",
    urgent_alerts: "आपातकालीन चेतावनी",
    search_placeholder: "दवा, ब्रांड, बैच नंबर खोजें...",
    filter_status: "स्थिति",
    all: "सभी स्थितियां",
    expired_only: "🔴 समाप्त (Expired)",
    expiring_only: "🟡 जल्द समाप्त होने वाली",
    safe_only: "🟢 सुरक्षित दवाएं",
    filter_location: "स्थान",
    all_locations: "सभी स्थान",
    loc_health_centre: "स्वास्थ्य केंद्र",
    loc_home: "घर / बुजुर्ग",
    loc_kirana: "किराना दुकान",
    filter_category: "श्रेणी",
    all_categories: "सभी श्रेणियां",
    cat_antibiotic: "एंटीबायोटिक",
    cat_vaccine: "वैक्सीन",
    cat_syrup: "सिरप",
    cat_painkiller: "दर्द निवारक",
    cat_other: "अन्य",
    add_new_medicine: "नई दवा जोड़ें",
    download_report: "रिपोर्ट (CSV) डाउनलोड करें",
    tracked_medicines: "दवा स्टॉक सूची",
    agent_helper: "आपकी डिजिटल सहेली",
    chip_expiring_week: "इस हफ्ते क्या समाप्त होगा?",
    chip_expired_health: "स्वास्थ्य केंद्र पर समाप्त दवाएं?",
    chip_expired_amox: "समाप्त अमोक्सिसिलिन का क्या करें?",
    chip_how_to_add: "चैट से दवा कैसे जोड़ें?",
    chat_input_placeholder: "संदेश लिखें या दवा दर्ज करें...",
    modal_add_title: "दवा की जानकारी दर्ज करें",
    lbl_med_name: "दवा का नाम",
    lbl_category: "श्रेणी",
    lbl_brand: "ब्रांड / निर्माता",
    lbl_batch: "बैच नंबर",
    lbl_expiry: "समाप्ति की तिथि (Expiry Date)",
    lbl_expiry_hint: "दवा की अंतिम तिथि",
    lbl_qty: "मात्रा (गोली/शीशी)",
    lbl_location: "रखने का स्थान",
    lbl_owner: "मालिक / संपर्क का नाम",
    btn_cancel: "रद्द करें",
    btn_save: "दवा सुरक्षित करें",
    owner_placeholder: "उदा. आशा कार्यकर्ता सुनीता",
    med_name_placeholder: "उदा. पैरासिटामोल",
    med_alert_days: "{days} दिनों में समाप्त हो जाएगी।",
    med_alert_expired: "समाप्त हो चुकी है। कृपया इसका उपयोग न करें। सुरक्षित निपटान करें।"
  }
};

// Application State
let medicines = [];
let currentLang = "en";
let filterStatusVal = "all";
let activeChatHistory = [];

// DOM Elements
const currentDisplayDate = document.getElementById("current-date-display");
const langToggleBtn = document.getElementById("lang-toggle");
const langText = document.getElementById("lang-text");

const statTotalEl = document.getElementById("stat-total");
const statExpiredEl = document.getElementById("stat-expired");
const statExpiringEl = document.getElementById("stat-expiring");
const statSafeEl = document.getElementById("stat-safe");

const urgentAlertsPanel = document.getElementById("urgent-alerts-panel");
const alertsCountBadge = document.getElementById("alerts-count-badge");
const alertsListEl = document.getElementById("alerts-list");

const searchInput = document.getElementById("search-input");
const filterStatusSelect = document.getElementById("filter-status");
const filterLocationSelect = document.getElementById("filter-location");
const filterCategorySelect = document.getElementById("filter-category");

const medicineGridEl = document.getElementById("medicine-grid");
const showingCountEl = document.getElementById("showing-count");

const btnOpenAdd = document.getElementById("btn-open-add");
const btnCloseModal = document.getElementById("btn-close-modal");
const btnCancelModal = document.getElementById("btn-cancel-modal");
const intakeModal = document.getElementById("intake-modal");
const intakeForm = document.getElementById("intake-form");

const chatMessagesEl = document.getElementById("chat-messages");
const chatInputEl = document.getElementById("chat-input");
const btnChatSend = document.getElementById("btn-chat-send");
const btnClearChat = document.getElementById("btn-clear-chat");

const btnExportCsv = document.getElementById("btn-export-csv");

const toastEl = document.getElementById("toast");
const toastMessageEl = document.getElementById("toast-message");
const toastIconEl = document.getElementById("toast-icon");

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  // Load language settings
  const storedLang = localStorage.getItem("mediguard_lang");
  if (storedLang && i18n[storedLang]) {
    currentLang = storedLang;
  }
  updateLanguageUI();

  // Load medicines from localStorage or seed
  const storedMeds = localStorage.getItem("mediguard_medicines");
  if (storedMeds) {
    medicines = JSON.parse(storedMeds);
  } else {
    medicines = [...SEED_MEDICINES];
    saveToStorage();
  }

  // Load chat history from localStorage or set default
  const storedChat = localStorage.getItem("mediguard_chat");
  if (storedChat) {
    activeChatHistory = JSON.parse(storedChat);
  } else {
    initDefaultChat();
  }

  // Bind Events
  bindEvents();

  // Initial UI Render
  renderDashboard();
  renderChat();
  lucide.createIcons();
});

// Save current medicines state
function saveToStorage() {
  localStorage.setItem("mediguard_medicines", JSON.stringify(medicines));
}

// Initial Agent Greeting
function initDefaultChat() {
  const welcomeEn = `Namaste! I am **Medi-Didi**, your digital medicine assistant. 🩺 I will automatically remind you before any medicine expires.\n\nYou can ask me questions, or add a medicine by typing: \n\`Add Paracetamol, Batch PM303, Expiry July 2026, Qty 100 at Home\``;
  const welcomeHi = `नमस्ते! मैं **मेड-दीदी** हूँ, आपकी डिजिटल स्वास्थ्य सहायक। 🩺 दवा समाप्त होने से पहले मैं आपको अपने आप सचेत करूँगी।\n\nआप मुझसे कोई भी सवाल पूछ सकते हैं, या चैट में दवा जोड़ने के लिए इस प्रकार लिख सकते हैं:\n\`Add पैरासिटामोल, बैच PM303, एक्सपायरी जुलाई 2026, मात्रा 100, स्थान Home\``;

  activeChatHistory = [
    {
      sender: "agent",
      text: currentLang === "en" ? welcomeEn : welcomeHi,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ];
  localStorage.setItem("mediguard_chat", JSON.stringify(activeChatHistory));
}

// Bind Page Events
function bindEvents() {
  // Lang Toggle
  langToggleBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "hi" : "en";
    localStorage.setItem("mediguard_lang", currentLang);
    updateLanguageUI();
    renderDashboard();
    
    // Reset/Translate chat default greeting if history contains only initial message
    if (activeChatHistory.length === 1) {
      initDefaultChat();
      renderChat();
    }
  });

  // Filters and Search
  searchInput.addEventListener("input", renderDashboard);
  filterStatusSelect.addEventListener("change", (e) => {
    filterStatusVal = e.target.value;
    renderDashboard();
  });
  filterLocationSelect.addEventListener("change", renderDashboard);
  filterCategorySelect.addEventListener("change", renderDashboard);

  // Modal Dialog Actions
  btnOpenAdd.addEventListener("click", () => {
    // Set expiry default to future
    document.getElementById("med-expiry").value = "2026-07-27";
    intakeModal.classList.add("active");
  });
  btnCloseModal.addEventListener("click", () => intakeModal.classList.remove("active"));
  btnCancelModal.addEventListener("click", () => intakeModal.classList.remove("active"));

  // Chat Send
  btnChatSend.addEventListener("click", handleChatSend);
  chatInputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleChatSend();
  });
  btnClearChat.addEventListener("click", () => {
    if (confirm(currentLang === "en" ? "Clear chat history?" : "क्या आप चैट इतिहास हटाना चाहते हैं?")) {
      initDefaultChat();
      renderChat();
    }
  });

  // Export CSV
  btnExportCsv.addEventListener("click", exportCSVReport);
}

// Update i18n Texts in DOM
function updateLanguageUI() {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (i18n[currentLang][key]) {
      el.textContent = i18n[currentLang][key];
    }
  });

  const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
  placeholders.forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (i18n[currentLang][key]) {
      el.setAttribute("placeholder", i18n[currentLang][key]);
    }
  });

  // Toggle button label
  langText.textContent = currentLang === "en" ? "हिंदी में" : "English";
}

// Calculate days remaining helper
function calculateDaysRemaining(expiryStr) {
  const expiryDate = new Date(expiryStr);
  const diffTime = expiryDate.getTime() - REFERENCE_DATE.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Format date to local readable string
function formatLocalDate(dateStr) {
  const d = new Date(dateStr);
  const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthsHi = ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
  
  const day = d.getDate();
  const monthIdx = d.getMonth();
  const year = d.getFullYear();

  if (currentLang === "hi") {
    return `${day} ${monthsHi[monthIdx]} ${year}`;
  }
  return `${day} ${monthsEn[monthIdx]} ${year}`;
}

// Display simple alert toast
function showToast(message, isSuccess = true) {
  toastMessageEl.textContent = message;
  if (isSuccess) {
    toastIconEl.setAttribute("data-lucide", "check-circle");
    toastEl.style.borderLeft = "5px solid var(--primary-color)";
  } else {
    toastIconEl.setAttribute("data-lucide", "alert-circle");
    toastEl.style.borderLeft = "5px solid var(--danger-color)";
  }
  lucide.createIcons();
  toastEl.classList.add("active");
  setTimeout(() => toastEl.classList.remove("active"), 3500);
}

// Add medicine directly to list
function addMedicine(med) {
  const newMed = {
    id: "med-" + Date.now(),
    ...med
  };
  medicines.unshift(newMed);
  saveToStorage();
  renderDashboard();
  return newMed;
}

// Delete / Dispose medicine
function deleteMedicine(id, actionType) {
  medicines = medicines.filter(m => m.id !== id);
  saveToStorage();
  renderDashboard();

  let msg = currentLang === "en" ? "Medicine removed successfully." : "दवा सूची से हटा दी गई है।";
  if (actionType === "dispose") {
    msg = currentLang === "en" ? "Medicine marked as Disposed safely." : "दवा को सुरक्षित रूप से निपटाया गया।";
  } else if (actionType === "return") {
    msg = currentLang === "en" ? "Medicine marked as Returned to supplier." : "दवा आपूर्तिकर्ता को वापस कर दी गई।";
  }
  showToast(msg);
}

// Set status filter programmatically from stats cards
function setFilterStatus(status) {
  filterStatusVal = status;
  filterStatusSelect.value = status;
  renderDashboard();
}

// Generate Dashboard UI Components
function renderDashboard() {
  const searchQ = searchInput.value.toLowerCase().trim();
  const filterLocation = filterLocationSelect.value;
  const filterCategory = filterCategorySelect.value;

  let totalCount = 0;
  let expiredCount = 0;
  let expiringCount = 0;
  let safeCount = 0;

  let alerts = [];
  let filteredMeds = [];

  medicines.forEach(m => {
    const days = calculateDaysRemaining(m.expiry);
    let status = "safe";
    if (days < 0) {
      status = "expired";
      expiredCount++;
    } else if (days <= 30) {
      status = "expiring";
      expiringCount++;
    } else {
      safeCount++;
    }
    totalCount++;

    // Setup alert warnings
    if (status === "expired" || status === "expiring") {
      alerts.push({
        id: m.id,
        name: m.name,
        batch: m.batch,
        location: m.location,
        status: status,
        days: days,
        category: m.category
      });
    }

    // Apply Filter Rules
    let matchesSearch = m.name.toLowerCase().includes(searchQ) || 
                        m.brand.toLowerCase().includes(searchQ) || 
                        m.batch.toLowerCase().includes(searchQ) ||
                        m.owner.toLowerCase().includes(searchQ);
                        
    let matchesStatus = filterStatusVal === "all" || status === filterStatusVal;
    let matchesLocation = filterLocation === "all" || m.location === filterLocation;
    let matchesCategory = filterCategory === "all" || m.category === filterCategory;

    if (matchesSearch && matchesStatus && matchesLocation && matchesCategory) {
      filteredMeds.push({ ...m, daysRemaining: days, status: status });
    }
  });

  // Sort: Expired first, then Expiring soon, then Safe
  filteredMeds.sort((a, b) => {
    if (a.status === "expired" && b.status !== "expired") return -1;
    if (a.status !== "expired" && b.status === "expired") return 1;
    if (a.status === "expiring" && b.status === "safe") return -1;
    if (a.status === "safe" && b.status === "expiring") return 1;
    return a.daysRemaining - b.daysRemaining;
  });

  // Render Stats Counters
  statTotalEl.textContent = totalCount;
  statExpiredEl.textContent = expiredCount;
  statExpiringEl.textContent = expiringCount;
  statSafeEl.textContent = safeCount;

  // Render Alerts Banner
  alerts.sort((a, b) => a.days - b.days); // Most critical first
  if (alerts.length > 0) {
    urgentAlertsPanel.style.display = "block";
    alertsCountBadge.textContent = currentLang === "en" ? `${alerts.length} Alerts` : `${alerts.length} चेतावनी`;
    
    alertsListEl.innerHTML = alerts.map(a => {
      let isExpired = a.status === "expired";
      let icon = isExpired ? "🚨" : "⚠️";
      let text = "";
      
      if (currentLang === "hi") {
        text = isExpired 
          ? `<strong>${a.name} (बैच ${a.batch})</strong> जो कि <strong>${a.location}</strong> पर है, ${i18n.hi.med_alert_expired}` 
          : `<strong>${a.name} (बैच ${a.batch})</strong> जो कि <strong>${a.location}</strong> पर है, ${i18n.hi.med_alert_days.replace('{days}', a.days)}`;
      } else {
        text = isExpired
          ? `🚨 <strong>${a.name} (Batch ${a.batch})</strong> at <strong>${a.location}</strong> has expired. Dispose safely.`
          : `⚠️ <strong>${a.name} (Batch ${a.batch})</strong> at <strong>${a.location}</strong> will expire in ${a.days} days.`;
      }

      return `
        <div class="alert-item ${isExpired ? 'expired' : 'soon'}">
          <div class="alert-item-icon">${icon}</div>
          <div class="alert-item-content">
            <div class="alert-item-desc">${text}</div>
            <div class="alert-item-action" onclick="focusMedicineCard('${a.id}')">
              ${currentLang === 'en' ? 'Review Recommendation' : 'सिफारिश देखें'} &rarr;
            </div>
          </div>
        </div>
      `;
    }).join("");
  } else {
    urgentAlertsPanel.style.display = "none";
  }

  // Render Medicine Stock Grid
  showingCountEl.textContent = currentLang === "en" 
    ? `Showing ${filteredMeds.length} medicines` 
    : `दिखाई दे रही हैं: ${filteredMeds.length} दवाएं`;

  if (filteredMeds.length === 0) {
    medicineGridEl.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 3rem; background: var(--card-bg); border-radius: var(--radius-lg); border: 1px solid var(--border-color)">
        <i data-lucide="package-open" style="width: 48px; height: 48px; color: var(--text-secondary); margin-bottom: 0.75rem;"></i>
        <h4 style="font-family: var(--font-header); font-weight: 700; font-size: 1.15rem;">
          ${currentLang === 'en' ? 'No medicines found' : 'कोई दवा नहीं मिली'}
        </h4>
        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.25rem;">
          ${currentLang === 'en' ? 'Try adjusting your filters or search query.' : 'कृपया फ़िल्टर बदलें या नई दवा खोजें।'}
        </p>
      </div>
    `;
  } else {
    medicineGridEl.innerHTML = filteredMeds.map(m => {
      let statusBadge = "";
      let statusClass = `status-${m.status}`;
      let timeText = "";
      let recText = "";
      let isDangerRec = false;

      // Status Badge & Timing Calculations
      if (m.status === "expired") {
        statusBadge = `<span class="badge badge-red">🔴 ${currentLang === 'en' ? 'Expired' : 'समाप्त'}</span>`;
        timeText = currentLang === 'en' ? `Expired (${Math.abs(m.daysRemaining)} days ago)` : `समाप्त (${Math.abs(m.daysRemaining)} दिन पहले)`;
        recText = currentLang === 'en' 
          ? "🚨 <strong>Dispose safely immediately.</strong> Do not give to patients. Return to supervisor if unopened." 
          : "🚨 <strong>सुरक्षित रूप से तुरंत फेंकें।</strong> मरीजों को न दें। यदि पैक न खुला हो तो सुपरवाइजर को लौटाएं।";
        isDangerRec = true;
      } else if (m.status === "expiring") {
        statusBadge = `<span class="badge badge-yellow">🟡 ${currentLang === 'en' ? 'Expiring soon' : 'जल्द समाप्त'}</span>`;
        timeText = currentLang === 'en' ? `Expires in ${m.daysRemaining} days` : `${m.daysRemaining} दिनों में समाप्त`;
        
        // Category specific recommendations
        if (m.category === "Antibiotic") {
          recText = currentLang === 'en' 
            ? "⚠️ Use this medicine first. Do not open new batch stock until this is used." 
            : "⚠️ इस दवा का पहले उपयोग करें। नए बैच का पैक तब तक न खोलें जब तक यह समाप्त न हो।";
        } else if (m.category === "Vaccine") {
          recText = currentLang === 'en' 
            ? "⚠️ Strict Vaccine Cold Chain warning! Notify ASHA supervisor immediately." 
            : "⚠️ वैक्सीन कोल्ड-चेन चेतावनी! तुरंत आशा सुपरवाइजर को सूचित करें।";
          isDangerRec = true;
        } else if (m.category === "Syrup") {
          recText = currentLang === 'en' 
            ? "⚠️ Check bottle seal and appearance. Return to supplier if unopened." 
            : "⚠️ बोतल की सील और रंग की जांच करें। न खुलने पर सप्लायर को वापस करें।";
        } else if (m.category === "Painkiller") {
          recText = currentLang === 'en' 
            ? "⚠️ Distribute first. Keep away from heat and direct sunlight." 
            : "⚠️ पहले वितरित करें। गर्मी और सीधी धूप से बचाकर रखें।";
        } else {
          recText = currentLang === 'en' 
            ? "⚠️ Place at front of storage box. Use before newer stock." 
            : "⚠️ पेटी में इसे सबसे आगे रखें। नए स्टॉक से पहले इसका इस्तेमाल करें।";
        }
      } else {
        statusBadge = `<span class="badge badge-green">🟢 ${currentLang === 'en' ? 'Safe' : 'सुरक्षित'}</span>`;
        timeText = currentLang === 'en' ? `Safe (${m.daysRemaining} days left)` : `सुरक्षित (${m.daysRemaining} दिन शेष)`;
        recText = currentLang === 'en' 
          ? "🟢 Stock is safe for consumption. Store under cool, dry conditions." 
          : "🟢 दवा सुरक्षित है। इसे ठंडी और सूखी जगह पर रखें।";
      }

      return `
        <div class="med-card ${statusClass}" id="med-card-${m.id}">
          <div class="med-card-header">
            <div class="med-info-block">
              <h4>${m.name}</h4>
              <span class="med-brand-batch">${m.brand} | Batch: ${m.batch}</span>
            </div>
            ${statusBadge}
          </div>

          <div class="med-card-details">
            <div class="detail-item">
              <span class="detail-label">${currentLang === 'en' ? 'Category' : 'श्रेणी'}</span>
              <span class="detail-val">
                <i data-lucide="tag"></i>
                ${currentLang === 'en' ? m.category : (i18n.hi['cat_' + m.category.toLowerCase()] || m.category)}
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">${currentLang === 'en' ? 'Quantity' : 'मात्रा'}</span>
              <span class="detail-val">
                <i data-lucide="layers"></i>
                <strong>${m.qty}</strong>
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">${currentLang === 'en' ? 'Location' : 'स्थान'}</span>
              <span class="detail-val">
                <i data-lucide="map-pin"></i>
                ${currentLang === 'en' ? m.location : (i18n.hi['loc_' + m.location.toLowerCase().replace(/\s/g, '_')] || m.location)}
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">${currentLang === 'en' ? 'Owner' : 'संपर्क'}</span>
              <span class="detail-val" title="${m.owner}">
                <i data-lucide="user"></i>
                ${m.owner}
              </span>
            </div>
            
            <div class="med-expiry-countdown">
              <i data-lucide="hourglass"></i>
              <span>${timeText} (${formatLocalDate(m.expiry)})</span>
            </div>
          </div>

          <div class="med-recommendation-box ${isDangerRec ? 'danger-rec' : m.status === 'expiring' ? 'warning-rec' : ''}">
            <div class="rec-title">${currentLang === 'en' ? 'MediGuard Agent Suggests' : 'मेड-दीदी की सलाह'}</div>
            <div class="rec-body">${recText}</div>
          </div>

          <div class="med-actions-footer">
            ${m.status === 'expired' 
              ? `<button class="btn btn-danger-outline btn-large" onclick="deleteMedicine('${m.id}', 'dispose')">
                   <i data-lucide="trash-2"></i> ${currentLang === 'en' ? 'Mark Disposed' : 'निपटान दर्ज करें'}
                 </button>` 
              : m.status === 'expiring' 
                ? `<button class="btn btn-outline btn-large" onclick="deleteMedicine('${m.id}', 'return')">
                     <i data-lucide="rotate-ccw"></i> ${currentLang === 'en' ? 'Return Supplier' : 'वापस भेजें'}
                   </button>
                   <button class="btn btn-primary btn-large" onclick="markUsed('${m.id}')">
                     <i data-lucide="check"></i> ${currentLang === 'en' ? 'Use First' : 'पहले उपयोग करें'}
                   </button>` 
                : `<button class="btn btn-secondary btn-large" onclick="markUsed('${m.id}')">
                     <i data-lucide="check"></i> ${currentLang === 'en' ? 'Record Usage' : 'उपयोग दर्ज करें'}
                   </button>`
            }
          </div>
        </div>
      `;
    }).join("");
  }
  lucide.createIcons();
}

// Highlight and scroll to a medicine card
function focusMedicineCard(id) {
  const card = document.getElementById(`med-card-${id}`);
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.style.transform = 'scale(1.05)';
    card.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.4)';
    setTimeout(() => {
      card.style.transform = '';
      card.style.boxShadow = '';
    }, 2500);
  }
}

// Action: Mark medicine used (simple decrement or remove)
function markUsed(id) {
  const med = medicines.find(m => m.id === id);
  if (!med) return;
  
  if (med.qty > 10) {
    med.qty -= 10;
    showToast(currentLang === "en" ? `Used 10 pills. Remaining quantity: ${med.qty}` : `10 गोलियों का उपयोग दर्ज किया गया। शेष: ${med.qty}`);
  } else {
    medicines = medicines.filter(m => m.id !== id);
    showToast(currentLang === "en" ? "Medicine fully used and removed from list." : "दवा पूरी तरह समाप्त हुई और सूची से हटा दी गई।");
  }
  saveToStorage();
  renderDashboard();
}

// Form Intake Handler
function handleFormSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById("med-name").value.trim();
  const category = document.getElementById("med-category").value;
  const brand = document.getElementById("med-brand").value.trim() || "Unknown";
  const batch = document.getElementById("med-batch").value.trim();
  const expiry = document.getElementById("med-expiry").value;
  const qty = parseInt(document.getElementById("med-qty").value);
  const location = document.getElementById("med-location").value;
  const owner = document.getElementById("med-owner").value.trim();

  // Create new med
  const med = { name, category, brand, batch, expiry, qty, location, owner };
  const added = addMedicine(med);

  // Close modal
  intakeModal.classList.remove("active");
  intakeForm.reset();

  // Toast confirmation
  const expiryDateFormatted = formatLocalDate(expiry);
  const confText = currentLang === "en" 
    ? `I have recorded ${name} expiring on ${expiryDateFormatted} at your ${location}. I will alert you 30 days before.` 
    : `मैंने ${location} पर आपकी ${name} (समाप्ति तिथि: ${expiryDateFormatted}) दर्ज कर ली है। मैं आपको 30 दिन पहले सचेत करूँगी।`;

  showToast(currentLang === "en" ? `Registered ${name} successfully!` : `${name} का पंजीकरण सफल!`);
  
  // Add to Chat history as agent dialogue
  appendAgentMessage(confText);
}

// --- Chat Agent Logic ---

// Show Chat Messages in feed
function renderChat() {
  chatMessagesEl.innerHTML = activeChatHistory.map(msg => {
    let bodyText = msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    bodyText = bodyText.replace(/`(.*?)`/g, '<code>$1</code>');
    bodyText = bodyText.replace(/\n/g, '<br>');

    return `
      <div class="message ${msg.sender}">
        <p>${bodyText}</p>
        <span class="chat-time">${msg.timestamp}</span>
      </div>
    `;
  }).join("");
  
  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
}

// Add user message & trigger agent response
function handleChatSend() {
  const query = chatInputEl.value.trim();
  if (!query) return;

  // Append user message
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  activeChatHistory.push({
    sender: "user",
    text: query,
    timestamp: timestamp
  });
  
  chatInputEl.value = "";
  renderChat();
  localStorage.setItem("mediguard_chat", JSON.stringify(activeChatHistory));

  // Process Agent Response with slight delay
  setTimeout(() => {
    processAgentQuery(query);
  }, 600);
}

// Direct button queries
function askAgent(queryText) {
  chatInputEl.value = queryText;
  handleChatSend();
}

// Agent Voice Helper Tip
function showVoiceHint() {
  const hintText = currentLang === "en"
    ? `🎙️ **How to add a medicine in Chat:**\nType in this pattern:\n\`Add [Name], Batch [No], Expiry [YYYY-MM-DD], Qty [Number], Location [Home/Health Centre]\`\n\nExample:\n\`Add Paracetamol, Batch B902, Expiry 2026-12-15, Qty 100, Location Home\``
    : `🎙️ **चैट के माध्यम से दवा कैसे जोड़ें:**\nइस तरह से लिखें:\n\`Add [नाम], बैच [नंबर], एक्सपायरी [YYYY-MM-DD], मात्रा [नंबर], स्थान [Home/Health Centre]\`\n\nउदाहरण:\n\`Add पैरासिटामोल, बैच B902, एक्सपायरी 2026-12-15, मात्रा 100, स्थान Home\``;
  
  appendAgentMessage(hintText);
}

// Append agent response helper
function appendAgentMessage(text) {
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  activeChatHistory.push({
    sender: "agent",
    text: text,
    timestamp: timestamp
  });
  renderChat();
  localStorage.setItem("mediguard_chat", JSON.stringify(activeChatHistory));
}

// Agent NLP Brain
function processAgentQuery(query) {
  const text = query.toLowerCase();
  
  // 1. Natural Language Intake Intent
  // Look for "add" or "जोड़"
  if (text.includes("add") || text.includes("जोड़") || text.includes("दर्ज")) {
    parseAndAddMedicineFromChat(query);
    return;
  }

  // 2. Query Expiries this week
  if (text.includes("this week") || text.includes("हफ्ते") || text.includes("सप्ताह")) {
    const expiringMeds = medicines.filter(m => {
      const days = calculateDaysRemaining(m.expiry);
      return days >= 0 && days <= 7;
    });

    if (expiringMeds.length === 0) {
      appendAgentMessage(
        currentLang === "en" 
          ? "🟢 Great news! There are **no medicines** expiring this week." 
          : "🟢 अच्छी खबर! इस हफ्ते समाप्त (expire) होने वाली कोई दवा नहीं है।"
      );
    } else {
      let response = currentLang === "en"
        ? "⚠️ **Medicines expiring this week:**\n"
        : "⚠️ **इस हफ्ते समाप्त होने वाली दवाएं:**\n";
        
      expiringMeds.forEach(m => {
        const days = calculateDaysRemaining(m.expiry);
        response += `\n• **${m.name}** (Batch: ${m.batch}) at **${m.location}** - Expiring in ${days} days (${formatLocalDate(m.expiry)})`;
      });
      appendAgentMessage(response);
    }
    return;
  }

  // 3. Query Expired count at location
  if (text.includes("expired") || text.includes("समाप्त")) {
    let targetLoc = null;
    let locDisplay = "";
    
    if (text.includes("health") || text.includes("centre") || text.includes("center") || text.includes("केंद्र")) {
      targetLoc = "Health Centre";
      locDisplay = currentLang === "en" ? "Health Centre" : "स्वास्थ्य केंद्र";
    } else if (text.includes("home") || text.includes("घर")) {
      targetLoc = "Home";
      locDisplay = currentLang === "en" ? "Home" : "घर";
    } else if (text.includes("kirana") || text.includes("store") || text.includes("दुकान")) {
      targetLoc = "Kirana Store";
      locDisplay = currentLang === "en" ? "Kirana Store" : "किराना दुकान";
    }

    const expiredMeds = medicines.filter(m => {
      const days = calculateDaysRemaining(m.expiry);
      const matchesLocation = !targetLoc || m.location === targetLoc;
      return days < 0 && matchesLocation;
    });

    if (expiredMeds.length === 0) {
      appendAgentMessage(
        currentLang === "en"
          ? `🟢 Clean stock! There are **no expired medicines** ${targetLoc ? `at ${locDisplay}` : 'anywhere'}.`
          : `🟢 पूरी तरह सुरक्षित! ${targetLoc ? `${locDisplay} पर` : 'कहीं भी'} कोई समाप्त दवा नहीं है।`
      );
    } else {
      let response = currentLang === "en"
        ? `🚨 Found **${expiredMeds.length} expired medicines** ${targetLoc ? `at ${locDisplay}` : ''}:\n`
        : `🚨 ${targetLoc ? `${locDisplay} पर` : ''} **${expiredMeds.length} समाप्त दवाएं** मिलीं:\n`;

      expiredMeds.forEach(m => {
        response += `\n• **${m.name}** (Batch: ${m.batch}) - Expired (${formatLocalDate(m.expiry)})`;
      });
      appendAgentMessage(response);
    }
    return;
  }

  // 4. Recommendation for a medicine
  if (text.includes("what should i do") || text.includes("action") || text.includes("क्या करें") || text.includes("disposal") || text.includes("sujhaav")) {
    // Try to find if a medicine name from our list is mentioned
    let foundMed = null;
    for (let m of medicines) {
      if (text.includes(m.name.toLowerCase())) {
        foundMed = m;
        break;
      }
    }

    if (foundMed) {
      const days = calculateDaysRemaining(foundMed.expiry);
      const isExpired = days < 0;
      let reply = "";

      if (isExpired) {
        reply = currentLang === "en"
          ? `🚨 **${foundMed.name} (Batch: ${foundMed.batch}) is EXPIRED.**\n\n**Action Recommended:** Do not give to patients. Dispose of it safely by double-bagging and returning to the clinic coordinator or disposing according to biohazard protocols. Do not throw in open dumps.`
          : `🚨 **${foundMed.name} (बैच: ${foundMed.batch}) समाप्त (Expired) हो चुकी है।**\n\n**सलाह:** कृपया मरीजों को न दें। इसे एक लिफाफे में बंद कर स्वास्थ्य समन्वयक को लौटा दें या स्वास्थ्य केंद्र के सुरक्षित कचरा नियमों के अनुसार नष्ट करें। खुले में न फेंकें।`;
      } else {
        // Recommend based on category
        if (foundMed.category === "Antibiotic") {
          reply = currentLang === "en"
            ? `⚠️ **${foundMed.name} is an Antibiotic expiring soon.**\n\n**Action Recommended:** Please dispense this first before opening new batches. Ensure users finish their prescribed course.`
            : `⚠️ **${foundMed.name} एक एंटीबायोटिक है जो जल्द समाप्त होने वाली है।**\n\n**सलाह:** नई पेटी खोलने से पहले इस बैच को समाप्त करें। रोगियों को दवा का पूरा कोर्स लेने की सलाह दें।`;
        } else if (foundMed.category === "Vaccine") {
          reply = currentLang === "en"
            ? `🚨 **${foundMed.name} is a Vaccine expiring soon.**\n\n**Action Recommended:** Check VVM (Vaccine Vial Monitor) and cold storage temperatures. Notify the PHC supervisor immediately to shift stock.`
            : `🚨 **${foundMed.name} एक वैक्सीन है जो जल्द समाप्त होने वाली है।**\n\n**सलाह:** वीवीएम (VVM) और ठंडे तापमान की जांच करें। स्टॉक को स्थानांतरित करने के लिए तुरंत पीएचसी (PHC) पर्यवेक्षक को सूचित करें।`;
        } else {
          reply = currentLang === "en"
            ? `⚠️ **${foundMed.name} is expiring soon.**\n\n**Action Recommended:** Move this stock to the front of the shelf. Use it before newly received batches.`
            : `⚠️ **${foundMed.name} जल्द समाप्त होने वाली है।**\n\n**सलाह:** इस दवा को अलमारी में सबसे आगे रखें। नए स्टॉक से पहले इसका वितरण करें।`;
        }
      }
      appendAgentMessage(reply);
      return;
    }
  }

  // 5. Default Fallback
  const fallbackEn = `I didn't fully understand that query. 

Try asking:
• *"Which medicines are expiring this week?"*
• *"Show me expired drugs at Health Centre"*
• *"What should I do with expired ORS?"*
• Or type: \`Add [Name], Batch [No], Expiry [Date], Qty [No], Location [Home/Health Centre]\``;

  const fallbackHi = `मैं आपका सवाल पूरी तरह समझ नहीं पाई।

कृपया यह पूछने का प्रयास करें:
• *"इस हफ्ते क्या समाप्त होगा?"*
• *"स्वास्थ्य केंद्र पर समाप्त दवाएं दिखाओ"*
• *"समाप्त ओआरएस का क्या करें?"*
• या लिखें: \`Add [नाम], बैच [नंबर], एक्सपायरी [तारीख], मात्रा [नंबर], स्थान [Home/Health Centre]\``;

  appendAgentMessage(currentLang === "en" ? fallbackEn : fallbackHi);
}

// Chat Parser for Adding Medicines
// Example: Add Paracetamol, Batch B902, Expiry 2026-12-15, Qty 100, Location Home
function parseAndAddMedicineFromChat(queryText) {
  // Normalize commas and spacing
  const cleanText = queryText.replace(/जोड़ें|जोड़े|दर्ज करें/g, "").replace(/add/i, "").trim();
  
  // Basic split parsing
  const parts = cleanText.split(",");
  
  let name = "Unknown Medicine";
  let batch = "B-" + Math.floor(100 + Math.random() * 900);
  let expiry = "2026-07-27";
  let qty = 10;
  let location = "Home";
  let category = "Other";
  let owner = currentLang === "en" ? "Self" : "स्वयं";

  if (parts.length >= 1 && parts[0].trim().length > 0) {
    name = parts[0].trim();
  }

  // Helper to extract values
  parts.forEach(part => {
    const segment = part.toLowerCase();
    
    // Extract Batch
    if (segment.includes("batch") || segment.includes("बैच")) {
      const match = part.match(/(?:batch|बैच)\s*:?\s*([a-zA-Z0-9\-]+)/i);
      if (match) batch = match[1].trim();
    }
    
    // Extract Expiry
    if (segment.includes("expiry") || segment.includes("exp") || segment.includes("तारीख") || segment.includes("एक्सपायरी")) {
      // Look for Date formats like YYYY-MM-DD or Month YYYY
      const matchDate = part.match(/(\d{4}-\d{2}-\d{2})/);
      if (matchDate) {
        expiry = matchDate[1];
      } else {
        // Fallback for wordy dates like "July 2026" or "Jul 2026"
        const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        let foundMonth = 6; // default Jul
        let foundYear = 2026;
        
        months.forEach((m, idx) => {
          if (segment.includes(m)) foundMonth = idx;
        });
        
        const matchYear = part.match(/(\d{4})/);
        if (matchYear) foundYear = parseInt(matchYear[1]);
        
        // Construct YYYY-MM-DD
        const mm = String(foundMonth + 1).padStart(2, '0');
        expiry = `${foundYear}-${mm}-28`;
      }
    }
    
    // Extract Qty
    if (segment.includes("qty") || segment.includes("quantity") || segment.includes("मात्रा") || segment.includes("पिल्स")) {
      const match = part.match(/(\d+)/);
      if (match) qty = parseInt(match[1]);
    }
    
    // Extract Location
    if (segment.includes("location") || segment.includes("স্থান") || segment.includes("स्थान") || segment.includes("at")) {
      if (segment.includes("health") || segment.includes("centre") || segment.includes("center") || segment.includes("केंद्र")) {
        location = "Health Centre";
      } else if (segment.includes("kirana") || segment.includes("store") || segment.includes("दुकान")) {
        location = "Kirana Store";
      } else {
        location = "Home";
      }
    }
  });

  // Infer Category from name
  const nameLower = name.toLowerCase();
  if (nameLower.includes("para") || nameLower.includes("dolo") || nameLower.includes("ibu") || nameLower.includes("combiflam")) {
    category = "Painkiller";
  } else if (nameLower.includes("amox") || nameLower.includes("penicillin") || nameLower.includes("cipro") || nameLower.includes("azithral")) {
    category = "Antibiotic";
  } else if (nameLower.includes("vacc") || nameLower.includes("polio") || nameLower.includes("bcg") || nameLower.includes("measles")) {
    category = "Vaccine";
  } else if (nameLower.includes("syrup") || nameLower.includes("benadryl") || nameLower.includes("cough")) {
    category = "Syrup";
  }

  // If owner is ASHA in current location, set owner name
  if (location === "Health Centre") {
    owner = currentLang === "en" ? "ASHA Worker Sunita" : "आशा कार्यकर्ता सुनीता";
  } else if (location === "Kirana Store") {
    owner = currentLang === "en" ? "Ramesh Prasad" : "रमेश प्रसाद";
  }

  // Register the medicine
  const med = {
    name,
    brand: "Generics",
    category,
    batch,
    expiry,
    qty,
    location,
    owner
  };

  const addedMed = addMedicine(med);
  const expiryFormatted = formatLocalDate(expiry);

  const replyEn = `✅ **Recorded!** I have added **${name}** (Batch: ${batch}) expiring on **${expiryFormatted}** at your **${location}**.\n\nI will monitor this stock and send you alerts 30 days before expiry.`;
  const replyHi = `✅ **दर्ज कर लिया गया!** मैंने **${location}** पर आपकी **${name}** (बैच: ${batch}, समाप्ति तिथि: ${expiryFormatted}) दर्ज कर ली है।\n\nमैं इस स्टॉक पर नजर रखूंगी और समाप्ति से 30 दिन पहले आपको सचेत करूंगी।`;

  showToast(currentLang === "en" ? `Registered ${name} via Chat!` : `चैट के माध्यम से ${name} दर्ज की गई!`);
  appendAgentMessage(currentLang === "en" ? replyEn : replyHi);
}

// --- Report Agent (CSV Download) ---
function exportCSVReport() {
  if (medicines.length === 0) {
    showToast(currentLang === "en" ? "No stock to export!" : "निर्यात करने के लिए कोई स्टॉक नहीं है!", false);
    return;
  }

  // Header columns
  let csvContent = "Medicine Name,Brand,Category,Batch Number,Expiry Date,Quantity,Storage Location,Owner,Status,Days Remaining,Recommendation\n";

  medicines.forEach(m => {
    const days = calculateDaysRemaining(m.expiry);
    let status = "Safe";
    let rec = "";

    if (days < 0) {
      status = "Expired";
      rec = "Dispose safely immediately. Do not consume.";
    } else if (days <= 30) {
      status = "Expiring Soon";
      rec = `Will expire in ${days} days. Use first.`;
    } else {
      status = "Safe";
      rec = "Stock is safe to use.";
    }

    // Escape commas in names/brands/owners to prevent splitting columns
    const name = `"${m.name.replace(/"/g, '""')}"`;
    const brand = `"${m.brand.replace(/"/g, '""')}"`;
    const owner = `"${m.owner.replace(/"/g, '""')}"`;
    const recText = `"${rec.replace(/"/g, '""')}"`;

    csvContent += `${name},${brand},${m.category},${m.batch},${m.expiry},${m.qty},${m.location},${owner},${status},${days},${recText}\n`;
  });

  // Create downloadable file link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  const dateStr = REFERENCE_DATE.toISOString().split('T')[0];
  link.setAttribute("href", url);
  link.setAttribute("download", `MediGuard_Stock_Report_${dateStr}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(currentLang === "en" ? "CSV Report Downloaded!" : "CSV रिपोर्ट डाउनलोड हो गई!");
}
