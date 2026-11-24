// ============================
// NOTIFICATION SYSTEM
// ============================

const notificationButton = document.getElementById("notificationButton");
const notificationPanel = document.getElementById("notificationPanel");
const markReadButton = document.getElementById("markReadButton");
const notificationDot = document.querySelector(".notification-dot");

// Abrir e fechar painel
notificationButton.addEventListener("click", function () {
  notificationPanel.classList.toggle("active");
});

// Marcar notificações como lidas
markReadButton.addEventListener("click", function () {
  const unreadNotifications = document.querySelectorAll(
    ".notification-item.unread",
  );

  unreadNotifications.forEach(function (notification) {
    notification.classList.remove("unread");
  });

  notificationDot.style.display = "none";
});

// ============================
// PROFILE DROPDOWN
// ============================

const profileButton = document.getElementById("profileButton");
const profilePanel = document.getElementById("profilePanel");

const profileOption = document.getElementById("profileOption");
const settingsOption = document.getElementById("settingsOption");
const logoutOption = document.getElementById("logoutOption");

// Abrir e fechar menu
profileButton.addEventListener("click", function () {
  profilePanel.classList.toggle("active");
});

// Opção de perfil
profileOption.addEventListener("click", function () {
  alert("Profile page coming soon!");
});

// Opção de configurações
settingsOption.addEventListener("click", function () {
  alert("Settings page coming soon!");
});

// Opção de sair
logoutOption.addEventListener("click", function () {
  const confirmLogout = confirm("Are you sure you want to log out?");

  if (confirmLogout) {
    alert("Logout simulated successfully!");
  }
});

// Fechar menus ao clicar fora
document.addEventListener("click", function (event) {
  if (!event.target.closest(".profile-wrapper")) {
    profilePanel.classList.remove("active");
  }

  if (!event.target.closest(".notification-wrapper")) {
    notificationPanel.classList.remove("active");
  }
});

// ============================
// TRANSACTION SEARCH
// ============================

const transactionSearch = document.getElementById("transactionSearch");
const transactionStatusFilter = document.getElementById(
  "transactionStatusFilter",
);

const transactionRows = document.querySelectorAll(
  ".transactions-table tbody tr",
);

// Filtrar transações
function filterTransactions() {
  const searchValue = transactionSearch.value.toLowerCase().trim();
  const selectedStatus = transactionStatusFilter.value;

  transactionRows.forEach(function (row) {
    const rowText = row.textContent.toLowerCase();
    const rowStatus = row.querySelector(".status").textContent.trim();

    const matchesSearch = rowText.includes(searchValue);

    const matchesStatus =
      selectedStatus === "all" || rowStatus === selectedStatus;

    if (matchesSearch && matchesStatus) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });

  const visibleRows = Array.from(transactionRows).filter(function (row) {
    return row.style.display !== "none";
  });

  const noTransactions = document.getElementById("noTransactions");

  noTransactions.style.display = visibleRows.length === 0 ? "block" : "none";
}

// Eventos
transactionSearch.addEventListener("input", filterTransactions);

transactionStatusFilter.addEventListener("change", filterTransactions);

/* ============================
   SIDEBAR NAVIGATION
============================ */

const navigationLinks = document.querySelectorAll(".nav-link");
const dashboardSections = document.querySelectorAll(".dashboard-section");

// Elementos do cabeçalho
const pageTitle = document.getElementById("pageTitle");
const pageDescription = document.getElementById("pageDescription");

// Informações de cada página
const pageInfo = {
  overview: {
    title: "Overview",
    description: "Welcome back! Here's what's happening today.",
  },

  analytics: {
    title: "Analytics",
    description: "Analyze your business performance and growth.",
  },

  products: {
    title: "Products",
    description: "Manage and monitor your store products.",
  },

  transactions: {
    title: "Transactions",
    description: "Track and manage your recent transactions.",
  },

  history: {
    title: "History",
    description: "Review your recent activities and updates.",
  },

  settings: {
    title: "Settings",
    description: "Manage your dashboard preferences.",
  },
};

// Navegar entre as seções
navigationLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    const selectedSection = link.dataset.section;
    const targetSection = document.getElementById(selectedSection);

    // Verificar se a página existe
    if (!targetSection || !pageInfo[selectedSection]) {
      return;
    }

    // Remover destaque dos menus
    navigationLinks.forEach(function (item) {
      item.classList.remove("active");
    });

    // Destacar menu selecionado
    link.classList.add("active");

    // Esconder todas as páginas
    dashboardSections.forEach(function (section) {
      section.classList.remove("active");
    });

    // Mostrar página selecionada
    targetSection.classList.add("active");

    // Atualizar cabeçalho
    pageTitle.textContent = pageInfo[selectedSection].title;
    pageDescription.textContent = pageInfo[selectedSection].description;

    // Atualizar título da aba do navegador
    document.title = `DashBoardK | ${pageInfo[selectedSection].title}`;
  });
});

/* ============================
   HISTORY - SEARCH AND FILTER
============================ */

// Elementos da página History
const historySearch = document.getElementById("historySearch");
const historyTypeFilter = document.getElementById("historyTypeFilter");
const historyTimeline = document.getElementById("historyTimeline");
const noHistory = document.getElementById("noHistory");

// Atividades e grupos de datas
const historyItems = document.querySelectorAll(".history-item");
const historyDateGroups = document.querySelectorAll(".history-date-group");

// Função responsável pelos filtros
function filterHistory() {
  // Valores dos campos
  const searchValue = historySearch.value.toLowerCase().trim();
  const selectedType = historyTypeFilter.value;

  // Contador de atividades encontradas
  let visibleActivities = 0;

  // Percorrer todas as atividades
  historyItems.forEach(function (item) {
    const itemText = item.textContent.toLowerCase();
    const itemType = item.dataset.type;

    // Verificar pesquisa
    const matchesSearch = itemText.includes(searchValue);

    // Verificar categoria
    const matchesType = selectedType === "all" || itemType === selectedType;

    // Exibir ou esconder atividade
    if (matchesSearch && matchesType) {
      item.style.display = "";
      visibleActivities++;
    } else {
      item.style.display = "none";
    }
  });

  // Ocultar grupos de datas sem atividades
  historyDateGroups.forEach(function (group) {
    const groupItems = group.querySelectorAll(".history-item");

    const hasVisibleItems = Array.from(groupItems).some(function (item) {
      return item.style.display !== "none";
    });

    group.style.display = hasVisibleItems ? "" : "none";
  });

  // Exibir mensagem quando não houver resultados
  noHistory.style.display = visibleActivities === 0 ? "block" : "none";
}

// Eventos dos filtros
historySearch.addEventListener("input", filterHistory);

historyTypeFilter.addEventListener("change", filterHistory);

/* ============================
    HISTORY - REGISTER ACTIVITY
  ============================ */

function registerHistoryActivity(data) {
  const timeline = document.getElementById("historyTimeline");

  // Grupo de atividades de hoje
  let todayGroup = timeline.querySelector(".history-date-group");

  // Criar atividade
  const activity = document.createElement("article");
  activity.classList.add("history-item");
  activity.dataset.type = data.type;

  // Ícones por categoria
  const icons = {
    order: "+",
    product: "↻",
    customer: "♙",
    payment: "$",
  };

  // Classes visuais
  const icon = document.createElement("div");
  icon.className = `history-icon ${data.type}-icon`;
  icon.textContent = icons[data.type] || "•";

  const details = document.createElement("div");
  details.className = "history-details";

  const title = document.createElement("h4");
  title.textContent = data.title;

  const description = document.createElement("p");
  description.textContent = data.description;

  const extra = document.createElement("span");
  extra.textContent = data.extra || "";

  details.append(title, description, extra);

  const meta = document.createElement("div");
  meta.className = "history-meta";

  // Criar horário
  const time = document.createElement("span");
  time.className = "history-time";

  const now = new Date();

  time.textContent = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const status = document.createElement("span");
  status.className = `history-tag ${data.statusClass || "info"}`;
  status.textContent = data.status || "New";

  meta.append(time, status);

  activity.append(icon, details, meta);

  // Inserir no topo das atividades de hoje
  const firstActivity = todayGroup.querySelector(".history-item");

  if (firstActivity) {
    todayGroup.insertBefore(activity, firstActivity);
  } else {
    todayGroup.appendChild(activity);
  }

  // Atualizar pesquisa, caso esteja implementada
  if (typeof filterHistory === "function") {
    filterHistory();
  }
}

registerHistoryActivity({
  type: "product",
  title: "New product added",
  description: "Gaming Mouse was added to the catalog.",
  extra: "Category: Electronics",
  status: "Created",
  statusClass: "info",
});

/* ============================
   SETTINGS - CONFIGURATION
============================ */

document.addEventListener("DOMContentLoaded", function () {
  // STORE PROFILE
  const storeName = document.getElementById("storeName");
  const storeEmail = document.getElementById("storeEmail");
  const storeDescription = document.getElementById("storeDescription");
  const saveStoreSettings = document.getElementById("saveStoreSettings");

  // PREFERENCES
  const languagePreference = document.getElementById("languagePreference");
  const currencyPreference = document.getElementById("currencyPreference");

  // APPEARANCE
  const darkModeToggle = document.getElementById("darkModeToggle");

  // NOTIFICATIONS
  const orderNotifications = document.getElementById("orderNotifications");
  const customerNotifications = document.getElementById(
    "customerNotifications",
  );
  const paymentNotifications = document.getElementById("paymentNotifications");

  // ============================
  // LOAD SAVED SETTINGS
  // ============================

  const savedSettings = JSON.parse(
    localStorage.getItem("dashboardSettings") || "{}",
  );

  if (savedSettings.storeName !== undefined) {
    storeName.value = savedSettings.storeName;
  }

  if (savedSettings.storeEmail !== undefined) {
    storeEmail.value = savedSettings.storeEmail;
  }

  if (savedSettings.storeDescription !== undefined) {
    storeDescription.value = savedSettings.storeDescription;
  }

  if (savedSettings.language) {
    languagePreference.value = savedSettings.language;
  }

  if (savedSettings.currency) {
    currencyPreference.value = savedSettings.currency;
  }

  if (savedSettings.notifications) {
    orderNotifications.checked = savedSettings.notifications.orders;
    customerNotifications.checked = savedSettings.notifications.customers;
    paymentNotifications.checked = savedSettings.notifications.payments;
  }

  // ============================
  // SAVE STORE PROFILE
  // ============================

  saveStoreSettings.addEventListener("click", function () {
    const settings = JSON.parse(
      localStorage.getItem("dashboardSettings") || "{}",
    );

    const feedback = document.getElementById("settingsFeedback");

    feedback.classList.add("show");

    setTimeout(() => {
      feedback.classList.remove("show");
    }, 3000);

    settings.storeName = storeName.value;
    settings.storeEmail = storeEmail.value;
    settings.storeDescription = storeDescription.value;

    localStorage.setItem("dashboardSettings", JSON.stringify(settings));

    alert("Store settings saved successfully!");
  });

  // ============================
  // SAVE PREFERENCES
  // ============================

  function savePreferences() {
    const settings = JSON.parse(
      localStorage.getItem("dashboardSettings") || "{}",
    );

    settings.language = languagePreference.value;
    settings.currency = currencyPreference.value;

    localStorage.setItem("dashboardSettings", JSON.stringify(settings));
  }

  languagePreference.addEventListener("change", savePreferences);
  currencyPreference.addEventListener("change", savePreferences);

  // ============================
  // SAVE NOTIFICATIONS
  // ============================

  function saveNotifications() {
    const settings = JSON.parse(
      localStorage.getItem("dashboardSettings") || "{}",
    );

    settings.notifications = {
      orders: orderNotifications.checked,
      customers: customerNotifications.checked,
      payments: paymentNotifications.checked,
    };

    localStorage.setItem("dashboardSettings", JSON.stringify(settings));
  }

  orderNotifications.addEventListener("change", saveNotifications);
  customerNotifications.addEventListener("change", saveNotifications);
  paymentNotifications.addEventListener("change", saveNotifications);

  // ============================
  // DARK MODE PREFERENCE
  // ============================

  const savedTheme = localStorage.getItem("dashboardTheme");

  if (savedTheme) {
    darkModeToggle.checked = savedTheme === "dark";
  }

  function updateTheme() {
    const theme = darkModeToggle.checked ? "dark" : "light";

    localStorage.setItem("dashboardTheme", theme);

    document.documentElement.dataset.theme = theme;
  }

  darkModeToggle.addEventListener("change", updateTheme);

  updateTheme();
});

/* ============================
   SIDEBAR PROFILE MENU
============================ */

const profileMenuButton = document.getElementById("profileMenuButton");
const profileDropdown = document.getElementById("profileDropdown");

if (profileMenuButton && profileDropdown) {
  // Abrir e fechar menu
  profileMenuButton.addEventListener("click", (event) => {
    event.stopPropagation();

    profileDropdown.classList.toggle("show");
  });

  // Fechar ao clicar fora
  document.addEventListener("click", (event) => {
    if (
      !profileDropdown.contains(event.target) &&
      !profileMenuButton.contains(event.target)
    ) {
      profileDropdown.classList.remove("show");
    }
  });

  // Ações do menu
  profileDropdown.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");

    if (!button) return;

    const action = button.dataset.action;

    if (action === "profile") {
      alert("Profile page coming soon!");
    }

    if (action === "settings") {
      const settingsLink = document.querySelector('[data-section="settings"]');

      if (settingsLink) {
        settingsLink.click();
      }
    }

    if (action === "logout") {
      const confirmLogout = confirm("Are you sure you want to log out?");

      if (confirmLogout) {
        alert("Logout functionality will be available soon!");
      }
    }

    profileDropdown.classList.remove("show");
  });
}
