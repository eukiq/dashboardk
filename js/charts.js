/* ============================
   REVENUE DATA
============================ */

const revenueData = {
  "7days": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [3200, 4500, 3800, 6200, 5100, 7800, 6900],
  },

  "30days": {
    labels: Array.from({ length: 30 }, (_, i) => i + 1),
    values: [
      3200, 4100, 3800, 5200, 4600, 6100, 5500, 4900, 7200, 6800, 5300, 5900,
      8100, 7400, 6200, 8500, 7800, 6900, 9100, 8200, 7600, 9400, 8800, 7200,
      9800, 8900, 10500, 9300, 8600, 11200,
    ],
  },

  "12months": {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],

    values: [
      18000, 22000, 19500, 26000, 31000, 28500, 35000, 39000, 33000, 42000,
      48294, 52000,
    ],
  },
};

/* ============================
   REVENUE OVERVIEW
============================ */

// Seleciona o canvas do gráfico
const revenueCanvas = document.getElementById("revenueCanvas");

// Acessa o contexto 2D do canvas
const revenueContext = revenueCanvas.getContext("2d");

// Cria o gráfico
const revenueChart = new Chart(revenueContext, {
  // Tipo de gráfico
  type: "line",

  // Dados
  data: {
    labels: revenueData["7days"].labels,

    datasets: [
      {
        label: "Revenue",

        data: revenueData["7days"].values,

        borderColor: "#7890FF",
        backgroundColor: "rgba(120, 144, 255, 0.10)",

        fill: true,

        tension: 0.4,

        borderWidth: 2,

        pointRadius: 3,
        pointBackgroundColor: "#7890FF",
        pointBorderColor: "#191E29",

        pointHoverRadius: 6,
      },
    ],
  },

  // Configurações visuais
  options: {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      // Eixo vertical
      y: {
        beginAtZero: true,

        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },

        border: {
          display: false,
        },

        ticks: {
          color: "#929BAD",

          callback: function (value) {
            return "$" + value;
          },
        },
      },

      // Eixo horizontal
      x: {
        grid: {
          display: false,
        },

        border: {
          display: false,
        },

        ticks: {
          color: "#929BAD",
        },
      },
    },
  },
});

/* ============================
   DASHBOARD PERIOD FILTER
============================ */

const revenuePeriod = document.getElementById("revenuePeriod");

revenuePeriod.addEventListener("change", function () {
  // Captura o período selecionado
  const selectedPeriod = revenuePeriod.value;

  // Atualiza o gráfico
  revenueChart.data.labels = revenueData[selectedPeriod].labels;

  revenueChart.data.datasets[0].data = revenueData[selectedPeriod].values;

  revenueChart.update();

  // Atualiza os cards
  updateMetrics(selectedPeriod);
});

/* ============================
   SALES DISTRIBUTION
============================ */

// Seleciona o canvas
const salesCanvas = document.getElementById("salesCanvas");

// Contexto de desenho
const salesContext = salesCanvas.getContext("2d");

// Cria o gráfico
const salesChart = new Chart(salesContext, {
  type: "doughnut",

  data: {
    labels: ["Electronics", "Fashion", "Accessories", "Home"],

    datasets: [
      {
        data: [38, 27, 20, 15],

        backgroundColor: ["#7890FF", "#56D6A0", "#B58AFF", "#FFB86C"],

        borderColor: "#191E29",
        borderWidth: 4,

        hoverOffset: 8,
      },
    ],
  },

  options: {
    responsive: true,
    maintainAspectRatio: false,

    cutout: "72%",

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          color: "#929BAD",

          padding: 18,

          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  },
});

/* ============================
   METRICS DATA
============================ */

const metricsData = {
  "7days": {
    orders: 1284,
    customers: 892,
    conversion: 3.64,

    growth: {
      revenue: 12.8,
      orders: 8.2,
      customers: 5.4,
      conversion: 0.6,
    },
  },

  "30days": {
    orders: 4862,
    customers: 3210,
    conversion: 4.12,

    growth: {
      revenue: 18.4,
      orders: 10.5,
      customers: 7.8,
      conversion: 1.2,
    },
  },

  "12months": {
    orders: 58420,
    customers: 18940,
    conversion: 5.28,

    growth: {
      revenue: 24.6,
      orders: 16.2,
      customers: 13.7,
      conversion: 2.1,
    },
  },
};

/* ============================
   UPDATE METRICS
============================ */

function updateMetrics(period) {
  // Busca os dados do período selecionado
  const data = metricsData[period];

  // Calcula o faturamento somando os valores do gráfico
  const totalRevenue = revenueData[period].values.reduce(
    (total, value) => total + value,
    0,
  );

  // Formata o valor como moeda
  const formattedRevenue = totalRevenue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Atualiza o faturamento
  document.getElementById("revenueMetric").textContent = formattedRevenue;

  // Atualiza pedidos
  document.getElementById("ordersMetric").textContent =
    data.orders.toLocaleString("en-US");

  // Atualiza clientes
  document.getElementById("customersMetric").textContent =
    data.customers.toLocaleString("en-US");

  // Atualiza conversão
  document.getElementById("conversionMetric").textContent =
    data.conversion.toFixed(2) + "%";

  // Atualiza crescimento
  document.getElementById("revenueGrowth").textContent =
    `+${data.growth.revenue}%`;

  document.getElementById("ordersGrowth").textContent =
    `+${data.growth.orders}%`;

  document.getElementById("customersGrowth").textContent =
    `+${data.growth.customers}%`;

  document.getElementById("conversionGrowth").textContent =
    `+${data.growth.conversion}%`;
}

// Inicializa os cards com os dados de 7 dias
updateMetrics("7days");

/* ============================
   ANALYTICS - REVENUE CHART
============================ */

const analyticsRevenueCanvas = document.getElementById(
  "analyticsRevenueCanvas",
);

let analyticsRevenueChart = null;

if (analyticsRevenueCanvas) {
  analyticsRevenueChart = new Chart(analyticsRevenueCanvas, {
    type: "line",

    data: {
      labels: revenueData["7days"].labels,

      datasets: [
        {
          label: "Revenue",
          data: revenueData["7days"].values,

          borderColor: "#56D6A0",
          backgroundColor: "rgba(86, 214, 160, 0.10)",

          fill: true,
          tension: 0.4,
          borderWidth: 2,

          pointRadius: 3,
          pointBackgroundColor: "#56D6A0",
          pointBorderColor: "#191E29",
          pointHoverRadius: 6,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false,
        },
      },

      scales: {
        y: {
          beginAtZero: true,

          grid: {
            color: "rgba(255, 255, 255, 0.05)",
          },

          border: {
            display: false,
          },

          ticks: {
            color: "#929BAD",

            callback: function (value) {
              return "$" + value.toLocaleString("en-US");
            },
          },
        },

        x: {
          grid: {
            display: false,
          },

          border: {
            display: false,
          },

          ticks: {
            color: "#929BAD",
          },
        },
      },
    },
  });
}

/* ============================
   ANALYTICS - CATEGORY CHART
============================ */

const analyticsCategoryCanvas = document.getElementById(
  "analyticsCategoryCanvas",
);

let analyticsCategoryChart = null;

if (analyticsCategoryCanvas) {
  analyticsCategoryChart = new Chart(analyticsCategoryCanvas, {
    type: "doughnut",

    data: {
      labels: ["Electronics", "Fashion", "Accessories", "Home"],

      datasets: [
        {
          data: [38, 27, 20, 15],

          backgroundColor: ["#7890FF", "#56D6A0", "#B58AFF", "#FFB86C"],

          borderColor: "#191E29",
          borderWidth: 4,
          hoverOffset: 8,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "72%",

      plugins: {
        legend: {
          position: "bottom",

          labels: {
            color: "#929BAD",
            padding: 18,
            usePointStyle: true,
            pointStyle: "circle",
          },
        },
      },
    },
  });
}

/* ============================
   ANALYTICS - PERIOD FILTER
============================ */

const analyticsRevenuePeriod = document.getElementById(
  "analyticsRevenuePeriod",
);

if (analyticsRevenuePeriod && analyticsRevenueChart) {
  analyticsRevenuePeriod.addEventListener("change", function () {
    const selectedPeriod = analyticsRevenuePeriod.value;

    analyticsRevenueChart.data.labels = revenueData[selectedPeriod].labels;

    analyticsRevenueChart.data.datasets[0].data =
      revenueData[selectedPeriod].values;

    analyticsRevenueChart.update();
  });
}
