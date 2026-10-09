(function(){
  var labels={sensores:'Sensores',nanomedicina:'Nanomedicina y fármacos',procesos:'Procesos y agua',materiales:'Materiales',computacional:'Computacional'};
  var buttons=document.querySelectorAll('.filters button');
  var cards=document.querySelectorAll('#proyectos .card');
  buttons.forEach(function(b){
    b.addEventListener('click',function(){
      var f=b.getAttribute('data-filter');
      buttons.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
      cards.forEach(function(c){
        var cats=(c.getAttribute('data-cat')||'').split(' ');
        c.hidden=!(f==='todos'||cats.indexOf(f)>-1);
      });
    });
  });

  var dlg=document.getElementById('detalle');
  var body=document.getElementById('detalle-cuerpo');
  var last=null;
  function open(card){
    last=card;
    var ico=card.querySelector('.ico'),h=card.querySelector('h3'),w=card.querySelector('.when'),p=card.querySelector('p:not(.when)'),m=card.querySelector('.metric');
    var cats=(card.getAttribute('data-cat')||'').split(' ').filter(Boolean);
    var html=(ico?ico.outerHTML:'')+'<h3 id="detalle-titulo">'+h.innerHTML+'</h3><p class="when">'+w.innerHTML+'</p><p class="full">'+p.innerHTML+'</p>';
    var sk=(card.getAttribute('data-skills')||'').split('|').filter(Boolean);
    if(sk.length) html+='<h4 class="sk-t">Habilidades</h4><div class="chips sk">'+sk.map(function(x){return '<span class="chip">'+x+'</span>'}).join('')+'</div>';
    if(m) html+='<div class="metric">'+m.innerHTML+'</div>';
    html+='<p class="area">Área: '+cats.map(function(c){return labels[c]||c}).join(' · ')+'</p>';
    body.innerHTML=html;
    if(typeof dlg.showModal==='function'){dlg.showModal();}else{dlg.setAttribute('open','')}
  }
  cards.forEach(function(c){
    c.setAttribute('tabindex','0');
    c.setAttribute('role','button');
    c.setAttribute('aria-haspopup','dialog');
    var more=document.createElement('span');more.className='more';more.textContent='Ver detalle →';c.appendChild(more);
    c.addEventListener('click',function(){open(c)});
    c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(c)}});
  });
  dlg.querySelector('.close').addEventListener('click',function(){dlg.close()});
  dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
  dlg.addEventListener('close',function(){if(last)last.focus()});
})();
