// Obtener el parámetro del nombre del invitado de la URL
const urlParams = new URLSearchParams(window.location.search);
const invitadoNombre = urlParams.get('invitado');

// Cargar el archivo JSON de invitados
fetch('https://damp-wall-production.up.railway.app/api/guests')
  .then(response => response.json())
  .then(data => {
    const detallesContainer = document.getElementById('detalles');
    const invitado = data.find(i => i.nombre === invitadoNombre);

    if (invitado) {
      const detallesDiv = document.createElement('div');
      detallesDiv.className = 'invitado-details-card';
      detallesDiv.innerHTML = `
      <p>Es un placer que puedas acompañarnos en este dia tan especial para nosotros</p>
      <h4>Invitad@</h4>
        <h3>${invitado.nombre}</h3>
        <p>Pase para: ${parseInt(invitado.acompañantes) +1} persona</p>
      `;
      detallesContainer.appendChild(detallesDiv);
      const form = document.querySelector("#confir");
      const name = form.querySelector('input[name="name"]');
      name.value = invitado.nombre
    } else {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = 'Invitado no encontrado.';
      detallesContainer.appendChild(errorDiv);
    }
  })
  .catch(error => console.error('Error al cargar los datos:', error));
