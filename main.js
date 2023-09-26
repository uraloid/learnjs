window.onload = () => {
  const result = document.querySelector("#result");
  const buttonBack = document.querySelector("#buttonBack");
  const buttonNext = document.querySelector("#buttonNext");
  let coinIndex = 0;
  
  buttonNext.addEventListener("click", nextCoinResults);
  buttonBack.addEventListener("click", backCoinResults);

  function nextCoinResults() {
    coinIndex += 5;
    return fetchCoinStats(coinIndex)
  }

  function backCoinResults() {
    if (coinIndex !== 0) {
      coinIndex -= 5;
    }
    else {
      coinIndex = 0;
    }
    return fetchCoinStats(coinIndex)
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
    .catch(function (error) {
      console.warn(error);
    });
  }
};
