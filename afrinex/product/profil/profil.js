const profil = document.querySelector(".profil")
const vc = document.querySelector(".vc")
const yae = document.querySelector(".yae")
const mt = document.querySelector(".mt")

if(!localStorage.getItem("user")){
    window.location.href = "/product/platform.html"
}

profil.innerHTML=""

const data = JSON.parse(localStorage.getItem("user"))

console.log(data)

const h1 = document.createElement("h1")

h1.textContent = `
        Welcome ${data.name}
`

profil.appendChild(h1)

if(data.profil){
    if(data.profil === "vc"){
        window.location.href = "/product/profil/venture-capital/vc.html"
    } else if(data.profil === "yae"){
        window.location.href = "/product/profil/young-african-entrepreneurs/yae.html"
    } else if(data.profil === "mt"){
        window.location.href = "/product/profil/mentor/mt.html"
    }
}

vc.addEventListener("click",()=>{
    const profil = {
        ...data,
        profil: "vc"
    }
    localStorage.setItem("user",JSON.stringify(profil))
    window.location.href = "/product/profil/venture-capital/vc.html"
})

yae.addEventListener("click",()=>{
    const profil = {
        ...data,
        profil: "yae"
    }
    localStorage.setItem("user",JSON.stringify(profil))
    window.location.href = "/product/profil/young-african-entrepreneurs/yae.html"
})

mt.addEventListener("click",()=>{
    const profil = {
        ...data,
        profil: "mt"
    }
    localStorage.setItem("user",JSON.stringify(profil))
    window.location.href = "/product/profil/mentor/mt.html"
})