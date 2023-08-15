alert("Bienvenido a Frigorifico el Sol");

const compraForm = document.getElementById("compraForm")

/*PRODUCTOS*/
const productos = [
    {
        id: 1,
        nombre: "Roast Beef", 
        precio: 1250,
        img:"assets/imagenes/roastb.png",
        cantidad: 1
    },
    {
        id: 2,
        nombre: "Asado", 
        precio: 950,
        img:"assets/imagenes/asado.png",
        cantidad: 1
    },
    {
        id: 3,
        nombre: "Recorte", 
        precio: 650,
        img:"assets/imagenes/recorte.png",
        cantidad: 1
    },
    {
        id: 4,
        nombre: "Nalga c/t", 
        precio: 1550,
        img: "assets/imagenes/nalga-con-tapa.jpg",
        cantidad: 1
    },
    {
        id: 5,
        nombre: "Nalga s/t", 
        precio: 1650,
        img: "assets/imagenes/n-s-t.png",
        cantidad: 1
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

/*INICIO CON NOMBRES*/
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

const verCarro = document.getElementById("ver-carrito");
const paginaTitulo = document.getElementById("pag-titulo");
                        /*GET ITEM*/
let carrito = JSON.parse(localStorage.getItem("Ccarrito")) || [];

/*DATOS DE COMPRA*/ 
productos.forEach((prod)=>{
    let content= document.createElement("div");
    content.className = "card";
    content.innerHTML= `
    <img src="${prod.img}">
    <h3>${prod.nombre}</h3>
    <p class="price">${prod.precio} $</p>
    <p>Cantidad: ${prod.cantidad}</p>
    `;

    compraForm.append(content);

    let comprar = document.createElement("button")
    comprar.innerText= "Comprar";
    comprar.className= "Comprar";


    content.append(comprar);

    comprar.addEventListener("click", () =>{

        const repeat= carrito.some((repeatP)=> repeatP.id === prod.id);

        if(repeat){
            carrito.map((product)=> {
                if(product.id===prod.id){
                    product.cantidad++;
                }
            });
        }else {
            carrito.push({
                id: prod.id,
                img: prod.img,
                nombre: prod.nombre,
                precio: prod.precio,
                cantidad: prod.cantidad,
            });
        }
        console.log(carrito);
        saveLocal();
    });
});

/*SET ITEM*/
const saveLocal = ()=> {
    localStorage.setItem("Ccarrito", JSON.stringify(carrito));
}




/*CARRITO Y FUNCIONES*/
const pasarCarrito = () => {  
  paginaTitulo.innerHTML= "";
  paginaTitulo.style.display= "flex";
  const pagTitulo = document.createElement("div");
  pagTitulo.className = "pag-titulo"
  pagTitulo.innerHTML = `
      <h1 class="pag-titulo-title">Listado de compra</h1>
    `;
  paginaTitulo.append(pagTitulo);

  const pagButton = document.createElement("h2");
  pagButton.innerText = "x";
  pagButton.className= "boton-cerrar";

  pagButton.addEventListener("click", ()=> {
      paginaTitulo.style.display= "none";
    });

  paginaTitulo.append(pagButton);


    carrito.forEach((prod) => {
      let carritoContentido= document.createElement("div")
      carritoContentido.className= "contenido-compra"
      carritoContentido.innerHTML= `
      <img src="${prod.img}" class="img-2">
      <h2>${prod.nombre}</h2>
      <p>Precio: ${prod.precio} $</p>
      <span class="restar"> - </span>
      <p>Cantidad: ${prod.cantidad}</p>
      <span class="sumar"> + </span>
      <p>Total: ${prod.cantidad * prod.precio}</p>
      <span class="delete-prod"> X </span>
      `;
      paginaTitulo.append(carritoContentido);

        let restar = carritoContentido.querySelector(".restar");
        restar.addEventListener("click", ()=> {
            if(prod.cantidad !== 1){
                prod.cantidad--;
            }
            saveLocal();
            pasarCarrito();
        });


        let sumar = carritoContentido.querySelector(".sumar");
        restar.addEventListener("click", ()=> {
            prod.cantidad++;
            saveLocal();
            pasarCarrito();
        });


      let eliminar = carritoContentido.querySelector(".delete-prod");
      eliminar.addEventListener("click", ()=> {
        eliminarProducto(prod.id);
      });

      eliminar.addEventListener("click", eliminarProducto);
    });


  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  const totalFinal = document.createElement("div")
  totalFinal.className = "total-final";
  totalFinal.innerHTML = `
  Total: ${total} $`;
  paginaTitulo.append(totalFinal);
}

/*VC*/
verCarro.addEventListener("click", pasarCarrito)

/*ELIMINAR ARTICULOS*/
const eliminarProducto = (id)=> {
    const foundId= carrito.find((element)=> element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    pasarCarrito();
    saveLocal();
}