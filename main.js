const compraForm = document.getElementById("compraForm")
const verCarro = document.getElementById("ver-carrito");
const paginaTitulo = document.getElementById("pag-titulo");

/*GET ITEM*/
let carrito = JSON.parse(localStorage.getItem("Ccarrito")) || [];

const getProducts= async ()=> {
    const response = await fetch("data.json");
    const data = await response.json();

    /*DATOS DE COMPRA*/ 
    data.forEach((prod)=>{
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
            console.log(carrito);
            saveLocal();
        }
    });
    });

};

getProducts();




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

        sumar.addEventListener("click", ()=> {
            prod.cantidad++;
            saveLocal();
            pasarCarrito();
        });


      let eliminar = carritoContentido.querySelector(".delete-prod");
      eliminar.addEventListener("click", ()=> {
        Swal.fire({
            title: 'Atencion',
            text: 'Esta seguro que desea eliminar el producto?',
            icon: 'question',
            confirmButtonText: 'Aceptar'
        })
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