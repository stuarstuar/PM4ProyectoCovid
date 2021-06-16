const url = "http://localhost:3000/api/total"

//falta solo el modal 
$("#btn_detail").click( (e) =>{ 
    e.preventDefault();
    alert("wenawena")
});

//funcion que obtiene el total
const gettingTotal = async() => {
    const res = await fetch(url);
    const data = await res.json();
    const datos = await data.data;
    return datos
}
//funcion que obtiene el detalle si se ingresa el país
const gettingDetail = async(country) => {

    const res = await fetch(`http://localhost:3000/api/countries/${country}`);
    const data = await res.json();
    const datos = await data.data
    console.log(`${datos.location} // ${datos.active} //${datos.deaths}//${datos.recovered} `)
    return datos
}
gettingDetail("Chile");
//agrega datos genericos
const fillTable = (data,table) => {
    let rows = "" ;
    $.each(data, (i, row) => {
    rows += `<tr>
    <td> <button id ="btn_detail"> Ver Detalle </button> </td>
    <td> ${row.location} </td>
    <td> ${row.active} </td>
    <td> ${row.recovered} </td>
    <td> ${row.confirmed} </td>
    <td> ${row.deaths} </td>
    </tr>`
    })
    $(`#${table} tbody` ).append(rows);
}
//agrega datos de api 
const rellenoTabla = async() =>{
    let datos = await gettingTotal()
    fillTable(datos, 'tablaResultado' )
}
rellenoTabla();

//grafico
window.onload = async() => {

    let datos = await gettingTotal(); //obtiene datos totales 
    let diezMil = [];       //arreglo con los q tienen más de 10000 activos 
    let dataPointCon =[];  //arreglo don datapoints 
    let dataPointAct =[]; 
    let dataPointDea =[]; 
    let dataPointRec =[]; 
    
    datos.forEach(element => {               //saca los de mas de 10000, podia usar filter
        if(element.active > 200000){
              diezMil.push(element)
            }
    });
    const addDataCon = () =>{
        diezMil.forEach(element =>{
            dataPointCon.push({ label: `${element.location}` , y: element.confirmed })
        })
    }
    const addDataAct = () =>{
        diezMil.forEach(element =>{
            dataPointAct.push({ label: `${element.location}` , y: element.active })
        })
    }
    const addDataDea = () =>{
        diezMil.forEach(element =>{
            dataPointDea.push({ label: `${element.location}` , y: element.deaths })
        })
    }
    const addDataRec = () =>{
        diezMil.forEach(element =>{
            dataPointRec.push({ label: `${element.location}` , y: element.recovered })
        })
    }
    addDataCon();
    addDataAct();
    addDataDea();
    addDataRec();

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "Situación Mundial"
        },	
        axisY: {
            title: "Casos",
            titleFontColor: "#000000 ",
            lineColor: "#000000 ",
            labelFontColor: "#000000 ",
            tickColor: "#000000 "
        },

        toolTip: {
            shared: true
        },
        legend: {
            cursor:"pointer",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "column",
            name: "Casos Confirmados",
            legendText: "Casos Confirmados",
            showInLegend: true, 
            dataPoints: dataPointCon
        },
        {
            type: "column",	
            name: "Casos Activos",
            legendText: "Casos Activos",
            showInLegend: true,
            dataPoints:dataPointAct
        },
        {
            type: "column",
            name: "Casos muertos",
            legendText: "Casos muertos",
            showInLegend: true, 
            dataPoints: dataPointDea
        },
        {
            type: "column",
            name: "Casos recuperados",
            legendText: "Casos recuperados",
            showInLegend: true, 
            dataPoints: dataPointRec
        }
    ]
    });
    chart.render();

    function toggleDataSeries(e) {
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }
    
}



