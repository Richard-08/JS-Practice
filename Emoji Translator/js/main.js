import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

Vue.component('Result', {
    props: ['item'],
    template:
        `<div class="emoji">
            <span class="emoji__character">{{ item.character }}</span>
            <span class="emoji__name">{{ item.unicodeName }}</span>
        </div>`
});

new Vue({
    el: '#app',
    data() {
        return {
            title: '',
            list: [],
        }
    },
    methods: {
        translateToEmoji() {
            fetch(`https://emoji-api.com/emojis?search=${this.title}&access_key=92abbb127dcf290662410af9cebe36c97da0ee2b`)
                .then(response => response.json())
                .then(data => this.list = data);
            this.title = '';
        },
        clearAll() {
            this.list = [];
        }
    }
})