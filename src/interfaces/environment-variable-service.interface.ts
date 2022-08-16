export interface IEnvironmentVariableService {
  getEnvironmentVariable(variableName: string): string;
  getEnvironmentVariableWithDefault(variableName: string, defaultValue: string): string;
  mustGetEnvironmentVariable(variableName: string): string;
  get(variableName: string, defaultValue?: string): string;
  required(variableName: string): string;
}
