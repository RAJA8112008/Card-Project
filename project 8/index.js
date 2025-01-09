let key ="f7137cad736f228e66fc0dc27f82585a"
let Cityinput =document.getElementById("Cityinput")
let btn =document.getElementById("search-btn")
let city =document.getElementById("city-name")
let weatherInfoCard= document.getElementById("weather-info")
let temperature =document.getElementById("temperature")
let descripton=document.getElementById("descripton")
let erroeMessage= document.getElementById("erroe-message")
let icon = document.getElementById("weather-icon")

btn.addEventListener("click",()=>{
    const city= Cityinput.value
   if(city){
    getweather(city)
   }
})
async function getweather(city){
const responce =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=$(city)&appid=${key}&units=metric`)
console.log(responce)
}