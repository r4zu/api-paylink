import { describe, it, expect } from 'vitest';
import crypto from 'crypto';
import {
  isCuid,
  maskCardNumber,
  determineCardType,
  createMaskToken,
  decryptToken,
} from './utilities.ts';

describe('Utilities', () => {
  describe('isCuid', () => {
    it('should return true for valid CUID', () => {
      expect(isCuid('c123456789012345678901234')).toBe(true);
    });

    it('should return false for invalid CUID', () => {
      expect(isCuid('c12345678901234567890123')).toBe(false);
      expect(isCuid('c12345678901234567890123478')).toBe(false);
      expect(isCuid('m123')).toBe(false);
      expect(isCuid('123')).toBe(false);
    });
  });

  describe('maskCardNumber', () => {
    it('should mask the card number correctly', () => {
      expect(maskCardNumber('4111111111111111')).toBe('xxxxxxxxxxxx1111');
      expect(maskCardNumber('1234')).toBe('1234');
    });
  });

  describe('determineCardType', () => {
    it('should return the correct card type', () => {
      expect(determineCardType('4111111111111111')).toBe('Visa');
      expect(determineCardType('5111111111111111')).toBe('MasterCard');
      expect(determineCardType('311111111111111')).toBe('American Express');
      expect(determineCardType('6111111111111111')).toBe('Discover');
      expect(determineCardType('1111111111111111')).toBe('Unknown');
    });
  });

  describe('createMaskToken and decryptToken', () => {
    it('should create and decrypt a masked token correctly', async () => {
      const sensitiveData = 'mySensitiveData';
      const token = await createMaskToken(sensitiveData);
      const decryptedData = await decryptToken(token);
      expect(decryptedData).toBe(sensitiveData);
    });

    it('should return empty string for invalid token', async () => {
      const decryptedData = await decryptToken('invalidToken');
      expect(decryptedData).toBe('');
    });
  });
});
