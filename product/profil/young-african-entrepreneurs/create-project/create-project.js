const profil = document.querySelector(".profil");
const account = document.querySelector(".account-name");
const form = document.querySelector("form");
const dialog = document.querySelector("#myDialog");
const openBtn = document.querySelector("#openBtn");
const closeBtn = document.querySelector("#closeBtn");

if (!localStorage.getItem("user")) {
  window.location.href = "/product/platform.html";
}

openBtn.addEventListener("click", () => {
  dialog.showModal(); // Recommended for most use cases
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const projects = JSON.parse(localStorage.getItem("projects"));

  const project = [];

  if (projects) {
    project.push(...projects, Object.fromEntries(formData.entries()));
  } else {
    project.push(Object.fromEntries(formData.entries()));
  }
  localStorage.setItem("projects", JSON.stringify(project));

  console.log(project);
  form.reset()
});

const data = JSON.parse(localStorage.getItem("user"));

console.log(data);

profil.appendChild(h1);

const p = document.createElement("p");

p.textContent = `
        ${data.name}
        `;

account.appendChild(p);
