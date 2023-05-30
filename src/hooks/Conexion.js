const URL = "https://fakerestapi.azurewebsites.net"


export const Libros = async () => {
    const datos = await (await fetch(URL + "/api/v1/Books", {
        method: "GET"
    })).json();
    //console.log(datos);
    return datos;
}

export const GuardarLibro = async (data) => {
    const headers = {
        "Content-Type": "application/json"
    };
    const datos = await (await fetch(URL + "/api/v1/Books", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    console.log("DATOS GUARDADOS");
    console.log(datos);
    return datos;
}

export const ActualizarLibro = async (id, nuevoDato) => {
    const headers = {
        "Content-Type": "application/json"
    };
    const datos = await (await fetch(`${URL}/api/v1/Books/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(nuevoDato)
    })).json();
    console.log("DATOS ACTUALIZADOS");
    console.log(datos);
    return datos;
};
  
export const ObtenerLibro = async(id)=>{
    const datos = await (await fetch(`${URL}/api/v1/Books/${id}`, {
        method: "GET",
    })).json();
    return datos;
}

  







