import { TerminalLogger } from './terminal-logger';

export class ExecutionTime {
  static labels = new Map<string, number>();

  static start(label: string): void {
    this.labels.set(label, Date.now());
  }

  static end(label: string, message?: string): void {
    const start = this.labels.get(label);
    const end = Date.now();

    if (!start) {
      throw new Error(`Label ${label} não foi iniciado`);
    }

    const executionTime = end - start;

    TerminalLogger.log(`${message ?? '⏱  Tempo de execução: '} ${executionTime}ms`);
  }

  static async measure<T>(fn: () => Promise<T>): Promise<T> {
    const start = Date.now();
    const result = await fn();
    const end = Date.now();
    const executionTime = end - start;

    TerminalLogger.log(`⏱ Tempo de execução: ${executionTime}ms`);

    return result;
  }
}
