import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const postForm = document.getElementById('postForm');
  const newPostBtn = document.getElementById('newPostBtn');
  const postsContainer = document.getElementById('posts');

  // Initialize TinyMCE
  tinymce.init({
    selector: '#body',
    plugins: 'link image code',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
  });

  // Toggle new post form
  newPostBtn.addEventListener('click', () => {
    postForm.style.display = postForm.style.display === 'none' ? 'block' : 'none';
  });

  // Handle form submission
  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const body = tinymce.get('body').getContent();

    await backend.addPost(title, body, author);
    postForm.reset();
    tinymce.get('body').setContent('');
    postForm.style.display = 'none';
    await displayPosts();
  });

  // Function to display posts
  async function displayPosts() {
    const posts = await backend.getPosts();
    postsContainer.innerHTML = posts.map(post => `
      <div class="post">
        <h2>${post.title}</h2>
        <div class="post-meta">By ${post.author} on ${new Date(Number(post.timestamp) / 1000000).toLocaleString()}</div>
        <div class="post-body">${post.body}</div>
      </div>
    `).join('');
  }

  // Initial display of posts
  await displayPosts();
});