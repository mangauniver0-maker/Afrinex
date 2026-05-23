// Gère le dialogue de création de post et le stockage dans localStorage
(function(){
  const openBtn = document.getElementById('openBtn');
  const dialog = document.getElementById('myDialog');
  const closeBtn = document.getElementById('closeBtn');
  const form = document.getElementById('postForm');
  const textarea = document.getElementById('postText');
  const remaining = document.getElementById('remaining');
  const feed = document.querySelector('.projects');

  function loadPosts(){
    try{ return JSON.parse(localStorage.getItem('posts')) || []; }catch(e){ return []; }
  }
  function savePosts(posts){ localStorage.setItem('posts', JSON.stringify(posts)); }

  function renderFeed(){
    const posts = loadPosts();
    feed.innerHTML = '';
    if (!posts.length){
      const p = document.createElement('p'); p.textContent = 'No posts yet.'; feed.appendChild(p); return;
    }
    posts.slice().reverse().forEach(post=>{
      const card = document.createElement('div'); card.className = 'projects-card post-card';
      card.innerHTML = `<h1>${escapeHtml(post.authorName||'Anonymous')}</h1>
                        <p>${escapeHtml(post.content)}</p>
                        <small>${new Date(post.createdAt).toLocaleString()}</small>`;
      feed.appendChild(card);
    });
  }

  function escapeHtml(s){ if(!s) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'); }

  // show dialog
  if (openBtn && dialog){
    openBtn.addEventListener('click', ()=>{ if(dialog.showModal) dialog.showModal(); else dialog.setAttribute('open',''); });
  }
  // close
  if (closeBtn && dialog){ closeBtn.addEventListener('click', ()=> dialog.close()); }

  // textarea remaining
  if (textarea){
    textarea.addEventListener('input', ()=>{
      const rem = 280 - textarea.value.length;
      remaining.textContent = rem;
      if (rem < 0) remaining.style.color = 'red'; else remaining.style.color = '#666';
    });
  }

  // submit
  if (form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const content = (textarea.value||'').trim();
      if (!content) return alert('Write something before posting.');
      const posts = loadPosts();
      const user = (function(){ try{return JSON.parse(localStorage.getItem('user'))||{}; }catch(e){return{}} })();
      const post = {
        id: 'p_' + Date.now(),
        content,
        createdAt: new Date().toISOString(),
        authorName: user.name || 'Anonymous'
      };
      posts.push(post);
      savePosts(posts);
      if (dialog) dialog.close();
      form.reset();
      remaining.textContent = '280';
      renderFeed();
    });
  }

  // initial render
  renderFeed();
})();
