import {HeaderSecurityCheck} from './index.d'
export const securityChecks: HeaderSecurityCheck[] = [
    {
        name: 'x-xss-protection',
        required: true,
        possible: [
            '1',
            '1; mode=block'
        ]
    },
    {
        name: 'strict-transport-security',
        required: true,
        possible: []
    },
    {
        name: 'x-frame-options',
        required: true,
        possible: [
            'SAMEORIGIN',
            'DENY'
        ]
    },
    {
        name: 'content-security-policy',
        required: true,
        possible: []
    },
    {
        name: 'x-content-type-options',
        required: true,
        possible: [
            'nosniff'
        ]
    },
    {
        name: 'cache-control',
        required: true,
        possible: []
    },
    {
        name: 'server',
        required: false,
        reject: true,
        possible: []
    },
    {
        name: 'x-powered-by ',
        required: false,
        reject: true,
        possible: []
    }
]