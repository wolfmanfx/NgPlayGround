import { CityPipe } from './city.pipe';

describe('Pipe: Citye', () => {
  it('create an instance', () => {
    let pipe = new CityPipe();
    expect(pipe).toBeTruthy();
  });

  describe('A city pipe in short mode should', () => {
    let pipe: CityPipe;

    beforeEach(() => {
      pipe = new CityPipe();
    });

    it('transform Frankfurt into FRA', () => {
      expect(pipe.transform('Frankfurt', 'short')).toBe('FRA');
    });
  });
});