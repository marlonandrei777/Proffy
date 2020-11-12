// Procurar o botão
document.querySelector("#add-time")
// Quando clicar no botão
.addEventListener('click', cloneField)

// Executar uma ação
function cloneField() {
    // Duplicar os campos. Que campos?
   const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true) //peguei o campo q eu quero duplicarm e usei a função .cloneNode pra duplicar / boolean: true ou false
    
    // pegar os campos, Que campos?
    const fields = newFieldContainer.querySelectorAll('input')

    //Para cada campo, limpar
    fields.forEach(function(field) { // ForEache = para cada. Sendo assim, "para cada fields"
        // pega o field do momento e limpa ele
        field.value = ""
    }) 



    // Colocar na página: onde?
    document.querySelector('#schedule-itens').appendChild(newFieldContainer)
}
