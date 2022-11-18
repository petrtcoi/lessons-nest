import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { CreateVersionDto } from './dto/createVersion.dto'
import { VersionDto } from './dto/version.dto'
import { VersionService } from './version.service'
import { AuthGuard } from '@nestjs/passport'
import { CustomStrategy } from '../../shared/auth/custom.strategy'
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { UpdateVersionDto } from './dto/updateVersion.dto'

@ApiTags('Version')
@UseGuards(AuthGuard(CustomStrategy.key))
@Controller('version')
export class VersionController {
    constructor(private readonly versionService: VersionService) { }

    @ApiOperation({ summary: 'Получить версию по ID' })
    @ApiParam({ name: 'id', description: 'ID версии в БД' })
    @ApiOkResponse({ status: 200, type: VersionDto })
    @Get('/:id')
    async get(@Param('id') id: string): Promise<VersionDto> {
        return this.versionService.getVersion(id)
    }

    @ApiOperation({ summary: 'Создание версии' })
    @ApiBody({ type: CreateVersionDto })
    @ApiOkResponse({ status: 200, type: VersionDto })
    @Post('/')
    @HttpCode(200)
    async create(@Body() data: CreateVersionDto): Promise<VersionDto> {
        return await this.versionService.create(data)
    }

    @ApiOperation({ summary: 'Обновление версии' })
    @ApiParam({ name: 'id', description: 'ID версии в БД' })
    @ApiBody({ type: UpdateVersionDto })
    @ApiOkResponse({ status: 200, type: null })
    @Patch('/:id')
    @HttpCode(200)
    async update(@Param('id') id: string, @Body() updates: UpdateVersionDto): Promise<void> {
        return await this.versionService.update(id, updates)
    }


    @ApiOperation({summary: 'Удаление версии'})
    @ApiParam({name: 'id', description: 'ID версии в БД'})
    @ApiOkResponse({status: 200, type: null})
    @Delete('/:id')
    @HttpCode(200)
    async delete(@Param('id') id: string): Promise<void> {
        return this.versionService.delete(id)
    }

}
