async function loadPosts() {
    try {
      const response = await fetch('/api/posts');
      const posts = await response.json();
      const container = document.getElementById('posts');
  
      // Vyčištění
      container.innerHTML = '';
  
      posts.forEach((p) => {
        const div = document.createElement('div');
        div.innerHTML = `
          <h2>${p.title}</h2>
          <p>${p.content}</p>
          <hr/>
        `;
        container.appendChild(div);
      });
    } catch (err) {
      console.error('Chyba při načítání příspěvků', err);
    }
  }
  
  document.addEventListener('DOMContentLoaded', loadPosts);
  