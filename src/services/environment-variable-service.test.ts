import { EnvironmentVariableService } from './environment-variable-service';

describe('EnvironmentVariableService', () => {
  let service: EnvironmentVariableService;

  beforeEach(() => {
    service = new EnvironmentVariableService();
    process.env.TEST_ENV_VAR = 'abc';
    process.env.TEST_ENV_VAR2 = 'abc2';
    process.env.TEST_ENV_VAR3 = 'abc3';
    process.env.TEST_ENV_VAR_NUM = '123';
    process.env.TEST_ENV_VAR_NUM2 = '0';
    process.env.TEST_ENV_VAR_NUM3 = '456';
  });

  afterEach(() => {
    delete process.env.TEST_ENV_VAR;
    delete process.env.TEST_ENV_VAR2;
    delete process.env.TEST_ENV_VAR3;
    delete process.env.TEST_ENV_VAR_NUM;
    delete process.env.TEST_ENV_VAR_NUM2;
    delete process.env.TEST_ENV_VAR_NUM3;
  });

  describe('string returns', () => {
    describe('getEnvironmentVariable', () => {
      it('should return the environment variable if it exists', () => {
        const result = service.getEnvironmentVariable('TEST_ENV_VAR');
        expect(result).toBe('abc');
      });
      it('should return the undefined if it does not exists', () => {
        const result = service.getEnvironmentVariable('NON_EXISTENT_VAR');
        expect(result).toBeUndefined();
      });
    });

    describe('getEnvironmentVariableWithDefault', () => {
      it('should return the default value if the environment variable does not exist', () => {
        const result = service.getEnvironmentVariableWithDefault('NON_EXISTENT_VAR', 'def');
        expect(result).toBe('def');
      });
      it('should return the environment variable if exist', () => {
        const result = service.getEnvironmentVariableWithDefault('TEST_ENV_VAR', 'def');
        expect(result).toBe('abc');
      });
    });

    describe('get', () => {
      describe('when default value provided', () => {
        it('should return the default value when provided if the environment variable does not exist', () => {
          const result = service.get('NON_EXISTENT_VAR', 'def');
          expect(result).toBe('def');
        });
        it('should return the environment variable if exist', () => {
          const result = service.get('TEST_ENV_VAR', 'def');
          expect(result).toBe('abc');
        });
      });
      describe('when default value not provided', () => {
        it('should return the environment variable if it exists', () => {
          const result = service.get('TEST_ENV_VAR');
          expect(result).toBe('abc');
        });
        it('should return the undefined if it does not exists', () => {
          const result = service.get('NON_EXISTENT_VAR');
          expect(result).toBeUndefined();
        });
      });
    });

    describe('mustGetEnvironmentVariable', () => {
      it('should return the environment variable if it exists', () => {
        const result = service.mustGetEnvironmentVariable('TEST_ENV_VAR');
        expect(result).toBe('abc');
      });

      it('should throw an error if the environment variable does not exist', () => {
        expect(() => service.mustGetEnvironmentVariable('NON_EXISTENT_VAR')).toThrow();
      });
    });

    describe('mustGet', () => {
      it('should return the environment variable if it exists', () => {
        const result = service.mustGet('TEST_ENV_VAR');
        expect(result).toBe('abc');
      });

      it('should throw an error if the environment variable does not exist', () => {
        expect(() => service.mustGet('NON_EXISTENT_VAR')).toThrow();
      });
    });

    describe('getEnvironmentVariables', () => {
      it('should return the environment variable if they exists', () => {
        const result = service.getEnvironmentVariables(['TEST_ENV_VAR', 'TEST_ENV_VAR2', 'TEST_ENV_VAR3']);
        expect(result).toStrictEqual(['abc', 'abc2', 'abc3']);
      });
      it('should return the undefined for variables that do not exists', () => {
        const result = service.getEnvironmentVariables(['TEST_ENV_VAR', 'NON_EXISTENT_VAR', 'TEST_ENV_VAR3']);
        expect(result).toStrictEqual(['abc', undefined, 'abc3']);
      });
    });

    describe('getAll', () => {
      it('should return the environment variable if they exists', () => {
        const result = service.getAll(['TEST_ENV_VAR', 'TEST_ENV_VAR2', 'TEST_ENV_VAR3']);
        expect(result).toStrictEqual(['abc', 'abc2', 'abc3']);
      });
      it('should return the undefined for variables that do not exists', () => {
        const result = service.getAll(['TEST_ENV_VAR', 'NON_EXISTENT_VAR', 'TEST_ENV_VAR3']);
        expect(result).toStrictEqual(['abc', undefined, 'abc3']);
      });
    });

    describe('mustGetEnvironmentVariables', () => {
      it('should return the environment variables if they exists', () => {
        const result = service.mustGetEnvironmentVariables(['TEST_ENV_VAR', 'TEST_ENV_VAR2', 'TEST_ENV_VAR3']);
        expect(result).toStrictEqual(['abc', 'abc2', 'abc3']);
      });

      it('should throw an error if a environment variable does not exist', () => {
        expect(() => service.mustGetEnvironmentVariables(['TEST_ENV_VAR', 'NON_EXISTENT_VAR', 'TEST_ENV_VAR3'])).toThrow();
      });
    });

    describe('mustGetAll', () => {
      it('should return the environment variables if they exists', () => {
        const result = service.mustGetAll(['TEST_ENV_VAR', 'TEST_ENV_VAR2', 'TEST_ENV_VAR3']);
        expect(result).toStrictEqual(['abc', 'abc2', 'abc3']);
      });

      it('should throw an error if a environment variable does not exist', () => {
        expect(() => service.mustGetAll(['TEST_ENV_VAR', 'NON_EXISTENT_VAR', 'TEST_ENV_VAR3'])).toThrow();
      });
    });
  });

  describe('number returns', () => {
    describe('getEnvironmentVariableWithDefaultAsNumber', () => {
      it('should return the default value if the environment variable does not exist', () => {
        const result = service.getEnvironmentVariableWithDefaultAsNumber('NON_EXISTENT_VAR', 321);
        expect(result).toBe(321);
      });
      it('should return the environment variable as number if exist as number', () => {
        const result = service.getEnvironmentVariableWithDefaultAsNumber('TEST_ENV_VAR_NUM', 321);
        expect(result).toBe(123);
      });
      it('should return the environment variable as number if exist and is 0', () => {
        const result = service.getEnvironmentVariableWithDefaultAsNumber('TEST_ENV_VAR_NUM2', 321);
        expect(result).toBe(0);
      });
      it('should error if the environment variable exists but string', () => {
        expect(() => service.getEnvironmentVariableWithDefaultAsNumber('TEST_ENV_VAR', 321)).toThrow();
      });
    });

    describe('mustGetEnvironmentVariableAsNumber', () => {
      it('should error if the environment variable does not exist', () => {
        expect(() => service.mustGetEnvironmentVariableAsNumber('NON_EXISTENT_VAR')).toThrow();
      });
      it('should return the environment variable as number if exist as number', () => {
        const result = service.mustGetEnvironmentVariableAsNumber('TEST_ENV_VAR_NUM');
        expect(result).toBe(123);
      });
      it('should return the environment variable as number if exist as number as 0', () => {
        const result = service.mustGetEnvironmentVariableAsNumber('TEST_ENV_VAR_NUM2');
        expect(result).toBe(0);
      });
      it('should error if the environment variable exists but string', () => {
        expect(() => service.mustGetEnvironmentVariableAsNumber('TEST_ENV_VAR')).toThrow();
      });
    });

    describe('mustGetAsNumber', () => {
      it('should error if the environment variable does not exist', () => {
        expect(() => service.mustGetAsNumber('NON_EXISTENT_VAR')).toThrow();
      });
      it('should return the environment variable as number if exist as number', () => {
        const result = service.mustGetAsNumber('TEST_ENV_VAR_NUM');
        expect(result).toBe(123);
      });
      it('should return the environment variable as number if exist as number as 0', () => {
        const result = service.mustGetAsNumber('TEST_ENV_VAR_NUM2');
        expect(result).toBe(0);
      });
      it('should error if the environment variable exists but string', () => {
        expect(() => service.mustGetAsNumber('TEST_ENV_VAR')).toThrow();
      });
    });

    describe('mustGetEnvironmentVariablesAsNumbers', () => {
      it('should error if the environment variable does not exist', () => {
        expect(() => service.mustGetEnvironmentVariablesAsNumbers(['TEST_ENV_VAR_NUM', 'NON_EXISTENT_VAR', 'TEST_ENV_VAR_NUM3'])).toThrow();
      });
      it('should return the environment variable as number if exist as number', () => {
        const result = service.mustGetEnvironmentVariablesAsNumbers(['TEST_ENV_VAR_NUM', 'TEST_ENV_VAR_NUM2', 'TEST_ENV_VAR_NUM3']);
        expect(result).toStrictEqual([123, 0, 456]);
      });
    });

    describe('mustGetAllAsNumbers', () => {
      it('should error if the environment variable does not exist', () => {
        expect(() => service.mustGetAllAsNumbers(['TEST_ENV_VAR_NUM', 'NON_EXISTENT_VAR', 'TEST_ENV_VAR_NUM3'])).toThrow();
      });
      it('should return the environment variable as number if exist as number', () => {
        const result = service.mustGetAllAsNumbers(['TEST_ENV_VAR_NUM', 'TEST_ENV_VAR_NUM2', 'TEST_ENV_VAR_NUM3']);
        expect(result).toStrictEqual([123, 0, 456]);
      });
    });
  });
});
