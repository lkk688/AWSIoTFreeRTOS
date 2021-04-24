/*
 * FreeRTOS V202012.00
 * Copyright (C) 2017 Amazon.com, Inc. or its affiliates.  All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * http://aws.amazon.com/freertos
 * http://www.FreeRTOS.org
 */

#ifndef AWS_CLIENT_CREDENTIAL_KEYS_H
#define AWS_CLIENT_CREDENTIAL_KEYS_H

/*
 * PEM-encoded client certificate
 *
 * Must include the PEM header and footer:
 * "-----BEGIN CERTIFICATE-----\n"\
 * "...base64 data...\n"\
 * "-----END CERTIFICATE-----\n"
 */
#define keyCLIENT_CERTIFICATE_PEM \
"-----BEGIN CERTIFICATE-----\n"\
"MIIDWjCCAkKgAwIBAgIVAMGckQcTNaUK3fTLc4zP7f6t/955MA0GCSqGSIb3DQEB\n"\
"CwUAME0xSzBJBgNVBAsMQkFtYXpvbiBXZWIgU2VydmljZXMgTz1BbWF6b24uY29t\n"\
"IEluYy4gTD1TZWF0dGxlIFNUPVdhc2hpbmd0b24gQz1VUzAeFw0yMTA0MjExNzA1\n"\
"MDFaFw00OTEyMzEyMzU5NTlaMB4xHDAaBgNVBAMME0FXUyBJb1QgQ2VydGlmaWNh\n"\
"dGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCkxuXb/TpSpU5Wc9Ha\n"\
"K2CLDzfkO463MeG1a4j3SrDLh4pG+SJ2eK66+grYSbk32BeSoOsifcepdBP7WIrz\n"\
"3/OYEnPjXWb6oPJQOJslVbYv6dzCS5XqBVCFhsDo+HZxTAP/uHACzO4vpEIMheGh\n"\
"SKwFYSNrBFXE7bDjCcZ+nzp5N4HUgfx9CRApwI6Xij2Mi3ICZZouaqk6MBArTNmi\n"\
"NgPQYfhuWIOPy5bHI+KRn9SXpO1pNXUFIpGPdRsrUtDNNiSeZkUm8BHZkCT9sxLa\n"\
"0Bihh5g+kngLZPGAIyJbiZuYS4FGH0XWuTLsfn61RdDYtUbHl0gxz/y5VxQP06Ip\n"\
"8tK3AgMBAAGjYDBeMB8GA1UdIwQYMBaAFM3YgjnZq9pOKTKS9q1sJoM3MnUtMB0G\n"\
"A1UdDgQWBBSWmInQgy2gxLyqKGMnEn9+1KEQcTAMBgNVHRMBAf8EAjAAMA4GA1Ud\n"\
"DwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAQEAiAD6iQAXvLOMSK2vO9Q3q8n9\n"\
"ZSQyxP7jd8IFqSDb7YPkGq2kPGLGomUurcwa0jWVc04RcHcOQ+BGLLh+ckY2cXby\n"\
"eYWY2MBM52lZ68TZj/xysJQtkizBENtt63nOBJftbqV0Kyg/AsUXCMZCALInp8ph\n"\
"2fz9/MHGTbDoO3eUyhOTUXdD2fTJIlT5vEddsxCQnfV9pVHRChCPKCLUBaWz2X1J\n"\
"CmW5m7MLwL++uctTVWniUefgkNze+cZ3u9mOoNOykbzU3jGo9x/PZbQ3Uehd4I7x\n"\
"sH5e0VX+dQdgUbZrJ1yU5d/XLd6SzHrEcAp+Nh7zYk8SY/6kWWTNdpAqIiTNMQ==\n"\
"-----END CERTIFICATE-----\n"

/*
 * PEM-encoded issuer certificate for AWS IoT Just In Time Registration (JITR).
 * This is required if you're using JITR, since the issuer (Certificate
 * Authority) of the client certificate is used by the server for routing the
 * device's initial request. (The device client certificate must always be
 * sent as well.) For more information about JITR, see:
 *  https://docs.aws.amazon.com/iot/latest/developerguide/jit-provisioning.html,
 *  https://aws.amazon.com/blogs/iot/just-in-time-registration-of-device-certificates-on-aws-iot/.
 *
 * If you're not using JITR, set below to NULL.
 *
 * Must include the PEM header and footer:
 * "-----BEGIN CERTIFICATE-----\n"\
 * "...base64 data...\n"\
 * "-----END CERTIFICATE-----\n"
 */
#define keyJITR_DEVICE_CERTIFICATE_AUTHORITY_PEM  ""

/*
 * PEM-encoded client private key.
 *
 * Must include the PEM header and footer:
 * "-----BEGIN RSA PRIVATE KEY-----\n"\
 * "...base64 data...\n"\
 * "-----END RSA PRIVATE KEY-----\n"
 */
#define keyCLIENT_PRIVATE_KEY_PEM \
"-----BEGIN RSA PRIVATE KEY-----\n"\
"MIIEpAIBAAKCAQEApMbl2/06UqVOVnPR2itgiw835DuOtzHhtWuI90qwy4eKRvki\n"\
"dniuuvoK2Em5N9gXkqDrIn3HqXQT+1iK89/zmBJz411m+qDyUDibJVW2L+ncwkuV\n"\
"6gVQhYbA6Ph2cUwD/7hwAszuL6RCDIXhoUisBWEjawRVxO2w4wnGfp86eTeB1IH8\n"\
"fQkQKcCOl4o9jItyAmWaLmqpOjAQK0zZojYD0GH4bliDj8uWxyPikZ/Ul6TtaTV1\n"\
"BSKRj3UbK1LQzTYknmZFJvAR2ZAk/bMS2tAYoYeYPpJ4C2TxgCMiW4mbmEuBRh9F\n"\
"1rky7H5+tUXQ2LVGx5dIMc/8uVcUD9OiKfLStwIDAQABAoIBADqW+o6BeSZ/3t4A\n"\
"qsKfn+FyVNZTkwhytSX0Cayco0aLeFCKL4XenYqgdBC6DiDcNm2NyG3oOYF4Y86A\n"\
"ik/y9sPA8/IJeR9u8RozNn9M/c4Foth3VePzZdFEu/1as4rPk7Bu3W0xfxPznQSk\n"\
"6jiWBYyYIKbh0LmIJthj1m+ZoIoO70yjaTrHpLiJUfuKZdgWeyU8IfUz9AY8pH+o\n"\
"zVilq4MrJv9Z7iySZcSye/DKF+T33IobRvAeW4xEa360oNgsNYYllMd/H6NfCtpp\n"\
"iutmL1mW8Ricpo88MHr/vshloBKDdTZnK7q6nMpKRhIq0NTJt9/9+Z2b1zzU1gy7\n"\
"D8+VyoECgYEA2ciz5FecNDaYvQLwhRfOsGmMkUPMQPXMazcDHrj+9i4LGiJNfoWX\n"\
"ySr2tt23z3X7EKi9Km3kRj979CYKPVXVRugkqsnSMPK/9bjL/MjY8A1o1YJQYXIY\n"\
"7f13A5sMBK8gzoZ60J+8K65FM/ehMy6XLBfa52YuiO2h32LgPRTQKvcCgYEAwbEC\n"\
"53HG/c5Je/LJqz7vzeSoOSPa9UFy35qIDU9TuWXBvxpjcBnfaD5uv5bht7yK8WTz\n"\
"MCIC9sre6QFC6ZBCq2/6wceUjkAsq75EuYnGQ40Nmr3G51Qcl25TB0YdxFifOgc1\n"\
"yU+/FczZvsn7Mbv5bTmskCBekrDvUkw+CWvy5kECgYABX1dq3/Z3CcUKo+MaI51E\n"\
"1VVycOfvnNzt7AnT/rx0lrOxNXghjPv445Fsc5c98nNjlnyisNCYdLv2POshmdHf\n"\
"QYVBokX10wHMrZ5zeFyNnrgDaG/TPWHU1h0S474+pU/inUxW1jrcV5vOCQh2Bxwi\n"\
"xf+2J5mxeTXk732URPZO3wKBgQCqi1qcQVFOXxnS+mbZ0rPBnakFju2Xb4ZfHijX\n"\
"V1bH8rISu4B8zzsoBXjsV0TtzCSnAhUi93+Wn/CARy0MjIo3e4TWpQ3H5veuTP0k\n"\
"RQx+pC8rZhhBzYzTRT/0Mqe5H7Mrm/efBwmgf1vmot/73aB0rQilaur6zLIcy6cA\n"\
"Er2wQQKBgQCNS++idXxeK3ofewcmKkCLh4c0gxX+1oNF5/vu59V9p+R8NmvBqiRE\n"\
"+ONq7+11mkM0I2JeHNEAKK9oZB4hte5/4GskzCzgL6bLE16K0yIN+JW42llgyMeH\n"\
"IqVT2HLFxHkT0JAuWQo9CZ6GCAoGhUkvI5mR3w7PJdOgu0URza1V2g==\n"\
"-----END RSA PRIVATE KEY-----\n"

#endif /* AWS_CLIENT_CREDENTIAL_KEYS_H */
