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

    
    for(let nombreO = "oficina"; nombreO === nombreN; nombreO++){
        console.log("Oficina entro a la app como: " + nombreO );
    }
}
mostrarPasos();

