/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape2 = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

console.log("check");
$(document).ready(function () {
const createTweetElement = function(tweet) {

console.log("inside creattweet element", tweet);
  const date = timeago.format(tweet.created_at); 
  const text = escape2(tweet.content.text);
  console.log(text);
  return `
          <article class="tweet">
          <header class="tweet-header">
            <div>${escape2(tweet.user.name)}</div>
            <div class="handle">${escape2(tweet.user.handle)}</div>
          </header>
          <p>${escape2(tweet.content.text)}</p>
          <footer class="tweet-footer">
            <div>${escape2(date)}</div>
            <div class="icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
        `
  }

const renderTweets = function(tweets) {
  $("#tweets-container").empty();
  for (const tweet of tweets) {
    const newTweet = createTweetElement(tweet);
    $(`#tweets-container`).prepend(newTweet);
  }
}
// Test / driver code (temporary). Eventually will get this from the server.


// $( "#submit-tweet" ).submit(function( event ) {
//   alert( "Handler for .submit() called." );
//   event.preventDefault();
//   $.ajax("/tweet", {
//   method: "POST",
//   data: $(this).serialize(),
// });
// console.log(event);
// });
const error = $(".error h3");
  error.hide();

  const arrowDown = $(".arrow-down");
  arrowDown.show();

  const scrollToTop = $(".scroll-to-top");
  scrollToTop.hide();

$( "#tweet-form" ).submit(function( event ) {
  event.preventDefault();

  const textField = $("#tweet-text").val();
  const error = $(".error h3");
  const textArea = $(".new-tweet textarea");

  $(textArea).keyup(function () {
    error.html("");
    error.slideUp();
  });

  if (textField.trim() === ""){
    error.html(`<i class="fas fa-exclamation-triangle"></i> Error: Tweet Cannot be Empty `);
    textArea.focus();
    error.slideDown();
    return error;
  } else if (textField.length > 140) {
    error.html(`<i class="fas fa-exclamation-triangle"></i> Error: Exceeded max character limit`);
    error.slideDown();
    textArea.focus();
    return error;
  } 
  $.post(
  "/tweets",
  $(this).serialize()).then(() => loadTweets());
});

const loadTweets = function () {
  $.ajax('/tweets', { method: 'GET' })
    .then((response) => renderTweets(response));
}
loadTweets();
});