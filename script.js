async function confirmarReserva(e) {
    e.preventDefault();

    const botonEnviar = document.querySelector('.btn-principal');
    const textoOriginal = botonEnviar.innerHTML;
    botonEnviar.innerHTML = "Enviando correo...";
    botonEnviar.disabled = true;

    try {
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

        // Parámetros para tu plantilla 'template_6wyjvlm'
        const templateParams = {
            asignatura: asignatura,
            fecha_hora: fechaFormateada,
            nombre_alumno: nombre,
            telefono_alumno: telefono,
            correo_alumno: correo,
            to_email: correo
        };

        // Enviar mediante EmailJS
        const response = await emailjs.send('service_agenda', 'template_6wyjvlm', templateParams);
        console.log('Correo enviado con éxito:', response.status, response.text);

        // Rellenar datos en la pantalla de éxito
        document.getElementById('conf-asignatura').textContent = asignatura;
        document.getElementById('conf-fechahora').textContent = fechaFormateada;
        document.getElementById('conf-nombre').textContent = nombre;
        document.getElementById('conf-correo').textContent = correo;

        // Cambiar de vista
        document.getElementById('vista-reserva').style.display = 'none';
        document.getElementById('vista-confirmacion').style.display = 'block';

        // Notificación automática a tu WhatsApp (+56965580716)
        const mensajeWhatsApp = `Hola Belen, tienes una nueva reserva de clases:\n\n📚 Asignatura: ${asignatura}\n🗓️ Fecha: ${fechaFormateada}\n👤 Alumno: ${nombre}\n📞 Teléfono: ${telefono}\n📧 Correo: ${correo}`;
        const linkWhatsApp = `https://wa.me/56965580716?text=${encodeURIComponent(mensajeWhatsApp)}`;
        window.open(linkWhatsApp, '_blank');

    } catch (err) {
        console.error('Error detallado al enviar correo:', err);
        alert('Hubo un problema al enviar el correo. Revisa la consola para más detalles.');
    } finally {
        botonEnviar.innerHTML = textoOriginal;
        botonEnviar.disabled = false;
    }
}

function reiniciarReserva() {
    document.getElementById('vista-confirmacion').style.display = 'none';
    document.getElementById('vista-reserva').style.display = 'block';
    document.querySelector('form').reset();
}