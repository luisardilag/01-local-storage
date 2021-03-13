
// VARIABLES
let formulario = document.querySelector('#formulario');
let listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


// EVENTLISTENERS
eventListeners();

function eventListeners() {

    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') || []);

        crearHTML();
    });

}



// FUNCIONES
function agregarTweet(e) {
    e.preventDefault();

    // Textarea donde el ususario escribe
    const tweet = document.querySelector('#tweet').value;

    // Mostrar mensaje de error al estar en blanco el textarea
    if( tweet === '' ) {
        mostrarMensajeError('Un tweet no puede ir vacio');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    // Una vez agregado, se crea el HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();

}


function mostrarMensajeError( error ) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild( mensajeError );

    // Elimina la alerta después de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}


function crearHTML() {

    limpiarHTML();

    if( tweets.length > 0 ) {
        tweets.forEach( tweet => {

            //Agrega el boton eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet( tweet.id );
            }

            // Crea el html
            const li = document.createElement('li');

            // Añadir el texto
            li.innerText = tweet.tweet;

            // Asignar el botón
            li.appendChild( btnEliminar );

            // Insertarlo en el html
            listaTweets.appendChild( li );
        });
    }

    sicronizarStorage();
}


function sicronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify( tweets ));
}


function limpiarHTML() {
    while ( listaTweets.firstChild ) {
        listaTweets.removeChild( listaTweets.firstChild );
    }
}


function borrarTweet( id ) {
    tweets = tweets.filter( tweet => tweet.id !== id );

    crearHTML();
}