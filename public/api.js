var STORAGE_ID = 'weatherdata';
var saveToLocalStorage = function() {
  localStorage.setItem(STORAGE_ID, JSON.stringify(cityArray));
}

var LOAD_STORAGE = function(){
  return JSON.parse(localStorage.getItem(STORAGE_ID)||"[]");

}
// load frim local stoarge parse it and save to cities cityArray
// run function on page

var fetch = function() {
  $.ajax({
    method: "GET",
    url: 'http://api.apixu.com/v1/current.json?key=6d760d3f69ec408b9c481849180701&q=' + $('#city').val(),
    success: function(data) {
      storeCity(data);
      updateWeather();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};
var cityArray = [];
// var commentsArray = [];
// function createTemplate() {

//   var newHTML = template({
//     "name": data.location.name,
//     "tempc": data.current.temp_c,
//     "tempf": data.current.temp_f,
//     "timeanddate": data.location.localtime
//   });
// }

function storeCity(data) {
  let cityObject = {
    name: data.location.name,
    tempc: data.current.temp_c,
    tempf: data.current.temp_f,
    timeanddate: data.location.localtime,
    comments: []
  }
  cityArray.push(cityObject);
  saveToLocalStorage();
};

function storeComments(comment, inputName) {
  for (let i = 0; i < cityArray.length; i++) {
    if (cityArray[i].name === inputName) {
      cityArray[i].comments.push(comment);
      // console.log(cityArray);
      saveToLocalStorage();

    }
  }
}


var updateWeather = function() {
  $('.append').contents().remove();
  var source = $('#weatherinfo').html();
  var template = Handlebars.compile(source);
  cityArray = LOAD_STORAGE();
  for (let i = 0; i < cityArray.length; i++) {
    let newHTML = template(cityArray[i]);
    $('.append').append(newHTML);
    if (cityArray[i].comments) {
      for (let j = 0; j < cityArray[i].comments.length; j++) {
        let temp = '#' + cityArray[i].name;
        $(temp).append(cityArray[i].comments[j] + '</br>');
      }
    }
  }
}

// function handleKeyPress(e) {
//   var key = e.keyCode || e.which;
//   if (key == 13) {
//     searching();
//   }
// }
$('.weather-form').on('submit', function(event){
  event.preventDefault();
  fetch();
})
// $('.get-weather').on('keypress', function(event) {
//   if (event.keyCode === 13) {
//     event.preventDefault();
//     fetch();
//   }
// });


$(".append").on("submit",".sabba", function(event) {
  event.preventDefault();
  var comment = $(this).find(".form-control").val();
  var inputName = $(this).siblings("h3").text();
  storeComments(comment, inputName);
  updateWeather();
});
$(".append").on("click", ".remove", function() {
  let rem = $(this).siblings("h3").text();
  for (let i=0;i<cityArray.length;i++){
    if (cityArray[i].name==rem){
      cityArray.splice(i,1);
    }
  }
  saveToLocalStorage();
  updateWeather();
});
updateWeather();
