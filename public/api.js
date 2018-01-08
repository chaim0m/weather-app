var fetch = function() {
  $.ajax({
    method: "GET",
    url: 'http://api.apixu.com/v1/current.json?key=6d760d3f69ec408b9c481849180701&q=' + $('#city').val() + '&appid=6d760d3f69ec408b9c481849180701',
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
var commentsArray = [];
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
};

function storeComments(comment, inputName) {
  for (let i=0;i<cityArray.length;i++){
    if (cityArray[i].name===inputName){
      cityArray[i].comments.push(comment);
      // console.log(cityArray);

    }
  }
}


var updateWeather = function() {
  $('.append').contents().remove();
  var source = $('#weatherinfo').html();
  var template = Handlebars.compile(source);
  for (let i = 0; i < cityArray.length; i++) {
    let newHTML = template(cityArray[i]);
    $('.append').append(newHTML);
    if(cityArray[i].comments){
    for (let j=0;j<cityArray[i].comments.length;j++){
      $('#name').append(cityArray[i].comments[j]);
    }
  }
  }
}

$('.get-weather').on('click', fetch);

$('.append').on('click', '.btn-success', function() {
  var comment = $(this).parent().siblings().val();
  var inputName = $(this).parent().siblings().data().id;
  storeComments(comment,inputName);
  updateWeather();
});
