const bar = document.querySelector(".navbar")
const close = document.querySelector(".close")
const links = document.querySelectorAll("nav a")
const nav = document.querySelector("nav")

bar.addEventListener('click', ()=>{
    nav.classList.add("nav-appear")
})

close.addEventListener('click', ()=>{
    nav.classList.remove("nav-appear")
})

links.forEach((a)=>{
    a.addEventListener('click', ()=>{
    nav.classList.remove("nav-appear")
})
})
