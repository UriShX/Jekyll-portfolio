// Static comments, without jQuery
// Using fetch API to handle request, and URLSearchParams to URL encode FormData
// Uri Shani, 2020
// urlencodeFormData() from: https://stackoverflow.com/questions/7542586/new-formdata-application-x-www-form-urlencoded
// Based on: https://github.com/eduardoboucas/popcorn/blob/gh-pages/js/main.js
(function () {
  var comments = document.querySelectorAll('.js-comments');

  document.querySelector('.js-form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    console.log(evt);

    const el = evt.target;

    let encoded = urlencodeFormData(new FormData(el));
    console.log(encoded);

    document.querySelector('#comment-form-submit').innerHTML =
      '<svg class="icon spin"><use xlink:href="#icon-loading"></use></svg> Sending...';

    el.classList.add('disabled');

    fetch(el.action, {
      method: el.method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: encoded,
    })
      .then((data) => {
        console.log(data);
        // Handle data
        showModal(
          'Comment submitted',
          'Thanks! Your comment is <a href="https://github.com/urishx/microblog/pulls">pending</a>. It will appear when approved.'
        );
      })
      .then(() => {
        document.querySelector('#comment-form-submit').innerHTML = 'Submit';

        el.reset();
        el.classList.remove('disabled');
        grecaptcha.reset();
      })
      .catch((err) => {
        // Handle error
        console.log(err);
        var ecode = (err.responseJSON || {}).errorCode || 'unknown';
        showModal('Error', 'An error occured.<br>[' + ecode + ']');
        document.querySelector('#comment-form-submit').innerHTML = 'Submit';
        el.classList.remove('disabled');
        grecaptcha.reset();
      });

    return false;
  });

  document.querySelector('.js-close-modal').addEventListener('click', () => {
    document.querySelector('body').classList.remove('show-modal');
  });

  function urlencodeFormData(fd) {
    var params = new URLSearchParams();
    for (var pair of fd.entries()) {
      typeof pair[1] == 'string' && params.append(pair[0], pair[1]);
    }
    return params.toString();
  }

  function showModal(title, message) {
    document.querySelector('.js-modal-title').textContent = title;
    document.querySelector('.js-modal-text').innerHTML = message;
    document.querySelector('body').classList.add('show-modal');
  }
})();

// Google recaptcha enable submit button
function recaptcha_callback() {
  document.querySelector('#comment-form-submit').removeAttribute('disabled');
}

// Staticman comment replies, from https://github.com/mmistakes/made-mistakes-jekyll
// modified from Wordpress https://core.svn.wordpress.org/trunk/wp-includes/js/comment-reply.js
// Released under the GNU General Public License - https://wordpress.org/about/gpl/
// addComment.moveForm is called from comment.html when the reply link is clicked.
var addComment = {
  // commId - the id attribute of the comment replied to (e.g., "comment-10")
  // respondId - the string 'respond', I guess
  // postId - the page slug
  moveForm: function (commId, respondId, postId, parentUid) {
    var div,
      element,
      style,
      cssHidden,
      t = this, //t is the addComment object, with functions moveForm and I, and variable respondId
      comm = t.I(commId), // whole comment
      respond = t.I(respondId), // whole new comment form
      cancel = t.I('cancel-comment-reply-link'), // whole reply cancel link
      parentuidF = t.I('comment-replying-to-uid'), // a hidden element in the comment
      post = t.I('comment-post-slug'), // null
      commentForm = respond.getElementsByTagName('form')[0]; // the <form> part of the comment_form div

    if (!comm || !respond || !cancel || !parentuidF || !commentForm) {
      return;
    }

    t.respondId = respondId;
    postId = postId || false;

    if (!t.I('sm-temp-form-div')) {
      div = document.createElement('div');
      div.id = 'sm-temp-form-div';
      div.style.display = 'none';
      respond.parentNode.insertBefore(div, respond); //create and insert a bookmark div right before comment form
    }

    comm.parentNode.insertBefore(respond, comm.nextSibling); //move the form from the bottom to above the next sibling
    if (post && postId) {
      post.value = postId;
    }
    parentuidF.value = parentUid;
    cancel.style.display = ''; //make the cancel link visible

    cancel.onclick = function () {
      var t = addComment,
        temp = t.I('sm-temp-form-div'), //temp is the original bookmark
        respond = t.I(t.respondId); //respond is the comment form

      if (!temp || !respond) {
        return;
      }

      t.I('comment-replying-to-uid').value = null;
      temp.parentNode.insertBefore(respond, temp); //move the comment form to its original location
      temp.parentNode.removeChild(temp); //remove the bookmark div
      this.style.display = 'none'; //make the cancel link invisible
      this.onclick = null; //retire the onclick handler
      return false;
    };

    /*
     * Set initial focus to the first form focusable element.
     * Try/catch used just to avoid errors in IE 7- which return visibility
     * 'inherit' when the visibility value is inherited from an ancestor.
     */
    try {
      for (var i = 0; i < commentForm.elements.length; i++) {
        element = commentForm.elements[i];
        cssHidden = false;

        // Modern browsers.
        if ('getComputedStyle' in window) {
          style = window.getComputedStyle(element);
          // IE 8.
        } else if (document.documentElement.currentStyle) {
          style = element.currentStyle;
        }

        /*
         * For display none, do the same thing jQuery does. For visibility,
         * check the element computed style since browsers are already doing
         * the job for us. In fact, the visibility computed style is the actual
         * computed value and already takes into account the element ancestors.
         */
        if (
          (element.offsetWidth <= 0 && element.offsetHeight <= 0) ||
          style.visibility === 'hidden'
        ) {
          cssHidden = true;
        }

        // Skip form elements that are hidden or disabled.
        if ('hidden' === element.type || element.disabled || cssHidden) {
          continue;
        }

        element.focus();
        // Stop after the first focusable element.
        break;
      }
    } catch (er) {}

    return false;
  },

  I: function (id) {
    return document.getElementById(id);
  },
};
