(function(){
  const section = document.querySelector('.projects');
  if (!section) return;

  const waitlistKey = 'vc_waitlist';
  const projectsKey = 'projects';

  function escapeHtml(s){ if(!s) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'); }
  function loadJSON(key){ try{ return JSON.parse(localStorage.getItem(key)) || []; }catch(e){ return []; } }

  function render(){
    const list = loadJSON(waitlistKey);
    const projects = loadJSON(projectsKey);
    section.innerHTML = '';
    const header = document.createElement('h1'); header.textContent = ``;
    section.appendChild(header);

    if (!list.length){
      const p = document.createElement('p'); p.textContent = 'No projects in your waitlist yet.'; section.appendChild(p); return;
    }

    list.forEach(entry => {
      const card = document.createElement('div'); card.className = 'projects-card';
      const title = document.createElement('h1'); title.textContent = entry.name || 'Untitled';
      const meta = document.createElement('p'); meta.innerHTML = `<strong>Region:</strong> ${escapeHtml(entry.region)} <small style="color:#666">added: ${new Date(entry.addedAt).toLocaleString()}</small>`;
      const viewBtn = document.createElement('button'); viewBtn.className='create view-btn'; viewBtn.textContent='View project';
      card.appendChild(title); card.appendChild(meta); card.appendChild(viewBtn);

      // attach click to show full project details if available
      viewBtn.addEventListener('click', ()=>{
        const idx = entry.projectIndex;
        const proj = projects[idx];
        if (!proj) return alert('Project data not available locally.');
        showDetail(proj);
      });

      section.appendChild(card);
    });
  }

  function showDetail(proj){
    let dlg = document.getElementById('vcProjectDialog');
    if (!dlg){ dlg = document.createElement('dialog'); dlg.id = 'vcProjectDialog'; document.body.appendChild(dlg); }
    dlg.innerHTML = '';
    const close = document.createElement('button'); close.className='create'; close.textContent='Close'; close.style.float='right';
    const h = document.createElement('h1'); h.textContent = proj.name || 'Untitled';
    dlg.appendChild(close); dlg.appendChild(h);
    function row(label, value){ const r = document.createElement('div'); r.className='form-row'; const lab=document.createElement('label'); lab.textContent=label; const val=document.createElement('p'); val.textContent = value || '-'; r.appendChild(lab); r.appendChild(val); return r; }
    dlg.appendChild(row('Region', proj.region));
    dlg.appendChild(row('Short pitch', proj.shortpitch));
    dlg.appendChild(row('Long pitch', proj.longpitch));
    dlg.appendChild(row('Business model', proj.businessModel || proj['businessModel']));
    dlg.appendChild(row('Traction', proj.traction || proj['traction']));
    if (proj.ytsplink || proj.ytlplink){ const r = document.createElement('div'); r.className='form-row'; const lab=document.createElement('label'); lab.textContent='Pitch video'; const a=document.createElement('a'); a.href = proj.ytsplink || proj.ytlplink; a.target='_blank'; a.rel='noreferrer'; a.textContent='Watch on YouTube'; r.appendChild(lab); r.appendChild(a); dlg.appendChild(r); }
    dlg.showModal();
    close.addEventListener('click', ()=>dlg.close());
  }

  render();
})();
