const spoergsmaalContainer = document.querySelector('.quiz-spoergsmaal-container');
const resultatContainer = document.querySelector('.quiz-resultat');
const spoergsmaalTekst = document.querySelector('.spoergsmaal-tekst');
const svarContainer = document.querySelector('.svar-container');
const spoergsmaalBillede = document.querySelector('.spoergsmaal-billede');
const resultatTitel = document.querySelector('.resultat-titel');
const resultatBeskrivelse = document.querySelector('.resultat-beskrivelse');
const resultatBillede = document.querySelector('.resultat-billede');
const fremskridtBar = document.querySelector('.fremskridt-bar');
const startForfraKnap = document.querySelector('.start-forfra-knap');
const eksporterKnap = document.querySelector('.eksporter-knap');

let naevvaerendeSpoergsmaal = 0;
let score = 0;
let quizAfsluttet = false;
let resultatData = {};
let korrekteSvar = 0;
let forkerteSvar = 0;

function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

const spoergsmaal = [
    {
        tekst: "Vi har brug for din hjælp! Vi tror at vi er blevet hacket!",
        billede: "billeder/hacker.jpg",
        svar: [
            { tekst: "Jeg er her, lad os komme i gang!", point: 1 },
            { tekst: "Jeg er på vej, skal lige spise først", point: 0 }
        ]
    },
    {
        tekst: "Du kommer over til Thomas, som panikker og nævner at han har fået mail hvor en af samarbejdspartnerne fra Ukraine takker for samarbejdet og vil overføre et beløb og derfor har brug for nogle oplysninger?",
        billede: "billeder/2.jpg",
        svar: [
            { tekst: "Sig til Thomas at han skal dobbeltjekke afsender", point: 1 },
            { tekst: "Sig til Thomas at han bare skal sende mail med al info", point: 0 }
        ]
    },
    {
        tekst: "Thomas takker for din hjælp, og fortsætter sit arbejde",
        billede: "billeder/3.png",
        svar: [
            { tekst: "Vi ses, Thomas!", point: 0, endGame: true, endMessage: "Du forlod lokalet mens hackeren stadig var inde i systemet. Prøv igen!" },
            { tekst: "Gå tilbage og dobbeltjek, og meld til politiet hvis du ser noget mistænkeligt", point: 1 }
        ]
    },
    {
        tekst: "Sådan! Du fandt ud af at computeren VAR hacket, og nu er politiet på vej!",
        billede: "billeder/politi.jpg",
        svar: [
            { tekst: "Gå tilbage til dit bord", point: 1 },
            { tekst: "Snup en donut og gå tilbage til dit bord", point: 1 }
        ]
    },
    {
        tekst: "På vejen tilbage ser du Louise gå i panik, og spørger hvad der er sket, og hun svarer: ''Jeg har fået notifikation midt på skærmen om at jeg er under angreb, og at jeg skal overføre 1.000kr. til en en eller anden for at han renser min computer!!'', og så går du over og kigger på skærmen..",
        billede: "billeder/louise1.jpg",
        svar: [
            { tekst: "Den er god nok vi må hellere klikke ind og se hvor man betaler", point: 0, endGame: true, endMessage: "Øv! Du faldt for fælden, og nu er alle oplysninger i fare. Prøv igen! (Psst.. Aldrig fald for de fælder med betalinger)" },
            { tekst: "Du trykker på ''X'' i hjørnet og ser notifikationen forsvinde", point: 1 }
        ]
    },
    {
        tekst: "Windows kommer nu med notifikation om at der er fundet en trussel, hvad gør du?",
        billede: "billeder/louise2.jpg",
        svar: [
            { tekst: "Jeg trykker selvfølgelig ind for at læse mere om hvad det er", point: 1 },
            { tekst: "Windows, trussel, ej det lyder helt skævt", point: 0 }
        ]
    },
    {
        tekst: "Louise kigger på dig skeptisk, er du sikker på at du ved hvad du laver?",
        billede: "billeder/louise3.jpg",
        svar: [
            { tekst: "Ja, jeg har styr på det, vent og se!", point: 1 },
            { tekst: "Jeg tror vist man trykker her..", point: 0, endGame: true, endMessage: "Din usikkerhed gjorde at computeren nu er i fare, og virksomhedens oplysninger er ubeskyttede! (Altid følg anvisninger fra Windows indbyggede anti-virus software)" }
        ]
    },
    {
        tekst: "Windows har fundet 3 trusler, trojansk hest, adware og malware",
        billede: "billeder/louise4.png",
        svar: [
            { tekst: "Det lyder farligt, det skal bare fjernes", point: 1 },
            { tekst: "Nej, adware og malware skal man bruge på computeren", point: 0 }
        ]
    },
    {
        tekst: "Proceslinjen forsvinder, og den opdaterer, Louise går i panik, hvad laver du, chefen bliver sur!?",
        billede: "billeder/louise5.jpg",
        svar: [
            { tekst: "Jeg må hellere trykke på strømknappen og hurtigt genstarte computeren", point: 0 },
            { tekst: "Vi må have tålmodighed, Louise, det hele skal nok gå", point: 1 }
        ]
    },
    {
        tekst: "Notifikation dukker op; ''Windows har fundet 11 trusler, download anti-virus program for at fjerne'', og Louise skynder sig med at trykke på musen, fordi hun ikke stoler på dig, og pludselig begynder computeren at være ultra langsom..",
        billede: "billeder/louise6.jpg",
        svar: [
            { tekst: "Louise, NEJ!!", point: 1 },
            { tekst: "Du må ALDRIG downloade noget som du bliver bedt om direkte på skærmen uden at selv søge efter det!", point: 1 }
        ]
    },
    {
        tekst: "Neeeeeej... Du beslutter dig nu for at downloade firmaets godkendte anti-virus program fra IT databasen, og prøve at redde situationen",
        billede: "billeder/louise7.png",
        svar: [
            { tekst: "Vi henter bare noget gratis fra nettet, det plejer at virke", point: 0 },
            { tekst: "Undersøg med nærmeste ansatte omkring hvad de bruger fra virksomhedens programliste, da IT folkene har styr på det!", point: 1 }
        ]
    },
    {
        tekst: "Du henter programmet og lader det køre, alt imens Louise modtager mail, hvor der bedes om nogle private oplysninger til at gennemføre et køb online",
        billede: "billeder/louise8.jpg",
        svar: [
            { tekst: "Du siger til Louise at hun trygt kan trykke ind på mailen og linket", point: 0 },
            { tekst: "Du beder Louise om at tjekke afsender, og at ignorere hvis det ikke virker bekendt", point: 1 }
        ]
    },
    {
        tekst: "Nu er programmet færdig med at køre scanningen, og den finder truslerne og beskytter efterfølgende computeren",
        billede: "billeder/louise9.jpg",
        svar: [
            { tekst: "Godkend og start en ekstra scanning for en sikkerhedsskyld", point: 1 }
        ]
    },
    {
        tekst: "Louise's computer scannes for anden gang, hvor der vises at computeren har nu 0 trusler",
        billede: "billeder/louise10.jpg",
        svar: [
            { tekst: "Fedt, vi gjorde det, Louise!", point: 0 },
            { tekst: "Lad os lige gå ind og fjerne alle mapper og filer du måtte have downloadet inden problemet startede", point: 1 }
        ]
    },
    {
        tekst: "Louise spørger, hvordan kan jeg sikre mig fremadrettet, så vores virksomhedsoplysninger ikke er i fare?",
        billede: "billeder/louise11.jpg",
        svar: [
            { tekst: "Scan regelmæssigt computeren og hold godt øje, og ignorér falske emails og links", point: 1 },
            { tekst: "Tjek din computer for virus 1-2 gange om året og når du downloader, kan du gætte dig frem til hvad er bedst at gøre", point: 0 }
        ]
    }
];

const slutninger = [
    {
        titel: "Du er heldig at du ikke er hacket endnu",
        beskrivelse: "Din viden om cybersikkerhed er begynder-niveau. Der er plads til forbedring! Overvej at læse mere om grundlæggende sikkerhedspraksis, stærke passwords og hvordan man genkender phishing-forsøg.",
        billede: "billeder/niveau1.jpg",
        minimumScore: 1
    },
    {
        titel: ".. Vi er der næsten",
        beskrivelse: "Du har en god grundviden om cybersikkerhed, men der er stadig områder du kan forbedre. Overvej at implementere alle steder du kan 2FA (Two Factor Authentication) og være mere opmærksom på dine onlinevaner.",
        billede: "billeder/niveau2.jpg",
        minimumScore: 10
    },
    {
        titel: "Sådan!",
        beskrivelse: "Du har en fremragende forståelse af cybersikkerhedsprincipper. Du er klar over de fleste fælder og ved hvordan du beskytter dig selv. Fortsæt det gode arbejde!",
        billede: "billeder/niveau3.jpg",
        minimumScore: 15
    }
];

function initialiserQuiz() {
    naevvaerendeSpoergsmaal = 0;
    score = 0;
    korrekteSvar = 0;
    forkerteSvar = 0;
    quizAfsluttet = false;
    spoergsmaalContainer.classList.remove('skjult');
    resultatContainer.classList.add('skjult');
    visSpoergsmaal();
}

function visSpoergsmaal() {
    if (quizAfsluttet) return;

    if (naevvaerendeSpoergsmaal >= spoergsmaal.length) {
        afslutQuiz();
        return;
    }

    const spoergsmaalData = spoergsmaal[naevvaerendeSpoergsmaal];
    spoergsmaalTekst.textContent = spoergsmaalData.tekst;
    spoergsmaalBillede.src = spoergsmaalData.billede;
    spoergsmaalBillede.alt = "billede";

    svarContainer.innerHTML = '';
    spoergsmaalData.svar.forEach((svar) => {
        const svarKnap = document.createElement('button');
        svarKnap.classList.add('svar-knap');
        svarKnap.textContent = svar.tekst;
        svarKnap.addEventListener('click', () => {
            if (svar.endGame) {
                afslutQuizTidligt(svar.endMessage);
            } else {
                vaelgSvar(svar.point);
            }
        });
        svarContainer.appendChild(svarKnap);
    });

    const fremskridtBredde = ((naevvaerendeSpoergsmaal + 1) / spoergsmaal.length) * 100;
    fremskridtBar.style.width = `${fremskridtBredde}%`;
}

function vaelgSvar(point) {
    if (quizAfsluttet) return;

    score += point;
    point === 1 ? korrekteSvar++ : forkerteSvar++;
    naevvaerendeSpoergsmaal++;
    
    if (naevvaerendeSpoergsmaal >= spoergsmaal.length) {
        afslutQuiz();
    } else {
        visSpoergsmaal();
    }
}

function afslutQuizTidligt(endMessage) {
    quizAfsluttet = true;
    spoergsmaalContainer.classList.add('skjult');
    resultatContainer.classList.remove('skjult');
    
    resultatTitel.textContent = "Øv!";
    resultatBeskrivelse.textContent = endMessage;
    resultatBillede.src = "billeder/happyhacker.jpg";
    resultatBillede.alt = "Hackeren kom ind!";
    startForfraKnap.textContent = "Prøv igen";

    const answeredQuestions = naevvaerendeSpoergsmaal + 1;
    
    gemResultat({
        id: 'cyber-' + Date.now(),
        dato: formatDate(new Date()),
        score: score,
        maksScore: answeredQuestions,
        procent: Math.round((score / answeredQuestions) * 100),
        resultatNiveau: "Desværre - hackeren fik fat i dine data!",
        scenarioType: 'dårlig',
        detaljer: {
            korrekteSvar: korrekteSvar,
            forkerteSvar: forkerteSvar
        }
    });
}

function afslutQuiz() {
    quizAfsluttet = true;

    let slutning;
    if (score < 8) {
        slutning = slutninger[0]; // niveau 1
    } else if (score < 13) {
        slutning = slutninger[1]; // niveau 2
    } else {
        slutning = slutninger[2]; // niveau 3
    }

    visResultat(slutning);
}

function visResultat(slutning) {
    spoergsmaalContainer.classList.add('skjult');
    resultatContainer.classList.remove('skjult');
    
    resultatTitel.textContent = slutning.titel;
    resultatBeskrivelse.textContent = slutning.beskrivelse;
    resultatBillede.src = slutning.billede;
    resultatBillede.alt = "billede";
    startForfraKnap.textContent = "Prøv igen";

    const scenarioType = score >= 13 ? 'god' : score >= 8 ? 'middel' : 'dårlig';
    gemResultat({
    id: 'cyber-' + Date.now(),
    dato: formatDate(new Date()),
        score: score,
        maksScore: spoergsmaal.length,
        procent: Math.round((score / spoergsmaal.length) * 100),
        resultatNiveau: slutning.titel,
        scenarioType: scenarioType,
        detaljer: {
            korrekteSvar: korrekteSvar,
            forkerteSvar: forkerteSvar
        }
    });
}

function gemResultat(data) {
    resultatData = data;
    fetch('resultater.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).catch(error => console.error('Fejl:', error));
}

function eksporterResultat() {
    if (!resultatData) return;
    
    const dataStr = JSON.stringify(resultatData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportNavn = 'cyber-resultat-' + formatDate(new Date()).replace(' ', '_') + '.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportNavn);
    linkElement.click();
}

startForfraKnap.addEventListener('click', initialiserQuiz);
eksporterKnap.addEventListener('click', eksporterResultat);

document.addEventListener('DOMContentLoaded', initialiserQuiz);