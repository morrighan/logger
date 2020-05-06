// Node.js built-in APIs.
import { isMaster } from 'cluster';
import { env as environments } from 'process';
import { isMainThread } from 'worker_threads';

// Type definitions.
export enum ExecutionMode {
    DevelopmentMode = 'development',
    ProductionMode = 'production'
}

export enum ClusteringMode { MasterProcess, WorkerProcess }
export enum ThreadingMode { MainThread, WorkerThread }

// Exportings.
export const executionMode: ExecutionMode = (environments.NODE_ENV ?? ExecutionMode.DevelopmentMode) as ExecutionMode;

export const clusteringMode: ClusteringMode = isMaster
    ? ClusteringMode.MasterProcess
    : ClusteringMode.WorkerProcess;

export const threadingMode: ThreadingMode = isMainThread
    ? ThreadingMode.MainThread
    : ThreadingMode.WorkerThread;
