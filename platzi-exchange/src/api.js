const url = "https://api.coincap.io/v2";

const normalizeRoute = (route) => route.toLowerCase().replace(" ", "-");

function getAssets() {
  return fetch(`${url}/assets?limit=20`)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => console.error("Este es el error", error));
}

function getAsset(coinId) {
  return fetch(`${url}/assets/${normalizeRoute(coinId)}`)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => console.error("Este es el error", error));
}

function getAssetHistory(coin) {
  return fetch(`${url}/assets/${normalizeRoute(coin)}/history?interval=d1`)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => console.error("Este es el error", error));
}

function getMarket(coin) {
  return fetch(`${url}/assets/${normalizeRoute(coin)}/markets?limit=5`)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => console.error("Este es el error", error));
}

function getExchange(id) {
  return fetch(`${url}/exchanges/${normalizeRoute(id)}`)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => console.error("Este es el error", error));
}

export default {
  getAssets,
  getAsset,
  getAssetHistory,
  getMarket,
  getExchange,
};
