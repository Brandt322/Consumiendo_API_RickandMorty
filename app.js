/*
Ejemplo con api pokemon: https://www.youtube.com/watch?v=ydcm7GECaAI
*/

const cards = document.getElementById('card-dinamicas') //donde pintaremos las cards
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment() //para evitar el reflow

document.addEventListener('DOMContentLoaded', () => { //se ejecuta cuando carga el DOM
    fetchData();
});

const fetchData = async () => {
    //console.log("obtiene datos")
    try {
        loadingData(true)

        //Solicitud a la api con dos promesas con await
        const res = await fetch('https://rickandmortyapi.com/api/character');
        const data = await res.json() //transformar a json;
        
        pintarDatos(data) //llama al metodo pintarDatos y le manda la data de la api

    } catch (error) {
        console.log(error)
    } finally {
        loadingData(false) //oculta el loading cuando carga la pagina
    }
};

const pintarDatos = data => {
    console.log(data);
    data.results.forEach(item => { //recorremos el array results 
        //console.log(item); //para mostrar cada item de la data
        
        const clone = templateCard.cloneNode(true) //clonamos el template
        clone.querySelector('h5').textContent = item.name //llenamos el contenido con el name de la api
        clone.querySelector('p').textContent = item.species //llenamos el contenido con el species de la api
        clone.querySelector('img').setAttribute("src", item.image) //agrega el atributo src y le agrega la image de la api
        
        fragment.appendChild(clone) //guardamos todo el contenido del clone en el fragment 
    });

    cards.appendChild(fragment) //pasamos nuestro fragment a los cards
};

const loadingData = estado => {
    const loading = document.getElementById('loading')
    if(estado) {
        loading.classList.remove('d-none')
    } else {
        loading.classList.add('d-none')
    }
}