/* homepage message .............................................................................*/
const messages = [
    ['I am Peter Mirithu,', 'I am Peter Mirithu, ', 'I am Peter Mirithu,  ', 'I am Peter Mirithu,    ', 'I am Peter Mirithu,     '],
    ['Professional Software Developer', 'Back-end Developer', 'Full-stak Web Developer', 'Professional Web developer'],
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
// scroll master...........................................
AOS.init();
//

/* onScroll function
----------------------------------------*/
function onScroll(event){
    var scrollPosition = $(document).scrollTop();
    $('nav li a').each(function () {
      var currentLink = $(this);
      var refElement = $(currentLink.attr("href"));
      if (refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
        $('nav ul li').removeClass("active");
        currentLink.parent().addClass("active");
      }
      else{
        currentLink.parent().removeClass("active");
      }
    });
  }
  
  /* HTML Document is loaded and DOM is ready.
  --------------------------------------------*/
  $(document).ready(function(){
    //slider
    var sudoSlider = $("#slider").sudoSlider({
     effect: "fade",
     pause: 3000,
     auto:true,
     continuous:true
   });
  
    //mobilemenu
    $('.mobile').click(function(){
      var $self = $(this);
      $('.menumobile').slideToggle( function(){
        $self.toggleClass('closed');
      });
    });
  
    //navigation script
    $('.Navigation ul li a').click(function(){
      $('.menumobile').removeAttr("style");
      $('#mobile_sec .mobile').removeClass("closed");
    });
  
    $('a.slicknav_btn').click(function(){
      $(".mobilemenu ul").css({"display":"block"});
    });
  
    //tab
    $(".tabLink").each(function(){
      $(this).click(function(){
        tabeId = $(this).attr('id');
        $(".tabLink").removeClass("activeLink");
        $(this).addClass("activeLink");
        $(".tabcontent").addClass("hide");
        $("#"+tabeId+"-1").removeClass("hide");
        return false;
      });
    });
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
        || location.hostname == this.hostname)
      {
        var target = $(this.hash),
        headerHeight = $(".primary-header").height() + 5; // Get fixed header height
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length)
        {
          $('html,body').animate({
            scrollTop: target.offset().top + 2
          }, 600);
          return false;
        }
      }
    });	
  
    //Header Small
    window.addEventListener('scroll', function(e){
      var distanceY = window.pageYOffset || document.documentElement.scrollTop,
      shrinkOn = 50;
      
      if (distanceY > shrinkOn) {
        $('header').addClass("smaller");
      } else {
        $('header').toggleClass("smaller");
      }
    });    
  }); 
  
  $(document).on("scroll", onScroll);
  
  
  
  