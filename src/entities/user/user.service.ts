import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { validate } from "class-validator"
import { Model } from "mongoose"
import { UpdateUserDto } from "./dto/updateUser.dto"
import { UserDto } from "./dto/user.dto"
import { UserListDto } from "./dto/userList.dto"

import { User, UserDocument } from "./schemas/user.schema"


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }


    async getList(): Promise<UserListDto[]> {
        const users = await this.userModel.find({})
        const result = await Promise.all(users.map(async user => {
            const result = new UserListDto(user)
            const errors = await validate(result)
            if (errors.length > 0) throw new HttpException('Error with result format', HttpStatus.INTERNAL_SERVER_ERROR)
            return result
        }))
        return result
    }



    async getUser(id: string): Promise<UserDto> {
        const user = await this.userModel.findOne({ _id: id })
        if (!user) throw new HttpException('Cant find user', HttpStatus.NOT_FOUND)

        const result = new UserDto(user)
        const errors = await validate(result)
        if (errors.length > 0) throw new HttpException('Error with result format', HttpStatus.INTERNAL_SERVER_ERROR)
        return result
    }



    async updateUser(id: string, updates: UpdateUserDto): Promise<UserDto> {
        const user = await this.userModel.findOne({ _id: id })
        if (!user) throw new HttpException('Cant find user', HttpStatus.NOT_FOUND)

        if (updates.name) user.name = updates.name
        if (updates.emails) user.emails = updates.emails

        const updatedUser = await user.save()
        const result = new UserDto(updatedUser)
        const errors = await validate(result)
        if (errors.length > 0) throw new HttpException('Error with result format', HttpStatus.INTERNAL_SERVER_ERROR)
        return result
    }


    async addToken(userId: string, token: string): Promise<{ tokens: string[] } | { error: string }> {
        const user = await this.userModel.findOne({ _id: userId })
        if (!user) return { error: 'cant find user' }

        user.tokens = [...user.tokens, token]
        user.save()
            .then((updatedUser) => { return { tokens: updatedUser.tokens } })
            .catch(() => { return { error: 'cant update user' } })
    }


    async removeToken(userId: string, token: string): Promise<{ tokens: string[] } | { error: string }> {
        const user = await this.userModel.findOne({ _id: userId })
        if (!user) return { error: 'cant find user' }

        user.tokens = [...user.tokens].filter(x => x !== token)
        user.save()
            .then((updatedUser) => { return { tokens: updatedUser.tokens } })
            .catch(() => { return { error: 'cant update user' } })
    }

    async findByToken(token: string): Promise<UserDocument> {
        return this.userModel.findOne({"tokens": token}) 
    }

    async findByEmail(email: string): Promise< UserDocument> {
        return this.userModel.findOne({"emails": email}) 
    }


}