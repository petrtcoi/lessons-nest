import { Injectable, HttpException, HttpStatus, Inject, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { validate } from 'class-validator'
import mongoose, { Model } from 'mongoose'

import { ProjectDocument, Project } from './schemas/project.schema'
import { ProjectDto } from './dto/project.dto'
import { CreateProjectDto } from './dto/createProject.dto'
import { UserDto } from '../user/dto/user.dto'

import { StoreService } from '../store/store.service'
import { CurrencyService } from '../currency/currency.service'
import { VersionService } from '../version/version.service'
import { UpdateProjectDto } from './dto/updateProject.dto'
import { ProjectListDto } from './dto/projectList.dto'
import { GetProjectListDto } from './dto/getProjectList.dto'
import { Store, StoreDocument } from '../store/schemas/store.schema'
import { User, UserDocument } from '../user/schemas/user.schema'

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project.name) private readonly projectModel: Model<ProjectDocument>,
        @InjectModel(Store.name) private readonly storeModel: Model<StoreDocument>,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly storeService: StoreService,
        private readonly currencyService: CurrencyService,
        private readonly versionService: VersionService
    ) { }


    async getProject(id: string): Promise<ProjectDto> {
        const doc = await (await this.projectModel.findOne({ _id: id })).populate('versions', 'id')
        const result = new ProjectDto(doc)
        const errors = await validate(result)
        if (errors.length > 0) throw new HttpException('error with response format', HttpStatus.INTERNAL_SERVER_ERROR)
        return result
    }


    async updateProject(id: string, updates: UpdateProjectDto): Promise<void> {

        if (updates.store) {
            const store = await this.storeModel.findOne({ _id: updates.store })
            if (!store) throw new HttpException('cant_find_store', HttpStatus.BAD_REQUEST)
        }
        if (updates.manager) {
            const user = await this.userModel.findOne({ _id: updates.manager })
            if (!user) throw new HttpException('cant_find_user', HttpStatus.BAD_REQUEST)
        }

        await this.projectModel.findOneAndUpdate({ _id: id }, updates)
        return

    }


    async getList(data: GetProjectListDto): Promise<ProjectListDto> {
        const projects = await this.projectModel
            .find({}, { title: 1, manager: 1, createdAt: 1 })
            .sort({ createdAt: -1 })
            .limit(data.limit)

        const result = new ProjectListDto(projects)
        const errors = await validate(result)
        if (errors.length > 0) throw new HttpException('wrong response status', HttpStatus.INTERNAL_SERVER_ERROR)
        return result
    }



    async createProject(data: CreateProjectDto, user: UserDto): Promise<ProjectDto> {

        const oldProject = await this.projectModel.findOne({ title: data.title })
        if (oldProject) throw new HttpException('проект с таким именем уже существует', HttpStatus.BAD_REQUEST)
        const store = await this.storeService.getDefault()
        if (!store) throw new HttpException('Не получается найти магазины (?)', HttpStatus.INTERNAL_SERVER_ERROR)

        const defaultRates = await this.currencyService.getDefaults()
        const projectId = new mongoose.Types.ObjectId().toString()
        const project = new this.projectModel({
            _id: projectId,
            title: data.title,
            manager: user.id,
            store: store._id,
            currencies: defaultRates
        })

        await project.save()
        await this.versionService.create({ projectId })
        const newProject = await this.projectModel.findOne({ _id: projectId }).populate('versions', { id: 1 })
        return new ProjectDto(newProject)
    }
}
