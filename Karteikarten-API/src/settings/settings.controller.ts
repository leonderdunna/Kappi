import { Controller, Get } from '@nestjs/common';

@Controller('settings/:username')
export class SettingsController {
    //TODO: GET und Post
    @Get()
    getSettings() {
        return { //TODO: dafür muss noch ne datenbank angelegt werden
            startLeichtigkeit: 2.5, // relatie einheiten
            neueProTag: 10,
            lernenSchritte: [1000 * 60, 1000 * 60 * 10],
            startEinfach: 1000 * 60 * 60 * 24 * 4,
            startGut: 1000 * 60 * 60 * 24,
            minIntervall: 1000 * 60 * 60 * 24,
            maxIntervall: 1000 * 60 * 60 * 24 * 365 * 10,
            faktorErneut: 0.75,  //relative einheiten
            erneutSchritte: [1000 * 60 * 10]
        }
    }
}
