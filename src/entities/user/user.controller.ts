import { Body, Controller, Get, Param, Put, Request, UseGuards } from "@nestjs/common"
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger"
import { UserService } from "./user.service"
import { UserListDto } from './dto/userList.dto'
import { UserDto } from "./dto/user.dto"
import { UpdateUserDto } from "./dto/updateUser.dto"
import { AuthGuard } from "@nestjs/passport"
import { CustomStrategy } from "../../shared/auth/custom.strategy"
import { Role } from "../../shared/enums/roles.enum"
import { Roles } from "../../shared/decorators/roles.decorator"
import { RolesGuard } from "../../shared/guards/roles.guard"



@ApiTags('Пользователи')
@Roles(Role.Admin)
@UseGuards(AuthGuard(CustomStrategy.key), RolesGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: 'Список пользователей: имя и ID' })
    @ApiResponse({ status: 200, type: [UserListDto] })
    @Get('/')
    async getList(): Promise<UserListDto[]> {
        return await this.userService.getList()
    }

    @ApiOperation({ summary: 'Проверка токена от пользователя. Возвращает имя,если все в поряжке' })
    @ApiResponse({ status: 200, type: String })
    @Get('/checktoken')
    async checkToken(@Request() request: any): Promise<string> {
        return request.user.name
    }


    @ApiOperation({ summary: 'Полученеи данных о пользователе' })
    @ApiParam({ name: "id", required: true, description: "_id пользователя в базе", type: 'string' })
    @ApiResponse({ status: 200, type: UserDto })
    @Get('/:id')
    async getUser(@Param('id') id: string): Promise<UserDto> {
        return await this.userService.getUser(id)
    }


    @ApiOperation({ summary: 'Обновление пользователя (без токенов)' })
    @ApiParam({ name: "id", required: true, description: "_id пользователя в базе", type: 'string' })
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({ status: 200, type: UserDto })
    @Put('/:id')
    async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<UserDto> {
        return await this.userService.updateUser(id, data)
    }

}