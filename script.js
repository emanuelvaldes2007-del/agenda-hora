async function confirmarReserva(e) {
    e.preventDefault();

    const botonEnviar = document.querySelector('.btn-principal');
    const textoOriginal = botonEnviar.innerHTML;
    botonEnviar.innerHTML = "Enviando correo...";
    botonEnviar.disabled = true;

    try {
        const formulario = document.getElementById('form-reserva');
        const asignatura = document.getElementById('asignatura').value;
        const fechaHoraRaw = document.getElementById('fecha-hora').value;
        const nombre = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const correo = document.getElementById('correo').value.trim();

        // Formatear la fecha para que se vea legible
        const fechaObj = new Date(fechaHoraRaw);
        const fechaFormateada = isNaN(fechaObj.getTime()) ? fechaHoraRaw : fechaObj.toLocaleString('es-CL', {
            dateStyle: 'full',
            timeStyle: 'short'
        });

        // Envío directo utilizando el formulario mediante EmailJS
        try {
            await emailjs.sendForm('service_agenda', 'template_6wyjvlm', formulario);
            console.log('Correo enviado con éxito al cliente.');
        } catch (errorEmail) {
            console.error('Error al enviar correo con EmailJS:', errorEmail);
        }

        // Rellenar la tarjeta de confirmación en la página
        document.getElementById('conf-asignatura').textContent = asignatura;
        document.getElementById('conf-fechahora').textContent = fechaFormateada;
        document.getElementById('conf-nombre').textContent = nombre;
        document.getElementById('conf-correo').textContent = correo;

        // Cambiar de vista en la interfaz
        document.getElementById('vista-reserva').style.display = 'none';
        document.getElementById('vista-confirmacion').style.display = 'block';

        // Notificación automática a tu WhatsApp (+56965580716)
        const mensajeWhatsApp = `Hola Belen, tienes una nueva reserva de clases:\n\n📚 Asignatura: ${asignatura}\n🗓️ Fecha: ${fechaFormateada}\n👤 Alumno: ${nombre}\n📞 Teléfono: ${telefono}\n📧 Correo: ${correo}`;
        const linkWhatsApp = `https://wa.me/56965580716?text=${encodeURIComponent(mensajeWhatsApp)}`;
        window.open(linkWhatsApp, '_blank');

    } catch (err) {
        console.error('Error general al confirmar reserva:', err);
        alert('Ocurrió un inconveniente al procesar la reserva. Intenta nuevamente.');
    } finally {
        botonEnviar.innerHTML = textoOriginal;
        botonEnviar.disabled = false;
    }
}

function reiniciarReserva() {
    document.getElementById('vista-confirmacion').style.display = 'none';
    document.getElementById('vista-reserva').style.display = 'block';
    document.getElementById('form-reserva').reset();
}