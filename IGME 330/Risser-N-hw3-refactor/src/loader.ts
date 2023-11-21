import * as main from "./main";
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

let file = window.location.pathname.split("/");
if(file[file.length - 1] != "about.html")
{
    main.init();
}
