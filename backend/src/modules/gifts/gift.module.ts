import { Module } from "@nestjs/common";
import { GiftService } from "./gift.service";
import { GiftController } from "./gift.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GiftEntity } from "./gift.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([GiftEntity])
    ],
    providers: [GiftService],
    controllers: [GiftController],
})
export class GiftModule {}