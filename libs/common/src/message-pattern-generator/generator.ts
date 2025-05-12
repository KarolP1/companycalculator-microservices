export function generateMessagePattern(
    data: {
        domain: string,       // e.g. 'users'
        action: string,       // e.g. 'get_all'
    }
): { cmd: string, } {
    return { cmd: `${data.domain}.${data.action}`, };
}
