alert("Bienvenido a Frigorifico el Sol");

const compraForm = document.getElementById("compraForm")

const productos = [
    {
        id: 1,
        nombre: "Roast Beef", 
        precio: 1250,
        img:"assets/imagenes/roastb.png"
    },
    {
        id: 2,
        nombre: "Asado", 
        precio: 950,
        img:"assets/imagenes/asado.png"
    },
    {
        id: 3,
        nombre: "Recorte", 
        precio: 650,
        img:"assets/imagenes/recorte.png"
    },
    {
        id: 4,
        nombre: "Nalga c/t", 
        precio: 1550,
        img: "assets/imagenes/nalga-con-tapa.jpg"
    },
    {
        id: 5,
        nombre: "Nalga s/t", 
        precio: 1650,
        img: "assets/imagenes/n-s-t.png"
    }
];


/*let seUsuario = prompt("Usted es Fernando o Cliente? Escriba la respuesta en el siguiente campo").toLowerCase()
while (seUsuario) {
    if (seUsuario == "cliente"){
        alert("¿Dese hacer una compra?")
        console.log("Ingreso un cliente.")
    
    }else if(seUsuario == "fernando") {
        alert("Bienvenido Fernando/Lucas u Oficina, a continuacion vamos a verificar su identidad con su nombre de usuario y contraseña, recuerdes que tiene solo 3 intentos")
        // Creando funcion para ingreso de usuario con limite de intentos.
        function ingresoFer() {
            // Usuario y contraseña 
            const usuarioFer = "Frigosol"
            const contraFer = "frigo1290"
             
            let intentos = 3
          
            while (intentos > 0) {
              const usuario = prompt("Ingrese el usuario")
              const contrasenia = prompt("Ingrese la contraseña")
          
              if (usuario === usuarioFer && contrasenia === contraFer) {
                     alert("Bienvenido, tiene el control.")
                }
            }
        }

    }
}*/
function mostrarPasos(){

    const nombreU1 = "fernando"; //Este seria mi primer usuario (el jefe)
    const nombreU2 = "lucas";    //Este segundo usuario corresponderia (al encargado)

    let nombreN = prompt("Ingrese su nombre") //En este prompt quiero que cuando ingresan tengan que poner la informacion de su nombre.

    if (nombreN == nombreU1){
        console.log("No hay control");
        alert("Hola Fernandito");
    } else if(nombreN == nombreU2){
        console.log("No hiciste ningun control aun");
        alert("Hola Lucas");
    } else {
        alert("Hola " + nombreN +", que buscas?");
        console.log("Cliente nuevo: " + nombreN );
    }

}
mostrarPasos();

let carrito = [];

productos.forEach((prod)=>{
    let content= document.createElement("div");
    content.className = "card";
    content.innerHTML= `
    <img src="${prod.img}">
    <h3>${prod.nombre}</h3>
    <p class="price">${prod.precio} $</p>
    `;

    compraForm.append(content);

    let comprar = document.createElement("button")
    comprar.innerText= "Comprar";
    comprar.className= "Comprar";


    content.append(comprar);

    comprar.addEventListener("click", () =>{
        carrito.push({
            id: prod.id,
            img: prod.img,
            nombre: prod.nombre,
            precio: prod.precio,
        });
        console.log(carrito);
    });
});