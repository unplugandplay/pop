function generateLoca(notice) {
  const arr = [];
  if (notice.REG) arr.push(notice.REG);
  if (notice.DPT) arr.push(departmentText(notice.DPT));
  if (notice.COM) arr.push(notice.COM);
  if (notice.EDIF) arr.push(notice.EDIF);
  if (notice.ADRS) arr.push(notice.ADRS);
  return arr.join(", ");
}

function departmentText(v) {
  return (
    {
      "01": "Ain",
      "02": "Aisne",
      "03": "Allier",
      "04": "Alpes-de-Haute-Provence",
      "05": "Hautes-Alpes",
      "06": "Alpes-Maritimes",
      "07": "Ardèche",
      "08": "Ardennes",
      "09": "Ariège",
      "10": "Aube",
      "11": "Aude",
      "12": "Aveyron",
      "13": "Bouches-du-Rhône",
      "14": "Calvados",
      "15": "Cantal",
      "16": "Charente",
      "17": "Charente-Maritime",
      "18": "Cher",
      "19": "Corrèze",
      "21": "Côte-d'Or",
      "22": "Côtes-d'Armor",
      "23": "Creuse",
      "24": "Dordogne",
      "25": "Doubs",
      "26": "Drôme",
      "27": "Eure",
      "28": "Eure-et-Loir",
      "29": "Finistère",
      "2A": "Corse-du-Sud",
      "2B": "Haute-Corse",
      "30": "Gard",
      "31": "Haute-Garonne",
      "32": "Gers",
      "33": "Gironde",
      "34": "Hérault",
      "35": "Ille-et-Vilaine",
      "36": "Indre",
      "37": "Indre-et-Loire",
      "38": "Isère",
      "39": "Jura",
      "40": "Landes",
      "41": "Loir-et-Cher",
      "42": "Loire",
      "43": "Haute-Loire",
      "44": "Loire-Atlantique",
      "45": "Loiret",
      "46": "Lot",
      "47": "Lot-et-Garonne",
      "48": "Lozère",
      "49": "Maine-et-Loire",
      "50": "Manche",
      "51": "Marne",
      "52": "Haute-Marne",
      "53": "Mayenne",
      "54": "Meurthe-et-Moselle",
      "55": "Meuse",
      "56": "Morbihan",
      "57": "Moselle",
      "58": "Nièvre",
      "59": "Nord",
      "60": "Oise",
      "61": "Orne",
      "62": "Pas-de-Calais",
      "63": "Puy-de-Dôme",
      "64": "Pyrénées-Atlantiques",
      "65": "Hautes-Pyrénées",
      "66": "Pyrénées-Orientales",
      "67": "Bas-Rhin",
      "68": "Haut-Rhin",
      "69": "Rhône",
      "70": "Haute-Saône",
      "71": "Saône-et-Loire",
      "72": "Sarthe",
      "73": "Savoie",
      "74": "Haute-Savoie",
      "75": "Paris",
      "76": "Seine-Maritime",
      "77": "Seine-et-Marne",
      "78": "Yvelines",
      "79": "Deux-Sèvres",
      "80": "Somme",
      "81": "Tarn",
      "82": "Tarn-et-Garonne",
      "83": "Var",
      "84": "Vaucluse",
      "85": "Vendée",
      "86": "Vienne",
      "87": "Haute-Vienne",
      "88": "Vosges",
      "89": "Yonne",
      "90": "Territoire de Belfort",
      "91": "Essonne",
      "92": "Hauts-de-Seine",
      "93": "Seine-Saint-Denis",
      "94": "Val-de-Marne",
      "95": "Val-d'Oise",
      "971": "Guadeloupe",
      "972": "Martinique",
      "973": "Guyane",
      "974": "La Réunion"
    }[v] || v
  );
}

// Source: https://github.com/fergiemcdowall/stopword/blob/master/lib/stopwords_fr.js
function isStopword(word) {
  return [
    "a",
    "au",
    "aux",
    "avec",
    "ce",
    "ces",
    "dans",
    "de",
    "des",
    "du",
    "elle",
    "en",
    "et",
    "eux",
    "il",
    "je",
    "la",
    "le",
    "leur",
    "lui",
    "ma",
    "mais",
    "me",
    "même",
    "mes",
    "moi",
    "mon",
    "ne",
    "nos",
    "notre",
    "nous",
    "on",
    "ou",
    "où",
    "par",
    "pas",
    "pour",
    "qu",
    "que",
    "qui",
    "sa",
    "se",
    "ses",
    "son",
    "sur",
    "ta",
    "te",
    "tes",
    "toi",
    "ton",
    "tu",
    "un",
    "une",
    "vos",
    "votre",
    "vous",
    "c",
    "d",
    "j",
    "l",
    "à",
    "m",
    "n",
    "s",
    "t",
    "y",
    "ceci",
    "cela",
    "cet",
    "cette",
    "ici",
    "ils",
    "les",
    "leurs",
    "quel",
    "quels",
    "quelle",
    "quelles",
    "sans",
    "soi"
  ].includes(word);
}

function mandatoryWords(p) {
  return p.split(/\s+/)
    // We have to remove stop words since there is a bug in elasticsearch. See:
    // https://github.com/elastic/elasticsearch/issues/28855
    // https://github.com/elastic/elasticsearch/issues/15634
    .filter(v => v && !isStopword(v))
    .map((v, k) => (k === 0 ? v : `+${v}`))
    .join(" ");
}

function customQuery(query, primaryFields, secondaryFields = []) {
  const fields = [...primaryFields, ...secondaryFields];

  // No value, return all documents.
  if (!query) {
    return { query: { match_all: {} } };
  }

  // If it "seems" to be to be a query_string (contains `"foo"`, ` +bar` or ` -baz`)
  // treat it as a query_string (they will love that).
  if (query.match(/"[^"]*"| -| \+/)) {
    return { query: { simple_query_string: { query, default_operator: "and", fields } } };
  }

  // Otherwise build a complex query with these rules (by boost order):
  // 1 - exact ref (boost 5)
  const exactRef = { term: { "REF.keyword": { value: query, boost: 5 } } };
  // 2 - exact term in fields (boost 5)
  const exactTerm = primaryFields.map(f => ({
    term: { [`${f}.keyword`]: { value: query, boost: 5 } }
  }));
  // 3 - fuzzy term in fields (boost 2)
  const fuzzyTerm = primaryFields
    .filter(a => a !== "REF" && a !== "INV")
    .map(f => ({
      fuzzy: { [`${f}.keyword`]: { value: query, boost: 5 } }
    }));
  // 4 - contains all words in fields (boost 1)
  const allWords = {
    simple_query_string: { query: mandatoryWords(query), default_operator: "and", fields }
  };
  // 5 - return the whole query with all rules
  return { bool: { should: [exactRef, ...exactTerm, ...fuzzyTerm, allWords] } };
}

export default {
  generateLoca,
  customQuery
};
