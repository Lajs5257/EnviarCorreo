//Variable
//Campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
//Botones
const btnEnviar = document.querySelector('#enviar');
const resetBtn = document.querySelector('#resetBtn');
//Formulario
const formulario = document.querySelector('#enviar-mail');
//ExpresionRegular
const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


//Event Listeners
eventListeners();
function eventListeners() {
    //Hasta que carga completamente
    document.addEventListener('DOMContentLoaded', desactivarEnviar);

    //Campos
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    
    //Botones
    formulario.addEventListener('submit', enviarEmail);
    resetBtn.addEventListener('click', resetFormulario);
}

//Funciones
function validarFormulario(e) {
    const campo = e.target;

    if (campo.value.length > 0) {
        inputValido(campo);
    } else {
        inputInvalido(campo);
    }

    if (campo.value.length > 0 && campo.type === 'email') {
        validarEmail(campo);
    }

    if (regExp.test(email.value) && email.value !== '' && asunto.value !== '' && mensaje.value !== '') {
        activarEnviar();
    } else {
        desactivarEnviar();
        mostrarError('Todos los campos son obligatorios');
    }
}

function activarEnviar() {
    btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
}

function desactivarEnviar() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function inputValido(campo) {
    campo.classList.remove('border-red-500');
    campo.classList.add('border-green-500');
    eliminarError();
}

function inputInvalido(campo) {
    campo.classList.remove('border-green-500');
    campo.classList.add('border-red-500');
    eliminarError();
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');

    if (errores.length === 0) formulario.appendChild(mensajeError);
}

function eliminarError() {
    const error = document.querySelector('p.error');
    if (error) error.remove();
}

function validarEmail(campo) {
    const mensaje = campo.value.toLowerCase();

    if (regExp.test(mensaje)) {
        inputValido(campo);
    } else {
        inputInvalido(campo);
        mostrarError('El email no es valido');
    }
}

function enviarEmail(e) {
    e.preventDefault();

    desactivarEnviar();

    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    const enviado = document.createElement('p');
    enviado.textContent = 'Mensaje enviado correctamente';
    enviado.classList.add('border', 'border-green-500', 'text-green-500', 'p-3', 'mt-5', 'text-center');

    setTimeout(() => {
        spinner.style.display = 'none';

        formulario.appendChild(enviado);

        setTimeout(() => {
            enviado.remove();
            formulario.reset();
            eliminarBordes();
        }, 5000);
    }, 3000);
}

function resetFormulario(e) {
    e.preventDefault();

    formulario.reset();
    eliminarBordes()
    eliminarError();
}

function eliminarBordes() {
    email.classList.remove('border-red-500', 'border-green-500');
    asunto.classList.remove('border-red-500', 'border-green-500');
    mensaje.classList.remove('border-red-500', 'border-green-500');
}