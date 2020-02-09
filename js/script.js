/* homepage message .............................................................................*/
const messages = [
  ['Greetings', 'How are You', 'Buenos dias', 'Hello', 'Hi','Shalom', 'Bonjour'],
  ['!','!!', '!!!'],
  ['I am Peter Mirithu.','I am Peter Mirithu. ', 'I am Peter Mirithu.  ', 'I am Peter Mirithu.    ', 'I am Peter Mirithu.     '],
  ['A Software Developer','A Full-stack Web Developer', 'A Front end & backend Web Developer', 'A Professional Web developer'],  
];

const messageElements = [
  document.querySelector('#js-whoops'),
  document.querySelector('#js-appears'),
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
  let newMessage  = getNewMessage(toSwapIndex);  
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
  const messagesArray   = messages[toSwapIndex];
  const previousMessage = messageElements[toSwapIndex].innerText;  
  let newMessageIndex = Math.floor(Math.random() * messagesArray.length);
  let newMessage      = messagesArray[newMessageIndex];  
  while (newMessage == previousMessage) {
    newMessageIndex = Math.floor(Math.random() * messagesArray.length);
    newMessage      = messagesArray[newMessageIndex];
  }
  return newMessage;
}
// the end.............................................................................................

$(document).ready(function(){  
  $('.section1').ripples({
    dropRadius: 12,
    perturbance: 0.05,
  });
  window.onload=typeWriterone(); 
  window.onload=typeWritertwo(); 

  var $navbar = $('.navbar');  
  $(window).scroll(function(event){
    var $current = $(this).scrollTop();
  	if( $current > 0 ){
      $navbar.addClass('navbar-color');      	        
    }
    else{
      $navbar.removeClass('navbar-color');      	        
    }
  });
});

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

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

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
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }  
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #000000}";
  document.body.appendChild(css);
};