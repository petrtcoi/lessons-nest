import axios from 'axios'

import * as moyskladVars from '../config/moyskaldVars'
import { CredentialService } from '../../../entities/credential/credential.service'
import { AxiosInstance } from 'axios'



export const constructorSetHttp = (credentialService: CredentialService): AxiosInstance => {
    let token = ''

    const moyskladHttp = axios.create({
        baseURL: moyskladVars.BASEURL,
        validateStatus: () => true
    })
    moyskladHttp.interceptors.request.use(async (config) => {
        token = await getToken(credentialService, token)
        return {
            ...config,
            headers: { ...config.headers, Authorization: `Bearer ${token}` }
        }
    })
    return moyskladHttp
}



const getToken = async (credentialService: CredentialService, token: string): Promise<string> => {
    if (token !== '') return token
    const doc = await credentialService.getMoyskladToken()
    return doc.value || ''
}