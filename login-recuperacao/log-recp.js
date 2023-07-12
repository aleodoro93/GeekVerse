document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("formulario");

    form.addEventListener("submit", function(event) {
      event.preventDefault();
    
      let email = document.getElementById("email").value;

      if (!validarEmail(email)) {
        alert("Por favor, insira um endereço de e-mail válido");
        return false;
      }

      // Se chegou até aqui, os campos de senha e e-mail são válidos
      alert("Formulário enviado com sucesso!");
      form.reset();
    });

    function validarEmail(email) {
      let atIndex = email.indexOf("@");
      let dotIndex = email.lastIndexOf(".");

      if (atIndex <= 0 || dotIndex <= atIndex || dotIndex === email.length - 1) {
        return false;
      }

      return true;
    }
  });