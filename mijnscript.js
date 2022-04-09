const buttonToevoegen = document.querySelector("#knopToevoegen");
buttonToevoegen.addEventListener("click", mijnFunctie);

function mijnFunctie() {
    let foutmelding = [];
    let voornaam = document.querySelector("#exampleFormControlInput1").value;
    let familienaam = document.querySelector("#exampleFormControlInput2").value;
    //geldigeVoornaam(voornaam);
    if (isNietLeeg(voornaam) == false)
        foutmelding.push("De voornaam is een verplicht veld om in te vullen");
    if (isNietLeeg(familienaam) == false)
        foutmelding.push("De familienaam is een verplicht veld om in te vullen");
    console.log(foutmelding);
    //controle Email
    let email = document.querySelector("#exampleInputEmail1").value;
    let geldig = validateEmail(email);
    if (geldig == false)
        foutmelding.push("Het email-adres moet een '@' en een '.' bevatten.");
    //controleren gebruikersnaam
    let gebruiker = document.querySelector("#gebruiknaam").value;
    let lengthGebruiker = gebruiker.length;
    let geldigeGebruiker = validateUsername(gebruiker, lengthGebruiker);
    if (geldigeGebruiker == false)
        foutmelding.push(
            "De gebruikersnaam moet minstens 1 karakter zijn en het eerste karakter mag niet '-' of '.' zijn"
        );
    //controleren wachtwoorden
    let password1 = document.querySelector("#Password1").value;
    let password2 = document.querySelector("#Password2").value;
    let lengthPassword1 = password1.length;
    let geldigPassword = false;
    geldigPassword = ValidatePassword(password1, password2, lengthPassword1);
    if (geldigPassword == false)
        foutmelding.push(
            "Paswoord moet minstens 7 karakters lang zijn en de beide paswoorden moeten identiek zijn "
        );
    //controleren of adres is ingevuld.
    //zelfde functie gebruikt als bij namen aangezien dit dezelfde
    let adres = document.querySelector("#exampleFormControlInput3").value;
    let isGeldigAdres = isNietLeeg(adres);
    if (isGeldigAdres == false)
        foutmelding.push("Het adres is een verplicht veld om in te vullen");

    //Controle of land en provincie zijn ingevuld.
    //https://stackoverflow.com/questions/15987140/how-to-check-if-an-item-is-selected-from-an-html-drop-down-list

    let land = document.querySelector("#ddl").value;
    let landIsAangeduid = isAangeduid(land);
    if (landIsAangeduid == false)
        foutmelding.push("U dient een land te selecteren");

    let provincie = document.querySelector("#ddl2").value;
    let provIsAangeduid = isAangeduid(provincie);
    if (provIsAangeduid == false)
        foutmelding.push("U dient een provincie aan te duiden.");

    //controle of postcode aan voorwaarden voldoet
    let postcode = document.querySelector("#Postcode").value;
    //let postcode = parseInt(invoer);
    let isGeldigePostcode = controlePostcode(postcode);

    if (isGeldigePostcode == false)
        foutmelding.push("Postcode moet een getal zijn tussen 1000 en 9999");

    //controle of klant akkoord gaat met algemene voorwaarden
    let akkoordMetVoorwaarden = akkoordVoorwaarden();
    if (akkoordMetVoorwaarden == false)
        foutmelding.push("U dient akkoord te gaan met de algemene voorwaarden");

    //betaalwijze controleren
    // https:stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value
    var radios = document.getElementsByName("betaalwijze");
    let betaalwijze = isBetaling(radios);
    let betaling;
    let tekst;
    let tekstbetaling;
    if (betaalwijze == "") {
        foutmelding.push("U dient een betaalwijze te selecteren");
    } else if (betaalwijze != "") betaling = "U hebt gekozen voor " + betaalwijze;

    if (foutmelding.length == 0) {
        tekst = '<div class="alert alert-success" role="alert">';
        tekst += '<h4 class="alert-heading">Good job</h4>' + "<br>";
        tekst +=
            "<p>Er werden geen fouten gemaakt bij het invullen van het document</p>" +
            "<br>";
        tekst += "</div>";
    } else if (foutmelding.length != 0) {
        tekst = '<div> class="alert alert-danger" role="alert"</div>';
        tekst += "<h4>Verdorie toch!!, Niet goed he!</h4>";
        for (var i = 0; i <= foutmelding.length; i++) {
            tekst += array[i];
        }
        tekst += "</div>";
    }
    if (betaling != "") {
        tekstbetaling = '<div class="alert alert-primary" role="alert">';
        tekstbetaling += betaling;
        tekstbetaling += "</div>";
        document.getElementsById("alert").innerHTML = betaling;
    }

    document.getElementsById("alert").innerHTML = tekst;
}

function isBetaling(radios) {
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked == true) {
            betaalwijze = radios[i].value;

            break;
        } else {
            betaalwijze = "";
        }
    }

    return betaalwijze;
}
//controle of veld leeg is of niet
function isNietLeeg(teControlerenVeld) {
    let isGeldig = false;
    if (teControlerenVeld != "") {
        isGeldig = true;
    }
    return isGeldig;
}
//controle of achternaam is ingevuld
function geldigeFamilienaam(familienaam) {
    let isGeldig = false;

    if (familienaam != "") {
        isGeldig = true;
    }
    return isGeldig;
}

//controle of email geldig is.
//www.codegrepper.com/code-examples/javascript/how+to+extract+domain+name+from+email+address+in+javascript

function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    let geldig = false;

    geldig = re.test(email);
    return geldig;
    //domainGeldig = do.test(domain);

    console.log(geldig);
}

//controle gebruikersnaam
//https://stackoverflow.com/questions/38349939/first-character-cant-be-dash-in-expression
function validateUsername(gebruiker, length) {
    let isGeldig = false;

    if (length >= 1 && gebruiker.charAt(1) != "-" && gebruiker.charAt(1) != ".")
        isGeldig = true;

    return isGeldig;
}

function ValidatePassword(password1, password2, lengthPassword1) {
    let geldig = false;
    if (password1 == password2 && lengthPassword1 >= 7) geldig = true;
    console.log(geldig);
    return geldig;
}
//Controle of adres en provincie zijn ingevuld.
//https://stackoverflow.com/questions/15987140/how-to-check-if-an-item-is-selected-from-an-html-drop-down-list
function isAangeduid(teControlerenDeel) {
    let isAangeduid = false;
    if (
        teControlerenDeel != "Kies een land" &&
        teControlerenDeel != "Kies een provincie" &&
        teControlerenDeel != ""
    )
        isAangeduid = true;
    return isAangeduid;
}

function controlePostcode(postcode) {
    let isGeldig = false;
    if (postcode >= 1000 || postcode <= 9999) isGeldig = true;
    return isGeldig;
}

//Controle of de klant akkoord is gegaan met de algemene voorwaarden
//https://stackoverflow.com/questions/9887360/how-can-i-check-if-a-checkbox-is-checked
function akkoordVoorwaarden() {
    let isAkkoord = false;
    if (document.getElementById("voorw").checked) isAkkoord = true;
    return isAkkoord;
}

// //https://stackoverflow.com/questions/5686735/populate-one-dropdown-based-on-selection-in-another
// //drop down lists aanvullen op selectie van een andere drop down list
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

// //https: document.getElementById("alert").innerHTML = foutmelding;
// //prompt("hallo");