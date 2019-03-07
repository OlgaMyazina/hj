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
  const element = document.createElement('div');
  element.className = 'comment-wrap';
  const photo = document.createElement('div');
  photo.className = 'photo';
  photo.title = `${comment.author.name}`;
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.style.backgroundImage = `url(${comment.author.pic})`;
  const commentBlock = document.createElement('div');
  commentBlock.className = 'comment-block';
  const commentText = document.createElement('p');
  commentText.className = 'comment-text';
  const commentTextArray = comment.text.split('\n');
  commentTextArray.forEach(text => {
    const textNode = document.createTextNode(text);
    commentText.appendChild(textNode);
    commentText.appendChild(document.createElement('br'));
  });
  const bottomComment = document.createElement('div');
  bottomComment.className = 'bottom-comment';
  const commentDate = document.createElement('div');
  commentDate.textContent = `${new Date(comment.date).toLocaleString('ru-Ru')}`;
  const commentActions = document.createElement('ul');
  commentActions.className = 'comment-actions';
  const complain = document.createElement('li');
  complain.className = 'complain';
  complain.textContent = `Пожаловаться`;
  const reply = document.createElement('li');
  reply.className = 'reply';
  reply.textContent = `Ответить`;

  element.appendChild(photo);
  photo.appendChild(avatar);
  element.appendChild(commentBlock);
  commentBlock.appendChild(commentText);
  commentBlock.appendChild(bottomComment);
  bottomComment.appendChild(commentDate);
  bottomComment.appendChild(commentActions);
  commentActions.appendChild(complain);
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
