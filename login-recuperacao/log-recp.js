document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form-rcp");

    form.addEventListener("submit", function(event) {
      event.preventDefault();
    
      let email = document.getElementById("email").value;


      alert("Se o email estiver cadastrado voce receberá um link para redefinição de senha!");
      form.reset();
    });
  });



 
