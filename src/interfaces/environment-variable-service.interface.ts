export interface IEnvironmentVariableService {
  getEnvironmentVariable(_variableName: string): string;
  getEnvironmentVariableWithDefault(_variableName: string, _defaultValue: string): string;
  get(_variableName: string, defaultValue?: string): string;
  mustGetEnvironmentVariable(_variableName: string): string;
  mustGet(_variableName: string): string;
  getEnvironmentVariables(variables: string[]): string[];
  getAll(_variables: string[]): string[];
  mustGetEnvironmentVariables(_variables: string[]): string[];
  mustGetAll(_variables: string[]): string[];
}
