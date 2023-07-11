var el_ultimo //creo una varieble vacia para usar despues

function pulsado(event){
    event.preventDefault()
    let the_father = document.querySelector("#contenido")  //le inicamos la zona del documento de donde vamos a meter el contenido
    let the_paragraph = document.createElement("p")  //crea el parrafo 
    
    let input = document.querySelector("#texto") //metemos en la variable imput el texto que le metemos en la barra para pasarlo abajo 
    
    the_paragraph.innerHTML=input.value // el texto que le va a meter en el parrafo 
    the_father.appendChild(the_paragraph)  ///como añade el texto en el parrafo

    el_ultimo = the_paragraph // añado a la variable vacia creada al principio el ultimo texto metido
}

function borrado(event){
    event.preventDefault()

    let the_father = document.querySelector("#contenido") //le digo en que zona es
    if (el_ultimo){
        the_father.removeChild(el_ultimo)  //le dices que tienes que borrar la ulrima variable y se lo indicas diciendole la variable que es
    }
    
}

window.onload = function(){
    let boton = document.querySelector("#btnSubmit") //crea el boton en el documento 
    boton.addEventListener("click",pulsado)  // cuando le haces clic llama a la fincion pulsado 

    let botonBorrar = document.querySelector("#btnDelete")
    botonBorrar.addEventListener("click",borrado)
}