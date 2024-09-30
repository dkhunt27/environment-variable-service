import { IEnvironmentVariableService } from '../interfaces';

export class EnvironmentVariableService implements IEnvironmentVariableService {
  // as strings
  public getEnvironmentVariable(variableName: string): string | undefined {
    return process.env[variableName];
  }

  public getEnvironmentVariableWithDefault(variableName: string, defaultValue: string): string {
    return process.env[variableName] ? process.env[variableName] : defaultValue;
  }

  public get(variableName: string, defaultValue?: string): string {
    if (typeof defaultValue !== 'undefined') {
      return this.getEnvironmentVariableWithDefault(variableName, defaultValue);
    } else {
      return this.getEnvironmentVariable(variableName);
    }
  }

  public mustGetEnvironmentVariable(variableName: string): string {
    if (!process.env[variableName]) {
      throw new Error(`Missing environment variable: ${variableName}`);
    }
    return process.env[variableName];
  }

  public mustGet(variableName: string): string {
    return this.mustGetEnvironmentVariable(variableName);
  }

  public getEnvironmentVariables(variables: string[]): string[] {
    return variables.map((item) => {
      return this.getEnvironmentVariable(item);
    });
  }

  public getAll(variables: string[]): string[] {
    return this.getEnvironmentVariables(variables);
  }

  public mustGetEnvironmentVariables(variables: string[]): string[] {
    return variables.map((item) => {
      return this.mustGetEnvironmentVariable(item);
    });
  }

  public mustGetAll(variables: string[]): string[] {
    return this.mustGetEnvironmentVariables(variables);
  }

  // as numbers
  public getEnvironmentVariableWithDefaultAsNumber(variableName: string, defaultValue: number): number {
    const envVar = process.env[variableName];

    if (envVar) {
      const parsed = parseInt(envVar);
      if (isNaN(parsed)) {
        throw new Error(`Environment variable must be a number: { ${variableName}: ${envVar} }`);
      } else {
        return parsed;
      }
    } else {
      return defaultValue;
    }
  }

  public mustGetEnvironmentVariableAsNumber(variableName: string): number {
    const envVar = process.env[variableName];

    if (!envVar) {
      throw new Error(`Missing environment variable: ${variableName}`);
    }

    const parsed = parseInt(envVar);
    if (isNaN(parsed)) {
      throw new Error(`Environment variable must be a number: { ${variableName}: ${envVar} }`);
    } else {
      return parsed;
    }
  }

  public mustGetAsNumber(variableName: string): number {
    return this.mustGetEnvironmentVariableAsNumber(variableName);
  }

  public mustGetEnvironmentVariablesAsNumbers(variables: string[]): number[] {
    return variables.map((item) => {
      return this.mustGetEnvironmentVariableAsNumber(item);
    });
  }

  public mustGetAllAsNumbers(variables: string[]): number[] {
    return this.mustGetEnvironmentVariablesAsNumbers(variables);
  }
}
