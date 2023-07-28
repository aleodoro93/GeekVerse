const alertPassword = document.getElementById("Passwordvalidade");
const alertConfPassword = document.getElementById("confirmPassword");
const btnRegister = document.getElementById("btnRegister");
const confPassInpt = document.getElementById("confpassword");
let costummers = [];

const storedCustomers = localStorage.getItem("clientes");
if (storedCustomers) {
  costummers = JSON.parse(storedCustomers);
}

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
    let currentId = localStorage.getItem("lastClientId");
    if (!currentId) {
      currentId = 1;
    } else {
      currentId = parseInt(currentId) + 1;
      /*  */
    }
    localStorage.setItem("lastClientId", currentId);
    return currentId;
  }
}

class ClienteVip extends Cliente {
  constructor(name, email, password, rg, cep, city, estate, street, number, complement) {
    super(name, email, password, rg, cep, city, estate, street, number, complement);
    this.isVip = true;
  }
}

async function fillAddress(cep) {
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

const cepInput = document.getElementById("zipcode");
cepInput.addEventListener("input", (event) => {
  const cep = event.target.value.replace(/\D/g, "");

  if (cep.length === 8) {
    fillAddress(cep);
  }
});

const form = document.getElementById("reg-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

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

  if (
    name === "" || email === "" || rg === "" || cep === "" || street === "" || city === "" || estate === "" || number === "" || complement === "" || password === ""
  ) { alert("Preencha todos os campos!");
    return;}

  if (name.length < 3) {
    alert("Digite um nome válido!");
    return;
  }
 /* o emerson esteve aqui */
  const matchEmail = costummers.find((customer) => customer.email === email);
  if (matchEmail) {
    alert("Email já cadastrado, tente novamente!");
    return;
  }

  const matchRg = costummers.find((customer) => customer.rg === rg);
  if (matchRg) {
    alert("RG já cadastrado, tente novamente!");
    return;
  }

  if (rg.length < 8 || rg.length > 10) {
    alert("Digite um RG válido!");
    return;}

  if (password.length < 8) 
  { alertPassword.innerHTML = "A senha deve conter mais de 8 caracteres";
    alertPassword.style.color = "#FC6969";
    alertPassword.style.textAlign = "center";
    alertPassword.style.fontSize = "10px";
    return; }

  if(confPassInpt.value !== password)
   { alertConfPassword.innerHTML = "As senhas não coincidem, tente novamente!";
    alertConfPassword.style.color = "#FC6969";
    alertConfPassword.style.fontSize = "10px";  return; }
    
    else 
    { alertPassword.innerHTML = "";
    alertConfPassword.innerHTML = ""; }


  let customer;
  if (Math.random() < 0.3) 
  { customer = new ClienteVip(name, email, password, rg, cep, city, estate, street, number, complement);
    alert("Parabéns! Você foi selecionado como cliente VIP e ganhará um brinde no lançamento!")
  } else
   { customer = new Cliente(name, email, password, rg, cep, city, estate, street, number, complement); }
     costummers.push(customer);
     localStorage.setItem("clientes", JSON.stringify(costummers));
  alert(`${name}, seu cadastro  foi realizado com sucesso!`)
  form.submit();
});

