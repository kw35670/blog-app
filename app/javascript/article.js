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

  axios.get(`/articles/${articleId}/comments`).then((response) => {
    const comments = response.data
    comments.forEach((comment) => {
      $('.comments-container').append(
        `<div class="article_comment"><p>${comment.content}</p></div>`
      )
    })
  })

  $('.show-comment-form').on('click', () => {
    $('.show-comment-form').addClass('hidden')
    $('.comment-text-area').removeClass('hidden')
  })

  $('.add-comment-button').on('click', () => {
    const content = $('#comment_content').val()
    if (!content) {
      window.alert('コメント入力してください。')
    } else {
      axios.post(`/articles/${articleId}/comments`, {
        comment: {content: content}
      }).then((res) => {
        const comment = res.data
        $('.comments-container').append(
          `<div class="article_comment"><p>${comment.content}</p></div>`
        )
        $('#comment_content').val('')
      })
    }
  })

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
