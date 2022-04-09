const buttonToevoegen = document.querySelector("#knopToevoegen");

function mijnFunctie() {
    let foutmelding;
    let voornaam = document.querySelector("#exampleFormControlInput1").value;
    console.log(voornaam);
    let familienaam = document.querySelector("#exampleFormControlInput2").value;
    console.log(familienaam);
    let email = document.querySelector("#exampleInputEmail1").value;
    console.log(email);
    foutmelding = "<div div class = 'alert alert-danger' role = 'alert' >";

    //controle of naam en voornaam zijn ingevuld.
    foutmelding +=
        voornaam == "" ? "Voornaam is een verplicht veld " + "<br>" : "" + "<br>";
    foutmelding +=
        familienaam == "" ?
        "Familienaam is een verplicht veld" + "<br>" :
        "" + "<br>";
    //controle gebruikersnaam
    //https://stackoverflow.com/questions/38349939/first-character-cant-be-dash-in-expression
    let gebruiker = document.querySelector("#gebruiknaam").value;
    let length = gebruiker.length;
    foutmelding += validateUsername(gebruiker, length);
    console.log(foutmelding);

    function validateUsername(gebruiker, length) {
        let foutmelding = "";
        if (
            length <= 1 ||
            gebruiker.charAt(1) == "-" ||
            gebruiker.charAt(1) == "."
        ) {
            foutmelding =
                "De gebruikersnaam moet minstens 1 karakter zijn en het eerste karakter mag niet '-' of '.' zijn" +
                "<br>";

            console.log(foutmelding);
        } else {
            foutmelding = "" + "<br>";
            console.log(foutmelding);
        }
        console.log(foutmelding);
        return foutmelding;
    }
    console.log(gebruiker);

    //controle of email is geldig.

    let geldig = validateEmail(email);

    foutmelding +=
        geldig == false ?
        "Email moet een '@' en een '.' bevatten" + "<br>" :
        "" + "<br>";

    function validateEmail(email) {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    //controle of paswoorden zelfde zijn

    let password1 = document.querySelector("#Password1").value;
    let password2 = document.querySelector("#Password2").value;

    foutmelding +=
        password1 != password2 ?
        "Paswoorden zijn niet gelijk" + "<br>" :
        "" + "<br>";

    foutmelding += "</div>";
    console.log(foutmelding);

    let adres = document.querySelector("#exampleFormControlInput3").value;

    foutmelding += adres == "" ? "Adres mag niet leeg zijn" : "" + "<br>";

    //Controle of adres en provincie zijn ingevuld.
    //https://stackoverflow.com/questions/15987140/how-to-check-if-an-item-is-selected-from-an-html-drop-down-list

    let land = document.querySelector("#ddl").value;
    if (land == "Kies een land") {
        foutmelding += "Gelieve een land te selecteren";
    }
    console.log(foutmelding);
    let provincie = document.querySelector("#ddl2").value;
    if (provincie == "Kies een provincie") {
        foutmelding += "Gelieve een provincie te selecteren";
    } else {
        foutmelding += "";
    }

    console.log(foutmelding);
    // controle of postcode voldoet aan voorwaarden
    let invoer = document.querySelector("#Postcode").value;
    let postcode = parseInt(invoer);

    if (postcode < 1000 || postcode > 9999) {
        foutmelding += "Postcode moet tussen 1000 en 9999 zijn";
    } else {
        foutmelding += "";
    }
    //Controle of de klant akkoord is gegaan met de algemene voorwaarden
    //https://stackoverflow.com/questions/9887360/how-can-i-check-if-a-checkbox-is-checked

    if (document.getElementById("voorw").checked) {
        foutmelding += "";
    } else {
        foutmelding += "U moet akkoord gaan met de algemene voorwaarden.";
    }
    console.log(foutmelding);

    let betaalwijze = document.getElementById("betaalwijze").value;
    let melding = "";
    if (betaalwijze.value == "") {
        foutmelding += "U dient een betaalwijze te selecteren";
    } else if (
        betaalwijze == "Visa" ||
        betaalwijze == "Bankcontact" ||
        betaalwijze == "PayPal" ||
        betaalwijze == "Overschrijving"
    ) {
        melding = "u hebt gekozen voor " + betaalwijze;
    }
    console.log(foutmelding);
    console.log(melding);
}
//https://stackoverflow.com/questions/5686735/populate-one-dropdown-based-on-selection-in-another
//drop down lists aanvullen op selectie van een andere drop down list
function configureDropDownLists(ddl1, ddl2) {
    var België = [
        "Kies een provincie",
        "Antwerpen",
        "Limburg",
        "West-Vlaanderen",
    ];
    var Nederland = ["Kies een provincie", "Drenthe", "Limburg", "Friesland"];
    var Frankrijk = ["Kies een provincie", "Maine", "Normandië", "Berry"];

    switch (ddl1.value) {
        case "België":
            ddl2.options.length = 0;
            for (i = 0; i < België.length; i++) {
                createOption(ddl2, België[i], België[i]);
            }
            break;
        case "Nederland":
            ddl2.options.length = 0;
            for (i = 0; i < Nederland.length; i++) {
                createOption(ddl2, Nederland[i], Nederland[i]);
            }
            break;
        case "Frankrijk":
            ddl2.options.length = 0;
            for (i = 0; i < Frankrijk.length; i++) {
                createOption(ddl2, Frankrijk[i], Frankrijk[i]);
            }
            break;
        default:
            ddl2.options.length = 0;
            break;
    }
}

function createOption(ddl, text, value) {
    var opt = document.createElement("option");
    opt.value = value;
    opt.text = text;
    ddl.options.add(opt);
}

//https: document.getElementById("alert").innerHTML = foutmelding;
//prompt("hallo");

buttonToevoegen.addEventListener("click", mijnFunctie);