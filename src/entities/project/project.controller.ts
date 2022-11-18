import { Body, Controller, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { CreateProjectDto } from './dto/createProject.dto'
import { ProjectDto } from './dto/project.dto'
import { ProjectService } from './project.service'
import { UserDec } from '../../shared/decorators/user.decorator'
import { AuthGuard } from '@nestjs/passport'
import { CustomStrategy } from '../../shared/auth/custom.strategy'
import { UpdateProjectDto } from './dto/updateProject.dto'
import { ProjectListDto } from './dto/projectList.dto'
import { GetProjectListDto } from './dto/getProjectList.dto'

@ApiTags('Project')
@UseGuards(AuthGuard(CustomStrategy.key))
@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }



    @ApiOperation({ summary: 'Получить список проектов' })
    @ApiBody({ type: GetProjectListDto })
    @ApiOkResponse({ status: 200, type: ProjectListDto })
    @Get('/')
    async getList(@Body() data: GetProjectListDto): Promise<ProjectListDto> {
        return this.projectService.getList(data)
    }


    @ApiOperation({ summary: 'Данные проекта + базово versions' })
    @ApiParam({ name: 'id', description: 'ID проекта в БД' })
    @ApiOkResponse({ status: 200, type: ProjectDto })
    @Get('/:id')
    async get(@Param('id') id: string): Promise<ProjectDto> {
        return this.projectService.getProject(id)
    }


    @ApiOperation({ summary: 'Создание нового проекта (добавляет нулевую версию и нелевое помещение)' })
    @ApiBody({ type: CreateProjectDto })
    @ApiOkResponse({ status: 200, type: ProjectDto })
    @HttpCode(200)
    @Post('/')
    async create(@Body() data: CreateProjectDto, @UserDec() user): Promise<ProjectDto> {
        return await this.projectService.createProject(data, user)
    }


    @ApiOperation({ summary: 'Обновление проекта' })
    @ApiParam({ name: 'id', description: 'ID проекта в БД' })
    @ApiBody({ type: UpdateProjectDto })
    @ApiOkResponse({ status: 200, type: null })
    @HttpCode(200)
    @Patch('/:id')
    async update(@Param('id') id: string, @Body() updates: UpdateProjectDto): Promise<void> {
        return await this.projectService.updateProject(id, updates)
    }

}
