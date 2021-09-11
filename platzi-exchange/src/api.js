const url = "https://api.coincap.io/v2";

function getAssets() {
  return fetch(`${url}/assets?limit=20`)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => console.error("Este es el error", error));
}

function getAsset(coinId) {
  return fetch(`${url}/assets/${coinId}`)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => console.error("Este es el error", error));
}

export default {
  getAssets,
  getAsset,
};
