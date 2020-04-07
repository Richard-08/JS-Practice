const card = document.querySelector('.card');
const startBtn = document.querySelector('.btn');
const restartBtn = document.querySelector('.end');

class Quiz {

    constructor(data) {
        this.data = data;
        this.index = 20;
        this.score = 0;
    }

    render() {
        const current = this.data[this.index];
        const html = `
            <div class="card__question">
                <h1>${current.question}</h1>
            </div>

            <div class="card__answers">
                <span class="answer" data-check=${current[1].check}>${current[1].answer}</span>
                <span class="answer" data-check=${current[2].check}>${current[2].answer}</span>
                <span class="answer" data-check=${current[3].check}>${current[3].answer}</span>
                <span class="answer" data-check=${current[4].check}>${current[4].answer}</span>
            </div>`;
        document.querySelector('.card').innerHTML = html;
    }

    getNextQuestion() {
        this.index += 1;
    }

    getCurrentIndex() {
        return this.index;
    }

    increaseScore() {
        this.score += 1;
    }

    getScore() {
        return this.score;
    }

    resetCurrentIndex() {
        this.index = 0;
    }

    resetScore() {
        this.score = 0;
    }
}

const newQuiz = new Quiz(questions);
newQuiz.render();

card.addEventListener('click', event => {

    let key = event.target.dataset.check;
    /* console.log(event.target.parentNode.children[0].dataset.check); */

    if (key) {
        if (key === 'true') {
            newQuiz.increaseScore();
            event.target.classList.add(key);
            document.querySelector('.card').classList.add('next');
        } else {
            event.target.classList.add(key);
            let node = event.target.parentNode.children;

            for (let i = 0; i < node.length; i += 1) {
                if (node[i].dataset.check === 'true') {
                    node[i].classList.add('true');
                }
            }
            document.querySelector('.card').classList.add('next');
        }

        setTimeout(() => {
            document.querySelector('.card').classList.remove('next');

            if (newQuiz.getCurrentIndex() === questions.length - 1) {
                document.querySelector('.end-window').classList.add('end');
                document.querySelector('.score').innerText = `${newQuiz.getScore()}/${questions.length}`
            } else {
                newQuiz.getNextQuestion();
                newQuiz.render();
            }
        }, 4000);
    }
});


/* /////////////////// Start Quiz ////////////////////// */

function startQuiz() {
    document.querySelector('.start-window').classList.add('start');
}

startBtn.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();

    startQuiz();
});

/* /////////////////// Restart Quiz //////////////////// */

function restartQuiz() {
    newQuiz.resetCurrentIndex();
    newQuiz.resetScore();
    newQuiz.render();

    document.querySelector('.end-window').classList.remove('end');
}

restartBtn.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();

    restartQuiz();
});