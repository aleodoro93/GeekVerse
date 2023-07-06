const senhaInput = document.getElementById("senha");
const alertaSenha = document.getElementById("senhaValor");
const alertaConfSenha = document.getElementById("confirmacaoSenha");
senhaInput.addEventListener("change", function () {

  if (senhaInput.value.length < 8) {
    alertaSenha.innerHTML = `A senha deve conter mais que 8 digitos`
    alertaSenha.style.color = "red"
    alertaSenha.style.border = "solid 1px "
    alertaSenha.style.borderRadius = "10px"
    alertaSenha.style.textAlign = "center"
    alertaSenha.style.padding = "5px"
    alertaSenha.style.opacity = "50%"
  } else {
    alertaSenha.innerHTML = ``
  }
})
const confirmaSenha = document.getElementById("confsenha");
confirmaSenha.addEventListener("change", validacaoSenha);
function validacaoSenha(){

  if (senhaInput.value != confirmaSenha.value){

    alertaConfSenha.innerHTML = "As senhas nao combinam, tente novamente!"
    alertaConfSenha.style.color = "red"
    

  } else {
    alertaConfSenha.innerHTML = ""
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

    document.getElementById("estado").value = data.uf;
    document.getElementById("cidade").value = data.localidade;
    document.getElementById("bairro").value = data.bairro;
    document.getElementById("rua").value = data.logradouro;
    
  } catch (error) {
    alert(error.message);
  }
}
/* EventListnner arrow function para validar e preencher o os dados e endereços referente ao CEP */
const cepInput = document.getElementById("CEP");
cepInput.addEventListener("input", (event) => {
  const cep = event.target.value.replace(/\D/g, "");

  if (cep.length === 8) {
    fillendress(cep);
  }
});

