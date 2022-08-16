import { EnvironmentVariableService } from './services/environment-variable-service';

export * from './interfaces';
export * from './services';
export const envVarService = new EnvironmentVariableService();
