import { cn } from '@/lib/utils'

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('c1', 'c2')).toBe('c1 c2')
    });

    it('should handle conditional classes', () => {
      expect(cn('c1', true && 'c2', false && 'c3')).toBe('c1 c2')
    });
  });
});
