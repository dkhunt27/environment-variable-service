import { IEnvironmentVariableService } from '../interfaces';

export class EnvironmentVariableService implements IEnvironmentVariableService {
  public getEnvironmentVariable(variableName: string): string {
    return process.env[variableName];
  }

  public getEnvironmentVariableWithDefault(variableName: string, defaultValue: string): string {
    return process.env[variableName] ? process.env[variableName] :  defaultValue;
  }

  public mustGetEnvironmentVariable(variableName: string): string {
    if (!process.env[variableName]) {
      throw new Error(`Missing environment variable: ${variableName}`);
    }
    return process.env[variableName];
  }
}
