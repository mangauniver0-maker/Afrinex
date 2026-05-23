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

    const manageBtn = document.createElement('button');
    manageBtn.className = 'create manage-btn';
    manageBtn.dataset.idx = i;
    manageBtn.textContent = 'manage project';

    card.appendChild(title);
    card.appendChild(short);
    card.appendChild(ytWrap);
    card.appendChild(manageBtn);

    section.appendChild(card);
  });
}

function openManage(index){
  const proj = projects[index];
  section.innerHTML = '';

  const form = document.createElement('form');
  form.className = 'manage-form contact-form';

  const back = document.createElement('button');
  back.type = 'button';
  back.className = 'create back-btn';
  back.textContent = '← Back to list';
  form.appendChild(back);

  const h = document.createElement('h1');
  h.textContent = 'Manage project';
  form.appendChild(h);

  function addField(name, label, type='text'){
    const row = document.createElement('div');
    row.className = 'form-row';
    const lab = document.createElement('label');
    lab.textContent = label;
    const input = type === 'textarea' ? document.createElement('textarea') : document.createElement('input');
    if (type !== 'textarea') input.type = type;
    input.name = name;
    input.value = proj[name] || '';
    row.appendChild(lab);
    row.appendChild(input);
    form.appendChild(row);
    return input;
  }

  addField('name','Project name');
  addField('region','Region');
  addField('shortpitch','Short pitch');
  addField('ytsplink','Youtube short link','url');
  addField('longpitch','Long pitch','textarea');
  addField('ytlplink','Youtube long link','url');

  const actions = document.createElement('div');
  actions.className = 'form-actions';
  const save = document.createElement('button');
  save.type = 'submit';
  save.className = 'create';
  save.textContent = 'Save changes';
  actions.appendChild(save);
  form.appendChild(actions);

  section.appendChild(form);

  back.addEventListener('click', (e)=>{ e.preventDefault(); renderList(); });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fd = new FormData(form);
    const updated = Object.fromEntries(fd.entries());
    projects[index] = Object.assign({}, projects[index], updated);
    localStorage.setItem('projects', JSON.stringify(projects));
    renderList();
  });
}

// click handler for manage buttons
section.addEventListener('click', (e)=>{
  const m = e.target.closest('.manage-btn');
  if (m){
    const idx = Number(m.dataset.idx);
    if (!Number.isFinite(idx)) return;
    openManage(idx);
  }
});

renderList();
