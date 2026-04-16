
// // JavaScript for dropdown menu

// // Hent knappen og dropdown elementet
// const OpskrifterBtnEl = document.getElementById("opskrifterBtn");
// const dropdown = document.querySelector(".dropdown");

// // Tilføj event listener til knappen for at toggle dropdown menuen. Når man trykker på opskrifter knappen, tilføjes eller fjernes class active på dropdown elementet, hvilket viser eller skjuler dropdown menuen.
// OpskrifterBtnEl.addEventListener("click", function (e) {
//     e.preventDefault();
//     dropdown.classList.toggle("active");
// });

// // Luk dropdown hvis man klikker udenfor, ved at fjerne class active når klikket ikke er på dropdown elementet
// document.addEventListener("click", function (e) {
//     if (!dropdown.contains(e.target)) {
//         dropdown.classList.remove("active");
//     }
// });


// JavaScript for dropdown menu


// OPSKRIFTER DROPDOWN

// Hent knappen og dropdown elementet
const opskrifterBtn = document.querySelector("#opskrifterBtn");
const opskrifterDropdown = opskrifterBtn.closest(".dropdown");

// Tilføj event listener til knappen for at toggle dropdown menuen. Når man trykker på opskrifter knappen, tilføjes eller fjernes class active på dropdown elementet, hvilket viser eller skjuler dropdown menuen.
opskrifterBtn.addEventListener("click", function (e) {
    e.preventDefault();
    minSideDropdown.classList.remove("active");
    opskrifterDropdown.classList.toggle("active");
});



// MIN SIDE DROPDOWN

// Hent knappen og dropdown elementet
const minSideBtn = document.querySelector("#minSideBtn");
const minSideDropdown = minSideBtn.closest(".dropdown");

// Tilføj event listener til knappen for at toggle dropdown menuen. Når man trykker på minSide knappen, tilføjes eller fjernes class active på dropdown elementet, hvilket viser eller skjuler dropdown menuen.
minSideBtn.addEventListener("click", function (e) {
    e.preventDefault();
    opskrifterDropdown.classList.remove("active");
    minSideDropdown.classList.toggle("active");
});



// KLIK UDENFOR = luk begge

// Luk dropdown når man klikker udenfor, ved at fjerne class active når klikket ikke er på dropdown elementerne
document.addEventListener("click", function (e) {
    if (!opskrifterDropdown.contains(e.target)) {
        opskrifterDropdown.classList.remove("active");
    }

    if (!minSideDropdown.contains(e.target)) {
        minSideDropdown.classList.remove("active");
    }
});