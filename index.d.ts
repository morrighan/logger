/// <reference types="node" />
declare module "environments" {
    export enum ExecutionMode {
        DevelopmentMode = "development",
        ProductionMode = "production"
    }
    export const executionMode: ExecutionMode;
    const _default: NodeJS.ProcessEnv;
    export default _default;
}
declare module "format-sql" {
    export default function formatSql(query: string): string;
}
declare module "levels" {
    export const labels: {
        critical: (label: string) => string;
        warning: (label: string) => string;
        regular: (label: string) => string;
        http: (label: string) => string;
        query: (label: string) => string;
        loud: (label: string) => string;
    };
    const loggingLevels: {
        name: string;
        level: number;
        label: string;
    }[];
    export default loggingLevels;
}
declare module "format-error" {
    const formatError: (error: Error) => {
        label: string;
        payload: string;
    };
    export default formatError;
}
declare module "format-console" {
    const _default_1: import("logform").Format;
    export default _default_1;
}
declare module "format-http" {
    import { IncomingMessage, ServerResponse } from 'http';
    interface Tokens {
        [tokenName: string]: (request: IncomingMessage, response: ServerResponse, ...args: any[]) => string;
    }
    const formatHttp: (tokens: Tokens, args_0: IncomingMessage, args_1: ServerResponse) => string;
    export default formatHttp;
}
declare module "index" {
    const _default_2: import("winston").Logger;
    export default _default_2;
    export { default as formatHttp } from "format-http";
    export { default as formatSql } from "format-sql";
}
