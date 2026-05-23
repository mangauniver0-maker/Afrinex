const profil = document.querySelector(".profil")
const accounts = document.querySelectorAll(".account-name")
const trigger = document.querySelector(".dashboard-trigger")
const dashboard = document.querySelector(".dashboard")

if(!localStorage.getItem("user")){
    window.location.href = "/product/platform.html"
}

profil.innerHTML=""
accounts.forEach((account)=>{
        account.innerHTML=""
})

const data = JSON.parse(localStorage.getItem("user"))

console.log(data)

const h1 = document.createElement("h1")

h1.textContent = `
        Welcome back, ${data.name}
        `
profil.appendChild(h1)

const p = document.createElement("p")
p.textContent = `
        ${data.name}
        `

accounts.forEach((account)=>{
        account.appendChild(p)
})

trigger.addEventListener('click',()=>{
        dashboard.style.left = 0
})

dashboard.addEventListener('click',()=>{
        dashboard.style.left = "-100%"
})