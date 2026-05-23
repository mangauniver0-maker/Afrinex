const section = document.querySelector('.projects');

const projects = JSON.parse(localStorage.getItem('projects')) || [];

function escapeHTML(str){
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

function renderList(){
  section.innerHTML = '';
  if (!projects || projects.length === 0){
    const p = document.createElement('p');
    p.textContent = 'No projects yet. Click "create ur project" to add one.';
    section.appendChild(p);
    return;
  }

  projects.forEach((proj, i) => {
    const card = document.createElement('div');
    card.className = 'projects-card';

    const title = document.createElement('h1');
    title.textContent = proj.name || 'Untitled project';

    const short = document.createElement('p');
    short.textContent = proj.shortpitch || '';

    const ytWrap = document.createElement('div');
    ytWrap.className = 'yt';
    if (proj.ytsplink || proj.ytlplink){
      const a = document.createElement('a');
      a.href = proj.ytsplink || proj.ytlplink;
      a.target = '_blank';
      a.rel = 'noreferrer';
    //   a.textContent = 'Watch pitch on YouTube';
      ytWrap.appendChild(a);
    }

    const viewBtn = document.createElement('button');
    viewBtn.className = 'create view-btn';
    viewBtn.dataset.idx = i;
    viewBtn.textContent = 'view details';

    card.appendChild(title);
    card.appendChild(short);
    card.appendChild(ytWrap);
    card.appendChild(viewBtn);

    section.appendChild(card);
  });
}

function openView(index){
  const proj = projects[index];
  section.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'project-detail contact-form';

  const back = document.createElement('button');
  back.type = 'button';
  back.className = 'create back-btn';
  back.textContent = '← Back to list';
  container.appendChild(back);

  const h = document.createElement('h1');
  h.textContent = proj.name || 'Untitled project';
  container.appendChild(h);

  function addRow(label, value){
    const row = document.createElement('div');
    row.className = 'form-row';
    const lab = document.createElement('label'); lab.textContent = label;
    const val = document.createElement('p'); val.textContent = value || '-';
    row.appendChild(lab); row.appendChild(val); container.appendChild(row);
  }

  addRow('Region', proj.region);
  addRow('Short pitch', proj.shortpitch);
  addRow('Long pitch', proj.longpitch);
  addRow('Business model', proj.businessModel || proj['businessModel']);
  addRow('Traction', proj.traction || proj['traction']);
  if (proj.ytsplink || proj.ytlplink){
    const linkRow = document.createElement('div'); linkRow.className='form-row';
    const lab = document.createElement('label'); lab.textContent = 'Pitch video';
    const a = document.createElement('a'); a.href = proj.ytsplink || proj.ytlplink; a.target='_blank'; a.rel='noreferrer'; a.textContent = 'Watch on YouTube';
    linkRow.appendChild(lab); linkRow.appendChild(a); container.appendChild(linkRow);
  }

  // Invest button (VC action) - read-only for project, adds to vc_waitlist
  const investRow = document.createElement('div'); investRow.className = 'form-row';
  const investBtn = document.createElement('button');
  investBtn.className = 'create invest-btn';
  investBtn.type = 'button';
  investBtn.textContent = 'Invest';
  investRow.appendChild(document.createElement('label')).textContent = '';
  investRow.appendChild(investBtn);
  container.appendChild(investRow);

  investBtn.addEventListener('click', ()=>{
    addToWaitlist(index, investBtn);
  });

  section.appendChild(container);

  back.addEventListener('click', (e)=>{ e.preventDefault(); renderList(); });
}

// click handler for manage buttons
section.addEventListener('click', (e)=>{
  const v = e.target.closest('.view-btn');
  if (v){
    const idx = Number(v.dataset.idx);
    if (!Number.isFinite(idx)) return;
    openView(idx);
  }
});

function addToWaitlist(index, btn){
  const proj = projects[index];
  if (!proj) return;
  const key = 'vc_waitlist';
  let list = [];
  try{ list = JSON.parse(localStorage.getItem(key)) || []; }catch(e){ list = []; }

  const exists = list.some(item => (item.id && proj.id && item.id === proj.id) || (item.name === proj.name && item.region === proj.region));
  if (exists){
    if (btn) btn.textContent = 'added';
    return alert('Project already in your waitlist');
  }

  const entry = {
    id: proj.id || ('p_' + Date.now() + '_' + Math.floor(Math.random()*1000)),
    name: proj.name || '',
    region: proj.region || '',
    addedAt: new Date().toISOString(),
    projectIndex: index
  };
  list.push(entry);
  localStorage.setItem(key, JSON.stringify(list));
  if (btn) btn.textContent = 'added';
}

renderList();
