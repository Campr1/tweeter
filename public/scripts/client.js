/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//function used to escape text(XSS prevention)
const escape2 = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function () {
  const createTweetElement = function (tweet) {
    const date = timeago.format(tweet.created_at);
    const text = escape2(tweet.content.text);
    console.log(text);
    return `
          <article class="tweet">
          <header class="tweet-header">
          <div class="user-info">
            <img src=${escape2(tweet.user.avatars)}>
            <div class="tweet-header">${escape2(tweet.user.name)}</div>
          </div>  
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
//renderTweets function will add created tweets to the database in chronological order
  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      $(`#tweets-container`).prepend(newTweet);    
    }
  }

  const error = $(".error h3");
  error.hide();

  const arrowDown = $(".arrow-down");
  arrowDown.show();

  const scrollToTop = $(".scroll-to-top");
  scrollToTop.hide();

  $("#tweet-form").submit(function (event) {
    event.preventDefault();

    const textField = $("#tweet-text").val();
    const error = $(".error h3");
    const textArea = $(".new-tweet textarea");

    error.html("");
    error.slideUp();

    if (!textField) {
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
    $.post(           //Ajax request
      "/tweets",
      $(this).serialize())
      .then(() => loadTweets())
      .then(() => {
        $("#tweet-text").val("");
        $(".counter").text(140);
      })
  });

//loadTweets function will load existing tweets from the database to the page
  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then((response) => renderTweets(response));
  }
  loadTweets();
});