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

    // Rellenar la tarjeta de confirmación en pantalla
    document.getElementById('conf-asignatura').textContent = asignatura;
    document.getElementById('conf-fechahora').textContent = fechaFormateada;
    document.getElementById('conf-nombre').textContent = nombre;
    document.getElementById('conf-correo').textContent = correo;

    // Cambiar de vista
    document.getElementById('vista-reserva').style.display = 'none';
    document.getElementById('vista-confirmacion').style.display = 'block';

    // 1. Enviar notificación automática a tu WhatsApp (+56965580716)
    const mensajeWhatsApp = `Hola Belen, tienes una nueva reserva de clases:\n\n📚 Asignatura: ${asignatura}\n🗓️ Fecha: ${fechaFormateada}\n👤 Alumno: ${nombre}\n📞 Teléfono: ${telefono}\n📧 Correo: ${correo}`;
    const linkWhatsApp = `https://wa.me/56965580716?text=${encodeURIComponent(mensajeWhatsApp)}`;
    
    // Abre una pestaña invisible o redirige brevemente a WhatsApp para avisarte al celular
    window.open(linkWhatsApp, '_blank');

    // 2. Simular el envío de correo hacia tu dirección (emanuelvaldes2007@gmail.com)
    const asuntoCorreo = `Nueva Reserva de Clases - ${asignatura} (${nombre})`;
    const cuerpoCorreo = `Hola Belen,\n\nSe ha registrado una nueva clase particular:\n- Asignatura: ${asignatura}\n- Fecha y Hora: ${fechaFormateada}\n- Solicitante: ${nombre}\n- Teléfono: ${telefono}\n- Correo del alumno: ${correo}`;
    const linkMailto = `mailto:emanuelvaldes2007@gmail.com?subject=${encodeURIComponent(asuntoCorreo)}&body=${encodeURIComponent(cuerpoCorreo)}`;
    
    // Opcional: abre el cliente de correo para respaldar el aviso
    setTimeout(() => {
        window.location.href = linkMailto;
    }, 1000);
}

function reiniciarReserva() {
    document.getElementById('vista-confirmacion').style.display = 'none';
    document.getElementById('vista-reserva').style.display = 'block';
    // Limpiar formulario
    document.querySelector('form').reset();
}