# environment-variable-service
A service to get environment variables in a more consistent and testable manor.

[![GitHub release](https://img.shields.io/github/release/dkhunt27/environment-variable-service.svg)](https://github.com/dkhunt27/environment-variable-service/releases/)
[![codecov](https://codecov.io/gh/dkhunt27/environment-variable-service/branch/main/graph/badge.svg?token=YUFV0GQYZX)](https://codecov.io/gh/dkhunt27/environment-variable-service)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

## Install

  - If using yarn, run `yarn add environment-variable-service` 
  - If using npm, run `npm install environment-variable-service`

## Usage
```
import { envVarService } from 'environment-variable-service';

# get env var; if doesn't exist, return undefined
const var1 = envVarService.getEnvironmentVariable('ENV_VAR_1'); 

# get env var; if doesn't exist, return default value
const var2 = envVarService.getEnvironmentVariableWithDefault('ENV_VAR_2'); 

# get env var; if doesn't exist, throw error
const var3 = envVarService.mustGetEnvironmentVariable('ENV_VAR_3'); 
```

## getEnvironmentVariable
Gets the requested environment variable returning undefined if doesn't exist
```
const envVarService = new EnvironmentVariableService();
const var1 = envVarService.getEnvironmentVariable('ENV_VAR_1'); 
```

## getEnvironmentVariableWithDefault
Gets the requested environment variable returning the default value if doesn't exist
```
const envVarService = new EnvironmentVariableService();
const var2 = envVarService.getEnvironmentVariableWithDefault('ENV_VAR_2');
```

## mustGetEnvironmentVariable
Gets the requested environment variable throwing a `Missing environment variable: ${variableName}` error if doesn't exist
```
const envVarService = new EnvironmentVariableService();
const var3 = envVarService.mustGetEnvironmentVariable('ENV_VAR_3');
```

## Publishing
- Make changes
- Create git commit using feat: for new features or fix: for updates
- Run yarn release:major, release:minor, release:patch for appropriate update (this will bump version number appropriately)
- Make PR back to main
- Upon merge to main, it will kick off action that will publish to npm
