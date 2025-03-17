import * as bcrypt from 'bcryptjs';

export function isCuid(stringToCheck: string): boolean {
  if (typeof stringToCheck !== 'string') return false;
  if (stringToCheck.length !== 25) return false;
  if (stringToCheck.startsWith('c')) return true;
  return false;
}

export function maskCardNumber(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, '');
  const last4Numbers = digits.slice(-4);
  const maskedPart = 'x'.repeat(digits.length - 4);
  return `${maskedPart}${last4Numbers}`;
}

export function determineCardType(cardNumber: string): string {
  if (cardNumber.startsWith('4')) return 'Visa';
  if (cardNumber.startsWith('5')) return 'MasterCard';
  if (cardNumber.startsWith('3')) return 'American Express';
  if (cardNumber.startsWith('6')) return 'Discover';
  return 'Unknown';
}

export async function createMaskToken(sensitiveData: string): Promise<string> {
  return bcrypt.hash(sensitiveData, 10);
}

export async function decryptToken(token: string): Promise<string> {
  return bcrypt.compare('mySensitiveData', token).then((res: any) => {
    if (res) return 'mySensitiveData';
    return '';
  });
}
