window.onload = () => {
  const result = document.querySelector("#result");
  const buttonBack = document.querySelector("#buttonBack");
  const buttonNext = document.querySelector("#buttonNext");

  let coinIndex = 0;
  
  buttonNext.addEventListener("click", nextCoinResults);
  buttonBack.addEventListener("click", backCoinResults);

  function nextCoinResults() {
    coinIndex += 5;
    buttonState();
    return fetchCoinStats(coinIndex)
  }

  function backCoinResults() {
    if (coinIndex !== 0) {
      coinIndex -= 5;
      buttonState();
    }
    else {
      coinIndex = 0;
      buttonState();
    }
    return fetchCoinStats(coinIndex)
  }

  function buttonState() {
    if (coinIndex === 0) {
      buttonBack.disabled = true;
      buttonNext.disabled = false; 
    } 
    else if (coinIndex === 100-5) {
      buttonBack.disabled = false;
      buttonNext.disabled = true; 
    }
    else {
      buttonBack.disabled = false;
      buttonNext.disabled = false;
    }
  }

  function renderCoins(coinsData) {
    const coinsRows = coinsData.coins.slice(coinIndex, coinIndex + 5).map((coin) => 
    `
    <tr>
      <td>${coin.rank}</td>
      <td><img src='${coin.icon}' />${coin.name} / ${coin.symbol}</td>
      <td>\$${coin.price.toFixed(3)}</td>
    </tr>
    `
    );

    return result.innerHTML = coinsRows.join('')
  }

  function fetchCoinStats() {
    fetch(`https://api.coinstats.app/public/v1/coins?limit=100`)
    .then(function (response) { return response.json(); })
    .then(function (data) {
      console.log(data);
      
      return renderCoins(data)
    })
    .catch(function (error) { console.warn(error); });
  }
};
