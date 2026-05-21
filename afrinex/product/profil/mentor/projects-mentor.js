(function(){
  const section = document.querySelector('.projects');
  if (!section) return;

  const projects = (function(){ try{ return JSON.parse(localStorage.getItem('projects')) || []; }catch(e){ return []; } })();

  function escapeHtml(s){ if(!s) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'); }

  function renderList(){
    section.innerHTML = '';
    if (!projects.length){ const p = document.createElement('p'); p.textContent='No projects available.'; section.appendChild(p); return; }

    projects.forEach((proj,i)=>{
      const card = document.createElement('div'); card.className='projects-card';
      const h = document.createElement('h1'); h.textContent = proj.name || 'Untitled';
      const p = document.createElement('p'); p.textContent = proj.shortpitch || '';
      const btn = document.createElement('button'); btn.className='create view-btn'; btn.textContent='View details'; btn.dataset.idx = i;
      card.appendChild(h); card.appendChild(p); card.appendChild(btn); section.appendChild(card);
    });
  }

  function openDetail(idx){
    const proj = projects[idx];
    if (!proj) return alert('Project not found');

    let dlg = document.getElementById('mentorProjectDialog');
    if (!dlg){ dlg = document.createElement('dialog'); dlg.id = 'mentorProjectDialog'; document.body.appendChild(dlg); }
    dlg.innerHTML = '';

    const close = document.createElement('button'); close.className='create'; close.textContent='Close'; close.style.float='right';
    const title = document.createElement('h1'); title.textContent = proj.name || 'Untitled';
    dlg.appendChild(close); dlg.appendChild(title);

    function row(label, value){ const r=document.createElement('div'); r.className='form-row'; const lab=document.createElement('label'); lab.textContent=label; const val=document.createElement('p'); val.textContent = value || '-'; r.appendChild(lab); r.appendChild(val); return r; }

    dlg.appendChild(row('Region', proj.region));
    dlg.appendChild(row('Short pitch', proj.shortpitch));
    dlg.appendChild(row('Long pitch', proj.longpitch));
    dlg.appendChild(row('Business model', proj.businessModel || proj['businessModel']));
    dlg.appendChild(row('Traction', proj.traction || proj['traction']));

    // find contact: try project fields then localStorage.user
    const user = (function(){ try{return JSON.parse(localStorage.getItem('user'))||{} }catch(e){return{}} })();
    const contactEmail = proj.contactEmail || proj.email || proj.ownerEmail || user.email || '';
    if (contactEmail){
      const contactRow = document.createElement('div'); contactRow.className='form-row'; const lab=document.createElement('label'); lab.textContent='Founder email'; const a=document.createElement('a'); a.href = `mailto:${contactEmail}?subject=${encodeURIComponent('Interest in your project ' + (proj.name||''))}&body=${encodeURIComponent('Hello, I\'m a mentor on Afrinex and I would like to discuss your project "' + (proj.name||'') + '".\n\nPlease reply to this email to schedule a conversation.')}`; a.textContent = contactEmail; contactRow.appendChild(lab); contactRow.appendChild(a); dlg.appendChild(contactRow);

      const contactBtnRow = document.createElement('div'); contactBtnRow.className='form-row'; const contactBtn = document.createElement('button'); contactBtn.className='create'; contactBtn.textContent='Contact founder'; contactBtn.addEventListener('click', ()=>{
        // open mailto
        window.location.href = a.href;
      }); contactBtnRow.appendChild(contactBtn); dlg.appendChild(contactBtnRow);
    } else {
      dlg.appendChild(row('Founder email', 'Not provided'));
    }

    // video link if present
    if (proj.ytsplink || proj.ytlplink){ const linkRow=document.createElement('div'); linkRow.className='form-row'; const lab=document.createElement('label'); lab.textContent='Pitch video'; const link=document.createElement('a'); link.href = proj.ytsplink || proj.ytlplink; link.target='_blank'; link.rel='noreferrer'; link.textContent='Watch on YouTube'; linkRow.appendChild(lab); linkRow.appendChild(link); dlg.appendChild(linkRow); }

    close.addEventListener('click', ()=>dlg.close());
    dlg.showModal();
  }

  section.addEventListener('click',(e)=>{
    const v = e.target.closest('.view-btn');
    if (v){ const idx = Number(v.dataset.idx); if (!Number.isFinite(idx)) return; openDetail(idx); }
  });

  renderList();
})();
