// =========================================================
// SPORTING CABANILLAS
// Global JavaScript
// =========================================================
//
// Funciones:
//
// - Menú móvil
// - Navegación activa
// - Año automático del footer
// - Tira rotatoria de patrocinadores en Home
// - Página de patrocinadores
// - Próximo partido
// - Último resultado
// - Equipos en Home
//
// =========================================================


document.addEventListener("DOMContentLoaded", () => {
    initMobileNavigation();
    initCurrentPageNavigation();
    initCurrentYear();

    renderFeaturedSponsors();
    renderSponsorsPage();

    renderFeaturedMatch();
    renderLatestResult();

    renderHomeTeams();
});


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function initMobileNavigation() {
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileNavigation = document.querySelector(".mobile-navigation");

    if (!menuToggle || !mobileNavigation) {
        return;
    }

    const mobileLinks =
        mobileNavigation.querySelectorAll("a");


    const openMenu = () => {
        menuToggle.classList.add("is-active");
        mobileNavigation.classList.add("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Cerrar menú"
        );

        mobileNavigation.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("menu-open");
    };


    const closeMenu = () => {
        menuToggle.classList.remove("is-active");
        mobileNavigation.classList.remove("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Abrir menú"
        );

        mobileNavigation.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove("menu-open");
    };


    menuToggle.addEventListener("click", () => {
        const isOpen =
            menuToggle.classList.contains("is-active");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });


    mobileLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });


    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });


    document.addEventListener("click", (event) => {
        const clickedInsideNavigation =
            mobileNavigation.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (
            mobileNavigation.classList.contains("is-open") &&
            !clickedInsideNavigation &&
            !clickedToggle
        ) {
            closeMenu();
        }
    });


    window.addEventListener("resize", () => {
        if (window.innerWidth > 960) {
            closeMenu();
        }
    });
}


/* =========================================================
   CURRENT PAGE NAVIGATION
   ========================================================= */

function initCurrentPageNavigation() {
    const currentPage =
        getCurrentPage();

    if (!currentPage) {
        return;
    }

    const navigationLinks =
        document.querySelectorAll("[data-page]");


    navigationLinks.forEach((link) => {
        const linkPage =
            link.dataset.page;

        if (linkPage === currentPage) {
            link.classList.add("is-active");

            link.setAttribute(
                "aria-current",
                "page"
            );
        }
    });
}


/**
 * Detects the logical current page.
 *
 * @returns {string|null}
 */
function getCurrentPage() {
    const pathname =
        window.location.pathname;

    const fileName =
        pathname.split("/").pop();


    switch (fileName) {
        case "":
        case "index.html":
            return "inicio";

        case "club.html":
            return "club";

        case "equipos.html":
            return "equipos";

        case "partidos.html":
            return "partidos";

        case "clasificacion.html":
            return "clasificacion";

        case "patrocinadores.html":
            return "patrocinadores";

        case "patrocinador.html":
            return "patrocinador";

        case "contacto.html":
            return "contacto";

        case "primer-equipo.html":
        case "filial-promesas.html":
        case "primer-equipo-fem.html":
        case "juvenil-nacional.html":
        case "juvenil-provincial.html":
        case "escuelas.html":
            return "equipos";

        default:
            return null;
    }
}


/* =========================================================
   CURRENT YEAR
   ========================================================= */

function initCurrentYear() {
    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    if (!yearElements.length) {
        return;
    }


    const currentYear =
        new Date().getFullYear();


    yearElements.forEach((element) => {
        element.textContent =
            currentYear;
    });
}


/* =========================================================
   FEATURED SPONSORS — HOME
   ========================================================= */

/**
 * Creates the rotating sponsor strip.
 *
 * Only official/main sponsors are displayed.
 */
function renderFeaturedSponsors() {
    const containers =
        document.querySelectorAll(
            '[data-sponsors="featured"]'
        );


    if (!containers.length) {
        return;
    }


    if (
        typeof mainSponsorsData === "undefined" ||
        !Array.isArray(mainSponsorsData) ||
        !mainSponsorsData.length
    ) {
        return;
    }


    containers.forEach((container) => {
        createSponsorCarousel(
            container,
            mainSponsorsData
        );
    });
}


/**
 * Creates one sponsor carousel.
 *
 * @param {HTMLElement} container
 * @param {Array} sponsors
 */
function createSponsorCarousel(
    container,
    sponsors
) {
    const orderedSponsors =
        [...sponsors].sort(
            (a, b) =>
                (a.order || 0) -
                (b.order || 0)
        );


    container.innerHTML = "";


    const viewport =
        document.createElement("div");

    viewport.className =
        "sponsors-carousel";


    const track =
        document.createElement("div");

    track.className =
        "sponsors-carousel__track";


    orderedSponsors.forEach((sponsor) => {
        const item =
            createSponsorCarouselItem(
                sponsor
            );

        track.appendChild(item);
    });


    viewport.appendChild(track);
    container.appendChild(viewport);


    if (orderedSponsors.length <= 4) {
        return;
    }


    startSponsorCarousel(
        viewport,
        track,
        orderedSponsors.length
    );
}


/**
 * Creates one sponsor item.
 *
 * @param {Object} sponsor
 * @returns {HTMLAnchorElement}
 */
function createSponsorCarouselItem(sponsor) {
    return createSponsorLink(
        sponsor,
        "sponsor-carousel__item"
    );
}


/**
 * Starts automatic sponsor rotation.
 *
 * @param {HTMLElement} viewport
 * @param {HTMLElement} track
 * @param {number} sponsorCount
 */
function startSponsorCarousel(
    viewport,
    track,
    sponsorCount
) {
    let currentIndex = 0;
    let timer = null;
    let paused = false;


    const getItemsPerView = () => {
        return window.innerWidth <= 700
            ? 2
            : 4;
    };


    const getStepPercentage = () => {
        return 100 / getItemsPerView();
    };


    const updateCarousel = () => {
        const itemsPerView =
            getItemsPerView();

        const maxIndex =
            Math.max(
                sponsorCount - itemsPerView,
                0
            );


        if (currentIndex > maxIndex) {
            currentIndex = 0;
        }


        const offset =
            currentIndex *
            getStepPercentage();


        track.style.transform =
            `translateX(-${offset}%)`;
    };


    const next = () => {
        if (paused) {
            return;
        }


        const itemsPerView =
            getItemsPerView();

        const maxIndex =
            Math.max(
                sponsorCount - itemsPerView,
                0
            );


        currentIndex += 1;


        if (currentIndex > maxIndex) {
            currentIndex = 0;
        }


        updateCarousel();
    };


    const start = () => {
        if (timer) {
            return;
        }


        timer =
            window.setInterval(
                next,
                3500
            );
    };


    const stop = () => {
        if (!timer) {
            return;
        }


        window.clearInterval(timer);
        timer = null;
    };


    viewport.addEventListener(
        "mouseenter",
        () => {
            paused = true;
        }
    );


    viewport.addEventListener(
        "mouseleave",
        () => {
            paused = false;
        }
    );


    viewport.addEventListener(
        "focusin",
        () => {
            paused = true;
        }
    );


    viewport.addEventListener(
        "focusout",
        () => {
            paused = false;
        }
    );


    window.addEventListener(
        "resize",
        updateCarousel
    );


    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (!prefersReducedMotion.matches) {
        start();
    }


    prefersReducedMotion.addEventListener(
        "change",
        (event) => {
            if (event.matches) {
                stop();
            } else {
                start();
            }
        }
    );


    updateCarousel();
}


/* =========================================================
   SPONSORS PAGE
   ========================================================= */

function renderSponsorsPage() {
    const container =
        document.querySelector(
            "[data-sponsors-list]"
        );


    if (!container) {
        return;
    }


    if (
        typeof mainSponsorsData === "undefined"
    ) {
        return;
    }


    const orderedSponsors =
        [...mainSponsorsData].sort(
            (a, b) =>
                (a.order || 0) -
                (b.order || 0)
        );


    container.innerHTML = "";


    const mainSection =
        createSponsorSection(
            "Patrocinadores oficiales",
            "Empresas y entidades que acompañan al Sporting Cabanillas.",
            orderedSponsors,
            "main"
        );


    container.appendChild(
        mainSection
    );


    if (
        typeof collaboratorsData !== "undefined" &&
        collaboratorsData.length
    ) {
        const collaboratorsSection =
            createSponsorSection(
                "Colaboradores",
                "Empresas y entidades que apoyan al club.",
                collaboratorsData,
                "collaborators"
            );


        container.appendChild(
            collaboratorsSection
        );
    }
}


/**
 * Creates one sponsor section.
 *
 * @param {string} title
 * @param {string} description
 * @param {Array} sponsors
 * @param {string} type
 * @returns {HTMLElement}
 */
function createSponsorSection(
    title,
    description,
    sponsors,
    type
) {
    const section =
        document.createElement("section");


    section.className =
        `sponsors-page-section sponsors-page-section--${type}`;


    const header =
        document.createElement("div");


    header.className =
        "sponsors-page-section__header";


    const eyebrow =
        document.createElement("span");


    eyebrow.className =
        "section-header__eyebrow";


    eyebrow.textContent =
        type === "main"
            ? "Patrocinio"
            : "Colaboración";


    const heading =
        document.createElement("h2");


    heading.className =
        "sponsors-page-section__title";


    heading.textContent =
        title;


    const text =
        document.createElement("p");


    text.className =
        "sponsors-page-section__description";


    text.textContent =
        description;


    header.appendChild(
        eyebrow
    );

    header.appendChild(
        heading
    );

    header.appendChild(
        text
    );


    const grid =
        document.createElement("div");


    grid.className =
        type === "main"
            ? "sponsors-main-grid"
            : "sponsors-collaborators-grid";


    sponsors.forEach((sponsor) => {
        grid.appendChild(
            createSponsorCard(
                sponsor,
                type
            )
        );
    });


    section.appendChild(
        header
    );

    section.appendChild(
        grid
    );


    return section;
}


/**
 * Creates one sponsor card.
 *
 * @param {Object} sponsor
 * @param {string} type
 * @returns {HTMLAnchorElement}
 */
function createSponsorCard(
    sponsor,
    type
) {
    const link =
        createSponsorLink(
            sponsor,
            `sponsor-card sponsor-card--${type}`
        );


    const visual =
        document.createElement("div");


    visual.className =
        "sponsor-card__visual";


    if (sponsor.logo) {
        const image =
            document.createElement("img");


        image.src =
            sponsor.logo;


        image.alt =
            sponsor.name;


        image.loading =
            "lazy";


        image.width = 300;
        image.height = 150;


        image.addEventListener(
            "error",
            () => {
                visual.replaceChildren(
                    createSponsorPlaceholder(
                        sponsor.name
                    )
                );
            },
            { once: true }
        );


        visual.appendChild(
            image
        );

    } else {
        visual.appendChild(
            createSponsorPlaceholder(
                sponsor.name
            )
        );
    }


    const content =
        document.createElement("div");


    content.className =
        "sponsor-card__content";


    const category =
        document.createElement("span");


    category.className =
        "sponsor-card__category";


    category.textContent =
        sponsor.category ||
        "PATROCINADOR OFICIAL";


    const name =
        document.createElement("h3");


    name.className =
        "sponsor-card__name";


    name.textContent =
        sponsor.name;


    const arrow =
        document.createElement("span");


    arrow.className =
        "sponsor-card__arrow";


    arrow.setAttribute(
        "aria-hidden",
        "true"
    );


    arrow.textContent =
        "↗";


    content.appendChild(
        category
    );

    content.appendChild(
        name
    );

    content.appendChild(
        arrow
    );


    link.appendChild(
        visual
    );

    link.appendChild(
        content
    );


    return link;
}


/* =========================================================
   SPONSOR LINK
   ========================================================= */

/**
 * Creates a link for a sponsor.
 *
 * @param {Object} sponsor
 * @param {string} className
 * @returns {HTMLAnchorElement}
 */
function createSponsorLink(
    sponsor,
    className
) {
    const link =
        document.createElement("a");


    link.className =
        className;


    link.href =
        sponsor.url || "#";


    link.setAttribute(
        "aria-label",
        `Visitar la web de ${sponsor.name}`
    );


    if (
        sponsor.url &&
        sponsor.url !== "#"
    ) {
        link.target =
            "_blank";

        link.rel =
            "noopener noreferrer";
    }


    if (
        className ===
        "sponsor-carousel__item"
    ) {
        if (sponsor.logo) {
            const image =
                document.createElement("img");


            image.src =
                sponsor.logo;


            image.alt =
                sponsor.name;


            image.loading =
                "lazy";


            image.width = 130;
            image.height = 38;


            image.addEventListener(
                "error",
                () => {
                    link.replaceChildren(
                        createSponsorPlaceholder(
                            sponsor.name
                        )
                    );
                },
                { once: true }
            );


            link.appendChild(
                image
            );

        } else {
            link.appendChild(
                createSponsorPlaceholder(
                    sponsor.name
                )
            );
        }
    }


    return link;
}


/* =========================================================
   SPONSOR PLACEHOLDER
   ========================================================= */

function createSponsorPlaceholder(name) {
    const placeholder =
        document.createElement("span");


    placeholder.className =
        "sponsor-item__placeholder";


    placeholder.textContent =
        name;


    return placeholder;
}


/* =========================================================
   FEATURED MATCH
   ========================================================= */

function renderFeaturedMatch() {
    const matchContainer =
        document.querySelector(
            "[data-featured-match]"
        );


    if (!matchContainer) {
        return;
    }


    if (
        typeof matchesData === "undefined" ||
        !Array.isArray(matchesData) ||
        !matchesData.length
    ) {
        return;
    }


    const match =
        typeof getNextMatch === "function"
            ? getNextMatch()
            : matchesData.find(
                (item) =>
                    item.status ===
                    "PRÓXIMO PARTIDO"
            );


    if (!match) {
        return;
    }


    const competitionElement =
        matchContainer.querySelector(
            ".match-card__competition"
        );


    if (competitionElement) {
        competitionElement.textContent =
            match.competition ||
            "COMPETICIÓN";
    }


    const statusElement =
        matchContainer.querySelector(
            ".match-card__status"
        );


    if (statusElement) {
        statusElement.textContent =
            match.status ||
            "PRÓXIMO PARTIDO";
    }


    const homeTeamElement =
        matchContainer.querySelector(
            ".match-team--home .match-team__name"
        );


    if (homeTeamElement) {
        homeTeamElement.textContent =
            match.homeTeam ||
            "SPORTING CABANILLAS";
    }


    const awayTeamElement =
        matchContainer.querySelector(
            ".match-team--away .match-team__name"
        );


    if (awayTeamElement) {
        awayTeamElement.textContent =
            match.awayTeam ||
            "PRÓXIMO RIVAL";
    }


    const homeCrest =
        matchContainer.querySelector(
            ".match-team--home .match-team__crest"
        );


    if (
        homeCrest &&
        match.homeCrest
    ) {
        homeCrest.src =
            match.homeCrest;
    }


    const awayTeam =
        matchContainer.querySelector(
            ".match-team--away"
        );


    if (awayTeam) {
        const existingCrest =
            awayTeam.querySelector(
                ".match-team__crest"
            );


        if (
            match.awayCrest &&
            match.awayCrest !== "#"
        ) {
            const image =
                document.createElement("img");


            image.className =
                "match-team__crest";


            image.src =
                match.awayCrest;


            image.alt =
                `Escudo del ${match.awayTeam}`;


            image.width = 82;
            image.height = 82;


            if (existingCrest) {
                existingCrest.replaceWith(
                    image
                );
            }
        }
    }


    const metaItems =
        matchContainer.querySelectorAll(
            ".match-card__meta-item"
        );


    if (metaItems.length >= 3) {
        setMatchMeta(
            metaItems[0],
            "Fecha:",
            match.date || "FECHA"
        );


        setMatchMeta(
            metaItems[1],
            "Hora:",
            match.time || "HORA"
        );


        setMatchMeta(
            metaItems[2],
            "Campo:",
            match.venue || "CAMPO"
        );
    }
}


/**
 * Sets a match metadata item.
 *
 * @param {HTMLElement} element
 * @param {string} label
 * @param {string} value
 */
function setMatchMeta(
    element,
    label,
    value
) {
    element.replaceChildren();


    const strong =
        document.createElement("strong");


    strong.textContent =
        label;


    element.appendChild(
        strong
    );


    element.append(
        ` ${value}`
    );
}


/* =========================================================
   LATEST RESULT
   ========================================================= */

function renderLatestResult() {
    const resultContainer =
        document.querySelector(
            "[data-latest-result]"
        );


    if (!resultContainer) {
        return;
    }


    if (
        typeof matchesData === "undefined" ||
        !Array.isArray(matchesData) ||
        !matchesData.length
    ) {
        return;
    }


    const result =
        typeof getLatestResult === "function"
            ? getLatestResult()
            : matchesData.find(
                (item) =>
                    item.status ===
                    "RESULTADO"
            );


    if (!result) {
        return;
    }


    const competitionElement =
        resultContainer.querySelector(
            ".result-feature__competition"
        );


    if (competitionElement) {
        competitionElement.textContent =
            result.competition ||
            "COMPETICIÓN";
    }


    const teamElements =
        resultContainer.querySelectorAll(
            ".result-feature__team span"
        );


    if (teamElements.length >= 2) {
        teamElements[0].textContent =
            result.homeTeam ||
            "SPORTING CABANILLAS";


        teamElements[1].textContent =
            result.awayTeam ||
            "RIVAL";
    }


    const scoreElement =
        resultContainer.querySelector(
            ".result-feature__score > span"
        );


    if (scoreElement) {
        scoreElement.textContent =
            result.result ||
            "—";
    }


    const metaElements =
        resultContainer.querySelectorAll(
            ".result-feature__meta span"
        );


    if (metaElements.length >= 2) {
        metaElements[0].textContent =
            result.date ||
            "FECHA";


        metaElements[1].textContent =
            result.venue ||
            "CAMPO";
    }


    const homeCrest =
        resultContainer.querySelector(
            ".result-feature__team:first-child img"
        );


    if (
        homeCrest &&
        result.homeCrest
    ) {
        homeCrest.src =
            result.homeCrest;
    }


    const awayTeam =
        resultContainer.querySelector(
            ".result-feature__team:last-child"
        );


    if (awayTeam) {
        const placeholder =
            awayTeam.querySelector(
                ".result-feature__crest"
            );


        if (
            result.awayCrest &&
            result.awayCrest !== "#"
        ) {
            const image =
                document.createElement("img");


            image.className =
                "result-feature__crest";


            image.src =
                result.awayCrest;


            image.alt =
                `Escudo del ${result.awayTeam}`;


            image.width = 68;
            image.height = 68;


            if (placeholder) {
                placeholder.replaceWith(
                    image
                );
            } else {
                awayTeam.prepend(
                    image
                );
            }
        }
    }
}


/* =========================================================
   HOME TEAMS
   ========================================================= */

/**
 * Renders the teams shown on the Home page.
 *
 * Every team card links directly to its own page.
 */
function renderHomeTeams() {
    const containers =
        document.querySelectorAll(
            '[data-teams-list="home"]'
        );


    if (!containers.length) {
        return;
    }


    if (
        typeof teamsData === "undefined" ||
        !Array.isArray(teamsData)
    ) {
        return;
    }


    containers.forEach((container) => {
        container.innerHTML = "";


        teamsData.forEach((team) => {
            const card =
                createTeamCard(team);


            container.appendChild(
                card
            );
        });
    });
}


/**
 * Creates a Home team card.
 *
 * @param {Object} team
 * @returns {HTMLElement}
 */
function createTeamCard(team) {
    const article =
        document.createElement("article");


    article.className =
        "team-card";


    /* -----------------------------------------------------
       IMAGE
       ----------------------------------------------------- */

    const imageWrapper =
        document.createElement("div");


    imageWrapper.className =
        "team-card__image";


    if (team.image) {
        const image =
            document.createElement("img");


        image.src =
            team.image;


        image.alt =
            `Imagen del ${team.name}`;


        image.loading =
            "lazy";


        image.width = 640;
        image.height = 480;


        image.addEventListener(
            "error",
            () => {
                imageWrapper.replaceChildren(
                    createImagePlaceholder(
                        "FOTO DEL EQUIPO PENDIENTE"
                    )
                );
            },
            { once: true }
        );


        imageWrapper.appendChild(
            image
        );

    } else {
        imageWrapper.appendChild(
            createImagePlaceholder(
                "FOTO DEL EQUIPO PENDIENTE"
            )
        );
    }


    /* -----------------------------------------------------
       OVERLAY
       ----------------------------------------------------- */

    const overlay =
        document.createElement("div");


    overlay.className =
        "team-card__overlay";


    overlay.setAttribute(
        "aria-hidden",
        "true"
    );


    /* -----------------------------------------------------
       CONTENT
       ----------------------------------------------------- */

    const content =
        document.createElement("div");


    content.className =
        "team-card__content";


    const category =
        document.createElement("span");


    category.className =
        "team-card__category";


    category.textContent =
        team.category ||
        "CATEGORÍA PENDIENTE";


    const title =
        document.createElement("h3");


    title.className =
        "team-card__title";


    title.textContent =
        team.name ||
        "EQUIPO";


    const link =
        document.createElement("a");


    link.className =
        "text-link team-card__link";


    link.href =
        getTeamPageUrl(team);


    link.textContent =
        "Ver equipo";


    content.appendChild(
        category
    );

    content.appendChild(
        title
    );

    content.appendChild(
        link
    );


    article.appendChild(
        imageWrapper
    );

    article.appendChild(
        overlay
    );

    article.appendChild(
        content
    );


    return article;
}


/**
 * Returns the page URL for a team.
 *
 * @param {Object} team
 * @returns {string}
 */
function getTeamPageUrl(team) {
    const teamPages = {
        "primer-equipo":
            "primer-equipo.html",

        "filial-promesas":
            "filial-promesas.html",

        "primer-equipo-femenino":
            "primer-equipo-fem.html",

        "juvenil-nacional":
            "juvenil-nacional.html",

        "juvenil-provincial":
            "juvenil-provincial.html",

        "escuelas":
            "escuelas.html"
    };


    return teamPages[team.id] ||
        "equipos.html";
}


/* =========================================================
   IMAGE PLACEHOLDER
   ========================================================= */

function createImagePlaceholder(label) {
    const placeholder =
        document.createElement("div");


    placeholder.className =
        "image-placeholder";


    const text =
        document.createElement("span");


    text.textContent =
        label;


    placeholder.appendChild(
        text
    );


    return placeholder;
}