// Node.js built-in APIs.
import process from 'process';

// Type definitions.
export enum ExecutionMode {
    DevelopmentMode = 'development',
    ProductionMode = 'production'
}

// Exports.
export const executionMode = (process.env.NODE_ENV || ExecutionMode.DevelopmentMode) as ExecutionMode;

export default process.env;
