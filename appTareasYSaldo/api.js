const API = "http://192.168.1.13:3000/tasks";
const APIINGRESOS = "http://192.168.1.13:3000/ingresos";
const APIGASTOS = "http://192.168.1.13:3000/gastos";
const APIUSERS = "http://192.168.1.13:3000/users";


export const getTasks = async (id)=>{
    const res = await fetch(`${API}/user/${id}`)
    return await res.json()
}

export const getTask = async (id)=>{
    const res = await fetch(`${API}/${id}`)
    return await res.json()
}


export const saveTask = async (newTask) => {
    const res = await fetch(API,{
        method: 'POST',
        headers: { Accept: "application/json","Content-Type": 'application/json'},   
        body: JSON.stringify(newTask)     
    });
    console.log(JSON.stringify(newTask))
    return await res.json();
};

export const deleteTask = async (id) =>{
    fetch(`${API}/${id}`,{
        method: 'DELETE',
    })
} 

export const updateTask = async (id,newTask) =>{
    const res = await fetch(`${API}/${id}`,{
        method: 'PUT',
        headers: {Accept: "application/json", "content-Type": "application/json"},
        body: JSON.stringify(newTask),
    })
    return res;
}
export const getUsers = async ()=>{
    const res = await fetch(`${APIUSERS}`)
    return await res.json()
}

export const saveUser = async (newUser) => {
    const res = await fetch(APIUSERS,{
        method: 'POST',
        headers: { Accept: "application/json","Content-Type": 'application/json'},   
        body: JSON.stringify(newUser)     
    });
    console.log(JSON.stringify(newUser))
    return await res.json();
};



//seccion ingresos 
export const getIngresos = async (id)=>{
    const res = await fetch(`${APIINGRESOS}/user/${id}`)
    return await res.json()
}
export const getIngresosCount = async (id)=>{
    const res = await fetch(`${APIINGRESOS}/user/${id}/count`)
    return await res.json()
}

export const getIngreso = async (id)=>{
    const res = await fetch(`${APIINGRESOS}/${id}`)
    return await res.json()
}


export const saveIngreso = async (newIngreso) => {
    const res = await fetch(APIINGRESOS,{
        method: 'POST',
        headers: { Accept: "application/json","Content-Type": 'application/json'},   
        body: JSON.stringify(newIngreso)     
    });
    console.log(JSON.stringify(newIngreso))
    return await res.json();
};

export const deleteIngreso = async (id) =>{
    fetch(`${APIINGRESOS}/${id}`,{
        method: 'DELETE',
    })
} 

export const updateIngreso = async (id,newIngreso) =>{
    const res = await fetch(`${APIINGRESOS}/${id}`,{
        method: 'PUT',
        headers: {Accept: "application/json", "content-Type": "application/json"},
        body: JSON.stringify(newIngreso),
    })
    return res;
}

//seccion gastos
export const getGastos = async (id)=>{
    const res = await fetch(`${APIGASTOS}/user/${id}`)
    
    return await res.json();
}

export const getGastosCount = async (id)=>{
    const res = await fetch(`${APIGASTOS}/user/${id}/count`)
    return await res.json()
}

export const getGasto = async (id)=>{
    const res = await fetch(`${APIGASTOS}/${id}`)
    return await res.json()
}


export const saveGasto = async (newGasto) => {
    const res = await fetch(APIGASTOS,{
        method: 'POST',
        headers: { Accept: "application/json","Content-Type": 'application/json'},   
        body: JSON.stringify(newGasto)     
    });
    console.log(JSON.stringify(newGasto))
    return await res.json();
};

export const deleteGasto = async (id) =>{
    fetch(`${APIGASTOS}/${id}`,{
        method: 'DELETE',
    })
} 

export const updateGasto = async (id,newGasto) =>{
    const res = await fetch(`${APIGASTOS}/${id}`,{
        method: 'PUT',
        headers: {Accept: "application/json", "content-Type": "application/json"},
        body: JSON.stringify(newGasto),
    })
    return res;
}