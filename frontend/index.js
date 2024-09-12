import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const postForm = document.getElementById('postForm');
  const newPostBtn = document.getElementById('newPostBtn');
  const postsContainer = document.getElementById('posts');
  const categorySelect = document.getElementById('category');
  const categoriesContainer = document.getElementById('categories');
  let editor;

  // Initialize Monaco Editor
  require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs' }});
  require(['vs/editor/editor.main'], function() {
    editor = monaco.editor.create(document.getElementById('editor-container'), {
      value: '# Write your post content here\n\nUse Markdown syntax for formatting.',
      language: 'markdown',
      theme: 'vs-light',
      minimap: { enabled: false },
      lineNumbers: 'off',
      wordWrap: 'on',
      wrappingIndent: 'indent',
      lineDecorationsWidth: 0,
      lineNumbersMinChars: 0,
      glyphMargin: false,
      folding: false,
      renderLineHighlight: 'none',
      scrollbar: {
        vertical: 'hidden',
        horizontal: 'hidden'
      }
    });
  });

  // Function to get category icon
  function getCategoryIcon(category) {
    const icons = {
      'Bitcoin': 'fab fa-bitcoin',
      'Ethereum': 'fab fa-ethereum',
      'DeFi': 'fas fa-chart-line',
      'NFTs': 'fas fa-image',
      'Blockchain': 'fas fa-link'
    };
    return icons[category] || 'fas fa-question';
  }

  // Populate category select and display categories
  const categories = await backend.getCategories();
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);

    const categoryTag = document.createElement('div');
    categoryTag.className = 'category-tag';
    categoryTag.innerHTML = `<i class="${getCategoryIcon(category)} category-icon"></i>${category}`;
    categoriesContainer.appendChild(categoryTag);
  });

  // Toggle new post form
  newPostBtn.addEventListener('click', () => {
    postForm.style.display = postForm.style.display === 'none' ? 'block' : 'none';
    if (postForm.style.display === 'block') {
      editor.layout();
    }
  });

  // Handle form submission
  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const body = editor.getValue();
    const category = categorySelect.value;

    await backend.addPost(title, body, author, category);
    postForm.reset();
    editor.setValue('# Write your post content here\n\nUse Markdown syntax for formatting.');
    postForm.style.display = 'none';
    await displayPosts();
  });

  // Function to display posts
  async function displayPosts() {
    const posts = await backend.getPosts();
    postsContainer.innerHTML = posts.map(post => `
      <div class="post">
        <h2>
          <i class="${getCategoryIcon(post.category)} category-icon"></i>
          ${post.title}
        </h2>
        <div class="post-meta">
          By ${post.author} on ${new Date(Number(post.timestamp) / 1000000).toLocaleString()} | Category: ${post.category}
        </div>
        <div class="post-body">${post.body}</div>
      </div>
    `).join('');
  }

  // Initial display of posts
  await displayPosts();
});