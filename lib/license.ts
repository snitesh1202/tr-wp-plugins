import { v4 as uuidv4 } from 'uuid';

export function generateLicenseKey(): string {
    // Returns a formatted UUID license key: XXXX-XXXX-XXXX-XXXX
    const uuid = uuidv4().toUpperCase().replace(/-/g, '');
    const part1 = uuid.substring(0, 4);
    const part2 = uuid.substring(4, 8);
    const part3 = uuid.substring(8, 12);
    const part4 = uuid.substring(12, 16);

    return `${part1}-${part2}-${part3}-${part4}`;
}
