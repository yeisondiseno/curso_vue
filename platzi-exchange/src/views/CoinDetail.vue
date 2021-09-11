<template>
  <div class="flex-col">
    <template v-if="asset?.id">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
            :alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ $filters.DollarFilter(asset.priceUsd) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ $filters.DollarFilter(min) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ $filters.DollarFilter(max) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ $filters.DollarFilter(avg) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ $filters.PercentFilter(asset.changePercent24Hr) }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            class="
              bg-green-500
              hover:bg-green-700
              text-white
              font-bold
              py-2
              px-4
              rounded
            "
          >
            Cambiar
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                id="convertValue"
                type="number"
                class="
                  text-center
                  bg-white
                  focus:outline-none focus:shadow-outline
                  border border-gray-300
                  rounded-lg
                  py-2
                  px-4
                  block
                  w-full
                  appearance-none
                  leading-normal
                "
              />
            </label>
          </div>
          <span class="text-xl"></span>
        </div>
      </div>
      <div class="flex flex-row my-5">
        <line-chart
          class="my-10"
          :colors="['orange']"
          :min="min"
          :max="max"
          :data="
            history.map((e) => [e.date, parseFloat(e.priceUsd).toFixed(2)])
          "
        />
      </div>
      <div class="flex flex-col my-5">
        <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
        <table>
          <tr
            v-for:="m in market"
            :key="`${m.exchangeId}-${m.priceUsd}`"
            class="border-b"
          >
            <td>
              <b>
                {{ m.exchangeId }}
              </b>
            </td>
            <td>
              {{ $filters.DollarFilter(m.priceUsd) }}
            </td>
            <td>{{ m.baseSymbol }} / {{ m.quoteSymbol }}</td>
            <td>
              <px-button v-if="!m.url" v-on:click="getWebsite(m)">
                <slot>Obtener Link</slot>
              </px-button>
              <a v-else class="hover:underline text-green-600" target="_blanck">
                {{ m.url }}
              </a>
            </td>
          </tr>
        </table>
      </div>
    </template>
  </div>
</template>

<script>
import api from "@/api";
import { useRoute } from "vue-router";
import PxButton from "@/components/PxButton";

export default {
  name: "CoinDetail",
  components: { PxButton },
  data() {
    return {
      asset: {},
      history: [],
      market: [],
    };
  },

  computed: {
    min() {
      return Math.min(
        ...this.history.map((value) => parseFloat(value.priceUsd).toFixed(2))
      );
    },
    max() {
      return Math.max(
        ...this.history.map((value) => parseFloat(value.priceUsd).toFixed(2))
      );
    },
    avg() {
      return Math.abs(
        ...this.history.map((value) => parseFloat(value.priceUsd).toFixed(2))
      );
    },
  },

  created() {
    const route = useRoute();
    const id = route.params.id;
    this.getCoin(id);
  },

  beforeRouteUpdate(to, from, next) {
    this.getCoin(to.params.id);
    next();
  },

  methods: {
    getCoin(id) {
      Promise.all([
        api.getAsset(id),
        api.getAssetHistory(id),
        api.getMarket(id),
      ])
        .then(([asset, history, market]) => {
          this.asset = asset;
          this.history = history;
          this.market = market;
        })
        .finally(() => (this.isLoading = false));
    },

    getWebsite(exchange) {
      return api.getExchange(exchange.exchangeId).then((res) => {
        exchange.url = res.exchangeUrl;
        this.$set(exchange, "url", res.exchangeUrl);
      });
    },
  },
};
</script>
