import { Utils } from '@cms/shared';

let count: any[] | null = [];
let time = process.hrtime();
const loggedClasses = new Set<string>();

interface ClassArgsConstructor {
  new (...args: any[]): any;
}

export function getExecutionTime(startTime?: [number, number]): number {
  const endTime = process.hrtime(startTime);
  return endTime[0] * 1000 + endTime[1] / 1000000;
}

// export function LogClass<T extends ClassArgsConstructor>(target: T): T {
//   class DecoratedClass extends target {
//     constructor(...args: any[]) {
//       super(...args);

//       const startTime = process.hrtime();
//       const className = target.name;

//       if (!loggedClasses.has(className)) {
//         loggedClasses.add(className);

//         const name = this.name || this.constructor.name || className;

//         const ms = getExecutionTime(startTime);
//         const sec = `(${ms}ms)`;

//         Utils.TerminalLogger.logClass(`Class ${name}: ${sec}`, {
//           level: 'INFO',
//           scope: 'CLASS'
//         });
//       }
//     }
//   }

//   return DecoratedClass as T;
// }
export function LogClass<T extends ClassArgsConstructor>(target: T): T {
  const loggedClasses = new Set<string>();

  const decoratedClass = function (...args: any[]) {
    const startTime = process.hrtime();

    const instance = new target(...args);
    const className = target.name;

    if (!loggedClasses.has(className)) {
      loggedClasses.add(className);

      const name = instance.name || instance.constructor.name || className;

      const ms = getExecutionTime(startTime);
      const sec = `(${ms}ms)`;

      Utils.TerminalLogger.logClass(`Class ${name}: ${sec}`, {
        level: 'INFO',
        scope: 'CLASS'
      });
    }

    return instance;
  };

  decoratedClass.prototype = target.prototype;
  //@ts-ignore
  return decoratedClass as T;
}

export function resetCount() {
  time = process.hrtime(time);
  Utils.TerminalLogger.log(`LogClass ${count?.length || ''} ${time?.[0]}.${time?.[1]}s`);
  count = null;
}
