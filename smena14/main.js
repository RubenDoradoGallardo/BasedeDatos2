const firebaseConfig = {
    apiKey: "AIzaSyBhEap99ni485pdG96WGZfuwDgDWJGi7_g",
    authDomain: "registroweb-e56e9.firebaseapp.com",
    projectId: "registroweb-e56e9",
    storageBucket: "registroweb-e56e9.appspot.com",
    messagingSenderId: "546010849118",
    appId: "1:546010849118:web:8d4d7c3406a6a04d43b9cf"
};

// Initialize Firebase//
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();



//llamamos al dom o al html//
const btnRegistrar = document.getElementById('btnRegistrar');
const btnIniciarSesion = document.getElementById('btnIniciarSesion');
const Formulario = document.getElementById('Formulario');
const contenidoDeLaWeb = document.getElementById('contenidoDeLaWeb');
const btnCS = document.getElementById('btnCS')
const btnGoogle = document.getElementById('btnGoogle')
const btnFacebook = document.getElementById('btnFacebook')
const btnPublicar = document.getElementById('btnPublicar');

//a los botones se les pone const no cambia de valor//
//funcion registrar//
btnRegistrar.addEventListener('click', () => {   //le damos funciones y remplamos con =>//
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    console.log("Hola");
    console.log(email);
    console.log(password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {//iniciamos el sesion//

            var user = userCredential.user;
            console.log("Inicio de sesion correcto");
            cargarJSON();
            Formulario.classList.replace('mostrar', 'ocultar');//se va ocultar//
            contenidoDeLaWeb.classList.replace('ocultar', 'mostrar');//se va mostrar//
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            console.log(errorMessage);

        });
})

//funcion de iniciar sesion//
btnIniciarSesion.addEventListener('click', () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log("Inicio de Sesion")
            cargarJSON();
            Formulario.classList.replace('mostrar', 'ocultar');
            contenidoDeLaWeb.classList.replace('ocultar', 'mostrar');

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error al inicio secion");
            alter(errorMessage);
        });
})

//Cerrar sesion//
btnCS.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        console.log("se cerro");
    }).catch((error) => {
        console.log("error");
    });
})

//funcion estado activo o inactivo//
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
        cargarJSON();
        Formulario.classList.replace('ocultar', 'mostrar');
        contenidoDeLaWeb.classList.replace('mostrar', 'ocultar');
    } else {
        Formulario.classList.replace('ocultar', 'mostrar');
        contenidoDeLaWeb.classList.replace('mostrar', 'ocultar');
    }

});
btnGoogle.addEventListener('click', () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;

        });
})
btnFacebook.addEventListener('click', () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
            var user = result.user;
            var accessToken = credential.accessToken;
        })
        .catch((error) => {

            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
     }) 
    
            //funcion cargar datos de Json
            function cargarJSON () {
                fetch("tienda.json")
                .then(function(res){
                  return res.json();
                })
                .then((data) => {
                  console.log(data);
                  let html = '';
                  data.forEach((productos) =>{
                    html += `
                      <div class="producto">
                        <p>  ${productos.marca} </p>
                        <img src="${productos.img}" width="50px" class="imgProducto">
                        <strong> ${productos.precio} </strong>
                      </div>
                    `;
                  })
                  document.getElementById('resultado').innerHTML= html; 
                })
    
    //Funcion llamar comentarios
btnPublicar.addEventListener('click', () => {
    db.collection("comentarios").add({
      titulo: txtTitulo=document.getElementById('txtTitulo').value,
      descripcion:txtDescripcion=document.getElementById('txtDescripcion').value,
      
  })
  .then((docRef) => {
      console.log("Se guardo tu comentario correctamente", docRef.id);
      verDatosEnPantallaTexto();
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });



})  

//funcion leer datos
function verDatosEnPantallaTexto() {
    db.collection("comentarios").get().then((querySnapshot) => {
      let html = '';
      querySnapshot.forEach((doc) => {
        console.log(`${doc.data().titulo}`);
        console.log(`${doc.data().descripcion}`);
        var listarDatos = ` 
          <li class="listarDatos">
            <h5 class="listarDatosH5">${doc.data().titulo}</h5>
            <p> ${doc.data().descripcion} </p>
          </li> 
          `;
        html += listarDatos;
      }); document.getElementById('verDatosEnPantallaTexto').innerHTML = html;
    });
  }

}