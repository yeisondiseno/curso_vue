Vue.component('CoinDetail', {

    props: ['coin'],

    data () {
        return {
            showPrices: false,
            value: 0,
            changePercent: 0,
        }
    },

    methods: {
        toggleShowPrices() {
            this.showPrices = !this.showPrices

            this.$emit(
                'change-color', 
                this.showPrices ? 'FF96C8' : '3D3D3D'
            )
        }
    },

    computed: {
        title () {
            return `${this.coin.name} - ${this.coin.symbol}`
        },
        convertedValue () {
            if (!this.value) {
                return 0
            }

            return this.value / this.coin.price
        }
    },

    template: `
        <div>
            <img 
                v-bind:src="coin.img" 
                v-bind:alt="coin.name"
                v-on:mouseover='toggleShowPrices' 
                v-on:mouseout='toggleShowPrices' 
            >
            <h1 v-bind:class="changePercent > 0 ? 'green' : 'red'">
                {{title}}
                <br>
                <span v-if='coin.changePercent > 0 '>
                    Es mayor a cero
                </span>
                <span v-if='coin.changePercent < 0'>
                    Es menor a cero
                </span>
                <span v-else>
                    Es cero
                </span>
            </h1>
            <input 
                type="number"
                v-model='value'
            >
            <br>
            <span>
                {{convertedValue}}
            </span>
            <br>
            <br>

            <button v-on:click='toggleShowPrices'> 
                {{ 
                    !showPrices 
                        ? 'Mostrar precios' 
                        : 'Ocultar precios' 
                }}
            </button>

            <ul v-show='showPrices'>
                <li 
                    v-for='(p, i) in coin.pricesWithDays' 
                    v-bind:key='p.value'
                    v-bind:class="{
                        orange: p.value === coin.price,
                        red: p.value < coin.price,
                        green: p.value > coin.price,
                    }"
                >
                    {{i + 1 }} - {{p.value}} - {{p.day}}
                </li>
            </ul>
        </div>
    `
})

new Vue({
    el: '#app',

    data () {
        return {
            btc: {
                name: 'Bitcoin',
                symbol: 'BTC',
                img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
                changePercent: 0,
                price: 8200,

                pricesWithDays: [
                    { day: 'Lunes', value: 8400 },
                    { day: 'Martes', value: 7900 },
                    { day: 'Miercoles', value: 8200 },
                    { day: 'Jueves', value: 9000 },
                    { day: 'Viernes', value: 9400 },
                    { day: 'Sabado', value: 10000 },
                    { day: 'Domingo', value: 10200 },
                ],
            },

            color: 'f4f4f4',
        }
    },

    methods: {
        updateColor (color) {
            this.color = color || this.color.split('')
                            .reverse()
                            .join('')
        }
    }
})