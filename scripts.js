// ================== ELEMENTOS ==================
const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");
const btnAgregar = document.getElementById("btnAgregar");

const loginSection = document.getElementById("loginSection");
const mainContent = document.getElementById("mainContent");

const formLogin = document.getElementById("formLogin");

let peliculaEditando = null;

// ================== USUARIOS DE PRUEBA ==================
const usuarios = [
  { usuario: "admin", password: "admin123" },
  { usuario: "usuario", password: "1234" },
  { usuario: "demo", password: "demo" }
];

// ================== AL CARGAR ==================
document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("usuarioLogueado");

  if (user) {
    entrar();
    mostrarPeliculas();
  }
});

// ================== LOGIN ==================
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  const usuario = document.getElementById("inputUser").value.trim();
  const password = document.getElementById("inputPassword").value.trim();

  const existe = usuarios.find(
    u => u.usuario === usuario && u.password === password
  );

  if (existe) {
    localStorage.setItem("usuarioLogueado", usuario);
    entrar();
  } else {
    alert("❌ Usuario o contraseña incorrectos");
  }
});

// ================== LOGOUT ==================
btnLogout.addEventListener("click", () => {
  localStorage.removeItem("usuarioLogueado");
  location.reload();
});

// ================== FUNCIONES ==================
function entrar() {
  loginSection.style.display = "none";
  mainContent.style.display = "block";

  btnLogin.style.display = "none";
  btnLogout.style.display = "inline-block";
  btnAgregar.style.display = "inline-block";
}

  const btnGuardarPelicula = document.getElementById("btnGuardarPelicula");
const formPelicula = document.getElementById("formPelicula");
const gridPeliculas = document.getElementById("gridPeliculas");

btnGuardarPelicula.addEventListener("click", () => {
  if (!formPelicula.checkValidity()) {
    formPelicula.reportValidity();
    return;
  }

  const pelicula = {
    id: Date.now(),
    titulo: inputTitulo.value,
    genero: inputGenero.value,
    director: inputDirector.value,
    ano: inputAno.value,
    calificacion: inputCalificacion.value,
    descripcion: inputDescripcion.value,
    imagen: inputImagen.value
  };

  const peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];
  peliculas.push(pelicula);
  localStorage.setItem("peliculas", JSON.stringify(peliculas));

  formPelicula.reset();
  bootstrap.Modal.getInstance(
    document.getElementById("modalPelicula")
  ).hide();

  mostrarPeliculas();
});

function mostrarPeliculas() {
  const peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];
  gridPeliculas.innerHTML = "";

  peliculas.forEach(p => {
    gridPeliculas.innerHTML += `
      <div class="col-md-3">
        <div class="card h-100 shadow-sm">
          <img src="${p.imagen}" class="card-img-top" alt="${p.titulo}">
          <div class="card-body">
            <h5 class="card-title">${p.titulo}</h5>
            <p class="card-text">${p.genero}</p>
            <button class="btn btn-sm btn-primary w-100"
              onclick="verDetalles(${p.id})">
              Ver detalles
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

function verDetalles(id) {
  const peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];
  const pelicula = peliculas.find(p => p.id === id);

  if (!pelicula) return;

  document.getElementById("detallesTitulo").textContent = pelicula.titulo;
  document.getElementById("detallesImagen").src = pelicula.imagen;
  document.getElementById("detallesGenero").textContent = pelicula.genero;
  document.getElementById("detallesDirector").textContent = pelicula.director;
  document.getElementById("detallesAno").textContent = pelicula.ano;
  document.getElementById("detallesCalificacion").textContent = pelicula.calificacion;
  document.getElementById("detallesDescripcion").textContent = pelicula.descripcion;

  const modal = new bootstrap.Modal(
    document.getElementById("modalDetalles")
  );
  modal.show();
}

function mostrarPeliculas() {
  const peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];
  gridPeliculas.innerHTML = "";

  peliculas.forEach(p => {
    gridPeliculas.innerHTML += `
      <div class="col-md-3">
        <div class="card h-100 shadow-sm">
          <img src="${p.imagen}" class="card-img-top" alt="${p.titulo}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${p.titulo}</h5>
            <p class="card-text">${p.genero}</p>

            <div class="mt-auto d-grid gap-2">
              <button class="btn btn-sm btn-primary"
                onclick="verDetalles(${p.id})">
                Ver detalles
              </button>

              <button class="btn btn-sm btn-warning"
                onclick="editarPelicula(${p.id})">
                Editar
              </button>

              <button class="btn btn-sm btn-danger"
                onclick="eliminarPelicula(${p.id})">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

function editarPelicula(id) {
  const peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];
  const pelicula = peliculas.find(p => p.id === id);

  if (!pelicula) return;

  peliculaEditando = id;

  document.getElementById("modalTitulo").textContent = "Editar Película";

  inputTitulo.value = pelicula.titulo;
  inputGenero.value = pelicula.genero;
  inputDirector.value = pelicula.director;
  inputAno.value = pelicula.ano;
  inputCalificacion.value = pelicula.calificacion;
  inputDescripcion.value = pelicula.descripcion;
  inputImagen.value = pelicula.imagen;

  const modal = new bootstrap.Modal(
    document.getElementById("modalPelicula")
  );
  modal.show();
}

btnGuardarPelicula.addEventListener("click", () => {
  if (!formPelicula.checkValidity()) {
    formPelicula.reportValidity();
    return;
  }

  let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];

  if (peliculaEditando) {
    peliculas = peliculas.map(p =>
      p.id === peliculaEditando
        ? {
            ...p,
            titulo: inputTitulo.value,
            genero: inputGenero.value,
            director: inputDirector.value,
            ano: inputAno.value,
            calificacion: inputCalificacion.value,
            descripcion: inputDescripcion.value,
            imagen: inputImagen.value
          }
        : p
    );
  } else {
    peliculas.push({
      id: Date.now(),
      titulo: inputTitulo.value,
      genero: inputGenero.value,
      director: inputDirector.value,
      ano: inputAno.value,
      calificacion: inputCalificacion.value,
      descripcion: inputDescripcion.value,
      imagen: inputImagen.value
    });
  }

  localStorage.setItem("peliculas", JSON.stringify(peliculas));

  peliculaEditando = null;
  formPelicula.reset();
  document.getElementById("modalTitulo").textContent = "Agregar Película";

  bootstrap.Modal.getInstance(
    document.getElementById("modalPelicula")
  ).hide();

  mostrarPeliculas();
});

function eliminarPelicula(id) {
  if (!confirm("¿Seguro que deseas eliminar esta película?")) return;

  let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];
  peliculas = peliculas.filter(p => p.id !== id);

  localStorage.setItem("peliculas", JSON.stringify(peliculas));
  mostrarPeliculas();
}





