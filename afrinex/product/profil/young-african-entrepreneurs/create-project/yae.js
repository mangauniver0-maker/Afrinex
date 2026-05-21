const profil = document.querySelector(".profil")
const accounts = document.querySelectorAll(".account-name")
const trigger = document.querySelector(".dashboard-trigger")
const dashboard = document.querySelector(".dashboard")

if(!localStorage.getItem("user")){
    window.location.href = "/product/platform.html"
}

trigger.addEventListener('click',()=>{
        dashboard.style.left = 0
})

dashboard.addEventListener('click',()=>{
        dashboard.style.left = "-100%"
})

accounts.forEach((account)=>{
        account.innerHTML=""
})

const data = JSON.parse(localStorage.getItem("user"))

console.log(data)

const p = document.createElement("p")
p.textContent = `
        ${data.name}
        `

accounts.forEach((account)=>{
        account.appendChild(p)
})
