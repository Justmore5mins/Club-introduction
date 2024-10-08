const club = new URLSearchParams(location.search).get('club')

window.onload = function(){
    if(JSON.parse(localStorage.getItem("color")) === true){
        console.log(true)
        document.body.classList.toggle("dark")
    }

    var img = document.createElement("img")
    img.src=`http://${location.host}/data/img/${club}.png`
    img.alt="社照"
    img.onload = function(){
        document.getElementById("img").appendChild(img)
    }
    img.onerror = function(){
        img.src=`http://${location.host}/data/img/NotFound.png`
        document.getElementById("img").appendChild(img)
    }
    fetch(`http://${location.host}/data/data.json`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("intro").innerHTML = data[club]["介紹"]
        document.getElementById("ClubName").innerHTML = data[club]["社名"]
        document.getElementById("contact").innerHTML = `<table margin-cleft: auto;margin-right: auto;><tr><td><a href="https://www.facebook.com/${data[club]["社群"]["Facebook"] != null ? data[club]["社群"]["Facebook"] : ""}">Facebook</a></td><td><a href="https://www.instagram.com/${data[club]["社群"]["Instagram"] != null ? data[club]["社群"]["Instagram"] : ""}">Instagram</a></td></tr></table>`
        let table = ""

        const members = data[club]["幹部"]
        console.log(members)
        for(const place in members){ // place is int
            let info = members[place] //object
            table += `<tr><td>|${Object.keys(info)[0] === "" ? "色即是空" :Object.keys(info)}|</td><td> ${info[Object.keys(info)][0] === "" ? "空即是色" : info[Object.keys(info)][0]}</td></tr>`
        }
        document.getElementById("cadres").innerHTML = table
    })
}