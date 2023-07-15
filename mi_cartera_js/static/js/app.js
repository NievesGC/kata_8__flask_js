//var pet_todos = new XMLHttpRequest()

function appendCell(row,data){
    let the_cell = document.createElement("td") 
        the_cell.innerHTML = data
        row.appendChild(the_cell) 
}
/* version antigua
function muestraTodos(){
    let pedido = this.responseText //defi el texto
    let data = JSON.parse(pedido) 
    let the_father = document.querySelector("#table_movements") 
    
    for (let i=0; i < data.length; i++){
        let the_row = document.createElement("tr") //crea la fila
        the_father.appendChild(the_row)//aññado la fila
        
        
        appendCell(the_row,data[i].date)
        appendCell(the_row,data[i].abstract)
        appendCell(the_row,data[i].amount)
        appendCell(the_row,data[i].currency)

        /* version antes de simplificar 
        let the_cell = document.createElement("td") //crea la celda
        the_cell.innerHTML = data[i].date // introduce el dato date por posicion 
        the_row.appendChild(the_cell) //añade la el date data a la fila

        the_cell = document.createElement("td")
        the_cell.innerHTML = data[i].abstract
        the_row.appendChild(the_cell)

        the_cell = document.createElement("td")
        the_cell.innerHTML = data[i].amount
        the_row.appendChild(the_cell)

        the_cell = document.createElement("td")
        the_cell.innerHTML = data[i].currency
        the_row.appendChild(the_cell)
        
        
    }
    
    
    }
*/

    function process_insert(data) {
        if (data.is_ok) {
            fetch("/api/v1/all")  
        .then(convert_to_json) 
        .then(all_movements)  
        .catch(process_error)
        }else{
            alert("ERROR EN INSERCIÓN")
        }
    }

    function saveMovement(_date, abstract, amount, currency){
        let data = {
            date: _date,
            abstract: abstract,
            amount: amount,
            currency: currency
        }

        let options = {
            body : JSON.stringify(data),
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            }
        }
        fetch("/api/v1/insert",options)
            .then(convert_to_json)
            .then(process_insert)
            .catch(process_error)
    }

    function validateMovement(event){
        event.preventDefault()

        let _date = document.querySelector("#date").value 
        let today = new Date().toISOString().slice(0,10) //LO PASAMOS A ISO PARA QUE LO PUEDA LEER EL SISTEMA PARA PODER OPERAR CON EL Y VALIDARLO 

        if (_date > today){
            alert("La fecha debe ser hoy o menor")
            return
        }

        let abstract = document.querySelector("#abstract").value
        
        if (abstract.length < 5) {
            alert("El concepto debe tener almenos 5 caracteres")
            return
        }

        let amount = document.querySelector("#amount").value
        if (amount==0){
            alert("La cantidad debe ser positiva (ingreso) o negativa(gasto)")
            return
        }
        let currency = document.querySelector("#currency").value
        
        saveMovement(_date, abstract, amount, currency)
    }


function convert_to_json(response) {
    return response.json()
}

function all_movements(data){
    if (data.is_ok){
        let the_father = document.querySelector("#table_movements") 
        the_father.innerHTML = ""
        
        data = data.data
        for (let i=0; i < data.length; i++){
            let the_row = document.createElement("tr") //crea la fila
            the_father.appendChild(the_row)//aññado la fila
            
            
            appendCell(the_row,data[i].date)
            appendCell(the_row,data[i].abstract)
            appendCell(the_row,data[i].amount)
            appendCell(the_row,data[i].currency)
        }
    } else{
        alert("Se ha producido el error"+ data.data)
    }
}

function process_error(error) {
    alert("se ha producido el siguiente error: "+error)
}

window.onload = function (){
    fetch("/api/v1/all") //cuengo ago esta peticion me devuelve una respuesta de tipo respuesta--crearemos una funcion para cada una de estas 
        .then(convert_to_json) //para convertir a json
        .then(all_movements)  //se añade a los movimientos
        .catch(process_error)  // notificacion de errores

     /*   forma antigua
    pet_todos.open("GET","/api/v1/all") //abre la ruta donde almacenamos todos los movimientos 
    pet_todos.addEventListener("load",muestraTodos) //se le pone un escuchado que mandara a la funcion muestraTodos
    pet_todos.send() //emvio de la peticion
     */

    let btnNew = document.querySelector("#btnNuevo")
    btnNew.addEventListener("click", function(event){
        event.preventDefault()
    //Asociar clic a boton nuevo
        let form = document.querySelector("#form_container")
        form.classList.remove("invisible") //elilmino la clase i nvisble porque es lo unico que aplica stiles el none
    })

    //AAsociar clic a enviar formulario al  servidor(alta de novimiento)
    document.querySelector("#submit").addEventListener("click", validateMovement)
}


