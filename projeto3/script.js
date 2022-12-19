document.querySelector(".busca").addEventListener("submit", async (event) => {
    event.preventDefault();

    let input = document.querySelector("#searchInput").value;

    if(input !== "") {
        clearInfo();
        showWarning("Carregando...");

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=6e2cbab1239f38a9b9229ca7d9c610b3&units=metric$lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200) {

            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: (json.main.temp)/10,
                tempIcon: json.weather[0].icon,
                wind: json.wind.speed,
                windAngle: json.wind.deg,
            })
        } else {
            clearInfo();
            showWarning("Não escontramos está localização");
        }

    } else {
        clearInfo();
    }

});

function showInfo (json) {
    showWarning(""),

    document.querySelector(".titulo").innerHTML = `${json.name}, ${json.country}`;
    document.querySelector(".tempInfo").innerHTML = `${json.temp.toFixed(1)} <sup>ºC<sup>`;
    document.querySelector(".ventoInfo").innerHTML = `${json.wind} <span>km/h</span>`;
    document.querySelector(".temp img").setAttribute("src", `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector(".ventoPonto").style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector(".resultado").style.display = "block";
};

function clearInfo() {
    showWarning("");
    document.querySelector(".resultado").style.display = "none";
}

function showWarning(msg) {
    document.querySelector(".aviso").innerHTML = msg;
}

