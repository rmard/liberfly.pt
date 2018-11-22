const PT = 'PT';
const EN = 'EN';
var lang = PT;

$("#nome").focus();
$.get("https://api.ipgeolocation.io/ipgeo?apiKey=9bc9dd5f020042168b9e7f21c7b645ce", function(r){
  $("#celular").val(r.calling_code);
  $("label[for=celular]").addClass("active");
});
$("#form-contato").on('submit', function(e){
  e.preventDefault();
  $("#btn-enviar").addClass("disabled");
  $("#btn-enviar").html("Enviando...");
  $.ajax({
    url: '/processa.php',
    type: 'POST',
    data: {nome: $("#nome").val(), email: $("#email").val(), celular: $("#celular").val()},
  })
  .done(function() {
    $("#form-contato").addClass('hide');
    $("#sucesso-form-submit").removeClass('hide');
  })
  .fail(function() {
    alert("Não foi possível enviar teus dados. Por favor, tente novamente.")
  })
  .always(function() {
    $("#btn-enviar").removeClass("disabled");
    $("#btn-enviar").html("Tentar novamente");
  });
  
  
});

window.fbAsyncInit = function() {
FB.init({
  appId      : '262052264452670',
  cookie     : true,
  xfbml      : true,
  version    : 'v3.2'
});
  
FB.AppEvents.logPageView();   

FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
    console.log(response);
});
  
};

(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "https://connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response)
{
  console.log("statusChangeCallback", response);
  if(response.status==='connected')
  {     
    $.ajax({
      url: 'https://graph.facebook.com/'+response.authResponse.userID+'?fields=link,name,email&access_token='+response.authResponse.accessToken,
    })
    .done(function(r) {
      $("#nome").val(r.name);
      $("#celular").focus();
      $("#email").val(r.email);
      $("label").addClass("active");
      $(".fb_iframe_widget").hide();
    })
    .fail(function() {
      //console.log("error");
    })
    .always(function() {
      //console.log("complete");
    });
    
  }
}
$(document).ready(function(){
  $('select').formSelect();
});

const toggleLang = (forceLang) => {
  if(forceLang!==undefined)
    lang = forceLang;
  else
    lang = ((lang===PT)?EN:PT);

  i18n.strings.map((str)=>{
    document.getElementById(str.id).innerHTML = str[lang];
  });
}
      
$(".flag-wrapper").click(()=>toggleLang());