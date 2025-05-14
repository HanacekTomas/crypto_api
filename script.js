function loadBitcoinPrice() {
  const resultBox = document.getElementById("result");

  fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=czk")
    .then(response => response.json())
    .then(data => {
      const price = data.bitcoin.czk;
      resultBox.textContent = `1 BTC = ${price.toLocaleString()} CZK`;
    })
    .catch(error => {
      resultBox.textContent = "Nepodařilo se načíst data 😢";
      console.error(error);
    });
}

async function loadChartData() {
  const response = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=czk&days=7");
  const data = await response.json();

  const labels = data.prices.map(entry => {
    const date = new Date(entry[0]);
    return date.toLocaleDateString("cs-CZ", { weekday: 'short' }); // např. "po", "út"
  });

  const prices = data.prices.map(entry => entry[1]);

  renderChart(labels, prices);
}

function renderChart(labels, dataPoints) {
  const ctx = document.getElementById("chart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "BTC v CZK",
        data: dataPoints,
        borderColor: "orange",
        backgroundColor: "rgba(255,165,0,0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: "orange"
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      },
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}


window.onload = loadBitcoinPrice;

window.onload = function () {
  loadBitcoinPrice();
  loadChartData();
};