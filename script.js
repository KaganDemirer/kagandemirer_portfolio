$(document).ready(function() {
    const karriere_line_elements = document.getElementsByClassName('karriere-line-element');
    const projekte_picture_div = document.getElementsByClassName('projekte-picture-div');
    for (const element of karriere_line_elements) {
        observer.observe(element);
    }
    for (const element of projekte_picture_div) {
        observer.observe(element);
    }
    currentSlide(1);
    const age = Math.floor((new Date() - new Date(2000, 8, 8)) / 3.15576e+10);
    setTimeout(() => {
        typeWriter("Hallo!")
        .then(() => {
            // Wait for 3 seconds before starting typeWriterDelete
            return new Promise((resolve) => {
                setTimeout(resolve, 1500);
            });
        })
        .then(() => typeWriterDelete(6))
        .then(() => {
            // Wait for 3 seconds before starting the next typeWriter
            return new Promise((resolve) => {
                setTimeout(resolve, 700);
            });
        })
        .then(() => typeWriter("Ich bin Kagan Demirer, " + age + " Jahre alt und komme aus Lauffen am Neckar. Ich absolviere mein duales Studium bei der W&W Informatik GmbH. Offenheit, Ehrgeiz und Flexibilität prägen meine Persönlichkeit. Pünktlichkeit, Zuverlässigkeit und Verantwortungsbewusstsein sind für mich selbstverständlich. Meine kommunikativen Fähigkeiten und Hilfsbereitschaft erleichtern den Umgang mit anderen, und ich bewahre auch in stressigen Situationen Geduld."))
    }, 4500); // Wait for 2 seconds before starting the first typeWriter
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-animation');
        return; // if we added the class, exit the function
        }

        // We're not intersecting, so remove the class!
        entry.target.classList.remove('opacity-animation');
    });
});



function typeWriter(txt) {
    return new Promise((resolve) => {
        let i = 0;
        function type() {
            let randspeed = Math.floor(Math.random() * 50) + 10;

            if (i < txt.length) {
                console.log(document.getElementById("vorstellung-text").innerHTML);
                let text = document.getElementById("vorstellung-text").innerHTML.replace('<span id="vorstellung-text-cursor"></span>', "");
                document.getElementById("vorstellung-text").innerHTML = text + txt.charAt(i) + '<span id="vorstellung-text-cursor"></span>';
                i++;
                setTimeout(type, randspeed);
            } else {
                resolve();
            }
        }
        type();
    });
}

function typeWriterDelete(amount) {
    return new Promise((resolve) => {
        let i = 0;
        function deleteText() {
            if (i < amount) {
                let txt = document.getElementById("vorstellung-text").innerText;
                if (txt.length > 0) {
                    document.getElementById("vorstellung-text").innerText = txt.substring(0, txt.length - 1);
                    document.getElementById("vorstellung-text").innerHTML += "<span id='vorstellung-text-cursor'></span>"
                    i++;
                    setTimeout(deleteText, 200);
                } else {
                    resolve(); // Resolve the promise when deletion is done
                }
            } else {
                resolve(); // Resolve the promise when the desired amount is deleted
            }
        }
        deleteText();
    });
}

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
