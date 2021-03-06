import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Answerping } from '../_interface/answerping';
import { Group } from '../_interface/group';
import { Question } from '../_interface/question';
import { TemplateQuestionComponent } from '../_template/template-question/template-question.component';

@Component({
  selector: 'app-page-game',
  templateUrl: './page-game.component.html',
  styleUrls: ['./page-game.component.sass']
})
export class PageGameComponent implements OnInit {

  groups: Group[];
  questions: Question[];
  totalAmountOfQuestions: number;
  questionsSolved: number;
  activeQuestion: Question;
  uri: SafeUrl;
  ingame: boolean;
  gameState: string;

  @ViewChild(TemplateQuestionComponent) questionComponent: TemplateQuestionComponent;

  constructor(private sanitizer: DomSanitizer) {
    this.groups = [
      { id: 1, score: 0, roundScore: 0, active: true },
      { id: 2, score: 0, roundScore: 0, active: false },
      { id: 3, score: 0, roundScore: 0, active: false },
      { id: 4, score: 0, roundScore: 0, active: false }
    ];
    this.questions = this.loadQuestions();
    this.activeQuestion = this.questions[10];
    this.totalAmountOfQuestions = this.questions.length;
    this.questionsSolved = 0;
    this.ingame = false;
    this.gameState = "Spiel läuft nicht";
  }

  ngOnInit(): void {
  }

  public startGame(): void {
    if (!this.ingame) {
      this.ingame = true;
      this.gameState = "Spiel läuft";
    }
  }

  public add(): void {
    if (!this.ingame) {
      this.groups.push(
        {
          id: this.groups.length + 1,
          score: 0,
          roundScore: 0,
          active: false
        }
      );
    }
  }

  public remove(): void {
    if (!this.ingame) {
      if (this.groups.length > 2) {
        this.groups.pop();
      }
    }
  }

  public ckeckAnswer(event?: Answerping): void {
    let answerWasCorrect = true;
    if (this.ingame) {
      this.groups.forEach(group => {
        if (group.active) {
          if (event.answer.correct) {
            group.roundScore += 100;
          }
          else {
            group.roundScore = 0;
            answerWasCorrect = false;
          }
        }
      });
      if (!answerWasCorrect) {
        this.goToNextGroup();
      }
    }
  }

  public goToNextQuestion(): void {
    if (this.ingame) {
      if (this.questions.length > 1) {
        this.questions.splice(this.questions.indexOf(this.activeQuestion), 1);
      }
      let num = Math.floor(Math.random() * (this.questions.length -1));
      this.activeQuestion = this.questions[num];
      this.questionsSolved ++;
    }
  }

  public goToNextGroup(): void {
    if (this.ingame) {
      for (let i = 0; i < this.groups.length; i++) {
        if (this.groups[i].active) {
          this.groups[i].active = false;
          if (i +1 == this.groups.length) {
            this.groups[0].active = true;
          } else {
            this.groups[i + 1].active = true;
          }
          break;
        }
      }
    }
  }

  public overrideScore() : void {
    if (this.ingame) {
      for (let i = 0; i < this.groups.length; i++) {
        if (this.groups[i].active) {
          this.groups[i].score += this.groups[i].roundScore;
          this.groups[i].roundScore = 0;
        }
      }
    }
  }

  public finishGame(): void {
    if (this.ingame) {
      var theJSON = JSON.stringify(this.groups);
      var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
      this.uri = uri;
      this.ingame = false;
      this.gameState = "Spiel beendet"
    }
}

  private loadQuestions(): Question[] {
    return [
      {
        id: 1,
        label: 'Welche Erfindungen kannte Otto Graf von Bismarck (gestorben 1897)?',
        answers: [
        {
          label: 'Aspirin',
          correct: false,
          comment: '1899'
        },
        {
          label: 'Dieselmotor',
          correct: true,
          comment: '1893'
        },
        {
          label: 'Dreifarbdruck',
          correct: true,
          comment: '1710'
        },
        {
          label: 'Dynamit',
          correct: true,
          comment: '1867'
        },
        {
          label: 'Dynamo',
          correct: true,
          comment: '1866'
        },
        {
          label: 'el. Aufzug',
          correct: true,
          comment: '1880'
        },
        {
          label: 'el. Lokomotive',
          correct: true,
          comment: '1879'
        },
        {
          label: 'Elektronenröhre',
          correct: false,
          comment: '1904'
        },{
          label: 'Glühbirne',
          correct: true,
          comment: '1891'
        },
        {
          label: 'Luftreifen',
          correct: true,
          comment: '1888'
        },
        {
          label: 'Röntgenstrahlen',
          correct: true,
          comment: '1835'
        },
        {
          label: 'Segelflugzeug',
          correct: true,
          comment: '1891'
        },
        {
          label: 'Telefon',
          correct: true,
          comment: '1876'
        },
        {
          label: 'U-Boot',
          correct: true,
          comment: '1885'
        },
        {
          label: 'Wankelmotor',
          correct: false,
          comment: '1957'
        },
        {
          label: 'Zeppelin',
          correct: false,
          comment: '1900'
        }
        ],
        answersCorrect: 12
      },
      {
        id: 2,
        label: 'Welches Material ist bei 1500°C flüssig?',
        answers: [
        {
          label: 'Blei',
          correct: true,
          comment: '327 °C'
        },
        {
          label: 'Bronze',
          correct: true,
          comment: '910 °C'
        },
        {
          label: 'Chrom',
          correct: false,
          comment: '1800 °C'
        },
        {
          label: 'Eisen',
          correct: false,
          comment: '1530 °C'
        },
        {
          label: 'Glas',
          correct: true,
          comment: '700 °C'
        },
        {
          label: 'Gold',
          correct: true,
          comment: '1063 °C'
        },
        {
          label: 'Graphit',
          correct: false,
          comment: '3830 °C'
        },
        {
          label: 'Kochsalz',
          correct: true,
          comment: '802 °C'
        },
        {
          label: 'Kupfer',
          correct: true,
          comment: '1083 °C'
        },
        {
          label: 'Marmor',
          correct: true,
          comment: '1290 °C'
        },
        {
          label: 'Messing',
          correct: true,
          comment: '900 °C'
        },
        {
          label: 'Nickel',
          correct: true,
          comment: '1452 °C'
        },
        {
          label: 'Platin',
          correct: false,
          comment: '1770 °C'
        },
        {
          label: 'Quarz',
          correct: true,
          comment: '1400 °C'
        },
        {
          label: 'Stahl',
          correct: true,
          comment: '1450 °C'
        },
        {
          label: 'Aluminium',
          correct: true,
          comment: '658 °C'
        }
        ],
        answersCorrect: 12
      },
      {
        id: 3,
        label: 'Welche Pflanzen sind nach Deutschland „eingewandert“?',
        answers: [
        {
          label: 'Apfel',
          correct: false,
          comment: ''
        },
        {
          label: 'Erdbeere',
          correct: false,
          comment: ''
        },
        {
          label: 'Gurke',
          correct: true,
          comment: 'Indien'
        },
        {
          label: 'Hafer',
          correct: false,
          comment: ''
        },
        {
          label: 'Hirse',
          correct: false,
          comment: ''
        },
        {
          label: 'Kartoffel',
          correct: true,
          comment: 'Peru'
        },
        {
          label: 'Kürbis',
          correct: true,
          comment: 'Amerika'
        },
        {
          label: 'Mais',
          correct: true,
          comment: 'Amerika'
        },
        {
          label: 'Pflaume',
          correct: true,
          comment: 'Kaukasus'
        },
        {
          label: 'Quitte',
          correct: true,
          comment: 'Kreta'
        },
        {
          label: 'Rose',
          correct: true,
          comment: 'Orient'
        },
        {
          label: 'Sauerkirsche',
          correct: true,
          comment: 'Kleinasien'
        },
        {
          label: 'Tabak',
          correct: true,
          comment: 'Amerika'
        },
        {
          label: 'Tomate',
          correct: true,
          comment: 'Peru'
        },
        {
          label: 'Wein',
          correct: true,
          comment: 'Nordeuropa'
        },
        {
          label: 'Weizen',
          correct: true,
          comment: 'Asien'
        }
        ],
        answersCorrect: 12
      },
      {
        id: 4,
        label: 'Welche Länder sind kleiner als Deutschland (357.022 km²)?',
        answers: [
        {
          label: 'Angola',
          correct: false,
          comment: '1.246.700 km²'
        },
        {
          label: 'Griechenland',
          correct: true,
          comment: '131.957 km²'
        },
        {
          label: 'Großbritannien',
          correct: true,
          comment: '242.900 km²'
        },
        {
          label: 'Israel',
          correct: true,
          comment: '20.991 km²'
        },
        {
          label: 'Jemen',
          correct: false,
          comment: '536.869 km²'
        },
        {
          label: 'Kasachstan',
          correct: false,
          comment: '2.717.300 km²'
        },
        {
          label: 'Kuwait',
          correct: true,
          comment: '17.818 km²'
        },
        {
          label: 'Laos',
          correct: true,
          comment: '236.800 km²'
        },
        {
          label: 'Neuseeland',
          correct: true,
          comment: '270.534 km²'
        },
        {
          label: 'Österreich',
          correct: true,
          comment: '83.858 km²'
        },
        {
          label: 'Polen',
          correct: true,
          comment: '312.685 km²'
        },
        {
          label: 'Senegal',
          correct: true,
          comment: '196.722 km²'
        },
        {
          label: 'Singapur',
          correct: true,
          comment: '648 km²'
        },
        {
          label: 'Tunesien',
          correct: true,
          comment: '163.610 km²'
        },
        {
          label: 'Uruguay',
          correct: true,
          comment: '175.016 km²'
        },
        {
          label: 'Venezuela',
          correct: false,
          comment: '912.050 km²'
        }
        ],
        answersCorrect: 12
      },
      {
        id: 5,
        label: 'Welche Flüsse fließen in Deutschland?',
        answers: [
        {
          label: 'Aa',
          correct: true,
          comment: 'NRW'
        },
        {
          label: 'Aller',
          correct: true,
          comment: 'Niedersachsen'
        },
        {
          label: 'Drau',
          correct: false,
          comment: 'Österreich'
        },
        {
          label: 'Eider',
          correct: true,
          comment: 'Schleswig-Holstein'
        },
        {
          label: 'Etsch',
          correct: false,
          comment: 'Italien'
        },
        {
          label: 'Ill',
          correct: false,
          comment: 'Österreich'
        },
        {
          label: 'Iller',
          correct: true,
          comment: 'Bayern'
        },
        {
          label: 'Inn',
          correct: true,
          comment: 'Bayern'
        },
        {
          label: 'Kocher',
          correct: true,
          comment: 'Baden-Württemberg'
        },
        {
          label: 'Meurthe',
          correct: false,
          comment: 'Frankreich'
        },
        {
          label: 'Nidda',
          correct: true,
          comment: 'Hessen'
        },
        {
          label: 'Platte',
          correct: false,
          comment: 'USA'
        },
        {
          label: 'Po',
          correct: false,
          comment: 'Italien'
        },
        {
          label: 'Scheide',
          correct: false,
          comment: 'Belgien'
        },
        {
          label: 'Treene',
          correct: true,
          comment: 'Schleswig-Holstein'
        },
        {
          label: 'Warnow',
          correct: true,
          comment: 'Meckl.-Vorpommern'
        }
        ],
        answersCorrect: 9
      },
      {
        id: 6,
        label: 'Mit welchem Handy kann man keine Fotos machen?',
        answers: [
        {
          label: 'Alcatel One Touch 535',
          correct: true,
          comment: ''
        },
        {
          label: 'LG G5400',
          correct: true,
          comment: ''
        },
        {
          label: 'Motorola V300',
          correct: false,
          comment: ''
        },
        {
          label: 'Motorola v66i',
          correct: true,
          comment: ''
        },
        {
          label: 'Nokia 3100',
          correct: true,
          comment: ''
        },
        {
          label: 'Nokia 3410',
          correct: true,
          comment: ''
        },
        {
          label: 'Sagem MY X-3',
          correct: true,
          comment: ''
        },
        {
          label: 'Samsung SGH N500',
          correct: true,
          comment: ''
        },
        {
          label: 'Samsung SGH X100',
          correct: true,
          comment: ''
        },
        {
          label: 'Samsung SGH-E700',
          correct: false,
          comment: ''
        },
        {
          label: 'Siemens A50',
          correct: true,
          comment: ''
        },
        {
          label: 'Siemens C25',
          correct: true,
          comment: ''
        },
        {
          label: 'Siemens C55',
          correct: true,
          comment: ''
        },
        {
          label: 'Siemens ST55',
          correct: false,
          comment: ''
        },
        {
          label: 'Sony Ericson T610',
          correct: false,
          comment: ''
        },
        {
          label: 'Sony Ericson Z200',
          correct: true,
          comment: ''
        }
        ],
        answersCorrect: 12
      },
      {
        id: 7,
        label: 'Was wurde nicht in Deutschland erfunden?',
        answers: [
        {
          label: 'Benzinmotor',
          correct: false,
          comment: '1867 / Otto, Deutschland'
        },
        {
          label: 'Blitzableiter',
          correct: true,
          comment: '1752 / Franklin, USA'
        },
        {
          label: 'Dampflokomotive',
          correct: true,
          comment: '1829 / Stephenson, England'
        },
        {
          label: 'Dynamit',
          correct: true,
          comment: '1867 / Nobel, Schweden'
        },
        {
          label: 'Elektromotor',
          correct: false,
          comment: '1865 / Siemens, Deutschland'
        },
        {
          label: 'Fernrohr',
          correct: true,
          comment: '1608 / Lippershey, Holland'
        },
        {
          label: 'Fernsehen',
          correct: false,
          comment: '1897 / Braun, Deutschland'
        },
        {
          label: 'Heißluftballon',
          correct: true,
          comment: '1783 / Montgolfier, Frankreich'
        },
        {
          label: 'Hubschrauber',
          correct: true,
          comment: '1925 / Sikorski, USA'
        },
        {
          label: 'Nähmaschine',
          correct: true,
          comment: '1790 / Saint, England'
        },
        {
          label: 'Pendeluhr',
          correct: true,
          comment: '1675 / Huygens, Holland'
        },
        {
          label: 'Perlon',
          correct: false,
          comment: '1938 / Schlack, Deutschland'
        },
        {
          label: 'Plattenspieler',
          correct: true,
          comment: '1887 / Berliner, USA'
        },
        {
          label: 'Porzellan',
          correct: true,
          comment: '600 / China'
        },
        {
          label: 'Schaufelraddampfer',
          correct: true,
          comment: '1807 / Fulton, USA'
        },
        {
          label: 'Schreibmaschine',
          correct: true,
          comment: '1864 / Mitterhofer, Österreicher'
        }
        ],
        answersCorrect: 12
      },
      {
        id: 8,
        label: 'Welches Lied ist von den Beatles?',
        answers: [
        {
          label: 'A hard day´s night',
          correct: true,
          comment: ''
        },
        {
          label: 'Get back',
          correct: true,
          comment: ''
        },
        {
          label: 'Help',
          correct: true,
          comment: ''
        },
        {
          label: 'I want to hold your Hand',
          correct: true,
          comment: ''
        },
        {
          label: 'In the army now',
          correct: false,
          comment: 'Status Quo'
        },
        {
          label: 'Lady Madonna',
          correct: true,
          comment: ''
        },
        {
          label: 'Let it be',
          correct: true,
          comment: ''
        },
        {
          label: 'Nowhere man',
          correct: true,
          comment: ''
        },
        {
          label: 'OB-LA-DI, OB-LA-DA',
          correct: true,
          comment: ''
        },
        {
          label: 'She loves you',
          correct: true,
          comment: ''
        },
        {
          label: 'Smoke on the water',
          correct: false,
          comment: 'Deep Purple'
        },
        {
          label: 'Waterloo',
          correct: false,
          comment: 'Abba'
        },
        {
          label: 'We will rock you',
          correct: false,
          comment: 'Queen'
        },
        {
          label: 'While my guitar gently weeps',
          correct: true,
          comment: ''
        },
        {
          label: 'Yellow submarine',
          correct: true,
          comment: ''
        },
        {
          label: 'Yesterday',
          correct: true,
          comment: ''
        }
        ],
        answersCorrect: 12
      },
      {
        id: 9,
        label: 'Wer war/ist amerikanischer Präsident?',
        answers: [
        {
          label: 'Abraham Lincoln',
          correct: true,
          comment: '1861 - 1865'
        },
        {
          label: 'Arnold Schwarzenegger',
          correct: false,
          comment: ''
        },
        {
          label: 'Benjamin Harrison',
          correct: true,
          comment: '1889-1893'
        },
        {
          label: 'Bill Clinton',
          correct: true,
          comment: '1993-2001'
        },
        {
          label: 'Bill Gates',
          correct: false,
          comment: ''
        },
        {
          label: 'George Bush',
          correct: true,
          comment: '1989-1993'
        },
        {
          label: 'George Washington',
          correct: true,
          comment: '1789-1797'
        },
        {
          label: 'Gerald Ford',
          correct: true,
          comment: '1974-1977'
        },
        {
          label: 'Harry Truman',
          correct: true,
          comment: '1945-1953'
        },
        {
          label: 'Henry Fonda',
          correct: false,
          comment: ''
        },
        {
          label: 'John Carpenter',
          correct: false,
          comment: ''
        },
        {
          label: 'John F. Kennedy',
          correct: true,
          comment: '1961-1963'
        },
        {
          label: 'Lyndon Johnson',
          correct: true,
          comment: '1963-1969'
        },
        {
          label: 'Richard Nixon',
          correct: true,
          comment: '1969-1974'
        },
        {
          label: 'Ronald Reagan',
          correct: true,
          comment: '1981-1989'
        },
        {
          label: 'Theodore Roosevelt',
          correct: true,
          comment: '1901-1909'
        }
        ],
        answersCorrect: 12
      },
      {
        id: 10,
        label: 'Welches sind Blasinstrumente?',
        answers: [
        {
          label: 'Cello',
          correct: false,
          comment: 'Saiteninstrument'
        },
        {
          label: 'Cembalo',
          correct: false,
          comment: 'Tasteninstrument'
        },
        {
          label: 'Didgeridoo',
          correct: true,
          comment: ''
        },
        {
          label: 'Dudelsack',
          correct: false,
          comment: 'Rohrblattinstrument'
        },
        {
          label: 'Fagott',
          correct: true,
          comment: ''
        },
        {
          label: 'Klarinette',
          correct: true,
          comment: ''
        },
        {
          label: 'Kornett',
          correct: true,
          comment: ''
        },
        {
          label: 'Lure',
          correct: true,
          comment: ''
        },
        {
          label: 'Oboe',
          correct: true,
          comment: ''
        },
        {
          label: 'Okarina',
          correct: true,
          comment: ''
        },
        {
          label: 'Pikkolo',
          correct: true,
          comment: ''
        },
        {
          label: 'Rackett',
          correct: true,
          comment: ''
        },
        {
          label: 'Schalmei',
          correct: true,
          comment: ''
        },
        {
          label: 'Serpent',
          correct: true,
          comment: ''
        },
        {
          label: 'Spinett',
          correct: false,
          comment: 'Tasteninstrument'
        },
        {
          label: 'Tuba',
          correct: true,
          comment: ''
        }
        ],
        answersCorrect: 12
      },
      {
        id: 99,
        label: 'Beispielfrage',
        answers: [
        {
          label: 'false',
          correct: false,
          comment: ''
        },
        {
          label: 'false',
          correct: false,
          comment: ''
        },
        {
          label: 'true',
          correct: true,
          comment: ''
        },
        {
          label: 'false',
          correct: false,
          comment: ''
        },
        {
          label: 'true',
          correct: true,
          comment: ''
        },
        {
          label: 'true',
          correct: true,
          comment: ''
        },
        {
          label: 'true',
          correct: true,
          comment: ''
        },
        {
          label: 'true',
          correct: true,
          comment: ''
        },
        {
          label: 'true',
          correct: true,
          comment: ''
        },
        {
          label: 'true',
          correct: true,
          comment: ''
        },
        {
          label: 'true',
          correct: true,
          comment: ''
        },
        {
          label: 'true',
          correct: true,
          comment: ''
        },
        {
          label: 'true',
          correct: true,
          comment: ''
        },
        {
          label: 'true',
          correct: true,
          comment: ''
        },
        {
          label: 'false',
          correct: false,
          comment: ''
        },
        {
          label: 'true',
          correct: true,
          comment: ''
        }
        ],
        answersCorrect: 12
      },
      {
        id: 11,
        label: 'Welche Namen gehören Inselgruppen?',
        answers: [
        {
          label: 'Azoren',
          correct: true,
          comment: 'zu Portugal: 9 Inseln im Atlantik'
        },
        {
          label: 'Balearen',
          correct: true,
          comment: 'zu Spanien: 4 Inseln im Mittelmeer'
        },
        {
          label: 'Bengalen',
          correct: false,
          comment: 'Landschaft in Indien'
        },
        {
          label: 'Hebriden',
          correct: true,
          comment: 'zu Schottland: ca. 500 Inseln im Atlantik'
        },
        {
          label: 'Karawanken',
          correct: false,
          comment: 'Gebirge bis 2238m (Österreich/Kroatien)'
        },
        {
          label: 'Komoren',
          correct: true,
          comment: 'eigene Republik im indischen Ozean'
        },
        {
          label: 'Kordilleren',
          correct: false,
          comment: 'Gebirge in Amerika'
        },
        {
          label: 'Kurilen',
          correct: true,
          comment: 'zu Russland: NW von Japan im Pazifik'
        },
        {
          label: 'Kykladen',
          correct: true,
          comment: 'zu Griechenland: ca. 200 Inseln im Mittelmeer'
        },
        {
          label: 'Lakkadiven',
          correct: true,
          comment: 'indische Koralleninseln im indischen Ozean'
        },
        {
          label: 'Lofoten',
          correct: true,
          comment: 'zu Norwegen: nördlich des Polarkreises im Atlantik'
        },
        {
          label: 'Malediven',
          correct: true,
          comment: 'igene Republik SW von Sri Lanka im ind. Ozean'
        },
        {
          label: 'Molukken',
          correct: true,
          comment: 'zu Indonesien westlich von Neuguinea im Pazifik'
        },
        {
          label: 'Seychellen',
          correct: true,
          comment: 'eigene Republik nördlich von Madagaskar im ind. Ozean'
        },
        {
          label: 'Sporaden',
          correct: true,
          comment: 'zu Griechenland: Inseln in der Ägäis (Mittelmeer)'
        },
        {
          label: 'Tamilen',
          correct: false,
          comment: 'Volksstamm in Indien'
        }
        ],
        answersCorrect: 12
      },
      {
        id: 12,
        label: 'In welchen Staatsflaggen ist die Farbe ""Rot"" enthalten?',
        answers: [
        {
          label: 'Afghanistan',
          correct: true,
          comment: ''
        },
        {
          label: 'Albanien',
          correct: true,
          comment: ''
        },
        {
          label: 'Andorra',
          correct: true,
          comment: ''
        },
        {
          label: 'Griechenland',
          correct: false,
          comment: 'Blau mit Kreuz'
        },
        {
          label: 'Indien',
          correct: false,
          comment: 'Orange, Weiss, Grün'
        },
        {
          label: 'Indonesien',
          correct: true,
          comment: ''
        },
        {
          label: 'Israel',
          correct: false,
          comment: 'Blau mit Stern'
        },
        {
          label: 'Monaco',
          correct: true,
          comment: ''
        },
        {
          label: 'Norwegen',
          correct: true,
          comment: ''
        },
        {
          label: 'Österreich',
          correct: true,
          comment: ''
        },
        {
          label: 'Pakistan',
          correct: false,
          comment: ''
        },
        {
          label: 'Philippinen',
          correct: true,
          comment: ''
        },
        {
          label: 'Polen',
          correct: true,
          comment: ''
        },
        {
          label: 'Süd Korea',
          correct: true,
          comment: ''
        },
        {
          label: 'Thailand',
          correct: true,
          comment: ''
        },
        {
          label: 'Ungarn',
          correct: true,
          comment: ''
        }
        ],
        answersCorrect: 12
      },
      {
        id: 13,
        label: 'Welche Namen gehören zu Volksgruppen?',
        answers: [
        {
          label: 'Angolonen',
          correct: false,
          comment: ''
        },
        {
          label: 'Esten',
          correct: true,
          comment: 'Esland'
        },
        {
          label: 'Flamen',
          correct: true,
          comment: 'Belgien'
        },
        {
          label: 'Haschimiden',
          correct: true,
          comment: 'Jordanien'
        },
        {
          label: 'Inka',
          correct: true,
          comment: 'Peru'
        },
        {
          label: 'Kasachstanier',
          correct: false,
          comment: 'heißen: Kasachen'
        },
        {
          label: 'Khmer',
          correct: true,
          comment: 'aus Kambotscha'
        },
        {
          label: 'Milagenen',
          correct: false,
          comment: 'Blödsinn'
        },
        {
          label: 'Mongolen',
          correct: true,
          comment: 'Mongolei'
        },
        {
          label: 'Osseten',
          correct: true,
          comment: 'aus Georgien'
        },
        {
          label: 'Perser',
          correct: true,
          comment: 'Iran'
        },
        {
          label: 'Singhalesen',
          correct: true,
          comment: 'Sri Lanka'
        },
        {
          label: 'Sorben',
          correct: true,
          comment: 'slavische Volksgruppe'
        },
        {
          label: 'Thainesen',
          correct: false,
          comment: 'Siamesen oder Thai'
        },
        {
          label: 'Waliser',
          correct: true,
          comment: 'Wales'
        },
        {
          label: 'Wallonen',
          correct: true,
          comment: 'Südbelgier'
        }
        ],
        answersCorrect: 12
      },
      {
        id: 14,
        label: 'Welche Tiere haben mehr als 15 Jahre Lebenserwartung?',
        answers: [
        {
          label: 'Amsel',
          correct: false,
          comment: '5 Jahre'
        },
        {
          label: 'Auster',
          correct: true,
          comment: '20-30 Jahre'
        },
        {
          label: 'Biber',
          correct: true,
          comment: '15-25 Jahre'
        },
        {
          label: 'Blindschleiche',
          correct: true,
          comment: '30 Jahre'
        },
        {
          label: 'Eichhörnchen',
          correct: false,
          comment: '8-12 Jahre'
        },
        {
          label: 'Fuchs',
          correct: false,
          comment: '10-12 Jahre'
        },
        {
          label: 'Haushund',
          correct: true,
          comment: '15-18 Jahre'
        },
        {
          label: 'Hausschaf',
          correct: false,
          comment: '14 Jahre'
        },
        {
          label: 'Hering',
          correct: true,
          comment: '18 Jahre'
        },
        {
          label: 'Kanarienvogel',
          correct: true,
          comment: '24 Jahre'
        },
        {
          label: 'Maikäfer',
          correct: false,
          comment: '3-4 Jahre'
        },
        {
          label: 'Meerschweinchen',
          correct: false,
          comment: '7 Jahre'
        },
        {
          label: 'Möwe',
          correct: true,
          comment: '30 Jahre'
        },
        {
          label: 'Regenwurm',
          correct: false,
          comment: '8 Jahre'
        },
        {
          label: 'Reh',
          correct: false,
          comment: '10-12 Jahre'
        },
        {
          label: 'Wellensittich',
          correct: false,
          comment: '10-13 Jahre'
        }
        ],
        answersCorrect: 7
      },
      {
        id: 15,
        label: 'Welche dieser Personen stammen aus dem Alten Testament?',
        answers: [
        {
          label: 'Aaron',
          correct: true,
          comment: ''
        },
        {
          label: 'Absalom',
          correct: true,
          comment: ''
        },
        {
          label: 'Benjamin',
          correct: true,
          comment: ''
        },
        {
          label: 'Elia',
          correct: true,
          comment: ''
        },
        {
          label: 'Esau',
          correct: true,
          comment: ''
        },
        {
          label: 'Hiob',
          correct: true,
          comment: ''
        },
        {
          label: 'Kain',
          correct: true,
          comment: ''
        },
        {
          label: 'Lazarus',
          correct: false,
          comment: 'Neues Testament'
        },
        {
          label: 'Lot',
          correct: true,
          comment: ''
        },
        {
          label: 'Martha',
          correct: false,
          comment: 'Neues Testament'
        },
        {
          label: 'Nikodemus',
          correct: false,
          comment: 'Neues Testament'
        },
        {
          label: 'Noah',
          correct: true,
          comment: ''
        },
        {
          label: 'Ruth',
          correct: true,
          comment: ''
        },
        {
          label: 'Samuel',
          correct: true,
          comment: ''
        },
        {
          label: 'Saul',
          correct: true,
          comment: ''
        },
        {
          label: 'Zachäus',
          correct: false,
          comment: 'Neues Testament'
        }
        ],
        answersCorrect: 12
      },
      {
        id: 16,
        label: 'Wobei handelt es sich um Figuren von Walt Disney?',
        answers: [
        {
          label: 'A-Hörnchen',
          correct: true,
          comment: ''
        },
        {
          label: 'Balou',
          correct: true,
          comment: ''
        },
        {
          label: 'Bambi',
          correct: true,
          comment: ''
        },
        {
          label: 'Bernhard',
          correct: true,
          comment: ''
        },
        {
          label: 'Dagobert Duck',
          correct: true,
          comment: ''
        },
        {
          label: 'Daniel Düsentrieb',
          correct: true,
          comment: ''
        },
        {
          label: 'Foxi',
          correct: false,
          comment: 'Ralf Kauka'
        },
        {
          label: 'Fred Feuerstein',
          correct: false,
          comment: 'Flintstones'
        },
        {
          label: 'Goofy',
          correct: true,
          comment: ''
        },
        {
          label: 'Idefix',
          correct: false,
          comment: 'Uderzo'
        },
        {
          label: 'Kater Carlo',
          correct: true,
          comment: ''
        },
        {
          label: 'Lupo',
          correct: false,
          comment: 'Ralf Kauka'
        },
        {
          label: 'Mogli',
          correct: true,
          comment: ''
        },
        {
          label: 'Orville',
          correct: true,
          comment: ''
        },
        {
          label: 'Pluto',
          correct: true,
          comment: ''
        },
        {
          label: 'Shirkan',
          correct: true,
          comment: ''
        }
        ],
        answersCorrect: 12
      },
      {
        id: 17,
        label: 'Wobei handelt es sich um Edelsteine?',
        answers: [
        {
          label: 'Achat',
          correct: true,
          comment: ''
        },
        {
          label: 'Alexandrit',
          correct: true,
          comment: ''
        },
        {
          label: 'Amethyst',
          correct: true,
          comment: ''
        },
        {
          label: 'Aquamarin',
          correct: true,
          comment: ''
        },
        {
          label: 'Aureole',
          correct: false,
          comment: 'Heiligenschein'
        },
        {
          label: 'Bergkristall',
          correct: true,
          comment: ''
        },
        {
          label: 'Bernstein',
          correct: false,
          comment: 'Harz'
        },
        {
          label: 'Diamant',
          correct: true,
          comment: ''
        },
        {
          label: 'Gold',
          correct: false,
          comment: 'Metall'
        },
        {
          label: 'Koralle',
          correct: false,
          comment: 'Lebewesen'
        },
        {
          label: 'Onyx',
          correct: true,
          comment: ''
        },
        {
          label: 'Opal',
          correct: true,
          comment: ''
        },
        {
          label: 'Rubin',
          correct: true,
          comment: ''
        },
        {
          label: 'Saphir',
          correct: true,
          comment: ''
        },
        {
          label: 'Smaragd',
          correct: true,
          comment: ''
        },
        {
          label: 'Topas',
          correct: true,
          comment: ''
        }
        ],
        answersCorrect: 12
      },
      {
        id: 18,
        label: 'Wobei handelt es sich um Märchen der Gebrüder Grimm?',
        answers: [
        {
          label: 'Aschenputtel',
          correct: true,
          comment: ''
        },
        {
          label: 'Das hässliche Entlein',
          correct: false,
          comment: 'Hans-Christian Andersen'
        },
        {
          label: 'Das tapfere Schneiderlein',
          correct: true,
          comment: ''
        },
        {
          label: 'Der Fischer und seine Frau',
          correct: true,
          comment: ''
        },
        {
          label: 'Der Froschkönig',
          correct: true,
          comment: ''
        },
        {
          label: 'Der gestiefelte Kater',
          correct: true,
          comment: ''
        },
        {
          label: 'Die fromme Helene',
          correct: false,
          comment: 'Wilhelm Busch'
        },
        {
          label: 'Die sieben Schwaben',
          correct: true,
          comment: ''
        },
        {
          label: 'Dornröschen',
          correct: true,
          comment: ''
        },
        {
          label: 'Hase und Igel',
          correct: true,
          comment: ''
        },
        {
          label: 'König Drosselbart',
          correct: true,
          comment: ''
        },
        {
          label: 'Rumpelstilzchen',
          correct: true,
          comment: ''
        },
        {
          label: 'Schneewittchen',
          correct: true,
          comment: ''
        },
        {
          label: 'Sindbad, der Seefahrer',
          correct: false,
          comment: '1001 Nacht'
        },
        {
          label: 'Sterntaler',
          correct: true,
          comment: ''
        },
        {
          label: 'Zwerg Nase',
          correct: false,
          comment: 'Wilhelm Hauff'
        }
        ],
        answersCorrect: 12
      },
      {
        id: 19,
        label: 'Welches sind Straßen aus dem Original Monopoly-Spiel?',
        answers: [
        {
          label: 'Badstraße',
          correct: true,
          comment: ''
        },
        {
          label: 'Bismarckstraße',
          correct: false,
          comment: ''
        },
        {
          label: 'Elisenstraße',
          correct: true,
          comment: ''
        },
        {
          label: 'Kaiserstraße',
          correct: false,
          comment: ''
        },
        {
          label: 'Lessingstraße',
          correct: true,
          comment: ''
        },
        {
          label: 'Luisenstraße',
          correct: false,
          comment: ''
        },
        {
          label: 'Museumsstraße',
          correct: true,
          comment: ''
        },
        {
          label: 'Opernplatz',
          correct: true,
          comment: ''
        },
        {
          label: 'Pariser Platz',
          correct: false,
          comment: ''
        },
        {
          label: 'Parkstraße',
          correct: true,
          comment: ''
        },
        {
          label: 'Poststraße',
          correct: true,
          comment: ''
        },
        {
          label: 'Rathausstraße',
          correct: true,
          comment: ''
        },
        {
          label: 'Schlossallee',
          correct: true,
          comment: ''
        },
        {
          label: 'Seestraße',
          correct: true,
          comment: ''
        },
        {
          label: 'Turmstraße',
          correct: true,
          comment: ''
        },
        {
          label: 'Wiener Straße',
          correct: true,
          comment: ''
        }
        ],
        answersCorrect: 12
      },
      {
        id: 20,
        label: 'Wobei handelt es sich um IKEA Möbel?',
        answers: [
        {
          label: 'Billy',
          correct: true,
          comment: ''
        },
        {
          label: 'Bonde',
          correct: true,
          comment: ''
        },
        {
          label: 'Brekke',
          correct: true,
          comment: ''
        },
        {
          label: 'Ektorp',
          correct: true,
          comment: ''
        },
        {
          label: 'Fridolf',
          correct: true,
          comment: ''
        },
        {
          label: 'Ingolf',
          correct: true,
          comment: ''
        },
        {
          label: 'Leksvik',
          correct: true,
          comment: ''
        },
        {
          label: 'Markör',
          correct: true,
          comment: ''
        },
        {
          label: 'Poäng',
          correct: true,
          comment: ''
        },
        {
          label: 'Rille',
          correct: false,
          comment: 'Blödsinn'
        },
        {
          label: 'Sjö',
          correct: false,
          comment: 'See'
        },
        {
          label: 'Sofaeck',
          correct: false,
          comment: 'es gibt zwar Ecksofas - die heißen aber nicht Sofaeck'
        },
        {
          label: 'Stipa',
          correct: true,
          comment: ''
        },
        {
          label: 'Stulle',
          correct: false,
          comment: 'Synonym für eine Scheibe Brot'
        },
        {
          label: 'Tylösand',
          correct: true,
          comment: ''
        },
        {
          label: 'Värde',
          correct: true,
          comment: ''
        }
        ],
        answersCorrect: 12
      },
      {
        id: 21,
        label: 'Vielen Dank fürs spielen!',
        answers: [],
        answersCorrect: 12
      }
    ];
  }
}
