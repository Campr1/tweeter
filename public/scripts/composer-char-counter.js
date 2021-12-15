$(document).ready(function() {
  // --- our code goes here ---

  $('#tweet-text').on('input', function() {
    let currentCount = 140;

    //traverse up the DOM tree and find the node with class of counter
    const counter = $(this).closest('.new-tweet').find('.counter');

    let value = $(this).val();

    //keep count of number of characters in the textbox
    currentCount -= value.length;

    //change value of counter to currentCount value
    $(counter).val(currentCount);

    // if value is less than 0, add class of red 
    if (currentCount < 0) {
      counter.addClass('red');
    }

    // if value is less than 0, remove class 
    if (currentCount >= 0) {
      counter.removeClass('red');
    }
    
  }) 
  

});