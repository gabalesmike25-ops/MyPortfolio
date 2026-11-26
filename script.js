
/* ===================================================== */
/* MOBILE MENU                                           */
/* ===================================================== */

const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

if (menuIcon && navbar) {

    menuIcon.addEventListener("click", () => {

        navbar.classList.toggle("active");

        if (navbar.classList.contains("active")) {
            menuIcon.classList.remove("bx-menu");
            menuIcon.classList.add("bx-x");
        } else {
            menuIcon.classList.remove("bx-x");
            menuIcon.classList.add("bx-menu");
        }

    });

}


/* ===================================================== */
/* CLOSE MOBILE MENU                                     */
/* ===================================================== */

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (navbar) {
            navbar.classList.remove("active");
        }

        if (menuIcon) {
            menuIcon.classList.remove("bx-x");
            menuIcon.classList.add("bx-menu");
        }

    });

});


/* ===================================================== */
/* ACTIVE NAVIGATION                                     */
/* ===================================================== */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + currentSection
        ) {
            link.classList.add("active");
        }

    });

});


/* ===================================================== */
/* REVEAL ANIMATION                                      */
/* ===================================================== */

const revealElements = document.querySelectorAll(
    ".reveal-left, .reveal-right"
);

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateX(0)";

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* ===================================================== */
/* CONTACT FORM → EMAILJS                                */
/* ===================================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    // Initialize EmailJS
    emailjs.init({
        publicKey: "IV-H4fhkoeVEFb03v"
    });

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            alert("Please complete all fields.");
            return;
        }

        if (!submitButton) return;

        // Prevent multiple submissions
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        // Send message using EmailJS
        emailjs.send(
            "service_yzcisia",
            "template_q35ddtp",
            {
                name: name,
                email: email,
                subject: subject,
                message: message
            }
        )

        .then(() => {

            alert("Your message has been sent successfully!");

            contactForm.reset();

        })

        .catch((error) => {

            console.error("EmailJS Error:", error);

            alert(
                "Sorry, your message could not be sent. Please try again."
            );

        })

        .finally(() => {

            submitButton.disabled = false;
            submitButton.textContent = "Send Message";

        });

    });

}


/* ===================================================== */
/* MY SKILLS - CLICK TO SHOW EXPLANATION                 */
/* ===================================================== */

const skillDetails = {

    responsibility: {
        title: "Responsibility",
        icon: "bx bx-task",
        description: "I consider responsibility one of my personal skills because I understand the importance of completing my tasks and fulfilling my obligations. I always try to take responsibility for my work, follow instructions, and make sure that I finish what I have started."
    },

    learning: {
        title: "Willingness to Learn",
        icon: "bx bx-book-open",
        description: "I consider willingness to learn one of my strengths because I am always interested in discovering new things and improving my knowledge. I am open to learning new technologies, accepting feedback, and developing new skills that can help me grow personally and professionally."
    },

    motivation: {
        title: "Self-Motivation",
        icon: "bx bx-target-lock",
        description: "I consider self-motivation an important skill because I can encourage myself to keep learning and improving even when things become difficult. I believe that personal growth requires effort, patience, and the determination to achieve my goals."
    },

    teamwork: {
        title: "Teamwork",
        icon: "bx bx-group",
        description: "I consider teamwork one of my personal skills because I understand the importance of working with others to achieve a common goal. I am willing to share ideas, listen to different opinions, cooperate with my teammates, and contribute to group activities."
    }

};


/* ===================================================== */
/* SHOW SKILL POPUP                                      */
/* ===================================================== */

function showSkill(skill) {

    const details = skillDetails[skill];

    if (!details) return;

    const popup = document.getElementById("skillPopup");
    const popupTitle = document.getElementById("popupTitle");
    const popupDescription = document.getElementById("popupDescription");
    const popupIcon = document.getElementById("popupIcon");

    if (!popup || !popupTitle || !popupDescription || !popupIcon) {
        return;
    }

    popupTitle.textContent = details.title;
    popupDescription.textContent = details.description;
    popupIcon.className = details.icon;

    popup.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* ===================================================== */
/* CLOSE SKILL POPUP                                     */
/* ===================================================== */

function closeSkill() {

    const popup = document.getElementById("skillPopup");

    if (!popup) return;

    popup.classList.remove("active");

    document.body.style.overflow = "";

}


/* ===================================================== */
/* CLICK OUTSIDE POPUP TO CLOSE                          */
/* ===================================================== */

const skillPopup = document.getElementById("skillPopup");

if (skillPopup) {

    skillPopup.addEventListener("click", function(event) {

        if (event.target === skillPopup) {
            closeSkill();
        }

    });

}


/* ===================================================== */
/* ESC KEY TO CLOSE POPUPS                               */
/* ===================================================== */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeSkill();
        closeProject();
    }

});


/* ===================================================== */
/* PROJECT IMAGE POPUP                                   */
/* ===================================================== */

function openProject(card) {

    const popup = document.getElementById("projectPopup");
    const popupImage = document.getElementById("popupProjectImage");

    if (!popup || !popupImage || !card) return;

    const projectImage = card.querySelector(".project-image img");

    if (!projectImage) {
        console.error("Project image not found!");
        return;
    }

    popupImage.src = projectImage.src;
    popupImage.alt = projectImage.alt;

    popup.classList.add("active");

    document.body.classList.add("project-popup-open");

}


function closeProject() {

    const popup = document.getElementById("projectPopup");

    if (!popup) return;

    popup.classList.remove("active");

    document.body.classList.remove("project-popup-open");

}
