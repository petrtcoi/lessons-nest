import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator"


class ProjectListDtoItem {
    @ApiProperty({ description: "Заголовок проекта", example: "23445324233", type: String })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({ description: "id менеджера", example: "62691bec78cd95c207fc9603", type: String })
    @IsString()
    @IsNotEmpty()
    manager: string

    @ApiProperty({ description: 'createdAt toISOString', example: '2022-04-12T13:20:01.556Z' })
    @IsNotEmpty()
    @IsString()
    createdAt: string

    constructor(data) {
        this.title = data.title
        this.manager = typeof (data.manager) === 'object' ? data.manager.toString() : data.manager
        this.createdAt = (data.createdAt as Date).toISOString()
    }

}


export class ProjectListDto {
    @ApiProperty({description: 'Список проектов', type: [ProjectListDtoItem]})
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => ProjectListDtoItem)
    projects: ProjectListDtoItem[]

    constructor(data: Array<any>) {
        this.projects = data.map(item => new ProjectListDtoItem(item))
    }
}
