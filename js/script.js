/* homepage message .............................................................................*/
const messages = [
  ['Greetings!', 'How are You!', 'Buenos dias!', 'Hello!', 'Hi!','Shalom!.', 'Bonjour!'],
  ['I','Personally, I ', 'Solely I', 'I,', 'I','I'],
  ['would like to', 'would be delighted to', 'would be glad to', 'would be happy to', 'would be much more obliged to', 'would prefer to', 'would be cheerful to ', 'would be lucky to', 'would be greatful to'],
  ['warmly welcome you to My Portfolio Site!.', 'heartly welcome you to My Portfolio Site!', 'cheefully welcome you to My Portfolio Site!!', 'cordially welcome you to My Portfolio Site!', 'genially welcome you to My Portfolio Site!', 'convivialy welcome you to My Portfolio Site!']
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
    messageElements[index].style.width = `${messageElements[index].clientWidth}px`;
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
