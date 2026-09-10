// =========================================================
// SPORTING CABANILLAS
// Shared data
// =========================================================
//
// Este archivo centraliza los datos utilizados por la web.
//
// IMPORTANTE:
// - No introducir información ficticia.
// - Los datos pendientes se identifican claramente.
// - Los patrocinadores incorporan una URL para poder enlazar
//   directamente con su web.
// =========================================================


/* =========================================================
   SITE CONFIG
   ========================================================= */

const siteConfig = {
    clubName: "Sporting Cabanillas",

    crest: "assets/images/club/escudo.png",

    social: {
        instagram: "https://www.instagram.com/sportingcabanillas/?hl=es",
        facebook: "https://www.facebook.com/p/Sporting-Cabanillas-61550104281861/?locale=es_ES",
        x: "https://x.com/Sp_Cabanillas",
    },

    contact: {
        address: "Calle Valdemoma, 6D, 19171 Cabanillas del Campo, Guadalajara",
        email: "spcabanillasfc@gmail.com",
        phone: "633 623 990"
    }
};


/* =========================================================
   TEAMS
   ========================================================= */

const teamsData = [

    /* -----------------------------------------------------
       SENIOR
       ----------------------------------------------------- */

    {
        id: "primer-equipo",
        section: "senior",

        name: "PRIMER EQUIPO",
        category: "1ª AUTONÓMICA PREFERENTE",

        description: "DESCRIPCIÓN PENDIENTE",

        image: "assets/images/equipos/primer-equipo.jpg",

        squad: [],
        coachingStaff: [],

        matches: [],
        results: [],
        standings: []
    },


    {
        id: "filial-promesas",
        section: "senior",

        name: " PROMESAS",
        category: "1ª AUTONÓMICA",

        description: "DESCRIPCIÓN PENDIENTE",

        image: "assets/images/equipos/promesas.jpg",

        squad: [],
        coachingStaff: [],

        matches: [],
        results: [],
        standings: []
    },


    {
        id: "primer-equipo-femenino",
        section: "senior",

        name: "PRIMER EQUIPO FEM",
        category: "1ª AUTONÓMICA PREFERENTE FEMENINA",

        description: "DESCRIPCIÓN PENDIENTE",

        image: "assets/images/equipos/primer-equipo-femenino.jpg",

        squad: [],
        coachingStaff: [],

        matches: [],
        results: [],
        standings: []
    },


    /* -----------------------------------------------------
       JUVENIL
       ----------------------------------------------------- */

    {
        id: "juvenil-nacional",
        section: "juvenil",

        name: "JUVENIL NACIONAL",
        category: "JUVENIL NACIONAL",

        description: "DESCRIPCIÓN PENDIENTE",

        image: "assets/images/equipos/juvenil-nacional.jpg",

        squad: [],
        coachingStaff: [],

        matches: [],
        results: [],
        standings: []
    },


    {
        id: "juvenil-provincial",
        section: "juvenil",

        name: "JUVENIL PROVINCIAL",
        category: "JUVENIL PROVINCIAL",

        description: "DESCRIPCIÓN PENDIENTE",

        image: "assets/images/equipos/juvenil-provincial.jpg",

        squad: [],
        coachingStaff: [],

        matches: [],
        results: [],
        standings: []
    },


    /* -----------------------------------------------------
       ESCUELAS
       ----------------------------------------------------- */

    {
        id: "escuelas",
        section: "escuelas",

        name: "ESCUELAS",
        category: "CADETE, INFANTIL, ALEVIN, BENJAMIN, PREBENJAMIN E INICIACIÓN",

        description: "INFORMACIÓN DE LAS ESCUELAS PENDIENTE",

        image: "assets/images/equipos/escuelas.jpg",

        squad: [],
        coachingStaff: [],

        matches: [],
        results: [],
        standings: []
    }

];


/* =========================================================
   MATCHES
   ========================================================= */

const matchesData = [

    {
        id: "partido-01",

        teamId: "primer-equipo",

        competition: "COMPETICIÓN",

        date: "13/09/2026",
        time: "18:30",
        venue: "RAMIRO ALMENDROS",

        homeTeam: "SPORTING CABANILLAS",
        awayTeam: "PRÓXIMO RIVAL",

        homeCrest: "assets/images/club/escudo.png",
        awayCrest: "assets/images/club/rival-placeholder.png",

        status: "PRÓXIMO PARTIDO",

        result: null
    },


    {
        id: "partido-02",

        teamId: "primer-equipo",

        competition: "COMPETICIÓN",

        date: "FECHA",
        time: "HORA",
        venue: "CAMPO",

        homeTeam: "SPORTING CABANILLAS",
        awayTeam: "RIVAL",

        homeCrest: "assets/images/club/escudo.png",
        awayCrest: "assets/images/club/rival-placeholder.png",

        status: "RESULTADO",

        result: "—"
    }

];


/* =========================================================
   STANDINGS
   ========================================================= */

const standingsData = [

    {
        teamId: "primer-equipo",

        position: "—",
        team: "SPORTING CABANILLAS",

        played: "—",
        won: "—",
        drawn: "—",
        lost: "—",

        goalsFor: "—",
        goalsAgainst: "—",
        goalDifference: "—",

        points: "—"
    },


    {
        teamId: null,

        position: "—",
        team: "EQUIPO",

        played: "—",
        won: "—",
        drawn: "—",
        lost: "—",

        goalsFor: "—",
        goalsAgainst: "—",
        goalDifference: "—",

        points: "—"
    },


    {
        teamId: null,

        position: "—",
        team: "EQUIPO",

        played: "—",
        won: "—",
        drawn: "—",
        lost: "—",

        goalsFor: "—",
        goalsAgainst: "—",
        goalDifference: "—",

        points: "—"
    },


    {
        teamId: null,

        position: "—",
        team: "EQUIPO",

        played: "—",
        won: "—",
        drawn: "—",
        lost: "—",

        goalsFor: "—",
        goalsAgainst: "—",
        goalDifference: "—",

        points: "—"
    }

];


/* =========================================================
   SPONSORS
   =========================================================
//
// Los cinco patrocinadores actuales forman parte de la
// categoría de patrocinadores oficiales.
//
// El orden utilizado aquí será también el orden inicial
// en la tira de la Home y en la página de patrocinadores.
//
// La URL se completará cuando dispongamos del enlace real.
//
// MUY IMPORTANTE:
// Cada patrocinador debe tener su web real en "url".
// El JavaScript hará que todo el bloque sea clicable.
// ========================================================= */

const mainSponsorsData = [

    {
        id: "jesthisa",

        name: "JESTHISA",

        logo: "assets/images/sponsors/jesthisa.png",

        url: "https://www.jesthisa.es/",

        category: "PATROCINADOR OFICIAL",

        order: 1
    },


    {
        id: "logista",

        name: "LOGISTA",

        logo: "assets/images/sponsors/logista.png",

        url: "https://www.logista.com/es/home.html",

        category: "PATROCINADOR OFICIAL",

        order: 2
    },


    {
        id: "renault-autocarpe",

        name: "RENAULT AUTOCARPE",

        logo: "assets/images/sponsors/renault-autocarpe.png",

        url: "https://renault.autocarpe.es/instalacion-autocarpe-guadalajara",

        category: "PATROCINADOR OFICIAL",

        order: 3
    },


    {
        id: "rpm-dealer",

        name: "RPM DEALER",

        logo: "assets/images/sponsors/rpm-dealer.png",

        url: "https://rpmdealer.es/",

        category: "PATROCINADOR OFICIAL",

        order: 4
    },


    {
        id: "lopersonalizo",

        name: "LOPERSONALIZO.ES",

        logo: "assets/images/sponsors/lopersonalizo.png",

        url: "https://lopersonalizo.es/",

        category: "PATROCINADOR OFICIAL",

        order: 5
    }

];


/* =========================================================
   COLLABORATORS
   ========================================================= */

const collaboratorsData = [];


/* =========================================================
   COMBINED SPONSORS
   ========================================================= */

const sponsorsData = [
    ...mainSponsorsData,
    ...collaboratorsData
];


/* =========================================================
   HELPER FUNCTIONS — TEAMS
   ========================================================= */

/**
 * Returns all teams belonging to a section.
 *
 * @param {string} section
 * @returns {Array}
 */
function getTeamsBySection(section) {
    return teamsData.filter(
        (team) => team.section === section
    );
}


/**
 * Returns a team by its ID.
 *
 * @param {string} teamId
 * @returns {Object|null}
 */
function getTeamById(teamId) {
    return teamsData.find(
        (team) => team.id === teamId
    ) || null;
}


/* =========================================================
   HELPER FUNCTIONS — MATCHES
   ========================================================= */

/**
 * Returns matches for a specific team.
 *
 * @param {string} teamId
 * @returns {Array}
 */
function getMatchesByTeam(teamId) {
    return matchesData.filter(
        (match) => match.teamId === teamId
    );
}


/**
 * Returns the next match.
 *
 * @returns {Object|null}
 */
function getNextMatch() {
    return matchesData.find(
        (match) => match.status === "PRÓXIMO PARTIDO"
    ) || null;
}


/**
 * Returns the latest result.
 *
 * @returns {Object|null}
 */
function getLatestResult() {
    return matchesData.find(
        (match) => match.status === "RESULTADO"
    ) || null;
}


/* =========================================================
   HELPER FUNCTIONS — SPONSORS
   ========================================================= */

/**
 * Returns main sponsors ordered by their display order.
 *
 * @returns {Array}
 */
function getMainSponsors() {
    return [...mainSponsorsData].sort(
        (a, b) => (a.order || 0) - (b.order || 0)
    );
}


/**
 * Returns all collaborators.
 *
 * @returns {Array}
 */
function getCollaborators() {
    return collaboratorsData;
}


/**
 * Returns all sponsors and collaborators.
 *
 * @returns {Array}
 */
function getAllSponsors() {
    return sponsorsData;
}