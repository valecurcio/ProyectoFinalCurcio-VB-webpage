//JS asociado al modal de Suscripción al Newsletter

//Objeto:
class Subscriber {
    constructor(name, age, email, lang) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.lang = lang;
    }
}
//Array:
let subscribers = []

//Variables
const menu = $("#mobile-menu");
const menuLinks = $(".nav-menu");

let modal = $("#email-modal");
let openBtn = $(".main-btn");
let closeBtn = $(".close-btn");
let form = $("#form");
let name = $("#name");
let age = $("#age");
let email = $("#email");
let lang = $("#lang");


//Agrego animaciones concatenadas con jQuery:
openBtn.fadeOut(1000).fadeIn(1000);

//Eventos asociados al modal
openBtn.on("click", () => {
    modal.slideDown("slow");
});


closeBtn.on("click", (e) => {
    if (e.target === modal) {
        modal.hide();
    }
})

//FUNCIONES --------------------------------------------------------------------------------

//Valido mi form con jQuery:
jQuery(function () {
    jQuery("#form").validate({
        rules: {
            name: {
                required: true,
                minlength: 4,
                maxlength: 20
            },
            age: {
                required: false,
                number: true
            },
            email: {
                required: true,
                minlength: 6,
                maxlength: 30
            },
            lang: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Por favor, ingrese su nombre",
                minlength: $.format("Ingrese al menos {0} caracteres"),
                maxlength: $.format("{0} caracteres son demasiados!")
            },
            email: {
                required: "Por favor, ingrese su email",
                minlength: $.format("Ingrese menos {0} caracteres"),
                maxlength: $.format("{0} caracteres son demasiados!")
            },
            lang: {
                required: "Por favor, seleccione un idioma"
            }
        }
    });
});

//Agrego los datos del nuevo suscriptor al array Subscriber y devuelvo un mensaje diferente en función del idioma elegido
function showMessage(e) {

    e.preventDefault();

    let name = $("#name").val();
    let age = $("#age").val();
    let email = $("#email").val();
    let lang = $("#lang").val();
    let result = document.createElement("h2");
    if (name === "" || email === '' || lang === '') {
        return;
    } else {
        saveData(name, age, email, lang);
    }

    if (lang === "eng") {
        form.on("submit", (e) => {
            e.preventDefault();
        })
        result.textContent = `Thank you for subscribing ${name}! We will send you our newsletter in English to ${email}`;
        form.append(result);
        setTimeout(() => {
            result.remove();
            $("#form").trigger("reset");
        }, 7000);

    } else if (lang === "spa") {
        form.on("submit", (e) => {
            e.preventDefault();
        })
        result.textContent = `Gracias por suscribirte ${name}! Te enviaremos nuestro newsletter en Español a ${email}`;
        form.append(result);
        setTimeout(() => {
            result.remove();
            $("#form").trigger("reset");
        }, 7000);
    }
}

function saveData(name, age, email, lang) {
    let subscriber = new Subscriber(name, age, email, lang);
    subscribers.push(subscriber);
    localStorage.setItem('subscribers', JSON.stringify(subscribers));
    console.log(subscribers);

}

//Eventos:
form.on("submit", showMessage);

closeBtn.on("click", () => {
    modal.slideUp();

});
