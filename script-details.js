// Obtener el parámetro del nombre del invitado de la URL
const urlParams = new URLSearchParams(window.location.search);
const invitadoNombre = urlParams.get("invitado");

// Cargar el archivo JSON de invitados
fetch("https://renzo971.github.io/xvanos/invitados.json")
  .then((response) => response.json())
  .then((data) => {
    const detallesContainer = document.getElementById("detalles");
    const invitado = data.find((i) => i.nombre === invitadoNombre);

    if (invitado) {
      const detallesDiv = document.createElement("div");
      detallesDiv.className = "invitado-details-card";
      detallesDiv.innerHTML = `
      <p>Es un placer que puedas acompañarme en este dia tan especial para mi y disfrutar de este momento juntos</p>
        <h3>${invitado.nombre}</h3>
      `;
      detallesContainer.appendChild(detallesDiv);
      const form = document.querySelector("#confir");
      const name = form.querySelector('input[name="name"]');
      name.value = invitado.nombre;
    } else {
      const errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      errorDiv.textContent = "Invitado no encontrado.";
      detallesContainer.appendChild(errorDiv);
    }
  })
  .catch((error) => console.error("Error al cargar los datos:", error));
