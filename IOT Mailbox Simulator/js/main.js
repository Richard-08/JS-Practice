const status = document.querySelector('.status');
const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
const resetBtn = document.querySelector('.reset-btn');
const mailboxStatus = document.querySelector('.mailbox__status');

let isStarted = false;

/**
 * Monitor the light levels inside an IOT enabled snail mailbox to detect
 * when the mailbox door has been opened and closed.
 * @class IOTMailbox
 */
class IOTMailbox {
    /**
     * Creates an instance of IOTMailbox.
     * @param {number} [signalInterval=500] Timer interval for checking mailbox status.
     * @param {function} signalCallback Function to invoke when the timer interval expires.
     * @memberof IOTMailbox
     */
    constructor(signalInterval = 500, signalCallback) {
        this.signalInterval = signalInterval;
        this.signalCallback = signalCallback;
        this.intervalID = null;
        this.lastLightLevel = 0;
    }

    /**
     * Start monitoring of the mailbox and invoke the caller specified callback
     * function when the interval expires.
     * @memberof IOTMailbox
     */
    startMonitoring = () => {
        console.log(`Starting monitoring of mailbox...`);
        this.intervalID = window.setInterval(this.signalStateChange, this.signalInterval);
    }

    /**
     * Stop monitoring the mailbox status
     * @memberof IOTMailbox
     */
    stopMonitoring = () => {
        if (this.intervalID === null) return;
        window.clearInterval(this.intervalID);
        this.intervalID = null;
        console.log(`Mailbox monitoring stopped...`);
    }

    /**
     * Pass the current light level inside the mailbox to the users callback
     * function. The positive light levels indicate the door is open while 
     * negative levels indicate it is closed. Depending on the sampling interval 
     * the mailbox door could be in any postion from fully closed to fully open. 
     * This means the light level varies from interval-to-interval.
     * @memberof IOTMailbox
     */
    signalStateChange = () => {
        const lightLevel = this.lastLightLevel >= 0
            ? Math.random().toFixed(2) * -1
            : Math.random().toFixed(2);
        console.log(`Mailbox state changed - lightLevel: ${lightLevel}`);
        this.signalCallback(this.lastLightLevel);
        this.lastLightLevel = lightLevel;
    }
};


let newMailbox = new IOTMailbox(3000, updateState);

/* ///////////////////// Callback ////////////////////// */

function updateState(state) {
    if (state > 0) {
        renderNotifications(`Light level: (${state}) - status: opened`);
        status.textContent = 'opened';
        status.classList.add('open');
    } else {
        renderNotifications(`Light level: (${state}) - status: closed`);
        status.textContent = 'closed';
        status.classList.remove('open');
    }
}

/* /////////////////////// Start Monitoring ////////////////// */

function startMailboxMonitoring() {
    if (isStarted) {
        return;
    }

    renderNotifications('Starting monitoring of mailbox...', 'start');
    newMailbox.startMonitoring();
    isStarted = true;
}

/* /////////////////////// Stop Monitoring ////////////////// */

function stopMailboxMontoring() {
    if (!isStarted) {
        return;
    }

    renderNotifications('Mailbox monitoring stopped...', 'stop');
    newMailbox.stopMonitoring();
    isStarted = false;
}

/* /////////////////////// Reset Mailbox Status ////////////////// */

function resetMailboxStatus() {
    newMailbox.stopMonitoring();
    mailboxStatus.innerHTML = '';
}

/* /////////////////////// Render Notifications on List ////////////////// */

function renderNotifications(text, type) {
    const notification = `
    <li class="mailbox__notification ${type}">
        <i class="fas fa-angle-double-right"></i> ${text}
    </li>`;
    mailboxStatus.insertAdjacentHTML('beforeend', notification);
}


// Listeners

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    startMailboxMonitoring();
});

stopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    stopMailboxMontoring();
});

resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resetMailboxStatus();
});
