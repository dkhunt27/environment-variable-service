import { IEnvironmentVariableService, EnvironmentVariableService, envVarService } from '../src';

describe('services/environment-variable-service.ts test', () => {
  let sut: IEnvironmentVariableService;
  beforeEach(async () => {
    jest.clearAllMocks();
  });
  describe.each([{ sutFrom: 'EnvironmentVariableService' }, { sutFrom: 'envVarService' }])('$sutFrom', ({ sutFrom }) => {
    beforeEach(async () => {
      if (sutFrom === 'EnvironmentVariableService') {
        sut = new EnvironmentVariableService();
      } else {
        sut = envVarService;
      }
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
    describe('mustGetEnvironmentVariables', () => {
      it('when env var exists, returns that variable', () => {
        process.env.VAR_A = 'varA';
        process.env.VAR_B = 'varB';
        process.env.VAR_C = 'varC';
        const actual = sut.mustGetEnvironmentVariables(['VAR_A', 'VAR_B', 'VAR_C']);
        expect(actual).toStrictEqual(['varA', 'varB', 'varC']);
        delete process.env.VAR_A;
        delete process.env.VAR_B;
        delete process.env.VAR_C;
      });
      it('when env var missing, throw error', () => {
        process.env.VAR_A = 'varA';
        process.env.VAR_B = 'varB';
        expect(() => sut.mustGetEnvironmentVariables(['VAR_A', 'VAR_B', 'NON_EXISTENT_VAR', 'NON_EXISTENT_VAR2'])).toThrowError('Missing environment variable: NON_EXISTENT_VAR');
        delete process.env.VAR_A;
        delete process.env.VAR_B;
      });
    });

    describe('get', () => {
      it('when no default and env var exists, returns that variable', () => {
        process.env.VAR_A = 'varA';
        const actual = sut.get('VAR_A');
        expect(actual).toBe('varA');
        delete process.env.VAR_A;
      });
      it('when no default and env var missing, returns undefined', () => {
        const actual = sut.get('NON_EXISTENT_VAR');
        expect(actual).toBeUndefined();
      });
      it('when default and env var exists, returns that variable', () => {
        process.env.VAR_A = 'varA';
        const actual = sut.get('VAR_A', 'defaultVal');
        expect(actual).toBe('varA');
        delete process.env.VAR_A;
      });
      it('when default and env var missing, returns the default', () => {
        const actual = sut.get('NON_EXISTENT_VAR', 'defaultVal');
        expect(actual).toBe('defaultVal');
      });
    });
    describe('getAll', () => {
      it('when all env var exists, returns those variables', () => {
        process.env.VAR_A = 'varA';
        process.env.VAR_B = 'varB';
        process.env.VAR_C = 'varC';
        const actual = sut.getAll(['VAR_A', 'VAR_B', 'VAR_C']);
        expect(actual).toStrictEqual(['varA', 'varB', 'varC']);
        delete process.env.VAR_A;
        delete process.env.VAR_B;
        delete process.env.VAR_C;
      });
      it('when an env var missing, returns undefined for that variable', () => {
        process.env.VAR_A = 'varA';
        process.env.VAR_C = 'varC';
        const actual = sut.getAll(['VAR_A', 'NON_EXISTENT_VAR', 'VAR_C']);
        expect(actual).toStrictEqual(['varA', undefined, 'varC']);
        delete process.env.VAR_A;
        delete process.env.VAR_C;
      });
    });

    describe('mustGet', () => {
      it('when env var exists, returns that variable', () => {
        process.env.VAR_A = 'varA';
        const actual = sut.mustGet('VAR_A');
        expect(actual).toBe('varA');
        delete process.env.VAR_A;
      });
      it('when env var missing, throw error', () => {
        expect(() => sut.mustGet('NON_EXISTENT_VAR')).toThrowError('Missing environment variable: NON_EXISTENT_VAR');
      });
    });

    describe('mustGetAll', () => {
      it('when env var exists, returns that variable', () => {
        process.env.VAR_A = 'varA';
        process.env.VAR_B = 'varB';
        process.env.VAR_C = 'varC';
        const actual = sut.mustGetAll(['VAR_A', 'VAR_B', 'VAR_C']);
        expect(actual).toStrictEqual(['varA', 'varB', 'varC']);
        delete process.env.VAR_A;
        delete process.env.VAR_B;
        delete process.env.VAR_C;
      });
      it('when env var missing, throw error', () => {
        process.env.VAR_A = 'varA';
        process.env.VAR_B = 'varB';
        expect(() => sut.mustGetAll(['VAR_A', 'VAR_B', 'NON_EXISTENT_VAR', 'NON_EXISTENT_VAR2'])).toThrowError('Missing environment variable: NON_EXISTENT_VAR');
        delete process.env.VAR_A;
        delete process.env.VAR_B;
      });
    });
  });
});
