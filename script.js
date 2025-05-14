function loadPrice() {
    const crypto = document.getElementById("crypto").value;
    const currency = document.getElementById("currency").value;
    const resultBox = document.getElementById("result");
  
    resultBox.textContent = "Načítám...";
  
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${currency}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const price = data[crypto][currency];
        resultBox.textContent = `💸 1 ${crypto.charAt(0).toUpperCase() + crypto.slice(1)} = ${price.toLocaleString()} ${currency.toUpperCase()}`;
      })
      .catch(error => {
        resultBox.textContent = "Chyba při načítání 😢";
        console.error(error);
      });
  }
  