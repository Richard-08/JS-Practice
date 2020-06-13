import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

new Vue({
    el: '#app',
    data() {
        return {
            cards: [
                { id: 0, src: 'img/car.svg' },
                { id: 1, src: 'img/code.svg' },
                { id: 2, src: 'img/cubes.svg' },
                { id: 3, src: 'img/jet.svg' },
                { id: 4, src: 'img/paper-plane.svg' },
                { id: 5, src: 'img/rocket.svg' },
                { id: 6, src: 'img/space-shuttle.svg' },
                { id: 7, src: 'img/user-secret.svg' }
            ],
            data: [],
            moves: 0,
            score: 0,
            selectedCards: [],
        }
    },
    mounted() {
        const randomCards = getRandomCards(this.cards);
        this.data = [...randomCards];
    },
    methods: {
        showCard(i) {
            if (!this.data[i].isShow) {
                this.data[i].isShow = true;
                this.selectedCards.push(i);

                if (this.selectedCards.length === 2) {
                    this.moves += 1;

                    if (this.data[this.selectedCards[0]].id === this.data[this.selectedCards[1]].id) {
                        this.score += 1;
                        this.selectedCards.length = 0;
                    } else {
                        setTimeout(() => {
                            this.data[this.selectedCards[0]].isShow = false;
                            this.data[this.selectedCards[1]].isShow = false;
                            this.selectedCards.length = 0;
                        }, 700);

                    }
                }
            }
        },
        restartGame() {
            this.moves = 0;
            this.score = 0;
            this.selectedCards.length = 0;
            this.data.length = 0;

            const randomCards = getRandomCards(this.cards);
            this.data = [...randomCards];
        }
    }
});

function getRandomCards(data) {
    let arr = [];
    for (let i = 0; i < 8; i += 1) {
        let idx = Math.floor(Math.random() * data.length);
        let obj = {
            src: data[idx].src,
            isShow: false,
            id: data[idx].id
        };
        arr.push(obj);

        obj = {
            src: data[idx].src,
            isShow: false,
            id: data[idx].id
        };
        arr.push(obj);
    }

    for (let i = arr.length - 1; i > 0; i -= 1) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
