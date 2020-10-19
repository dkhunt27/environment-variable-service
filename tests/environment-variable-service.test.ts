import { IEnvironmentVariableService } from '../src/interfaces';
import { EnvironmentVariableService } from '../src/services';

describe('services/environment-variable-service.ts test', () => {
  let sut: IEnvironmentVariableService;
  beforeEach(async () => {
    jest.clearAllMocks();
  });
  describe('methods', () => {
    beforeEach(async () => {
      sut = new EnvironmentVariableService();
    });

    describe('getEnvironmentVariable', () => {
      it('when env var exists, returns that variable', () => {
        process.env.VAR_A = 'varA';
        const actual = sut.getEnvironmentVariable('VAR_A');
        expect(actual).toBe('varA');
        delete process.env.VAR_A;
      });
      it('when env var missing, returns undefined', () => {
        const actual = sut.getEnvironmentVariable('NON_EXISTENT_VAR');
        expect(actual).toBeUndefined();
      });
    });

    describe('getEnvironmentVariableWithDefault', () => {
      it('when env var exists, returns that variable', () => {
        process.env.VAR_A = 'varA';
        const actual = sut.getEnvironmentVariableWithDefault('VAR_A', 'defaultVal');
        expect(actual).toBe('varA');
        delete process.env.VAR_A;
      });
      it('when env var missing, returns the default', () => {
        const actual = sut.getEnvironmentVariableWithDefault('NON_EXISTENT_VAR', 'defaultVal');
        expect(actual).toBe('defaultVal');
      });
    });

    describe('mustGetEnvironmentVariable', () => {
      it('when env var exists, returns that variable', () => {
        process.env.VAR_A = 'varA';
        const actual = sut.mustGetEnvironmentVariable('VAR_A');
        expect(actual).toBe('varA');
        delete process.env.VAR_A;
      });
      it('when env var missing, throw error', () => {
        expect(() => sut.mustGetEnvironmentVariable('NON_EXISTENT_VAR')).toThrowError('Missing environment variable: NON_EXISTENT_VAR');
      });
    });
  });
});
