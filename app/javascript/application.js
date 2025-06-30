// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import '@hotwired/turbo-rails';
import 'controllers';

import 'trix';
import '@rails/actiontext';

import jquery from 'jquery';
import axios from 'axios';

window.$ = jquery;
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;

const handleHeartDisplay = (hasLiked) => {
  if (hasLiked) {
    $('.active-heart').removeClass('hidden');
  } else {
    $('.inactive-heart').removeClass('hidden');
  }
};

document.addEventListener('turbo:load', () => {
  const dataset = $('#article-show').data();
  const articleId = dataset.articleId;

  axios.get(`/articles/${articleId}/like`).then((response) => {
    const hasLiked = response.data.hasLiked;
    handleHeartDisplay(hasLiked);
  });

  $('.inactive-heart').on('click', () => {
    axios
      .post(`/articles/${articleId}/like`)
      .then((response) => {
        if (response.data.status === 'ok') {
          $('.active-heart').removeClass('hidden')
          $('.inactive-heart').addClass('hidden')
        }
      })
      .catch((error) => {
        window.alert('Error');
        console.log(e);
      });
  });

  $('.active-heart').on('click', () => {
    axios
      .delete(`/articles/${articleId}/like`)
      .then((response) => {
        if (response.data.status === 'ok') {
          $('.active-heart').addClass('hidden')
          $('.inactive-heart').removeClass('hidden')
        }
      })
      .catch((error) => {
        window.alert('Error');
        console.log(e);
      });
  });
});
