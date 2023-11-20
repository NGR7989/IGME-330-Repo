// mobile menu
const burgerIcon = document.querySelector("#burger");
const navbarMenu = document.querySelector("#nav-links");

if(burgerIcon != null && navbarMenu != null)
{
    burgerIcon.addEventListener("click", () =>
    {
        navbarMenu.classList.toggle("is-active");
    })
}