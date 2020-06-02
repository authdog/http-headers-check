import {
    HeaderSecurityCheck
} from './index.d'

import {
    NON_AUTHORIZED_HEADER,
    VALID_HEADER,
    INVALID_HEADER,
    MISSING_HEADER
} from './messages'

export const validateHeaders = (headers: any, rules: HeaderSecurityCheck[]) => {
    const errors = []
    const passed = []

    rules.map((el: HeaderSecurityCheck) => {
        const name = el?.name
        const header = headers[name]
        let header_meta = {
            name, header
        }

        if (header && el?.reject === true) {
            errors.push({
                ...header_meta,
                message: NON_AUTHORIZED_HEADER
            })
        }
        else if (!header && el?.required === true) {
            errors.push({
                ...header_meta,
                message: MISSING_HEADER
            })
        }
        else if (header && el?.required === true && el?.possible.length > 0 && !el?.possible.includes(header)) {
            errors.push({
                ...header_meta,
                message: INVALID_HEADER,
            })
        }
        else if (header && el?.required === true && el?.possible.length === 0) {
            passed.push({
                ...header_meta,
                message: VALID_HEADER
            })
        }
        else if (header && el?.required === true && el?.possible.length > 0 && el?.possible.includes(header)) {
            passed.push({
                ...header_meta,
                message: VALID_HEADER
            })
        }
    })

    return Object.freeze({errors, passed})
}