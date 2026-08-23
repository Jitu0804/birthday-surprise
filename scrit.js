/* ============================================================
   IMPORTANT
   ACTIVATE VERSION 2 ANIMATION SYSTEM
============================================================ */

document.documentElement.classList.add("animations-on");


/* ============================================================
   VERSION 2 - CHAPTER REVEAL

   Each chapter fades + slides gently into view.
============================================================ */

const revealItems =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.08,

                /*
                   Slight early reveal so there is
                   no blank gap between chapters.
                */

                rootMargin: "0px 0px 100px 0px"
            }

        );


    revealItems.forEach((item) => {

        revealObserver.observe(item);

    });

}

else {

    revealItems.forEach((item) => {

        item.classList.add("visible");

    });

}


/* ============================================================
   VERSION 2 - PHOTO POP REVEAL

   Photos appear softly one-by-one.
============================================================ */

const photoFrames =
    document.querySelectorAll(".frame");


if ("IntersectionObserver" in window) {

    const photoObserver =
        new IntersectionObserver(

            (entries) => {

                const visiblePhotos =
                    entries.filter(
                        entry => entry.isIntersecting
                    );


                visiblePhotos.forEach(
                    (entry, index) => {

                        setTimeout(() => {

                            entry.target.classList.add(
                                "photo-visible"
                            );

                            photoObserver.unobserve(
                                entry.target
                            );

                        }, index * 120);

                    }

                );

            },

            {
                threshold: 0.08,

                rootMargin:
                    "0px 0px 80px 0px"
            }

        );


    photoFrames.forEach((frame) => {

        photoObserver.observe(frame);

    });

}

else {

    photoFrames.forEach((frame) => {

        frame.classList.add(
            "photo-visible"
        );

    });

}


/* ============================================================
   PREMIUM / LARGE PHOTO REVEAL

   photo1, photo16 and photo31
============================================================ */

const premiumPhotos =
    document.querySelectorAll(
        ".hero-photo-wrap, .cinematic, .final-hero"
    );


premiumPhotos.forEach((photo) => {

    photo.style.opacity = "0";

    photo.style.transform =
        "translateY(35px) scale(.96)";

});


if ("IntersectionObserver" in window) {

    const premiumObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.style.transition =
                        "opacity 1s ease, transform 1.05s cubic-bezier(.2,.8,.2,1)";


                    entry.target.style.opacity =
                        "1";


                    entry.target.style.transform =
                        "translateY(0) scale(1)";


                    premiumObserver.unobserve(
                        entry.target
                    );

                });

            },

            {
                threshold: 0.08,

                rootMargin:
                    "0px 0px 80px 0px"
            }

        );


    premiumPhotos.forEach((photo) => {

        premiumObserver.observe(photo);

    });

}

else {

    premiumPhotos.forEach((photo) => {

        photo.style.opacity = "1";

        photo.style.transform =
            "translateY(0) scale(1)";

    });

}



/* ============================================================
   FLOATING HEARTS
============================================================ */

const floatingHeartSymbols = [
    "♡",
    "♥",
    "💕",
    "✨",
    "💗"
];


function createFloatingHeart() {

    const heart =
        document.createElement("div");


    heart.className =
        "heart";


    heart.innerHTML =
        floatingHeartSymbols[
            Math.floor(
                Math.random()
                *
                floatingHeartSymbols.length
            )
        ];


    heart.style.left =
        Math.random()
        *
        100
        +
        "%";


    heart.style.fontSize =
        (
            12
            +
            Math.random()
            *
            18
        )
        +
        "px";


    const duration =
        8
        +
        Math.random()
        *
        8;


    heart.style.animationDuration =
        duration
        +
        "s";


    document.body.appendChild(
        heart
    );


    setTimeout(() => {

        heart.remove();

    }, duration * 1000);

}


setInterval(
    createFloatingHeart,
    1100
);



/* ============================================================
   BACKGROUND MUSIC
============================================================ */

const music =
    document.getElementById(
        "backgroundMusic"
    );


const musicButton =
    document.getElementById(
        "musicButton"
    );


let musicPlaying =
    false;


if (
    music &&
    musicButton
) {

    music.volume = 0.55;


    musicButton.addEventListener(

        "click",

        async () => {

            if (!musicPlaying) {

                try {

                    await music.play();


                    musicPlaying =
                        true;


                    musicButton.innerHTML =
                        "⏸ Pause Music";


                    musicButton.classList.add(
                        "playing"
                    );

                }

                catch (error) {

                    console.log(
                        "Music could not play:",
                        error
                    );

                }

            }

            else {

                music.pause();


                musicPlaying =
                    false;


                musicButton.innerHTML =
                    "🎵 Play Music";


                musicButton.classList.remove(
                    "playing"
                );

            }

        }

    );


    music.addEventListener(

        "pause",

        () => {

            if (music.paused) {

                musicPlaying = false;

                musicButton.innerHTML =
                    "🎵 Play Music";

                musicButton.classList.remove(
                    "playing"
                );

            }

        }

    );

}



/* ============================================================
   PHOTO LIGHTBOX
============================================================ */

const lightbox =
    document.getElementById(
        "photoLightbox"
    );


const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );


const lightboxCaption =
    document.getElementById(
        "lightboxCaption"
    );


const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );


const galleryImages =
    document.querySelectorAll(

        ".frame img, " +
        ".hero-photo-wrap img, " +
        ".cinematic img, " +
        ".final-hero img"

    );


galleryImages.forEach((image) => {

    image.addEventListener(

        "click",

        () => {

            if (
                !lightbox ||
                !lightboxImage
            ) {

                return;

            }


            lightboxImage.src =
                image.src;


            lightboxImage.alt =
                image.alt ||
                "Memory";


            let caption = "";


            const figure =
                image.closest("figure");


            if (figure) {

                const figcaption =
                    figure.querySelector(
                        "figcaption"
                    );


                if (figcaption) {

                    caption =
                        figcaption.innerText;

                }

            }


            if (lightboxCaption) {

                lightboxCaption.innerText =
                    caption;

            }


            lightbox.classList.add(
                "active"
            );


            document.body.style.overflow =
                "hidden";

        }

    );

});


function closeLightbox() {

    if (!lightbox) {
        return;
    }


    lightbox.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";


    setTimeout(() => {

        if (lightboxImage) {

            lightboxImage.src = "";

        }

    }, 400);

}


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightbox) {

    lightbox.addEventListener(

        "click",

        (event) => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }

    );

}


document.addEventListener(

    "keydown",

    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeLightbox();

        }

    }

);



/* ============================================================
   BIRTHDAY ENDING CONFETTI
============================================================ */

const birthdayEnding =
    document.getElementById(
        "birthdayEnding"
    );


let confettiPlayed =
    false;


if (
    birthdayEnding &&
    "IntersectionObserver" in window
) {

    const confettiObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting &&
                        !confettiPlayed
                    ) {

                        confettiPlayed =
                            true;


                        launchBirthdayConfetti();


                        confettiObserver.unobserve(
                            birthdayEnding
                        );

                    }

                });

            },

            {
                threshold: 0.30
            }

        );


    confettiObserver.observe(
        birthdayEnding
    );

}



function launchBirthdayConfetti() {

    const confettiSymbols = [
        "💖",
        "💕",
        "✨",
        "🎉",
        "🎂",
        "♡",
        "❤️"
    ];


    for (
        let i = 0;
        i < 80;
        i++
    ) {

        setTimeout(() => {

            const piece =
                document.createElement(
                    "div"
                );


            piece.className =
                "confetti-piece";


            piece.innerHTML =
                confettiSymbols[
                    Math.floor(
                        Math.random()
                        *
                        confettiSymbols.length
                    )
                ];


            piece.style.left =
                Math.random()
                *
                100
                +
                "vw";


            piece.style.fontSize =
                (
                    14
                    +
                    Math.random()
                    *
                    18
                )
                +
                "px";


            const duration =
                3
                +
                Math.random()
                *
                4;


            piece.style.animationDuration =
                duration
                +
                "s";


            document.body.appendChild(
                piece
            );


            setTimeout(() => {

                piece.remove();

            }, duration * 1000);


        }, i * 42);

    }

}



/* ============================================================
   FINAL SECRET MESSAGE
============================================================ */

const surpriseButton =
    document.getElementById(
        "surpriseButton"
    );


const secretMessage =
    document.getElementById(
        "secretMessage"
    );


if (
    surpriseButton &&
    secretMessage
) {

    surpriseButton.addEventListener(

        "click",

        () => {

            const opening =
                !secretMessage
                    .classList
                    .contains("open");


            secretMessage.classList.toggle(
                "open"
            );


            if (opening) {

                surpriseButton.innerHTML =
                    "You Found It ❤️";


                launchMiniHeartBurst();


                setTimeout(() => {

                    secretMessage
                        .scrollIntoView({

                            behavior:
                                "smooth",

                            block:
                                "center"

                        });

                }, 350);

            }

            else {

                surpriseButton.innerHTML =
                    "One Last Thing... ❤️";

            }

        }

    );

}



/* ============================================================
   SECRET MESSAGE HEART BURST
============================================================ */

function launchMiniHeartBurst() {

    const symbols = [
        "❤️",
        "💗",
        "💕",
        "✨"
    ];


    for (
        let i = 0;
        i < 30;
        i++
    ) {

        setTimeout(() => {

            const heart =
                document.createElement(
                    "div"
                );


            heart.className =
                "confetti-piece";


            heart.innerHTML =
                symbols[
                    Math.floor(
                        Math.random()
                        *
                        symbols.length
                    )
                ];


            heart.style.left =
                (
                    35
                    +
                    Math.random()
                    *
                    30
                )
                +
                "vw";


            heart.style.fontSize =
                (
                    15
                    +
                    Math.random()
                    *
                    16
                )
                +
                "px";


            const duration =
                2.5
                +
                Math.random()
                *
                2;


            heart.style.animationDuration =
                duration
                +
                "s";


            document.body.appendChild(
                heart
            );


            setTimeout(() => {

                heart.remove();

            }, duration * 1000);


        }, i * 35);

    }

}
