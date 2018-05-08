    // create the code to get the questions data using an XMLHttpRequest
    function getQuestions() {
      client = new XMLHttpRequest();

    client.open('GET','http://developer.cege.ucl.ac.uk:30290/getGeoJSON/quizlet/geom');
      client.onreadystatechange = questionResponse; 
      // note don't use questionResponse() with brackets as that doesn't work
      client.send();
    }
    // create the code to wait for the response from the data server, and process the response once it is received
    function questionResponse() {
    // this function listens out for the server to say that the data is ready - i.e. has state 4
    if (client.readyState == 4) {
      // once the data is ready, process the data
      var questiondata = client.responseText;
      loadquestionlayer(questiondata);
      }
    }


 
    var app_array = [];
    // convert the received data - which is text - to JSON format and add it to the map
    function loadquestionlayer(questiondata) {
      // convert the text received from the server to JSON
      var questionjson = JSON.parse(questiondata);

      // load the geoJSON layer
      var questionlayer = L.geoJson(questionjson,
      {


        onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.question+'<div> <form id="NPSform" style= "text-align:center" onsubmit="return (getScore()&& startAnswerUpload());"> <input type="radio" name="answer" id=check1 value="one" checked>'+feature.properties.answerone+ '<br> <input type="radio" name="answer" id=check2 value="two">'+feature.properties.answertwo+ '<br> <input type="radio" name="answer" id=check3 value="three">'+feature.properties.answerthree+ '<br> <input type="radio" name="answer" id=check4 value="four">' + feature.properties.answerfour +'<br> <input id="hidden" type="hidden" name="hidden" value='+feature.properties.correct+'><input id="question" type="hidden" name="question" value='+feature.properties.question+'> <input type="submit" name="mysubmit" value="Submit"/></form></div>');

  }, 

        // use point to layer to create the points
        pointToLayer: function (feature, latlng)
        {
        quiz_marker = L.marker(latlng, {icon:testMarkerRed});
        app_array.push(quiz_marker);
        return quiz_marker
        
    },
  }).addTo(mymap);
mymap.fitBounds(questionlayer.getBounds()); 
} 


function getScore(){
        var score = document.querySelector('input[name="answer"]:checked').value;
        var correct = document.getElementById("hidden").value
        if(score==correct){
          alert('Correct Answer, Congratulations!');
          return true;
        }
        else{
          alert('Wrong Answer, Try Again.');
          return true;
        }
      }

function startAnswerUpload() {
  var question = document.getElementById("question").value;
  var answer = document.querySelector('input[name="answer"]:checked').value;
  var correct = document.getElementById("hidden").value;
  var postString = "question="+question+"&answer="+answer+"&correct="+correct;
  processAnswer(postString);
}

var client;
function processAnswer(postString) {
  client = new XMLHttpRequest();
  client.open('POST','http://developer.cege.ucl.ac.uk:30290/uploadAnswer',true);
  client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  client.onreadystatechange = answerUploaded;
  client.send(postString);
}

// create the code to wait for the response from the data server, and process the response once it is received
function answerUploaded() {
// this function listens out for the server to say that the data is ready - i.e. has state 4
if (client.readyState == 4) {
// change the DIV to show the response
alert("Answer Submitted");
}
}





