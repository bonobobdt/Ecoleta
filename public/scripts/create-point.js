



function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {

        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    
    }) 
}

function getCities(){
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");
    const ufValue = event.target.value;
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    const indexofSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexofSelectedState].text

    citySelect.innerHTML = "";
    citySelect.disabled = true;

    fetch(url)
    .then(res => res.json())
    .then(cities => {

        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
    
        citySelect.disabled = false
    
    }) 
}

populateUFs();

document
     .querySelector("select[name=uf]")
     .addEventListener("change", getCities)



// Items de Coleta

const itemsToCollect = document.querySelectorAll(".items-grid li");
let selectedItems= [];


for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")


function handleSelectedItem (event){

    const itemLi = event.target;
    
    //adicionar ou remover classe com javescript
    itemLi.classList.toggle("selected")


    const itemId= itemLi.dataset.id;

    //verificar se exitem items selecionados e inserir no input
    //se nao tiver selecionado adicionar a seleçao
    //atualizar o input escondido com os dados

    const alreadySelected =selectedItems.findIndex( item => {
        const itemFound = item == itemId;
        return itemFound;
    })

    //se ja estiver selecionado tirar da seleçao

    if (alreadySelected >= 0){
        //tirar da seleçao
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        //se nao tiver selecionado adicionar a seleçao
        selectedItems.push(itemId);
    }

    //atualizar o input escondido com os dados
    collectedItems.value = selectedItems;
}

