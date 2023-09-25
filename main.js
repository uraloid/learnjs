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

  function fetchCoinStats(coinIndex) {
    fetch(`https://api.coinstats.app/public/v1/coins?limit=100`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        result.innerHTML = 
                            `<tr>
                              <td>${data.coins[coinIndex].rank}</td>
                              <td><img src='${data.coins[coinIndex].icon}' />${data.coins[coinIndex].name} / ${data.coins[coinIndex].symbol}</td>
                              <td>\$${data.coins[coinIndex].price.toFixed(3)}</td>
                            </tr>
                            <tr>
                              <td>${data.coins[coinIndex+1].rank}</td>
                              <td><img src='${data.coins[coinIndex+1].icon}' />${data.coins[coinIndex+1].name} / ${data.coins[coinIndex+1].symbol}</td>
                              <td>\$${data.coins[coinIndex+1].price.toFixed(3)}</td>
                            </tr>
                            <tr>
                              <td>${data.coins[coinIndex+2].rank}</td>
                              <td><img src='${data.coins[coinIndex+2].icon}' />${data.coins[coinIndex+2].name} / ${data.coins[coinIndex+2].symbol}</td>
                              <td>\$${data.coins[coinIndex+2].price.toFixed(3)}</td>
                            </tr>
                            <tr>
                              <td>${data.coins[coinIndex+3].rank}</td>
                              <td><img src='${data.coins[coinIndex+3].icon}' />${data.coins[coinIndex+3].name} / ${data.coins[coinIndex+3].symbol}</td>
                              <td>\$${data.coins[coinIndex+3].price.toFixed(3)}</td>
                            </tr>
                            <tr>
                              <td>${data.coins[coinIndex+4].rank}</td>
                              <td><img src='${data.coins[coinIndex+4].icon}' />${data.coins[coinIndex+4].name} / ${data.coins[coinIndex+4].symbol}</td>
                              <td>\$${data.coins[coinIndex+4].price.toFixed(3)}</td>
                            </tr>`;
      })
      .catch(function (error) {
        console.warn(error);
      });
  }
};
