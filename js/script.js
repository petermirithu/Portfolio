/* homepage message .............................................................................*/
const messages = [
    ['I am Peter Mirithu,', 'I am Peter Mirithu, ', 'I am Peter Mirithu,  ', 'I am Peter Mirithu,    ', 'I am Peter Mirithu,     '],
    ['Professional Software Developer', 'Full-stack Web Developer', 'Front-end & Back-end Web Developer', 'Professional Web developer'],
];

const messageElements = [
    document.querySelector('#js-error'),
    document.querySelector('#js-apology')
];
const widthElement = document.querySelector('#js-hidden');
let lastMessageType = -1;
let messageTimer = 4000;
document.addEventListener('DOMContentLoaded', (event) => {
    setupMessages();
    setInterval(() => {
        swapMessage();
    }, messageTimer);
});

function setupMessages() {
    messageElements.forEach((element, index) => {
        let newMessage = getNewMessage(index);
        element.innerText = newMessage;
    });
}

function calculateWidth(element, message) {
    widthElement.innerText = message;
    let newWidth = widthElement.getBoundingClientRect().width;
    element.style.width = `${newWidth}px`;
}

function swapMessage() {
    let toSwapIndex = getNewSwapIndex();
    let newMessage = getNewMessage(toSwapIndex);
    messageElements[toSwapIndex].style.lineHeight = '0';
    setTimeout(() => {
        checkWidthSet(toSwapIndex, messageElements[toSwapIndex].innerText);
        messageElements[toSwapIndex].innerText = newMessage;
        calculateWidth(messageElements[toSwapIndex], newMessage);
    }, 200);
    setTimeout(() => {
        messageElements[toSwapIndex].style.lineHeight = '1.2';
    }, 400);
}

function checkWidthSet(index, message) {
    if (false == messageElements[index].style.width) {
        messageElements[index].style.width = `${message}px`;
    }
}

function getNewSwapIndex() {
    let newMessageIndex = Math.floor(Math.random() * messages.length);
    while (lastMessageType == newMessageIndex) {
        newMessageIndex = Math.floor(Math.random() * messages.length);
    }
    return newMessageIndex;
}

function getNewMessage(toSwapIndex) {
    const messagesArray = messages[toSwapIndex];
    const previousMessage = messageElements[toSwapIndex].innerText;
    let newMessageIndex = Math.floor(Math.random() * messagesArray.length);
    let newMessage = messagesArray[newMessageIndex];
    while (newMessage == previousMessage) {
        newMessageIndex = Math.floor(Math.random() * messagesArray.length);
        newMessage = messagesArray[newMessageIndex];
    }
    return newMessage;
}
// the end.............................................................................................

// typewriter effect
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 200;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid rgb(194, 0, 97)}";
    document.body.appendChild(css);
};

// scroll master...........................................
AOS.init();
// 
$(document).ready(function() {
    function changeClass() {
        var x = document.getElementsByClassName('section1');
        var width = (window.innerHeight > 0) ? window.innerHeight : screen.Height;
        console.log(width);
        if (width <= 640) {
            for (var i = 0; i < x.length; i++) {
                x[i].className = 'section1small';
            }
        };
    };
});

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml14 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
    .add({
        targets: '.ml14 .line',
        scaleX: [0, 1],
        opacity: [0.5, 1],
        easing: "easeInOutExpo",
        duration: 900
    }).add({
        targets: '.ml14 .letter',
        opacity: [0, 1],
        translateX: [40, 0],
        translateZ: 0,
        scaleX: [0.3, 1],
        easing: "easeOutExpo",
        duration: 800,
        offset: '-=600',
        delay: (el, i) => 150 + 25 * i
    }).add({
        targets: '.ml14',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });

anime.timeline({ loop: true })
    .add({
        targets: '.ml5 .line',
        opacity: [0.5, 1],
        scaleX: [0, 1],
        easing: "easeInOutExpo",
        duration: 700
    }).add({
        targets: '.ml5 .line',
        duration: 600,
        easing: "easeOutExpo",
        translateY: (el, i) => (-0.625 + 0.625 * 2 * i) + "em"
    }).add({
        targets: '.ml5 .ampersand',
        opacity: [0, 1],
        scaleY: [0.5, 1],
        easing: "easeOutExpo",
        duration: 600,
        offset: '-=600'
    }).add({
        targets: '.ml5 .letters-left',
        opacity: [0, 1],
        translateX: ["0.5em", 0],
        easing: "easeOutExpo",
        duration: 600,
        offset: '-=300'
    }).add({
        targets: '.ml5 .letters-right',
        opacity: [0, 1],
        translateX: ["-0.5em", 0],
        easing: "easeOutExpo",
        duration: 600,
        offset: '-=600'
    }).add({
        targets: '.ml5',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml1 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
    .add({
        targets: '.ml1 .letter',
        scale: [0.3, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 600,
        delay: (el, i) => 70 * (i + 1)
    }).add({
        targets: '.ml1 .line',
        scaleX: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 700,
        offset: '-=875',
        delay: (el, i, l) => 80 * (l - i)
    }).add({
        targets: '.ml1',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml11 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
    .add({
        targets: '.ml11 .line',
        scaleY: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 700
    })
    .add({
        targets: '.ml11 .line',
        translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 60],
        easing: "easeOutExpo",
        duration: 700,
        delay: 100
    }).add({
        targets: '.ml11 .letter',
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 600,
        offset: '-=775',
        delay: (el, i) => 34 * (i + 1)
    }).add({
        targets: '.ml11',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });
// end.............................