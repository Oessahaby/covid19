
$(document).ready(function(){
  //******************************************* SWEEET ALERT****************** */
  Swal.fire({
    title: 'General',
    html: 'There is currently no vaccine to prevent <b style="color:red">COVID-19.</b><br>'+
    'The virus is thought to be spread mainly through person-to-person contact through respiratory droplets produced when an infected person coughs or sneezes.',
    imageUrl: './img/image1.jpg',
    imageWidth: 800,
    imageHeight: 200,
    customClass: 'swal-wide',
  }).then((result) => {
    if (result.value) {
      Swal.fire({
        title: 'Washing your hands',
        html: 'Wash hands frequently with soap and water for at least 20 seconds. Always wear a hand sanitizer that contains at least 60% alcohol. Avoid touching your eyes, nose and mouth with unwashed hands.',
        imageUrl: './img/image2.jpg',
        imageWidth: 800,
        imageHeight: 200,
        customClass: 'swal-wide',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Protect others from getting sick',
          html: 'Avoid close contact with sick people. Distance yourself from others if COVID-19/Coronavirus spreads in your community.',
          imageUrl: './img/image3.jpg',
          imageWidth: 800,
          imageHeight: 200,
          customClass: 'swal-wide',
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            title: 'Protect others from getting sick',
            html: 'Cover your mouth and nose with a tissue when you cough or sneeze or use the inside of your elbow. Wash your hands immediately with soap and water for at least 20 seconds or clean your hands with a hand sanitizer that contains at least 60% alcohol.',
            imageUrl: './img/image4.jpg',
            imageWidth: 800,
            imageHeight: 200,
            customClass: 'swal-wide',
        })
      }
      })
    }
    })
  }
  })
  var data_affected = Array();
  const url = 'https://pomber.github.io/covid19/timeseries.json';
  $.getJSON(url, function (data) {
  //********************** Definir les nombres de jours passant  *****************/
  var today = new Date();
  var a = data["Italy"][0]["date"].split("-");
  var date1 = new Date(a);
  
  const diffDays = Math.abs(today.getDate() - date1.getDate())+Math.abs(30*(today.getMonth()-date1.getMonth()))+ Math.abs(365*(today.getFullYear() - date1.getFullYear()));
  document.getElementById("days").innerHTML = diffDays+'  days';
  startTime();// C'est une fonction donnant le temps exacte 


  document.getElementById("lastupdate").innerHTML = 'Last Update '+data["US"][data["US"].length-1]["date"];// le dernier date de modification

/**********************Definir la map********* */
    am4core.ready(function() {
    
      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end
      
      // Create map instance
      var chart = am4core.create("chartdiv", am4maps.MapChart);
      
      // Set map definition
      chart.geodata = am4geodata_worldLow;
      
      // Set projection
      chart.projection = new am4maps.projections.Miller();
      
      // Create map polygon series
      var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
 
      polygonSeries.exclude = ["AQ"];

      // This array will be populated with country IDs to exclude from the world series
      var excludedCountries = ["AQ"];  
      // Make map load polygon (like country names) data from GeoJSON
      polygonSeries.useGeodata = true;
      
      // Configure series
      var array_confirmed_ev = Array();
      var array_deaths_ev = Array();
      var array_recovered_ev = Array();
      var array_date_ev = Array();
      var polygonTemplate = polygonSeries.mapPolygons.template;
      
      //*****************Fonction afficher la graphe line lorsque on click sur un pays dans la map */
      polygonTemplate.events.on("hit", function(ev) {
        try{
          $('html,body').animate({
            scrollTop: $("#chart").offset().top},
            'slow');
        if(ev.target.dataItem.dataContext.name == "United States"){
          ev.target.dataItem.dataContext.name = "US";
        }
        
        array_confirmed_ev = [];
        array_deaths_ev =[];
        array_recovered_ev =[];
        array_date_ev =[];
          /**************L'ajout des donnees (deaths confirmed ..) pour chaque date*********** */
          for (var i=0;i< data[ev.target.dataItem.dataContext.name].length;i++){
            array_confirmed_ev.push(data[ev.target.dataItem.dataContext.name][i]["confirmed"]);
            array_deaths_ev.push(data[ev.target.dataItem.dataContext.name][i]["deaths"]);
            array_recovered_ev.push(data[ev.target.dataItem.dataContext.name][i]["recovered"]);
            array_date_ev.push(data[ev.target.dataItem.dataContext.name][i]["date"]);

  
        }
/*****************Tracer le graphe ************ */
        new Chart(document.getElementById("chart"), {
          type: 'line',
          data: {
            labels: array_date_ev,
            datasets: [{ 
                data: array_confirmed_ev,
                label: "confirmed",
                borderColor: "#3e95cd",
                fill: false
              }, { 
                data: array_recovered_ev,
                label: "recovered",
                borderColor: "green",
                fill: false
              }, { 
                data: array_deaths_ev,
                label: "deaths",
                borderColor: "red",
                fill: false
              }
            ]
          },
          options: {
            legend:{
              display: true,
          },
            title: {
              display: true,
              text: 'Covid statistics for '+ev.target.dataItem.dataContext.name ,
      
              fontSize:15,
              fontColor :'black',
      
            }
          }
         
          
        });



        }catch(error){
          alert(ev.target.dataItem.dataContext.name + ' does not have any statics yet');
        }
      
      });


      polygonTemplate.tooltipText = "{name}";
      polygonTemplate.polygon.fillOpacity = 0.6;
      
      
      polygonTemplate.fill = chart.colors.getIndex(0);
       polygonTemplate.nonScalingStroke = true;

// Hover state
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#367B25");


      
    
      }); // end am4core.ready() 
    });
  
var date= new Date();
var currentdate= date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
const Docref = firebase.firestore();

$.getJSON(url, function (data) {
a =new Array();
b= new Array();
labels =[];
array_recovered = [];
array_deaths = [];
array_confirmed =[];
var label_confirmed = 0;
var label_deaths = 0;
var label_recovered = 0;
var x;
//var remp = '';
var guerie = 0;
var confirme = 0;
var mortes = 0;
   var op ='&nbsp;&nbsp;&nbsp;&nbsp<input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()"><br><ul class="list-group">';
  
  $.each(data, function (key, entry) {
    
    op += '&nbsp;&nbsp;&nbsp;&nbsp;<li list-group-item><input type="checkbox" id="'+key+'" value="'+key+'" name=type class="check"><label for="'+key+'">'+key+'</label></li>';
    /***Remplir les donnees pour les stocker dans firebase ********** */
    guerie = guerie + data[key][data[key].length -1]["recovered"];
    mortes = mortes +  data[key][data[key].length -1]["deaths"];
    confirme = confirme + data[key][data[key].length -1]["confirmed"];;
    var d = data[key][data[key].length -1]["confirmed"];
    var b = data[key][data[key].length -1]["recovered"];
    var c = data[key][data[key].length -1]["deaths"];
    a.push(key)
    x = currentdate+'/'+ key
    const doc = Docref.doc(x)
    doc.set({
      confirmed : data[key][data[key].length -1]["confirmed"],
      deaths : data[key][data[key].length -1]["deaths"],
      recovered : data[key][data[key].length -1]["recovered"]
    }).then(function(){
      console.log("done");
    }).catch(function(){
      console.log("error");
    });
    
   
  })
  op += '</ul>';//fermer la ul lors de la fin de la boucle
  $("#country").html(op); // ajouter les checkboxes et les different pays contaminees au DropDown multiple select
  /**************Remplire les donnees  **************** */
  document.getElementById("hco").innerHTML= confirme;//pour Confirmed 
  document.getElementById("hde").innerHTML =mortes;//pour deaths
  document.getElementById("hre").innerHTML = guerie;//pour recorved
  /************Remplire les donnees et la generalite ********** */
  document.getElementById("Recovery_Rate").innerHTML = ((guerie/(mortes+guerie+confirme))*100).toFixed(2)+' %';
  document.getElementById("Death_Rate").innerHTML = ((mortes/(mortes+guerie+confirme))*100).toFixed(2)+' %';
  document.getElementById("Confirmed_Rate").innerHTML = ((confirme/(mortes+guerie+confirme))*100).toFixed(2)+' %';
  /************Datatable **************** */
  $('#table').DataTable({
    ajax: { 
    url :'https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?limit=200',
    dataSrc: 'data.rows',
   },
   columns : [
     {data: 'flag',"render":function(data, type,row){
       return '<img src = "'+data+'"style="height:20px;width:40px;"/>';
     },
   },
     {data: 'country'},
     {data: 'total_cases'},
     {data: 'total_deaths'},
     {data: 'total_recovered',render:function(data,type,row){
       return '<span >  +'+data+'</span>';
     }}
 
     
 
 
   ]
 });


 
  var date_array = Array();
  var confirmed_array = Array();
  var death_array = Array();
  var recovered_array = Array();
  var guerie;
  var con ;
  var mort;
  for(var i= 0 ; i< data["Italy"].length  ; i++){
    guerie=0;
    con = 0;
    mort =0;
    date_array.push(data["Morocco"][i]["date"]);
    $.each(data, function (key, entry) {
      guerie+= data[key][i]["recovered"];
      mort+= data[key][i]["deaths"];
      con+= data[key][i]["confirmed"];
    })
    confirmed_array.push(con);
    death_array.push(mort);
    recovered_array.push(guerie)
    }
  
  am4core.ready(function() {
  
  // Themes begin
  am4core.useTheme(am4themes_animated);
  am4core.useTheme(am4themes_kelly);
  // Themes end
  
  var chart = am4core.create("chartdiv1", am4charts.XYChart);
  
  var data = [];

  for(var i = 0; i < death_array.length; i++){

    data.push({date:date_array[i], value: confirmed_array[i], value1: death_array[i], value2: recovered_array[i]});
  }

  
  chart.data = data;
  
  // Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.title.text = "Dates";
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.minGridDistance = 60;


  
  var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "Rate";
  
  // Create series confirmed array
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "value";
  series.dataFields.dateX = "date";
  series.name = "Confirmed";
  series.tooltipText = "{name}: [bold]{valueY}[/]";
  series.strokeWidth = 2.5;
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.snapToSeries = series;
  chart.cursor.xAxis = dateAxis;
    // Create series  deaths 
  var series1 = chart.series.push(new am4charts.LineSeries());
  series1.dataFields.valueY = "value2";
  series1.dataFields.dateX = "date";
  series1.name = "Recovered";
  series1.tooltipText = "{name}: [bold]{valueY}[/]";
  series1.strokeWidth = 2.5;
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.snapToSeries = series1;
  chart.cursor.xAxis = dateAxis;
    // Create series recovered
    var series2 = chart.series.push(new am4charts.LineSeries());
  series2.dataFields.valueY = "value1";
  series2.dataFields.dateX = "date";
  series2.name = "Deaths";
  series2.tooltipText = "{name}: [bold]{valueY}[/]"
  series2.strokeWidth = 2.5;
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.snapToSeries = series2;
  chart.cursor.xAxis = dateAxis;
  
  //chart.scrollbarY = new am4core.Scrollbar();
// Add cursor
chart.cursor = new am4charts.XYCursor();

// Add legend
chart.legend = new am4charts.Legend();
  
  }); // end am4core.ready()

  $("#log").click(function(){

 
  var checkBox = document.getElementById("log");
  // Get the output text


  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){


    var date_array = Array();
    var confirmed_array = Array();
    var death_array = Array();
    var recovered_array = Array();
    var guerie;
    var con ;
    var mort;
    for(var i= 0 ; i< data["Morocco"].length  ; i++){
      guerie=0;
      con = 0;
      mort =0;
      date_array.push(data["Morocco"][i]["date"]);
      $.each(data, function (key, entry) {
        guerie+= data[key][i]["recovered"];
        mort+= data[key][i]["deaths"];
        con+= data[key][i]["confirmed"];
      })
      confirmed_array.push(Math.log(con));
      death_array.push(Math.log(mort));
      recovered_array.push(Math.log(guerie))
      }
    
    am4core.ready(function() {
    
    // Themes begin
    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_kelly);
    // Themes end
    
    var chart = am4core.create("chartdiv1", am4charts.XYChart);
    
    var data = [];
  
    for(var i = 0; i < death_array.length; i++){
  
      data.push({date:date_array[i], value: confirmed_array[i], value1: death_array[i], value2: recovered_array[i]});
    }
    
    chart.data = data;
    
    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  
  dateAxis.title.text = "Dates";
  dateAxis.renderer.grid.template.location = 0;
  dateAxis.renderer.minGridDistance = 60;
  
  
    
    var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.title.text = "Rate";
    
    // Create series confirmed array
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.name = "Confirmed";
    series.tooltipText = "{name}: [bold]{valueY}[/]";
    series.strokeWidth = 2.5;
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = series;
    chart.cursor.xAxis = dateAxis;
      // Create series  deaths 
    var series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.valueY = "value2";
    series1.dataFields.dateX = "date";
    series1.name = "Recovered";
    series1.tooltipText = "{name}: [bold]{valueY}[/]";
    series1.strokeWidth = 2.5;
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = series1;
    chart.cursor.xAxis = dateAxis;
      // Create series recovered
      var series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "value1";
    series2.dataFields.dateX = "date";
    series2.name = "Deaths";
    series2.tooltipText = "{name}: [bold]{valueY}[/]"
    series2.strokeWidth = 2.5;
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = series2;
    chart.cursor.xAxis = dateAxis;
    
    //chart.scrollbarY = new am4core.Scrollbar();
  // Add cursor
  chart.cursor = new am4charts.XYCursor();
  
  // Add legend
  chart.legend = new am4charts.Legend();
    
    }); // end am4core.ready()

  } else {

 

  var date_array = Array();
  var confirmed_array = Array();
  var death_array = Array();
  var recovered_array = Array();
  var guerie;
  var con ;
  var mort;
  for(var i= 0 ; i< data["Morocco"].length  ; i++){
    guerie=0;
    con = 0;
    mort =0;
    date_array.push(data["Morocco"][i]["date"]);
    $.each(data, function (key, entry) {
      guerie+= data[key][i]["recovered"];
      mort+= data[key][i]["deaths"];
      con+= data[key][i]["confirmed"];
    })
    confirmed_array.push(con);
    death_array.push(mort);
    recovered_array.push(guerie)
    }
  
  am4core.ready(function() {
  
  // Themes begin
  am4core.useTheme(am4themes_animated);
  am4core.useTheme(am4themes_kelly);
  // Themes end
  
  var chart = am4core.create("chartdiv1", am4charts.XYChart);
  
  var data = [];

  for(var i = 0; i < death_array.length; i++){

    data.push({date:date_array[i], value: confirmed_array[i], value1: death_array[i], value2: recovered_array[i]});
  }
  
  chart.data = data;
  
  // Create axes
  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());

dateAxis.title.text = "Dates";
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.minGridDistance = 60;


  
  var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "Rate";
  
  // Create series confirmed array
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "value";
  series.dataFields.dateX = "date";
  series.name = "Confirmed";
  series.tooltipText = "{name}: [bold]{valueY}[/]";
  series.strokeWidth = 2.5;
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.snapToSeries = series;
  chart.cursor.xAxis = dateAxis;
    // Create series  deaths 
  var series1 = chart.series.push(new am4charts.LineSeries());
  series1.dataFields.valueY = "value2";
  series1.dataFields.dateX = "date";
  series1.name = "Recovered";
  series1.tooltipText = "{name}: [bold]{valueY}[/]";
  series1.strokeWidth = 2.5;
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.snapToSeries = series1;
  chart.cursor.xAxis = dateAxis;
    // Create series recovered
    var series2 = chart.series.push(new am4charts.LineSeries());
  series2.dataFields.valueY = "value1";
  series2.dataFields.dateX = "date";
  series2.name = "Deaths";
  series2.tooltipText = "{name}: [bold]{valueY}[/]"
  series2.strokeWidth = 2.5;
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.snapToSeries = series2;
  chart.cursor.xAxis = dateAxis;
  
  //chart.scrollbarY = new am4core.Scrollbar();
// Add cursor
chart.cursor = new am4charts.XYCursor();

// Add legend
chart.legend = new am4charts.Legend();
  
  }); // end am4core.ready()
}
})





const url2 = 'https://covid19-server.chrismichael.now.sh/api/v1/FatalityRateByAge';
$.getJSON(url2, function (data2) {

am4core.ready(function() {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  // Create chart instance
  var chart = am4core.create("doughnut-chart", am4charts.PieChart);
  
  // Add data
  chart.data = [ {
    "country": data2.table[0]["Age"],
    "litres": data2.table[0]["DeathRateAllCases"]
  }, {
    "country": data2.table[1]["Age"],
    "litres":data2.table[1]["DeathRateAllCases"]
  }, {
    "country": data2.table[2]["Age"],
    "litres": data2.table[2]["DeathRateAllCases"]
  },{
  "country": data2.table[3]["Age"],
  "litres": data2.table[3]["DeathRateAllCases"]
  },
  {
    "country": data2.table[4]["Age"],
    "litres": data2.table[4]["DeathRateAllCases"]
    }];
  
  // Add and configure Series
  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "litres";
  pieSeries.dataFields.category = "country";
  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.strokeWidth = 1;
  pieSeries.slices.template.strokeOpacity = 3;
  
  // This creates initial animation
  pieSeries.hiddenState.properties.opacity = 1;
  pieSeries.hiddenState.properties.endAngle = -90;
  pieSeries.hiddenState.properties.startAngle = -90;
  
  });

});
});

});



//********** */ Searching **************///
function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("country");
  a = div.getElementsByTagName("li");

  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('Started').innerHTML =
   h + "   :   " + m + "  :  " + s;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};
  return i;
}
/*************LORSQU ON CLICK SUR LE BUTTON SUBMIT  ************* */
$("#buttonSumbit").click(function(){

  favorite =[];
  $('#div3').html('');
   total_array_confirmed = new Array();
   total_array_deaths = new Array();
   total_array_recovered = new Array();
   labels=new Array();
  array_confirmed1 =new Array();
  array_deaths1 =new Array();
  array_recovered1 =new Array();
  array_date = new Array();
  /**********POUR CHAQUE CHECKBOOX SELECTED ON AJOUTE LES PAYS SELECTIONNES DANS ARRAY FAVORITE*********** */
$.each($("input[name='type']:checked"), function(){
    favorite.push($(this).val());
});
/**********SI ON N AJOUTE RIEN *********** */
if(favorite.length == 0){
  alert('Plaease choose country')

}else{

const url = 'https://pomber.github.io/covid19/timeseries.json';
document.getElementById("div1").style.display = 'none';
document.getElementById("graph").style.display = 'none';
document.getElementById("div2").style.display = 'inline';
document.getElementById("chart").style.display = 'none';
labels_date =new Array();
labels_date =[]
$.getJSON(url, function (data){
data_pourcent = [];// va stocker les pys selectionnees et leurs dernieres valeurs d'infections
for(var i =0;i<favorite.length  ; i++){
  
  data_pourcent.push({country:favorite[i], litres: data[favorite[i]][data[favorite[i]].length -1]["confirmed"]})
}
am4core.ready(function() {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  // Create chart instance
  var chart = am4core.create("chartdiv4", am4charts.PieChart);
  
  // Add data
  chart.data = data_pourcent;
  
  // Add and configure Series
  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "litres";
  pieSeries.dataFields.category = "country";
  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.strokeWidth = 1;
  pieSeries.slices.template.strokeOpacity = 3;
  
  // This creates initial animation
  pieSeries.hiddenState.properties.opacity = 1;
  pieSeries.hiddenState.properties.endAngle = -90;
  pieSeries.hiddenState.properties.startAngle = -90;
}) ;

  
  for(var i=0; i<=data["Morocco"].length-1;i++){
    label_date1 = data["Morocco"][i]["date"];
    labels_date.push(label_date1);
}

   
    favorite.forEach(element1 => {
      remp1 ='<h2 >'+element1+'</h2><div style="height:400px;overflow:auto;"><table class="table table-hover table-dark" id="table2" style="text-align: center; border: 2px solid white; margin-right:100px;"><thead ><tr><th scope="col"style="color:aqua;font-size:14px;">CONFIRMED</th><th scope="col"style="color:aqua;font-size:14px;">DEATHS</th><th scope="col"style="color:aqua;font-size:14px;">RECOVERED</th><th scope="col" style="color:aqua; font-size:14px;">DATE</th></tr></thead><tbody id="tbody" >';
      labels.push(element1)
        
        data[element1].forEach(element => {
        var date_country = element["date"];
        array_date.push(date_country)
        var confirmed_country = element["confirmed"];
        array_confirmed1.push(confirmed_country);
        var deaths_country = element["deaths"];
        array_deaths1.push(deaths_country);
        var recovered_country = element["recovered"];
        array_recovered1.push(recovered_country);
        });
    
  
        total_array_confirmed.push(array_confirmed1);
        total_array_deaths.push(array_deaths1);
        total_array_recovered.push(array_recovered1)
        array_confirmed1=[];
        array_deaths1=[];
        array_recovered1 =[];

});

var dynamicColors = function() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
};       
Chart.defaults.global.legend.labels.usePointStyle = true;


var ctx = document.getElementById('linechart').getContext('2d');
if(window.myCharts != undefined)
window.myCharts.destroy();
var chart = new Chart(ctx, {
  type: 'line',
  data: {
      labels: labels_date,
      
  },
  options:{

      legend:{
          display: true,
      },
      title: {
        display: true,
        text: 'confirmed statistics',

        fontSize:10,
        fontColor :'black'

      }
  }

});
for(let i=0;i<total_array_confirmed.length;i++){
  var color1 = dynamicColors();
  
  chart.data.datasets.push({
      fill: false,                        
      data: total_array_confirmed[i],  
      label: labels[i],
      borderColor: color1,
      pointBorderColor: color1,
      pointHoverBackgroundColor: color1,
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      borderWidth: 2,
      pointBackgroundColor: color1,
      pointBorderWidth: 0,
      pointHoverRadius: 3,
      pointHoverBorderColor: "#fff",
      pointHoverBorderWidth: 3,
      pointRadius: 0,
      pointHitRadius: 5,

  });
}
chart.update();

var ctx = document.getElementById('linechart2').getContext('2d');
if(window.myCharts != undefined)
window.myCharts.destroy();
var chart = new Chart(ctx, {
  type: 'line',
  data: {
      labels: labels_date,
      
  },
  options:{
      legend:{
          display: true,
      },
      title: {
        display: true,
        text: 'deaths statistics',

        fontSize:10,
        fontColor :'black'

      }
  }
});

for(let i=0;i<total_array_deaths.length;i++){
  var color1 = dynamicColors();
  
  chart.data.datasets.push({
      fill: false,                        
      data: total_array_deaths[i],  
      label: labels[i],
      borderColor: color1,
      pointBorderColor: color1,
      pointHoverBackgroundColor: color1,
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      borderWidth: 2,
      pointBackgroundColor: color1,
      pointBorderWidth: 0,
      pointHoverRadius: 3,
      pointHoverBorderColor: "#fff",
      pointHoverBorderWidth: 3,
      pointRadius: 0,
      pointHitRadius: 5,

  });
}

chart.update();
var ctx = document.getElementById('linechart3').getContext('2d');
if(window.myCharts != undefined)
window.myCharts.destroy();
var chart = new Chart(ctx, {
  type: 'line',
  data: {
      labels: labels_date,
      
  },
  options:{

      legend:{
          display: true,
      },
      title: {
        display: true,
        text: 'recovered statistics',

        fontSize:10,
        fontColor :'black'

      }
  }
});
for(let i=0;i<total_array_recovered.length;i++){
  var color1 = dynamicColors();
  
  chart.data.datasets.push({
      fill: false,                        
      data: total_array_recovered[i],  
      label: labels[i],
      borderColor: color1,
      pointBorderColor: color1,
      pointHoverBackgroundColor: color1,
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      borderWidth: 2,
      pointBackgroundColor: color1,
      pointBorderWidth: 0,
      pointHoverRadius: 3,
      pointHoverBorderColor: "#fff",
      pointHoverBorderWidth: 3,
      pointRadius: 0,
      pointHitRadius: 5,

  });
}
chart.update();
array_confirmed1=[];
array_deaths1 = [];
array_recovered1 =[];

  
  });


} 

      });  



       







