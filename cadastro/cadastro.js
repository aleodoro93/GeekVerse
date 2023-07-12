
const alertPassword = document.getElementById("Passwordvalidade");
const alertConfPassword = document.getElementById("confirmPassword");
const btnRegister = document.getElementById("btnRegister");
let costummers = [];

const StoredClient = localStorage.getItem("clientes");
if (StoredClient) {
  costummers = JSON.parse(StoredClient);
}




password.addEventListener("change", function () {
  if (password.length < 8) {
    alertPassword.innerHTML = `A senha deve conter mais que 8 digitos`;
    alertPassword.style.color = "red";
    alertPassword.style.textAlign = "center";
    alertPassword.style.padding = "5px"
  } else {
    alertPassword.innerHTML = "";
  }
});
const confirmapassword = document.getElementById("confpassword");
confirmapassword.addEventListener("change", validacaopassword);
function validacaopassword() {
  if (password != confirmapassword.value) {
    alertConfPassword.innerHTML = "As senhas nao combinam, tente novamente!";
    alertConfPassword.style.color = "red";
    alertConfPassword.style.textAlign = "center"
  } else {
    alertConfPassword.innerHTML = "";
  }
}
/* aqui puxa a api */
async function fillendress(cep) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.hasOwnProperty("erro")) {
      throw new Error("CEP não encontrado");
    }
    document.getElementById("estate").value = data.uf;
    document.getElementById("city").value = data.localidade;
    document.getElementById("district").value = data.bairro;
    document.getElementById("street").value = data.logradouro;
  } catch (error) {
    alert(error.message);
  }
}
/* EventListnner arrow function para validar e preencher o os dados e endereços referente ao CEP */
const cepInput = document.getElementById("zipcode");
cepInput.addEventListener("input", (event) => {
  const cep = event.target.value.replace(/\D/g, "");

  if (cep.length === 8) {
    fillendress(cep);
  }
});

/* AQUI COMEÇA A CRIAÇÃO DO CLIENTE */
class Cliente {
  constructor(name, email, password, rg, cep, city, estate, street, number, complement) {
    this.id = Cliente.getNextId();
    this.name = name;
    this.email = email;
    this.password = password;
    this.rg = rg;
    this.cep = cep;
    this.city = city;
    this.estate = estate;
    this.street = street;
    this.number = number;
    this.complement = complement;
  }

  static getNextId() {
    if (!Cliente.currentId) {
      Cliente.currentId = 1;
    } else {
      Cliente.currentId++;
    }
    return Cliente.currentId;
  }
}




btnRegister.addEventListener("click", () => {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const rg = document.getElementById("rg").value;
  const cep = document.getElementById("zipcode").value;
  const street = document.getElementById("street").value;
  const city = document.getElementById("city").value;
  const estate = document.getElementById("estate").value;
  const number = document.getElementById("number").value;
  const complement = document.getElementById("complement").value;
  const password = document.getElementById("password").value;
  

  var costumerscreate = new Cliente(name, email, password, rg, cep, street, city, estate, number, complement);
  costummers.push(costumerscreate);
  localStorage.setItem("clientes", JSON.stringify(costummers));
  window.location.href = "../login/login.html";

});

