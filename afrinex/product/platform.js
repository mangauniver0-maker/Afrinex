const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    localStorage.setItem("user",JSON.stringify(data))

    console.log(data);
    
    window.location.href = "/product/profil/profil.html"

});

if(localStorage.getItem("user")){
    window.location.href = "/product/profil/profil.html"
}