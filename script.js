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

window.onload = loadBitcoinPrice;
