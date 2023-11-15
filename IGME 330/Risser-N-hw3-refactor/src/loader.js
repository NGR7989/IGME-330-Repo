import * as main from "./main.js";
// load fonts, sounds, whatever ...

// mobile menu
const burgerIcon = document.querySelector("#burger");
const navbarMenu = document.querySelector("#nav-links");

if(burgerIcon != null)
{
    burgerIcon.addEventListener("click", () =>
    {
        navbarMenu.classList.toggle("is-active");
    })
}


// Only play when app is loaded
main.init();