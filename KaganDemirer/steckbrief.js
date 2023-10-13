$(document).ready(function() {
    const karriere_line_elements = document.getElementsByClassName('karriere-line-element');
    for (let i = 0; i < karriere_line_elements.length; i++) {
        observer.observe(karriere_line_elements[i]);
    }
    setTimeout(() => {
        typeWriter("Hallo!")
        .then(() => {
            // Wait for 3 seconds before starting typeWriterDelete
            return new Promise((resolve) => {
                setTimeout(resolve, 3000);
            });
        })
        .then(() => typeWriterDelete(6))
        .then(() => {
            // Wait for 3 seconds before starting the next typeWriter
            return new Promise((resolve) => {
                setTimeout(resolve, 700);
            });
        })
        .then(() => typeWriter("Ich bin Kagan Demirer, 23 Jahre alt und komme aus Walheim. Ich bin ein sehr offener und freundlicher Mensch. Ich bin sehr motiviert und lerne gerne neue Dinge. Ich bin sehr sportlich und spiele gerne Fussball. Ich bin sehr interessiert an der Informatik und möchte mich in diesem Bereich weiterentwickeln."));
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
                document.getElementById("vorstellung-text").innerHTML += txt.charAt(i);
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
                let txt = document.getElementById("vorstellung-text").innerHTML;
                if (txt.length > 0) {
                    document.getElementById("vorstellung-text").innerHTML = txt.substring(0, txt.length - 1);
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
