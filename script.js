const searchInput = document.getElementById("searchInput");
const suggestionsContainer = document.getElementById("suggestions");
const invitadosContainer = document.getElementById("invitados");


// Cargar el archivo JSON de invitados
fetch("https://damp-wall-production.up.railway.app/api/guests")
  .then((response) => response.json())
  .then((data) => {
    const invitados = data;
    console.log(data);

    // Calcular la suma de acompañantes
    const totalAcompanantes = invitados.reduce(
      (a, b) => a + parseInt(b.acompañantes),
      0
    );

    // Mostrar el resultado en la consola
    console.log(`El total de acompañantes es: ${totalAcompanantes}`);
    console.log(`El total de Invitados es ${invitados.length}`);
    console.log(
      `El total Completo de Invitados es ${
        invitados.length + totalAcompanantes
      }`
    );

    // Función para mostrar sugerencias en tiempo real
    function showSuggestions(searchTerm) {
      suggestionsContainer.innerHTML = "";

      // Si el campo está vacío, mostrar todos los invitados
      if (searchTerm === "") {
        suggestionsContainer.innerHTML = "";
        const ul = document.createElement("ul");
        ul.className = "list-group";
        ul.style.overflow = "auto";

        invitados.forEach((invitado) => {
          const li = document.createElement("li");
          li.className = "list-group-item";
          li.textContent = invitado.nombre;
          li.addEventListener("click", () => {
            searchInput.value = invitado.nombre;
            suggestionsContainer.innerHTML = "";
            displayInvitadoDetails(invitado);
          });
          ul.appendChild(li);
        });

        suggestionsContainer.appendChild(ul);
      } else {
        // Filtrar los invitados por el término de búsqueda
        const filteredInvitados = invitados.filter((invitado) =>
          invitado.nombre.toLowerCase().includes(searchTerm)
        );

        // Mostrar las sugerencias
        const ul = document.createElement("ul");
        ul.className = "list-group";
        ul.style.overflow = "auto";

        filteredInvitados.forEach((invitado) => {
          const li = document.createElement("li");
          li.className = "list-group-item";
          li.textContent = invitado.nombre;
          li.addEventListener("click", () => {
            searchInput.value = invitado.nombre;
            suggestionsContainer.innerHTML = "";
            displayInvitadoDetails(invitado);
          });
          ul.appendChild(li);
        });

        suggestionsContainer.appendChild(ul);
      }
    }

    // Función para mostrar los detalles del invitado
    function displayInvitadoDetails(invitado) {
      const invitadoDiv = document.createElement("div");
      invitadoDiv.className =
        'card text-bg-light mb-3" style="max-width: 18rem;';
      invitadoDiv.innerHTML = `
        <div class="card-header text-center">Invitacion</div>
        <div class="card-body">
          <h5 class="card-title text-center">${invitado.nombre}</h5>
          <p class="card-text text-center">
            Pase para: ${parseInt(invitado.acompañantes) + 1} personas<br> 
            <span style="color: red;">Los niños menores de 9 años no necesitan pase de acompañante</span>
          </p>
          <a class="btn btn-primary mb-3" href="home.html?invitado=${encodeURIComponent(
            invitado.nombre
          )}">Ver invitacion</a>
        </div>
      
        `;
      invitadosContainer.appendChild(invitadoDiv);
    }

    // Manejar la entrada del usuario en tiempo real
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      showSuggestions(searchTerm);
    });

    // ... Resto del código ...
  })
  .catch((error) => console.error("Error al cargar los invitados:", error));

// crear confirmacion
const form = document.querySelector("#confir");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = form.querySelector('input[name="name"]');
  console.log(name.value);
  const email = form.querySelector('input[name="_replyto"]');
  const events = form.querySelector('select[name="events"]');
  const message = form.querySelector('textarea[name="message"]');

  const data = {
    name: name.value.toUpperCase(),
    email: email.value.toUpperCase(),
    events: events.value.toUpperCase(),
    message: message.value.toUpperCase(),
  };
  console.log(data);

  fetch("https://damp-wall-production.up.railway.app/api/confirmations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      name.value = ''
      email.value = ''
      events.value = ''
      message.value = ''
      alert(data.msg)
    })
    .catch((error) => {
      console.log(error);
    });
});
