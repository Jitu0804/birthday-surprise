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


    setTimeout(
        () => {

            heart.remove();

        },

        duration * 1000
    );

}


setInterval(
    createFloatingHeart,
    1100
);



/* ============================================================
   SCROLL REVEAL
============================================================ */

const revealItems =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add(
                                "visible"
                            );

                    }

                }
            );

        },

        {
            threshold: 0.10
        }

    );


revealItems.forEach(
    (item) => {

        revealObserver.observe(
            item
        );

    }
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

    musicButton.addEventListener(
        "click",

        async () => {

            if (
                !musicPlaying
            ) {

                try {

                    await music.play();


                    musicPlaying =
                        true;


                    musicButton.innerHTML =
                        "⏸ Pause Music";

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

            }

        }

    );


    music.addEventListener(
        "ended",

        () => {

            musicPlaying =
                false;


            musicButton.innerHTML =
                "🎵 Play Music";

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


galleryImages.forEach(
    (image) => {

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
                    image.alt
                    ||
                    "Memory";


                let caption =
                    "";


                const figure =
                    image.closest(
                        "figure"
                    );


                if (
                    figure
                ) {

                    const figcaption =
                        figure.querySelector(
                            "figcaption"
                        );


                    if (
                        figcaption
                    ) {

                        caption =
                            figcaption.innerText;

                    }

                }


                if (
                    lightboxCaption
                ) {

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

    }
);


function closeLightbox() {

    if (
        !lightbox
    ) {

        return;

    }


    lightbox.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";


    if (
        lightboxImage
    ) {

        lightboxImage.src =
            "";

    }

}


if (
    lightboxClose
) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (
    lightbox
) {

    lightbox.addEventListener(

        "click",

        (event) => {

            if (
                event.target
                ===
                lightbox
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
            event.key
            ===
            "Escape"
        ) {

            closeLightbox();

        }

    }

);



/* ============================================================
   BIRTHDAY CONFETTI
============================================================ */

const birthdayEnding =
    document.getElementById(
        "birthdayEnding"
    );


let confettiPlayed =
    false;


if (
    birthdayEnding
) {

    const confettiObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(

                    (entry) => {

                        if (
                            entry.isIntersecting
                            &&
                            !confettiPlayed
                        ) {

                            confettiPlayed =
                                true;


                            launchBirthdayConfetti();

                        }

                    }

                );

            },

            {
                threshold: 0.35
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
        i < 75;
        i++
    ) {

        setTimeout(

            () => {

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


                setTimeout(

                    () => {

                        piece.remove();

                    },

                    duration
                    *
                    1000

                );

            },

            i * 45

        );

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
    surpriseButton
    &&
    secretMessage
) {

    surpriseButton.addEventListener(

        "click",

        () => {

            secretMessage
                .classList
                .toggle(
                    "open"
                );


            if (
                secretMessage
                    .classList
                    .contains(
                        "open"
                    )
            ) {

                surpriseButton.innerHTML =
                    "You Found It ❤️";


                launchMiniHeartBurst();


                setTimeout(

                    () => {

                        secretMessage
                            .scrollIntoView({

                                behavior:
                                    "smooth",

                                block:
                                    "center"

                            });

                    },

                    350

                );

            }

            else {

                surpriseButton.innerHTML =
                    "One Last Thing... ❤️";

            }

        }

    );

}



/* ============================================================
   HEART BURST FOR SECRET MESSAGE
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
        i < 25;
        i++
    ) {

        setTimeout(

            () => {

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


                setTimeout(

                    () => {

                        heart.remove();

                    },

                    duration
                    *
                    1000

                );

            },

            i * 35

        );

    }

}
