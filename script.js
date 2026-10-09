(function(){
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
})();
