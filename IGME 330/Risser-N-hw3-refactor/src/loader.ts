import * as main from "./main.js";
// load fonts, sounds, whatever ...

// mobile menu
const burgerIcon = document.querySelector("#burger");
const navbarMenu = document.querySelector("#nav-links");

if(burgerIcon != null && navbarMenu != null)
{
    // about page 
    burgerIcon.addEventListener("click", () =>
    {
        navbarMenu.classList.toggle("is-active");
    })
}
else
{
    // Only play when app is loaded
    main.init();
}

