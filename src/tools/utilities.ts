import crypto from 'crypto';

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
  const algorithm = 'aes-256-cbc';

  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(sensitiveData, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return iv.toString('hex') + ':' + encrypted;
}

export async function decryptToken(token: string): Promise<string> {
  const algorithm = 'aes-256-cbc';
  const key = crypto.randomBytes(32);

  const parts = token.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = parts[1];

  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
