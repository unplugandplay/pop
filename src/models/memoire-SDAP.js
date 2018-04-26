var mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    REF: String,
    TOUT: String,
    ADRESSE: String,
    AUTOEU: String,
    AUTG: String,
    AUTP: String,
    AUTOR: String,
    AUTTI: String,
    COM: String,
    DOM: String,
    EDIF: String,
    EXPO: String,
    JDATPV: String,
    LIEUCOR: String,
    COTECOR: String,
    LIEUCTI: String,
    COTECTI: String,
    LIEUCP: String,
    COTECP: String,
    LEG: String,
    OBJT: String,
    OBS: String,
    OBSOR: String,
    OBSTI: String,
    PAYS: String,
    PUBLI: String,
    TIREDE: String,
    ROLE: String,
    PRECOR: String,
    SERIE: String,
    THEATRE: String,
    TITRE: String,
    DMAJ: String,
    DMIS: String,
    IDPROD: String,
    NUMCD: String,
    NUMF: String,
    INSEE: String,
    NVD: String,
    MARQ: String,
    ACC: String,
    ACQU: String,
    ADPHOT: String,
    AIRE: String,
    ANUMP: String,
    COPY: String,
    COULEUR: String,
    COSTUME: String,
    DATIMM: String,
    DATOEU: String,
    DATPV: String,
    DATOR: String,
    DATTI: String,
    DATG: String,
    DATD: String,
    DIFF: String,
    DPT: String,
    EDIARCH: String,
    ECH: String,
    FORMAT: String,
    FORMATOR: String,
    FORMATTI: String,
    LBASE: String,
    WEB: String,
    LIB: String,
    LOCA: String,
    LIEUORIG: String,
    MCGEO: String,
    MCL: String,
    MENTIONS: String,
    MENTOR: String,
    MENTTI: String,
    MCPER: String,
    VUECD: String,
    NUMAUTP: String,
    NUMCAF: String,
    ANUMOR: String,
    NUMOR: String,
    NUMP: String,
    ANUMTI: String,
    NUMTI: String,
    RENV: String,
    REG: String,
    SENS: String,
    SCLE: String,
    SUP: String,
    TECH: String,
    TECHOR: String,
    TECHTI: String,
    TOILE: String,
    TYP: String,
    TYPDOC: String,
    TYPEIMG: String,
    TYPSUPP: String,
    VIDEO: String,
    LBASE2: String,
    LEG2: String,
    REFIM: String,
    REFIMG: String,
    MOSA: String,
    SITE: String,
    NUMSITE: String,
    NUMOP: String,
    CHRONO: String,
    STRUCT: String,
    SUJET: String,
    TICO: String,
    NUMI: String,
    LIEU: String,
    ADRS: String,
    CONTACT: String,
    EMET: String,
    NUM: String,
    IMG: String,
    WCOM: String,
    LIENS: String,
    LAUTP: String,
})

const object = mongoose.model("memoire_sdap", Schema)

module.exports = object;