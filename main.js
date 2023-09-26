window.onload = () => {
  const result = document.querySelector("#result");
  const buttonBack = document.querySelector("#buttonBack");
  const buttonNext = document.querySelector("#buttonNext");
  const select = document.querySelector("#select");

  let skip = 0;
  let limit = 5;
  fetchCoinStats(skip, limit);
  buttonNext.addEventListener("click", nextCoinResults);
  buttonBack.addEventListener("click", backCoinResults);
  select.addEventListener("change",(event) => onSelectChange(event));


  function nextCoinResults() {
    skip += Number(limit);
    buttonState();
    return fetchCoinStats(skip, limit)
  }

  function backCoinResults() {
    if (skip !== 0) {
      skip -= Number(limit);
      buttonState();
    }
    else {
      skip = 0;
      buttonState();
    }
    return fetchCoinStats(skip, limit)
  }

  function onSelectChange(event) {
    console.log(event.target.value);
    limit = event.target.value;
    fetchCoinStats(skip, limit);
  }

  function buttonState() {
    if (skip === 0) {
      buttonBack.disabled = true;
      buttonNext.disabled = false; 
    }
    else {
      buttonBack.disabled = false;
      buttonNext.disabled = false;
    }
  }

  function renderCoins(coinsData) {
    const coinsRows = coinsData.coins.map((coin) => 
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

  function fetchCoinStats(skip, limit) {
    fetch(`https://api.coinstats.app/public/v1/coins?skip=${skip}&limit=${limit}`)
    .then(function (response) { return response.json(); })
    .then(function (data) {
      console.log(data);
      
      return renderCoins(data)
    })
    .catch(function (error) { console.warn(error); });
  }
};
