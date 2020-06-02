import {securityChecks} from './rules'
import {validateHeaders} from './utils'

test('test headers Netlify', () => {
    const sample_headers_netlify = {
        "cache-control":"public, max-age=0, must-revalidate",
        "content-type":"text/html; charset=UTF-8",
        "date":"Sat, 30 May 2020 07:23:45 GMT",
        "etag":"\"ae9f8b9b44426334002a459d18568203-ssl\"",
        "strict-transport-security":"max-age=31536000",
        "age":"16776",
        "content-length":"9599",
        "connection":"close",
        "server":"Netlify",
        "x-nf-request-id":"8f32bd78-cf8f-40a5-b819-00fda1c51a21-3075222"
    }

    const {errors, passed} = validateHeaders(
        sample_headers_netlify,
        securityChecks
    )

    expect(errors.length).toEqual(5)
    expect(passed.length).toEqual(2)
    
    expect(errors).toStrictEqual([
        {
          name: 'x-xss-protection',
          header: undefined,
          message: 'Missing header'
        },
        {
          name: 'x-frame-options',
          header: undefined,
          message: 'Missing header'
        },
        {
          name: 'content-security-policy',
          header: undefined,
          message: 'Missing header'
        },
        {
          name: 'x-content-type-options',
          header: undefined,
          message: 'Missing header'
        },
        {
          name: 'server',
          header: 'Netlify',
          message: 'Non-authorized header'
        }
      ])

      expect(passed).toStrictEqual([
        {
          name: 'strict-transport-security',
          header: 'max-age=31536000',
          message: 'Valid header'
        },
        {
          name: 'cache-control',
          header: 'public, max-age=0, must-revalidate',
          message: 'Valid header'
        }
      ])

})

test('test headers Microsoft', () => {
    const sample_headers_microsoft = {
        "cache-control":"no-cache, no-store, no-transform",
        "pragma":"no-cache",
        "content-type":"text/html; charset=utf-8",
        "expires":"-1",
        "x-activity-id":"6ccf20bb-52a9-4df8-a2b4-6d3039bed33e",
        "ms-cv":"rwnXA9h4vUG5rQ0Y.0",
        "x-appversion":"1.0.7446.39669",
        "x-az":"{did:92e7dc58ca2143cfb2c818b047cc5cd1, rid: OneDeployContainer, sn: marketingsites-prod-odnortheurope, dt: 2018-05-03T20:14:23.4188992Z, bt: 2020-05-22T06:02:18.0000000Z}",
        "ms-operation-id":"e210247daf3f2743b77ae659a6446601",
        "p3p":"CP=\"CAO CONi OTR OUR DEM ONL\"",
        "x-ua-compatible":"IE=Edge;chrome=1",
        "x-content-type-options":"nosniff",
        "x-frame-options":"SAMEORIGIN",
        "access-control-allow-methods":"HEAD,GET,POST,PATCH,PUT,OPTIONS",
        "x-xss-protection":"1; mode=block",
        "date":"Sat, 30 May 2020 12:07:02 GMT",
        "transfer-encoding":"chunked",
        "connection":"close, Transfer-Encoding",
        "tls_version":"tls1.2",
        "strict-transport-security":"max-age=31536000",
        "set-cookie":["akacd_OneRF=1598616422~rv=23~id=dbf8b366d3593388d910014e67633d3a; path=/; Expires=Fri, 28 Aug 2020 12:07:02 GMT; Secure; SameSite=None",
        "akacd_OneRF=1598616422~rv=23~id=dbf8b366d3593388d910014e67633d3a; path=/; Expires=Fri, 28 Aug 2020 12:07:02 GMT; Secure; SameSite=None"],
        "x-rtag":"RT"
    }

    const {errors, passed} = validateHeaders(
        sample_headers_microsoft,
        securityChecks
    )

    expect(errors.length).toEqual(1)
    expect(passed.length).toEqual(5)

    expect(errors).toStrictEqual([
        {
          name: 'content-security-policy',
          header: undefined,
          message: 'Missing header'
        }
    ])

    expect(passed).toStrictEqual([
        {
          name: 'x-xss-protection',
          header: '1; mode=block',
          message: 'Valid header'
        },
        {
          name: 'strict-transport-security',
          header: 'max-age=31536000',
          message: 'Valid header'
        },
        {
          name: 'x-frame-options',
          header: 'SAMEORIGIN',
          message: 'Valid header'
        },
        {
          name: 'x-content-type-options',
          header: 'nosniff',
          message: 'Valid header'
        },
        {
          name: 'cache-control',
          header: 'no-cache, no-store, no-transform',
          message: 'Valid header'
        }
    ])
})