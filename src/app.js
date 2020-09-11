// var button = document.querySelector('.button')
// var inputValue = document.querySelector('.inputValue')
// var name = document.querySelector('.name')
// var desc = document.querySelector('.desc')
// var temp = document.querySelector('.temp')


// button.addEventListener('click',function() {
//     fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&APPID=3630dc2226cfec520d3704d1d6f0f2a1')
//     .then(res=>res.json())
//     .then(data=> console.log(data))
//     .catch(err=> alert("Wrong name!"))  
// })
 
var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.submit');
var submitfallback =document.querySelector('submitfallback');



fetch('https://api.openweathermap.org/data/2.5/weather?q='+localStorage.city+'&appid=3630dc2226cfec520d3704d1d6f0f2a1')
.then(response => response.json())
.then(data => {
    console.log(data)
  var tempValue = data['main']['temp'];
  var nameValue = data['name'];
  var descValue = data['weather'][0]['description'];

  main.innerHTML = nameValue;
  desc.innerHTML = "Desc - "+descValue;
  temp.innerHTML = "Temp - "+tempValue;
  input.value ="";

})

.catch(err => alert("Wrong city name!"));
button.addEventListener('click', function(name){
    localStorage.setItem("city",input.value);
fetch('https://api.openweathermap.org/data/2.5/weather?q='+localStorage.city+'&appid=3630dc2226cfec520d3704d1d6f0f2a1')
.then(response => response.json())

.then(data => {
    console.log(data)
    
  var tempValue = data['main']['temp'];
  var nameValue = data['name'];
  var descValue = data['weather'][0]['description'];

  main.innerHTML = nameValue;
  desc.innerHTML = "Desc - "+descValue;
  temp.innerHTML = "Temp - "+tempValue;
  input.value ="";

})

.catch(err => alert("Wrong city name!"));
})

