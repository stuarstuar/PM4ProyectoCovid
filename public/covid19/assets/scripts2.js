const getToken = async (email, password) => {

    try {
    const response = await fetch( 'http://localhost:3000/api/login' ,
    {
    method: 'POST' ,
    body: JSON .stringify({email:email,password:password})
    })
    const {token} = await response.json()
    localStorage.setItem( 'jwt-token' ,token)
    return token
    } 

    catch (err) {
    console .error( `Error: ${err} ` )
    }
}
const mostrarToken = async() =>{
    let email = prompt("email")
    let pass = prompt("pass")
    const JWT = await getToken(email,pass)
    return JWT
}
const useToken = async (jwt) => {
    try {
    const response = await fetch( 'http://localhost:3000/api/confirmed' ,
        {
    method: 'GET' ,
    headers: {
    Authorization: `Bearer ${jwt} `
    }
 })
    const {data} = await response.json()
    console.log(data)
    return data
    } 
    catch (err) {
        console .error( `Error: ${err} ` )
    }
}
$("#btn_inicio").click(async (e) => { 
    e.preventDefault();
    const token = await mostrarToken();
    console.log(token)
    const info = await useToken(token)
    console.log(info)
});
//esta se tiene que arreglar para obtener el token, guardarlo y así dar vida a la situacion de chile
