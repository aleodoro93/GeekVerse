/* aqui puxa a api */
async function preencherEndereco(cep) {
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
    document.getElementById("numero").focus();
  } catch (error) {
    alert(error.message);
  }
}
// Event listener para preencher o endereço automaticamente ao digitar o CEP
const cepInput = document.getElementById("CEP");
cepInput.addEventListener("input", (event) => {
  const cep = event.target.value.replace(/\D/g, "");

  if (cep.length === 8) {
    preencherEndereco(cep);
  }
});