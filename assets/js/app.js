

// JavaScript for dropdown menu


// OPSKRIFTER DROPDOWN

// Hent knappen og dropdown elementet
const opskrifterBtn = document.querySelector("#opskrifterBtn");
const opskrifterDropdown = opskrifterBtn.closest(".dropdown");

// Tilføj event listener til knappen for at toggle dropdown menuen. Når man trykker på opskrifter knappen, tilføjes eller fjernes class active på dropdown elementet, hvilket viser eller skjuler dropdown menuen.
opskrifterBtn.addEventListener("click", function (e) {
    e.preventDefault();
    minSideDropdown.classList.remove("active"); //når man trykker på opskrifter knappen, fjernes class active på minSideDropdown elementet, hvilket skjuler min side dropdown menuen.
    opskrifterDropdown.classList.toggle("active"); //tilføjer active class på opskrifterDropdown elementet, hvilket viser opskrifter dropdown menuen.
});



// MIN SIDE DROPDOWN

// Hent knappen og dropdown elementet
const minSideBtn = document.querySelector("#minSideBtn");
const minSideDropdown = minSideBtn.closest(".dropdown");

// Tilføj event listener til knappen for at toggle dropdown menuen. Når man trykker på minSide knappen, tilføjes eller fjernes class active på dropdown elementet, hvilket viser eller skjuler dropdown menuen.
minSideBtn.addEventListener("click", function (e) {
    e.preventDefault();
    opskrifterDropdown.classList.remove("active"); //når man trykker på minSide knappen, fjernes class active på opskrifterDropdown elementet, hvilket skjuler opskrifter dropdown menuen.
    minSideDropdown.classList.toggle("active"); //tilføjer active class på minSideDropdown elementet, hvilket viser min side dropdown menuen.
});



// KLIK UDENFOR = luk begge

// Luk dropdown når man klikker udenfor, ved at fjerne class active når klikket ikke er på dropdown elementerne
document.addEventListener("click", function (e) {
    if (!opskrifterDropdown.contains(e.target)) { // hvis klikket ikke er på opskrifterDropdown elementet
        opskrifterDropdown.classList.remove("active"); // fjern class active på opskrifterDropdown elementet, hvilket skjuler opskrifter dropdown menuen.
    }

    if (!minSideDropdown.contains(e.target)) { // hvis klikket ikke er på minSideDropdown elementet
        minSideDropdown.classList.remove("active"); // fjern class active på minSideDropdown elementet, hvilket skjuler min side dropdown menuen.
    }
});




// JavaScript for hero-slider

// Har brugt følgende til at lave hero-slider: https://www.w3schools.com/howto/howto_js_slideshow.asp

// Variabel til at holde styr på hvilket slide der vises
let slideIndex = 1;

// Kalder funktionen med det samme så første slide vises
showSlides(slideIndex);


// Når man klikker næste/forrige
function plusSlides(n) {

    // Ændrer index (fx +1 eller -1)
    showSlides(slideIndex += n);
}




// Funktion der styrer hvilke slides der vises
function showSlides(n) {

    // Variabel til loop
    let i;

    // Henter alle slides (HTML elementer med class "slide")
    let slides = document.getElementsByClassName("slide");

    // Hvis slide index (n) er større end antal slides, så vis første slide
    if (n > slides.length) {
        slideIndex = 1;
    }

    // Hvis slide index (n) er mindre end 1, så vis sidste slide
    if (n < 1) {
        slideIndex = slides.length;
    }
    //For loop der skjuler alle slides ved at sætte display til "none"
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Indsætter display flex på det aktuelle slide (minus 1 fordi array starter ved 0), så det vises
    slides[slideIndex - 1].style.display = "flex";
}