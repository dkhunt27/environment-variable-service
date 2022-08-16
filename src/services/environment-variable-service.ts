import { IEnvironmentVariableService } from '../interfaces';

export class EnvironmentVariableService implements IEnvironmentVariableService {
  public getEnvironmentVariable(variableName: string): string {
    return process.env[variableName];
  }

  public getEnvironmentVariableWithDefault(variableName: string, defaultValue: string): string {
    return process.env[variableName] ? process.env[variableName] : defaultValue;
  }

  public mustGetEnvironmentVariable(variableName: string): string {
    if (!process.env[variableName]) {
      throw new Error(`Missing environment variable: ${variableName}`);
    }
    return process.env[variableName];
  }

  public get(variableName: string, defaultValue?: string): string {
    if (typeof defaultValue !== 'undefined') {
      return this.getEnvironmentVariableWithDefault(variableName, defaultValue);
    } else {
      return this.getEnvironmentVariable(variableName);
    }
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
}
