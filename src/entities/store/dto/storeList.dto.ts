import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty, ValidateNested } from "class-validator"
import { StoreDto } from "./store.dto"

export class StoreListDto {
    @ApiProperty({description: 'Список магазинов', type: [StoreDto]})
    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(() => StoreDto)
    storeList: StoreDto[]

    constructor(stores){
        this.storeList = stores.map(store => new StoreDto(store))
    }
}