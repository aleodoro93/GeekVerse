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
  const form = document.getElementById("form-lgn");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const password = document.getElementById("password-lgn").value;
    const email = document.getElementById("email").value;

    const costummers = getClientesFromLocalStorage();
    const unmatchedCustomer = costummers.find((customer) => customer.email === email && customer.password != password);
    const matchedCustomer = costummers.find((customer) => customer.email === email && customer.password === password);

    if (matchedCustomer) {
      const clientName = matchedCustomer.name
      alert(` Bem-vindo, ${clientName}!`);
      window.location.href = "../planos/planos.html"
      form.reset();
    } else if (unmatchedCustomer){
      alert("Email ou senha inválidos. Tente novamente.");
    }else {
      alert("Usuario não encontrado!")
      
    }
    
  });

  
});
