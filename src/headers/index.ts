import {default as Axios, AxiosResponse} from 'axios'
import {APIGatewayEvent} from 'aws-lambda'
import {securityChecks} from './rules'
import {validateHeaders} from './utils'

export const handler = async (proxyEvent: APIGatewayEvent) => {
    const bodyData = JSON.parse(proxyEvent!.body)
    const {uri} = bodyData

    if (!uri) {
        throw new Error('Missing [uri] parameter from body')
    }

    return await Axios.get(uri)
        .then((response: AxiosResponse) => {
            const rawHeaders = response.headers
            const {passed, errors} = validateHeaders(rawHeaders, securityChecks)
            return {
                body: JSON.stringify({
                    passed,
                    errors,
                    rawHeaders
                }),
                statusCode: 200
            }
        })
        .catch((error) => {
            console.log(error)
            return {
                body: JSON.stringify({error}),
                statusCode: 500
            }            
        })
}