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