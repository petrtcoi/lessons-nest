import { CreateProjectDto } from '../../src/entities/project/dto/createProject.dto'

export const one: CreateProjectDto = {
    title: 'first tesy project',
}

export const two: CreateProjectDto = {
    title: 'projectTwo',
}

export const three: CreateProjectDto = {
    title: 'projectTree',
}

export const duplicatedTitle: CreateProjectDto = {
    title: 'projectTwo',
}