
$(document).ready(function(){
  


const url = 'https://pomber.github.io/covid19/timeseries.json';



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
    //var remp = '';
    var guerie = 0;
    var confirme = 0;
    var mortes = 0;
    for(var i=data["Morocco"].length-1; i>=data["Morocco"].length-35;i++){
        label_date = data["Morocco"][i]["date"];
        labels.unshift(label_date)
        i-=7;
    }

   var op ='';
  $.each(data, function (key, entry) {
  
    guerie = guerie + data[key][data[key].length -1]["recovered"];
    mortes = mortes +  data[key][data[key].length -1]["deaths"];
    confirme = confirme + data[key][data[key].length -1]["confirmed"];;
    var d = data[key][data[key].length -1]["confirmed"];
    var b = data[key][data[key].length -1]["recovered"];
    var c = data[key][data[key].length -1]["deaths"];
    /*remp+= '<tr>';
    remp+='<td style="font-size:14px;">'+key+'</td>';
    remp+='<td style="font-size:14px;">'+d+'</td>';
    remp+='<td style="font-size:14px;">'+b+'</td>';
    remp+='<td style="font-size:14px;">'+c+'</td>';*/

      

      a.push(key)

     
    //dropdown.append($('<option id="op"></option>').attr('value','').text(key));
    op += '&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox"  id="'+key+'" value="'+key+'" name=type class="check"><label for="'+key+'">'+key+'</label><br>';
 
  
  })
  $('#table').DataTable({
    ajax: { 
    url :'https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?limit=200',
    dataSrc: 'data.rows',
   },
   columns : [
     {data: 'flag',"render":function(data, typ,row){
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
  
  $("#country").html(op);
  for(var i=data["Morocco"].length-1; i>=data["Morocco"].length-35;i++){
    $.each(data, function (key, entry) {
     label_confirmed+=data[key][i]["confirmed"];
     label_deaths += data[key][i]["deaths"];
     label_recovered+= data[key][i]["recovered"];

     
    });
    array_confirmed.unshift(label_confirmed)
    array_deaths.unshift(label_deaths);
    array_recovered.unshift(label_recovered);
    label_confirmed = 0;
    label_deaths =0;
    label_recovered= 0;
    i-=7;
}





document.getElementById("hco").innerHTML= confirme;
document.getElementById("hde").innerHTML =mortes;
document.getElementById("hre").innerHTML = guerie;
  //$('#table').append(remp);
  /*-----------------------------Line Chart --------------------------------*/
  new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{ 
          data: array_confirmed,
          label: "deaths",
          borderColor: "#3e95cd",
          fill: false
        }, { 
          data: array_recovered,
          label: "recovered",
          borderColor: "green",
          fill: false
        }, { 
          data: array_deaths,
          label: "deaths",
          borderColor: "red",
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Covid statistics per weekend(5 weekends)',

        fontSize:15,
        fontColor :'black'

      }
    }
  });

new Chart(document.getElementById("doughnut-chart"), {
  type: 'pie',
  data: {
    labels: ['recovered','deaths','confirmed'],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: ["green", "red",""],
        data: [guerie,mortes,confirme]
      }
    ],
    
  },
  options: {
    title: {
      display: true,
      text: 'statistics world ',
      
    }
  }
});
});

});




 

$("button").click(function(){

  
  favorite =[];
  $('#div3').html('');
  //remp1 ='<h2 id ="h2"></h2><div style="height:400px;overflow:auto;"><table class="table table-hover table-dark" id="table2" style="text-align: center; border: 2px solid white; margin-right:100px;"><thead ><tr><th scope="col"style="color:aqua;font-size:14px;">CONFIRMED</th><th scope="col"style="color:aqua;font-size:14px;">DEATHS</th><th scope="col"style="color:aqua;font-size:14px;">RECOVERED</th><th scope="col" style="color:aqua; font-size:14px;">DATE</th></tr></thead><tbody id="tbody" >';
   total_array_confirmed = new Array();
   total_array_deaths = new Array();
   total_array_recovered = new Array();
   labels=new Array();
  array_confirmed1 =new Array();
  array_deaths1 =new Array();
  array_recovered1 =new Array();
  array_date = new Array();
$.each($("input[name='type']:checked"), function(){
    favorite.push($(this).val());
});
if(favorite.length == 0){
  alert('Plaease choose country')

}else{

  document.getElementById('home').style.display='inline';


const url = 'https://pomber.github.io/covid19/timeseries.json';
document.getElementById("div1").style.display = 'none';
document.getElementById("div2").style.display = 'inline';
labels_date =new Array();
labels_date =[]
$.getJSON(url, function (data){
  
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
        remp1+= '<tr>';
        remp1+='<td style="font-size:14px;">'+confirmed_country+'</td>';
        remp1+='<td style="font-size:14px;">'+deaths_country+'</td>';
        remp1+='<td style="font-size:14px;">'+recovered_country+'</td>';
        remp1+='<td style="font-size:14px;">'+date_country+'</td>';
        });
    
  
        total_array_confirmed.push(array_confirmed1);
        total_array_deaths.push(array_deaths1);
        total_array_recovered.push(array_recovered1)
        array_confirmed1=[];
        array_deaths1=[];
        array_recovered1 =[];

        $('#div3').append(remp1+'</tbody></table></div><br><br></br>');
   
      

        /*new Chart(document.getElementById("linechart"), {
          type: 'line',
          data: {
            labels: array_date,
            datasets: [{ 
                data: array_confirmed1,
                label: "deaths",
                borderColor: "#3e95cd",
                fill: false
              }, /*{ 
                data: array_recovered1,
                label: "recovered",
                borderColor: "red",
                fill: false
              }, { 
                data: array_deaths1,
                label: "deaths",
                borderColor: "green",
                fill: false
              }
            ]
          },
          options: {
            scales: {
              xAxes: [{
               ticks: {
                      display: false
               }
             }]
           },
            title: {
              display: true,
              text: 'Covid statistics per weekend(5 weekends)',
      
              fontSize:15,
              fontColor :'black'
      
            }
          }
        });*/
        
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
    scales: {
      xAxes: [{
       ticks: {
              display: false
       }
     }]
   },
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
    scales: {
      xAxes: [{
       ticks: {
              display: false
       }
     }]
   },
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
    scales: {
      xAxes: [{
       ticks: {
              display: false
       }
     }]
   },
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
}) ;
}  
         
      });  


/*remp1 ='';
;
$.getJSON(url, function (data){
    data[selected_value].forEach(element => {
        var date_country = element["date"];
        var confirmed_country = element["confirmed"];
        var deaths_country = element["deaths"];
        var recovered_country = element["recovered"];
        remp1+= '<tr>';
    remp1+='<td style="font-size:14px;">'+confirmed_country+'</td>';
    remp1+='<td style="font-size:14px;">'+deaths_country+'</td>';
    remp1+='<td style="font-size:14px;">'+recovered_country+'</td>';
    remp1+='<td style="font-size:14px;">'+date_country+'</td>';
    });
    $('#table2').append(remp1);
});*/



       






