import { Controller, Param, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { Stats } from './stats.entity';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {

    constructor(private statsService: StatsService) { }
    @Get(':user')
    getStats(@Param() params): Promise<Stats[]> | [] {
        return this.statsService.getStatus(params.user)
    }

    @Post()
    addStat(@Body() body): Promise<boolean> {
        return this.statsService.addStats(body.stats.user, body.stats.card, body.stats)
    }
    @Delete(':user/:card')
    async deleteStat(@Param() params): Promise<boolean> {

        await this.statsService.deleteStats(params.user, params.card)
        return true;
    }

    @Put(':id')
    async updateStat(@Param() params, @Body() body): Promise<boolean> {

        this.statsService.updateStats(params.id, body.stat)
        return true
    }


}
