(function() {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function() {

        let c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);

        function updateClock() {

            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            const ampm = h >= 12 ? ' PM' : ' AM';

            h = h % 12;
            h = h ? h : 12; //0 peab olema 12

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + ampm;

        };

    });

    // forms

    document.getElementById("form").addEventListener("submit", estimateDelivery);

    let summa = 0.00;
    let e = document.getElementById("delivery");
    e.innerHTML = summa + " &euro;";

    function estimateDelivery(event) {
        event.preventDefault();

        let tarne = document.querySelector('input[name="tarne"]:checked');
        if (tarne == null) {
            alert("Palun valige üks tarneviis!");
            return;
        }

        let linn = document.getElementById("linn");

        if (linn.value === "") {
            alert("Palun valige linn nimekirjast");
            linn.focus();
            return;
        } else {
            if (linn.value === "trt") {
                summa += 2.50;
            }
            else if (linn.value === "nrv") {
                summa += 2.50;
            }
            else if (linn.value === "prn") {
                summa += 3.00;
            }
            else {
                summa += 0.00;
            }
        }

        let v1 = document.getElementById("v1");
        let v2 = document.getElementById("v2");

        if (v1.checked) {
            summa += 5.00;
        }

        if (v2.checked) {
            summa += 1.00;
        }

        e.innerHTML = summa + " &euro;";

        console.log("Tarne hind on arvutatud");
    }

    /* function empty(event) {
        summa = 0.00;
        e.innerText = summa + " &euro;";
    } */

})();

// map

//let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let minuMapAPIKey = "AkyU8yAkc9ms5btIgKRZD-1XmQpt5Y-NSRXoD1yJ0fqvlBp869LPJt6szyQ7psA9";
let map;

function GetMap() {

    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );

    let centerPoint2 = new Microsoft.Maps.Location(
        58.09642,
        27.44747
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: minuMapAPIKey,
        center: centerPoint,
        zoom: 8,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
        title: 'Tartu Ülikool',
        //subTitle: 'Hea koht',
        //text: 'UT'
    });

    let infobox = new Microsoft.Maps.Infobox(centerPoint, {
        title: 'Tartu Ülikool',
        description: 'õppehoone',
        visible: false
    });

    let pushpin2 = new Microsoft.Maps.Pushpin(centerPoint2, {
        title: 'Räpina aianduskool',
    });

    let infobox2 = new Microsoft.Maps.Infobox(centerPoint2, {
        title: 'Räpina aianduskool',
        description: 'aiandushuviliste õppehoone',
        visible: false
    })

    infobox.setMap(map);
    Microsoft.Maps.Events.addHandler(pushpin, 'click', function () {
        infobox.setOptions({visible: true});
    });
    map.entities.push(pushpin);

    map.entities.push(pushpin2);
    map.entities.push(infobox2);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', function () {
        infobox2.setOptions({visible: true});
    });

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

