const fetchJokeButton = document.getElementById('fetchJoke')
const jokeList = document.getElementById('jokeList');

//! cargar chistes del local storage
let jokes = JSON.parse(localStorage.getItem('jokes')) || [];

// eventbtn obtener chistes 
fetchJokeButton.addEventListener('click', () => {
    fetch('https://api.chucknorris.io/jokes/random')
    .then((res) => res.json())
    .then((data) => {
        let joke = data.value; 
        jokes.push(joke) 
        localStorage.setItem('jokes', JSON.stringify(jokes)) 
        renderJokes(jokes) 
    })
})

//! función para añadir chistes en el DOM

function renderJokes(jokesArray) {
    jokeList.innerHTML = '';

   
    for (let i = 0; i < jokesArray.length; i++) {
        let li = document.createElement('li')
        li.textContent = jokesArray[i];
        let deleteButton = document.createElement('button')
        deleteButton.textContent = 'Eliminar'
        deleteButton.addEventListener('click', () => {
            let jokesFilter = jokesArray.filter((j) => {
                return j !== jokesArray[i];
            })
            jokeList.removeChild(li)
            localStorage.setItem('jokes', JSON.stringify(jokesFilter));
        })

        li.appendChild(deleteButton)
        jokeList.appendChild(li)
    }
};