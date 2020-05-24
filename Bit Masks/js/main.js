Vue.component('app-form', {
    template: `
    <form class='search' @submit.prevent="onSubmit">
        <input type="number" class='search-input' v-model='title'></input>
        <button type="submit" class='submit-btn'>Find Cities</button>
    </form>`,
    data() {
        return {
            title: ''
        }
    },
    methods: {
        onSubmit() {
            const gmt = this.title;
            this.$emit('find-city', gmt);
            this.title = '';
        }
    }
});

Vue.component('checkbox', {
    props: ['item'],
    template:
        `<div class='checkboxes'>
            <input type="checkbox" name="city" class='checkbox'>
            <label for="city" class='checkbox-label'>{{item.name}}</label>
        </div>`
});

const flags = {
    '1': 2,
    '2': 4,
    '3': 8,
    '4': 16,
    '5': 32,
    '6': 64,
    '7': 128,
    '8': 256,
    '9': 512,
    '10': 1024,
    '11': 2048,
    '12': 4096,
    '-1': 8192,
    '-2': 16384,
    '-3': 32768,
    '-4': 65536,
    '-5': 131072,
    '-6': 262144,
    '-7': 524288,
    '-8': 1048576,
    '-9': 2097152,
    '-10': 4194304,
    '-11': 8388608,
    '-12': 16777216
}

let app = new Vue({
    el: "#app",
    data: {
        list: [
            { flag: flags['3'], name: 'Moscow: GMT +3' },
            { flag: flags['2'], name: 'Paris: GMT +2' },
            { flag: flags['2'], name: 'Berlin: GMT +2' },
            { flag: flags['2'], name: 'Brussels: GMT +2' },
            { flag: flags['2'], name: 'Amsterdam: GMT +2' },
            { flag: flags['2'], name: 'Rome: GMT +2' },
            { flag: flags['1'], name: 'London: GMT +1' },
            { flag: flags['1'], name: 'Dublin: GMT +1' },
            { flag: flags['-4'], name: 'New York: GMT -4' },
            { flag: flags['-4'], name: 'Washington, DC: GMT -4' },
            { flag: flags['-5'], name: 'St. Louis: GMT -5' },
            { flag: flags['-7'], name: 'Los Angeles: GMT -7' },
            { flag: flags['9'], name: 'Tokyo: GMT +9' },
            { flag: flags['8'], name: 'Beijing: GMT +8' },
            { flag: flags['7'], name: 'Ho Chi Mihn City: GMT +7' },
            { flag: flags['5'], name: 'Mumbai: GMT +5' }
        ]
    },
    methods: {
        findCity(gmt) {
            this.list = this.list.filter(city => city.flag & flags[gmt]);
        }
    }
});





