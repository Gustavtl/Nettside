console.log("Script kjører ✅");
console.log("sidemenu:", document.getElementById("sidemenu"));

var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(element, tabname){
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    element.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px"
}


// -------------------kontakt skjema innsending------------------------


const scriptURL = 'https://script.google.com/macros/s/AKfycbwAsnWVea4YT1-qfDePz_jDmHbXiwRBFrWU3L-du_gtgwAR6KdYMqj5c2uE_cNnplI0/exec';
const siteKey = '6Lfdw3ErAAAAAI9X9hyaiJJ7ERQOZAiD0yXVoDHy';
const form = document.forms['submit-to-google-sheet'];

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    grecaptcha.ready(function() {
      grecaptcha.execute(siteKey, { action: 'submit' }).then(function(token) {
        let recaptchaInput = form.querySelector('input[name="g-recaptcha-response"]');
        if (!recaptchaInput) {
          recaptchaInput = document.createElement('input');
          recaptchaInput.type = 'hidden';
          recaptchaInput.name = 'g-recaptcha-response';
          form.appendChild(recaptchaInput);
        }
        recaptchaInput.value = token;

        fetch(scriptURL, {
          method: 'POST',
          body: new FormData(form)
        })
        .then(response => response.text())
        .then(data => {
          if (data === 'OK') {
            alert('Takk! Meldingen din er sendt.');
            form.reset();
          } else {
            alert('Noe gikk galt: ' + data);
          }
        })
        .catch(error => {
          alert('Noe gikk galt. Prøv igjen.');
          console.error('Error!', error);
        });
      });
    });
  });
}


// ---------------------------lightbox-modal------------------------


