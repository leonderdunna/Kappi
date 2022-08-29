import {Stat} from './card/stat.model'
import {Content} from "./card/content.model";
import {Card} from "./card/card.model";

export class Defaults {
  static cardStat(): Stat {
    return {
      time: Date.now(),
      rubrik: 0,
      due: 0,
      leichtigkeit: 2.5, //TODO Aus einstellungen Importieren
      intervall: 0,
      stufe: 0,

    }
  }

  static cardContent(): Content {
    return {
      entwurf: true,
      time: Date.now(),
      type: 'Kappi-Basic',
      felder: {
        frage: '',
        antwort: '',
        eingeben: false,
      }
    }
  }

  static card(): Card {
    return {
      id: Math.random() + '',
      time: Date.now(),
      paket: ['Standard'],
      content: [this.cardContent()],
      stat: [this.cardStat()]
    }
  }

}
