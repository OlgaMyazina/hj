'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');

  commentsContainer.appendChild(
    list.reduce((f, comment) => {
      f.appendChild(showCommentsTemplate(comment));
      return f;
    }, document.createDocumentFragment()));
}

function showCommentsTemplate(comment) {
  //обертка всего комментария
  const element = document.createElement('div');
  element.className = 'comment-wrap';

  //аватар-обертка
  const photo = document.createElement('div');
  photo.className = 'photo';
  photo.title = `${comment.author.name}`;

  //аватар
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.style.backgroundImage = `url(${comment.author.pic})`;
  //добавили аватар в аватар-обертку
  photo.appendChild(avatar);
  //добавили в обертку всего блока комментария всю обертку аватара
  element.appendChild(photo);

  //обертка блока комментария
  const commentBlock = document.createElement('div');
  commentBlock.className = 'comment-block';
  //добавили обертку в всего комментария
  element.appendChild(commentBlock);

  //текст комментария
  const commentText = document.createElement('p');
  commentText.className = 'comment-text';

  const commentTextArray = comment.text.split('\n');
  commentTextArray.forEach(text => {
    const textNode = document.createTextNode(text);
    commentText.appendChild(textNode);
    commentText.appendChild(document.createElement('br'));
  });
  commentBlock.appendChild(commentText);

  //подвал комментария
  const bottomComment = document.createElement('div');
  bottomComment.className = 'bottom-comment';
  commentBlock.appendChild(bottomComment);

  //дата комментария
  const commentDate = document.createElement('div');
  commentDate.textContent = `${new Date(comment.date).toLocaleString('ru-Ru')}`;
  bottomComment.appendChild(commentDate);

  //опции для комментария
  const commentActions = document.createElement('ul');
  commentActions.className = 'comment-actions';
  bottomComment.appendChild(commentActions);

  //кнопка пожаловаться
  const complain = document.createElement('li');
  complain.className = 'complain';
  complain.textContent = `Пожаловаться`;
  commentActions.appendChild(complain);


  //кнопка ответить
  const reply = document.createElement('li');
  reply.className = 'reply';
  reply.textContent = `Ответить`;
  commentActions.appendChild(reply);

  return element;
}

function createComment(comment) {
  return `<div class="comment-wrap">
    <div class="photo" title="${comment.author.name}">
      <div class="avatar" style="background-image: url('${comment.author.pic}')"></div>
    </div>
    <div class="comment-block">
      <p class="comment-text">
        ${comment.text.split('\n').join('<br>')}
      </p>
      <div class="bottom-comment">
        <div class="comment-date">${new Date(comment.date).toLocaleString('ru-Ru')}</div>
        <ul class="comment-actions">
          <li class="complain">Пожаловаться</li>
          <li class="reply">Ответить</li>
        </ul>
      </div>
    </div>
  </div>`
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
