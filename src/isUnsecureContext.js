const isUnsecureContext = !(
    location.protocol === 'https:' ||
    location.protocol === 'wss:' ||
    location.protocol === 'file:' ||
    location.hostname === 'localhost' ||
    // check for 127/8 IP
    /^127(?:\.[0-9]+){0,2}\.[0-9]+$/.test(location.host) ||
    // check for ipv6 loopback
    /^\[(?:0*\:)*?:?0*1]/.test(location.host)
)

export { isUnsecureContext }