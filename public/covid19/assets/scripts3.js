// aqui se debe mostrar el grafico de chile 
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
const useToken = async (jwt,url) => {
    try {
    const response = await fetch( url ,
        {
    method: 'GET' ,
    headers: {
    Authorization: `Bearer ${jwt} `
    }
 })
    const {data} = await response.json()
    return data
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

window.onload = async () => {

    const token = await mostrarToken();
    console.log(token);
    const confirmados = await useToken(token, 'http://localhost:3000/api/confirmed');
    const muertos = await useToken(token, ' http://localhost:3000/api/deaths');
    const recuperados = await useToken(token, 'http://localhost:3000/api/recovered');
    let dataPointCon = [];
    let dataPointDea =[];
    let dataPointRec = [];

    const addDataCon = () =>{
        confirmados.forEach(element =>{
            dataPointCon.push({ x: new Date(element.date) , y: element.total})
        })
    }   
    const addDataDea = () =>{
        muertos.forEach(element =>{
            dataPointDea.push({ x: new Date(element.date) , y: element.total})
        })
    }  
    const addDataRec = () =>{
        recuperados.forEach(element =>{
            dataPointRec.push({ x: new Date(element.date) , y: element.total})
        })
    }  
    addDataCon();
    addDataDea();
    addDataRec();

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "Situación en Chile"
        },
        axisX: {
            valueFormatString: "DD MMM,YY"
        },
        axisY: {
            title: "Casos",
        },
        legend:{
            cursor: "pointer",
            fontSize: 16,
            itemclick: toggleDataSeries
        },
        toolTip:{
            shared: true
        },
        data: [{
            name: "Confirmados",
            type: "spline",
            showInLegend: true,
            dataPoints: dataPointCon
        },
        {
            name: "Muertos",
            type: "spline",
            showInLegend: true,
            dataPoints: dataPointDea
        },
        {
            name: "Recuperados",
            type: "spline",
            showInLegend: true,
            dataPoints: dataPointRec
        }]
    });
    chart.render();
    
    function toggleDataSeries(e){
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else{
            e.dataSeries.visible = true;
        }
        chart.render();
    }
    
    }



    
//falta el modal en situacion mundial
//falta iniciar sesión en el index 3 y q ahí se genere el situación en chile
//falta cerrar sesión 