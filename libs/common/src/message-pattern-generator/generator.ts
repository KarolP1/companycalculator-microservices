export function generateMessagePattern(
    domain: string,       // e.g. 'users'
    action: string,       // e.g. 'get_all'
    microservice: string, // e.g. 'users'
): { cmd: string, microservice: string } {
    return { cmd: `${domain}.${action}`, microservice: microservice };
}
