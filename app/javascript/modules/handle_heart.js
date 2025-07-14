import axios from 'axios';

const listenInactiveHeartEvent = (articleId) => {
  $('.inactive-heart').on('click', () => {
    axios
      .post(`/articles/${articleId}/like`)
      .then((response) => {
        if (response.data.status === 'ok') {
          $('.active-heart').removeClass('hidden');
          $('.inactive-heart').addClass('hidden');
        }
      })
      .catch((error) => {
        window.alert('Error');
        console.log(e);
      });
  });
};

const listenActiveHeartEvent = (articleId) => {
  $('.active-heart').on('click', () => {
    axios
      .delete(`/articles/${articleId}/like`)
      .then((response) => {
        if (response.data.status === 'ok') {
          $('.active-heart').addClass('hidden');
          $('.inactive-heart').removeClass('hidden');
        }
      })
      .catch((error) => {
        window.alert('Error');
        console.log(e);
      });
  });
};

export {
  listenActiveHeartEvent,
  listenInactiveHeartEvent
}