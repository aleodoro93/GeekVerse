function getClientesFromLocalStorage() {
  const storedClientes = localStorage.getItem("clientes");
  if (storedClientes) {
    return JSON.parse(storedClientes);
  } else {
    return []; 
  }
}

const costummers = getClientesFromLocalStorage();


document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("formulario");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const senha = document.getElementById("senha").value;
    const email = document.getElementById("email").value;

    if (senha.length < 8) {
      alert("A senha deve ter pelo menos 8 caracteres");
      return false;
    }

    let hasUppercase = false;
    let hasLowercase = false;
    let hasNumber = false;

    for (let i = 0; i < senha.length; i++) {
      let char = senha.charAt(i);

      if (char >= "A" && char <= "Z") {
        hasUppercase = true;
      } else if (char >= "a" && char <= "z") {
        hasLowercase = true;
      } else if (char >= "0" && char <= "9") {
        hasNumber = true;
      }
    }

    

    if (!validarEmail(email)) {
      alert("Por favor, insira um endereço de e-mail válido");
      return false;
    }

    const costummers = getClientesFromLocalStorage();
    const unmatchedCustomer = costummers.find((customer) => customer.email === email && customer.password != senha);
    
    const matchedCustomer = costummers.find((customer) => customer.email === email && customer.password === senha);

    if (matchedCustomer) {
      alert("Login bem-sucedido!");
      window.location.href = "../planos/planos.html"
      form.reset();
    } else if (unmatchedCustomer){
      alert("Email ou senha inválidos. Tente novamente.");
    }else {
      alert("usuario nao encontrado, cadastre-se")
      
    }
    
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
