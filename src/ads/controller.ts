import { JsonController, Get, Param, Post, HttpCode, Body, Put, NotFoundError } from "routing-controllers";
import Ad from "./entity";

@JsonController()
export default class AdController {

    @Get('/ads/:id')
    getAd(
        @Param('id') id: number
    ) {
        return Ad.findOne(id)
    }

    @Get('/ads')
    async allAds() {
        const ads = await Ad.find()
        return { ads }
    }

    @Post('/ads')
    @HttpCode(201)
    createAd(
        @Body() ad: Ad
    ) {
        return ad.save()
    }

    @Put('/ads/:id')
    async updateAd(
        @Param('id') id: number,
        @Body() update: Partial<Ad>
    ) {
        const ad = await Ad.findOne(id)
        if (!ad) throw new NotFoundError('Ad cannot be found')

        return Ad.merge(ad, update).save()
    }
}