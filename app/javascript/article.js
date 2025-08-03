import jquery from 'jquery';
import axios from 'modules/axios';
import {
  listenActiveHeartEvent,
  listenInactiveHeartEvent,
} from 'modules/handle_heart';
window.$ = jquery;

const handleHeartDisplay = (hasLiked) => {
  if (hasLiked) {
    $('.active-heart').removeClass('hidden');
  } else {
    $('.inactive-heart').removeClass('hidden');
  }
};

const handleCommentForm = () => {
  $('.show-comment-form').on('click', () => {
    $('.show-comment-form').addClass('hidden');
    $('.comment-text-area').removeClass('hidden');
  });
};

const appendNewComment = (comment) => {
  const commentDiv = document.createElement('div');
  commentDiv.className = 'article_comment';

  const p = document.createElement('p');
  p.textContent = comment.content;

  commentDiv.appendChild(p);

  const container = document.querySelector('.comments-container');
  container.appendChild(commentDiv);
};


document.addEventListener('turbo:load', () => {
  const dataset = $('#article-show').data();
  const articleId = dataset.articleId;

  axios.get(`/api/articles/${articleId}/comments`).then((response) => {
    const comments = response.data;
    comments.forEach((comment) => {
      appendNewComment(comment);
    });
  });

  handleCommentForm();

  $('.add-comment-button').on('click', () => {
    const content = $('#comment_content').val();
    if (!content) {
      window.alert('コメント入力してください。');
    } else {
      axios
        .post(`/api/articles/${articleId}/comments`, {
          comment: { content: content },
        })
        .then((res) => {
          const comment = res.data;
          appendNewComment(comment);
          $('#comment_content').val('');
        });
    }
  });

  axios.get(`/api/articles/${articleId}/like`).then((response) => {
    const hasLiked = response.data.hasLiked;
    handleHeartDisplay(hasLiked);
  });

  listenActiveHeartEvent(articleId);
  listenInactiveHeartEvent(articleId);
});
