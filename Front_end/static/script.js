const menu = document.getElementById("menu")
const currentTemperature = document.getElementById("currentTemperature")
const amy = document.getElementById("amy")
let currentMeisure = document.getElementById("currentMeisure")
const language = document.getElementById("language")
const user_email = document.getElementById("user_emailText")
const logoutText = document.getElementById("logout")
const humidity = document.getElementById("humidity")
const currentTemperatureText = document.getElementById("currentTemperatureText")
const update = document.getElementById("update")
const theHistoryButton = document.getElementById("theHistoryButton")
const title = document.getElementById("title")
const settings = document.getElementById("settingsDisplay")
const closeWindow = document.getElementById("closeWindow")
const temperatures = document.getElementById("temperatures")
const sign_form = document.getElementById("sign_form")
const password = document.getElementById("password")
const password2 = document.getElementById("password2")
const user_info = document.getElementById("user_info")
const temperature1 = document.getElementById("temperature1")
const temperature2 = document.getElementById("temperature2")
const temperature3 = document.getElementById("temperature3")
const temperature4 = document.getElementById("temperature4")
const temperature5 = document.getElementById("temperature5")
const watch1 = document.getElementById("watch1")
const watch2 = document.getElementById("watch2")
const watch3 = document.getElementById("watch3")
const watch4 = document.getElementById("watch4")
const watch5 = document.getElementById("watch5")
const currentUnit = document.getElementById("currentUnit")
const temperatura = document.getElementById("temperatura")

let humedad;
let idioma;

window.humedad = false
window.idioma = "En"

let temperaturesHistory = [];

const symbols = ["@", "#", "$", "%", "&", "*", "<", ">", "{", "}", "[", "]", "(", ")"]

let amyInterval;
let temperaturesInterval;
window.currentMeisure = "Celcius";



let translations = {
    en : {
        languages : "Languages",
        user_mail : "User email: ",
        logout : "logout",
        humidity : "Humidity",
        showTemperature : "Current temperature",
        update : "Update",
        theHistoryButton : "History",
        title : "History",
        temperatura : "Temperature"
    },

    es : {
        languages : "Idiomas",
        user_mail : "Correo Electronico: ",
        logout : "Cerrar sesion",
        humidity : "Humedad",
        showTemperature : "Temperatura actual",
        update : "Actualizar",
        theHistoryButton : "Historial",
        title : "Historial",
        temperatura : "Temperatura"
    },

    nl : {
        languages : "Talen",
        user_mail : "Gebruikers-e-mailadres: ",
        logout : "uitloggen",
        humidity : "Vochtigheid",
        showTemperature : "Huidige temperatuur",
        update : "Update",
        theHistoryButton : "Dossier",
        title : "Dossier",
        temperatura : "Temperatuur"
    }
}

function getHumidity(){
    window.humedad = true
    humidity.style.display = "none"
    temperatura.style.display = "block"
    currentUnit.innerText = "%"
    getLastTemperaturesJS()
}

function getTemperature(){
    window.humedad = false
    humidity.style.display = "block"
    temperatura.style.display = "none"
    if (window.currentMeisure == "Celcius"){
        currentUnit.innerText = "°C"
    } 
    else if (window.currentMeisure == "Fahrenheit"){
        currentUnit.innerText = "°F"
    }
    getLastTemperaturesJS()
}

function pageEn(){
    language.innerText = translations.en.languages
    user_email.innerText = translations.en.user_mail
    logoutText.innerText = translations.en.logout
    humidity.innerText = translations.en.humidity
    update.innerText = translations.en.update
    theHistoryButton.innerText = translations.en.theHistoryButton
    title.innerText = translations.en.title
    temperatura.innerText = translations.en.temperatura
    window.idioma = "En"

}

function pageEs(){
    language.innerText = translations.es.languages
    user_email.innerText = translations.es.user_mail
    logoutText.innerText = translations.es.logout
    humidity.innerText = translations.es.humidity
    update.innerText = translations.es.update
    theHistoryButton.innerText = translations.es.theHistoryButton
    title.innerText = translations.es.title
    temperatura.innerText = translations.es.temperatura
    window.idioma = "Es"
}

function pageNl(){
    language.innerText = translations.nl.languages
    user_email.innerText = translations.nl.user_mail
    logoutText.innerText = translations.nl.logout
    humidity.innerText = translations.nl.humidity
    update.innerText = translations.nl.update
    theHistoryButton.innerText = translations.nl.theHistoryButton
    title.innerText = translations.nl.title
    temperatura.innerText = translations.nl.temperatura
    window.idioma = "Nl"
}

function formrequired(e){

    pwd = password.value;
    pwd2 = password2.value;
    
    const hasSymbol = symbols.some(sym => pwd.includes(sym))

    if (hasSymbol == false){
        e.preventDefault()
        alert("Your password need to has at least 1 symbol")
        return;
    }

    else if (pwd !== pwd2){
        e.preventDefault()
        alert("Passwords are not equals")
        return;
    }
}

if (sign_form) {
    sign_form.addEventListener("submit", formrequired)
}

function closeTheWindowHistory(){
    temperatures.style.display = "none"
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 786){
        temperatures.style.display = "flex"
    }
})

window.addEventListener("resize", () => {
    if (window.innerWidth <= 786){
        temperatures.style.display = "none"
    }
})

function displayUserInfo(){
    user_info.style.display = "flex"
}

function displayTemperatures(){
    temperatures.style.display = "flex"
}

function closeTheWindowInfo(){
    user_info.style.display = "none"
}

function closeTheWindowSettings(){
    settings.style.display = "none"
}

function closeTheWindowMenu(){
    menu.style.display = "none"
}

function displaySettings(){
    settings.style.display = "block"
}

function displayLanguages(){
    if (languages.style.display == "none")
        languages.style.display = "flex"
    else
        languages.style.display = "none"
}

function changeCurrentMeisureToCelcius(){
    if (window.currentMeisure !== "Celcius"){
        currentMeisure.textContent = "Celcius"
        window.currentMeisure = "Celcius"
        getLastTemperaturesJS()
        updateCurrentTemperature()
        if (window.humedad == false)
            currentUnit.innerText = "°C"
    }
    
}

function changeCurrentMeisureToFahrenheit(){
    if(window.currentMeisure !== "Fahrenheit"){
        currentMeisure.textContent = "Fahrenheit"
        window.currentMeisure = "Fahrenheit"
        getLastTemperaturesJS()
        updateCurrentTemperature()
        if (window.humedad == false)
            currentUnit.innerText = "°F"
    }
}

function displayMenu(){
    menu.style.display = "block"
}

function changeAmy(){
    if (Number(currentTemperature.textContent) > 30){
        amy.src = "/static/amyHot.png"
    }
    else if (Number(currentTemperature.textContent) <= 30 && Number(currentTemperature.textContent) >= 10){
        amy.src = "/static/amyHappy.png"
    }
    else if (Number(currentTemperature.textContent) < 10){
        amy.src = "/static/amyCold.png"
    }
}

function changeAmyHoverIn(){
    if (amy.src.includes("amyHappy.png")){
        clearInterval(amyInterval)
        amy.src = "/static/amyVeryHappy.png"
    }
    else if (amy.src.includes("amyHot.png")){
        clearInterval(amyInterval)
        amy.src = "/static/amyVeryHot.png"
    }
    else if (amy.src.includes("amyCold.png")){
        clearInterval(amyInterval)
        amy.src = "/static/amyVeryCold.png"
    }
}

function changeAmyHoverOut(){
    changeAmy()
    amyInterval = setInterval(changeAmy, 1000)
}



async function updateCurrentTemperature(){
    const response = await fetch("/data")
    const data = await response.json()
    if (window.humedad == true){
        let humd = data.humidity
        currentTemperature.innerText = humd
    }
    if (window.humedad == false){
        let temp = data.temperature.toFixed(1)   
            if (window.currentMeisure == "Celcius"){
            currentTemperature.innerText = temp
            }
            else if (window.currentMeisure == "Fahrenheit"){
            currentTemperature.innerText = (temp * 1.8) + 32 
            }
        }
}

async function getLastTemperaturesJS(){
    let response = await fetch("/lastTemperatures")
    let data = await response.json()
    temperaturesHistory = data.lastTemperatures
    humidityHistory = data.lastHumidities


    if (window.humedad === false){
        if (window.currentMeisure === "Celcius"){ 
            temperature1.innerText = temperaturesHistory[0] + "°C"
            temperature2.innerText = temperaturesHistory[1] + "°C"
            temperature3.innerText = temperaturesHistory[2] + "°C"
            temperature4.innerText = temperaturesHistory[3] + "°C"
            temperature5.innerText = temperaturesHistory[4] + "°C" 
        }

        else if (window.currentMeisure === "Fahrenheit"){
            temperature1.innerText = ((temperaturesHistory[0] * 1.8) + 32) + "°F"
            temperature2.innerText = ((temperaturesHistory[1] * 1.8) + 32) + "°F"
            temperature3.innerText = ((temperaturesHistory[2] * 1.8) + 32) + "°F"
            temperature4.innerText = ((temperaturesHistory[3] * 1.8) + 32) + "°F"
            temperature5.innerText = ((temperaturesHistory[4] * 1.8) + 32) + "°F"
        }
    }
    
    else if (window.humedad === true){
        temperature1.innerText = humidityHistory[0] + "%"
        temperature2.innerText = humidityHistory[1] + "%"
        temperature3.innerText = humidityHistory[2] + "%"
        temperature4.innerText = humidityHistory[3] + "%"
        temperature5.innerText = humidityHistory[4] + "%"
    }
}

async function getTime(){
    let response = await fetch("/lastTemperatures")
    let data = await response.json()
    let lastTimes = data.lastTimes


    watch1.innerText = lastTimes[0]
    watch2.innerText = lastTimes[1]
    watch3.innerText = lastTimes[2]
    watch4.innerText = lastTimes[3]
    watch5.innerText = lastTimes[4]

}

function modifyCurrentText(){
    if (window.humedad == true){
        if (window.idioma == "En"){
            currentTemperatureText.innerText = "Current Humidity"
        }
        else if (window.idioma == "Es"){
            currentTemperatureText.innerText = "Actual Humedad"
        }
        else if (window.idioma == "Nl"){
            currentTemperatureText.innerText = "Huidige Luchtvochtigheid"
        }
  
    }
    else if (window.humedad == false){
        if (window.idioma == "En"){
            currentTemperatureText.innerText = "Current Temperature"
        }
        else if (window.idioma == "Es"){
            currentTemperatureText.innerText = "Actual Temperatura"
        }
        else if (window.idioma == "Nl"){
            currentTemperatureText.innerText = "Huidige Temperatuur"
        }
    }
}

function logout(){
    fetch("/logout", {method:"POST"})
    .then(() => window.location.href = "/login")
}


setInterval(modifyCurrentText, 1000)
setInterval(getTime, 1000)
setInterval(getLastTemperaturesJS, 1000)
setInterval(updateCurrentTemperature, 1000)
amy.addEventListener("mouseover", changeAmyHoverIn)
amy.addEventListener("mouseout", changeAmyHoverOut)
amyInterval = setInterval(changeAmy, 1000)


