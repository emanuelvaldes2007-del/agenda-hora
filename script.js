function confirmarReserva(e) {
    e.preventDefault();

    // Obtener valores del formulario
    const asignatura = document.getElementById('asignatura').value;
    const fechaHoraRaw = document.getElementById('fecha-hora').value;
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const correo = document.getElementById('correo').value.trim();

    // Formatear la fecha para que se vea legible
    const fechaObj = new Date(fechaHoraRaw);
    const fechaFormateada = fechaObj.toLocaleString('es-CL', {
        dateStyle: 'full',
        timeStyle: 'short'
    });

    // Parámetros para EmailJS (Asegúrate de configurar tu plantilla en EmailJS usando estas variables: {{nombre_alumno}}, {{asignatura}}, {{fecha_hora}}, {{correo_alumno}}, {{telefono_alumno}})
    const parametrosEmail = {
        nombre_alumno: nombre,
        asignatura: asignatura,
        fecha_hora: fechaFormateada,
        correo_alumno: correo,
        telefono_alumno: telefono,
        to_email: correo // Variable para que EmailJS dirija el mensaje al correo ingresado por el usuario
    };

    const serviceID = "service_agenda";
    const templateID = "template_6wyjvlm";

    // Enviar correo automático mediante EmailJS al usuario
    emailjs.send(serviceID, templateID, parametrosEmail)
        .then(() => {
            console.log('Correo enviado con éxito al cliente.');
        }, (error) => {
            console.error('Error al enviar el correo:', error);
        });

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
}

function reiniciarReserva() {
    document.getElementById('vista-confirmacion').style.display = 'none';
    document.getElementById('vista-reserva').style.display = 'block';
    document.querySelector('form').reset();
}