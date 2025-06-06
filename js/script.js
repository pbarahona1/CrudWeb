//Endpoint de Integrantes - API
const API_URL = "https://retoolapi.dev/3u9Ytp/integrantes";

//Funcion que manda a traer el JSON con GET
async function ObtenerIntegrantes() {
    //Solicitar la respuesta de el servidor
    const respuesta = await fetch(API_URL);

    //Pasamos a JSON la respuesta de el servidor
    const data = await respuesta.json(); //Esto es un JSON

    //Enviamos el JSON  a la funcion
    MostrarDatos(data);
}

//Función para crear las filas de la tabla en base de JSON
//"datos" representara al JSON de donde viene la informacion
function MostrarDatos(datos){

    //Se llama a la tabla con el elemento "id" y luego por el tbody
    const tabla = document.querySelector("#tabla tbody");

    //Para injectar codigo HTML usamos "innerHTML"
    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla
    
    datos.forEach(integrante => {
        tabla.innerHTML += `
            <tr>
                <td>${integrante.id}</td>
                <td>${integrante.nombre}</td>
                <td>${integrante.apellido}</td>
                <td>${integrante.correo}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `;
    });
}

ObtenerIntegrantes();




//Procesos para agregar un nuevo integrante
const modal = document.getElementById("mdAgregar");//Cuadro de dialogo
const btnAgregar = document.getElementById("btnAgregar");//Boton para agregar
const btnCerrar = document.getElementById("btnCerrar");//Boton para cerrar el popup

btnAgregar.addEventListener("click", ()=>{
    modal.showModal(); //Abrir el modal al hacer clic en el botón
});

btnCerrar.addEventListener("click", ()=>{
    modal.close();
});

//Agregar nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e=> {
    e.preventDefault(); //"e" representa a "submit. Evita que el formulario se envie de un solo"

    //Capturar los valores del formulario
    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtEmail").value.trim();

    //Validacion basica
    if(!nombre || !apellido || !correo){
        alert("Ingrese los valores correctamente");
        return; //Para evitar que el codigo se siga ejecutando
    }

    //Llamar a la API para enviar el registro
    const respuesta = await fetch(API_URL, {
        method: "POST",//Tipo de solicitud
        headers: {'Content-Type':'application/json'},//Tipo de dato enviado
        body: JSON.stringify({nombre, apellido, correo})//Datos enviados
    });
    //Verificar si la API responde que los datos fueron enviado correctamente
    if(respuesta.ok){
        alert("El registro fue enviado correctamente")

        //Limpiar el formulario 
        document.getElementById("frmAgregar").reset();

        //Cerrar el formulario
        modal.close();

        //Recargamos la tabla
        ObtenerIntegrantes();
    }
    else{
        alert("EL registro no pudo ser eniado");
    }
})