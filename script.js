let container = document.querySelector(".container");
let search = document.querySelector("#search");
let btn = document.querySelector("#submit");
let searching_clock = document.querySelector(".searching_clock");


let countries = [
    {
        mintaqa: "Asia",
        shahar: "Tashkent",
        url: "./image/uz.png"
    },
    {
        mintaqa: "Europe",
        shahar: "Moscow",
        url: "./image/ru.png"
    },
    {
        mintaqa: "Europe",
        shahar: "London",
        url: "./image/gb.png"
    },
    {
        mintaqa: "Europe",
        shahar: "Paris",
        url: "./image/fr.png"
    },
    {
        mintaqa: "Asia",
        shahar: "Tokyo",
        url: "./image/jp.png"
    },
]

function updateTime1(dataCountry) {
    dataCountry.map((country) => {
        fetch(`https://timeapi.io/api/time/current/zone?timeZone=${country.mintaqa + '%2F' + country.shahar}`).then((res) => {
            return res.json();
        }).then((data) => {
            let time = data.dateTime.slice(11, 19);
            let Country = data.timeZone.split("/")[1];
            let secToDeg = (data.seconds / 60) * 360;
            let minToDeg = (data.minute / 60) * 360;
            let hrToDeg = (data.hour / 12) * 360;

            let clock = `<div class="clock_box clock_first">
        <div class="clock">
          <label style="--i: 1"><span>1</span></label>
          <label style="--i: 2"><span>2</span></label>
          <label style="--i: 3"><span>3</span></label>
          <label style="--i: 4"><span>4</span></label>
          <label style="--i: 5"><span>5</span></label>
          <label style="--i: 6"><span>6</span></label>
          <label style="--i: 7"><span>7</span></label>
          <label style="--i: 8"><span>8</span></label>
          <label style="--i: 9"><span>9</span></label>
          <label style="--i: 10"><span>10</span></label>
          <label style="--i: 11"><span>11</span></label>
          <label style="--i: 12"><span>12</span></label>
          <div class="indicator">
            <span style='transform: rotate(${hrToDeg}deg)' class="hand hour"></span>
            <span style='transform: rotate(${minToDeg}deg)' class="hand minute"></span>
            <span style='transform: rotate(${secToDeg}deg)' class="hand second"></span>
          </div>
        </div>
        <div class="clock_title"> 
            <div class="clock_img">
                <img src=${country.url} alt="" />
            </div>
            <h1 class="country">${Country}</h1>
        </div>
        <div class='clock_subtitle'>
            <span class="week">${data.dayOfWeek.slice(0, 3)} / </span>
            <p class="time">${time}</p>
        </div>
      </div>`;
            container.innerHTML += clock;
        })
    })
}

updateTime1(countries);


function searchClock() {
    fetch(`https://timeapi.io/api/time/current/zone?timeZone=${'Europe' + '%2F' + search.value}`).then((res) => {
        return res.json();
    }).then((data) => {
        if (data === "Invalid Timezone") {
            document.querySelector(".error_Message").innerHTML = "Error: The city name is incorrect or no information was found for this city!"
        } else {
            document.querySelector(".error_Message").innerHTML = "";
            let time = data.dateTime.slice(11, 19);
            let Country = data.timeZone.split("/")[1];
            let secToDeg = (data.seconds / 60) * 360;
            let minToDeg = (data.minute / 60) * 360;
            let hrToDeg = (data.hour / 12) * 360;

            let clock = `<div class="clock_box clock_first">
            <div class="clock">
              <label style="--i: 1"><span>1</span></label>
              <label style="--i: 2"><span>2</span></label>
              <label style="--i: 3"><span>3</span></label>
              <label style="--i: 4"><span>4</span></label>
              <label style="--i: 5"><span>5</span></label>
              <label style="--i: 6"><span>6</span></label>
              <label style="--i: 7"><span>7</span></label>
              <label style="--i: 8"><span>8</span></label>
              <label style="--i: 9"><span>9</span></label>
              <label style="--i: 10"><span>10</span></label>
              <label style="--i: 11"><span>11</span></label>
              <label style="--i: 12"><span>12</span></label>
              <div class="indicator">
                <span style='transform: rotate(${hrToDeg}deg)' class="hand hour"></span>
                <span style='transform: rotate(${minToDeg}deg)' class="hand minute"></span>
                <span style='transform: rotate(${secToDeg}deg)' class="hand second"></span>
              </div>
            </div>
            <div class="clock_title"> 
                <h1 class="country">${Country}</h1>
            </div>
            <div class='clock_subtitle'>
                <span class="week">${data.dayOfWeek.slice(0, 3)} / </span>
                <p class="time">${time}</p>
            </div>
          </div>`;
            searching_clock.innerHTML = clock;
        }
    })
}

btn.addEventListener("click", searchClock);