import {
    HeaderSecurityCheck
} from './index.d'

export const validateHeaders = (headers: any, rules: HeaderSecurityCheck[]) => {
    const errors = []
    const passed = []

    rules.map((el: HeaderSecurityCheck) => {
        const name = el.name
        const header = headers[name]
        let header_meta = {
            name, header
        }

        if (header && el.reject === true) {
            errors.push({
                ...header_meta,
                message: 'Non-authorized header'
            })
        }
        else if (!header && el.required === true) {
            errors.push({
                ...header_meta,
                message: 'Missing header'
            })
        }
        else if (header && el.required === true && el.possible.length === 0) {
            passed.push({
                ...header_meta,
                message: 'Valid header'
            })
        }
        else if (header && el.required === true && el.possible.length > 0 && !el.possible.includes(header)) {
            errors.push({
                ...header_meta,
                message: 'Invalid header',
            })
        }
        else if (header && el.required === true && el.possible.length > 0 && el.possible.includes(header)) {
            passed.push({
                ...header_meta,
                message: 'Valid header'
            })
        }
    })

    return Object.freeze({errors, passed})
}