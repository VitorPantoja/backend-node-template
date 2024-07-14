function generateDescriptor(descriptor: PropertyDescriptor, _name: string): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    try {
      const result = originalMethod.apply(this, args);
      // Check if method is asynchronous
      if (result && result instanceof Promise) {
        return result.catch((error: any) => {
          if (typeof args?.[2] === 'function') args[2](error);
        });
      }

      return result;
    } catch (error) {
      if (typeof args?.[2] === 'function') args[2](error);
      return undefined;
    }
  };
  return descriptor;
}
// function generateDescriptor(descriptor: PropertyDescriptor): PropertyDescriptor {
//   const originalMethod = descriptor.value;

//   descriptor.value = function (...args: any[]) {
//     const next = typeof args[2] === 'function' ? args[2] : Function.prototype;
//     try {
//       const result = originalMethod.apply(this, args);
//       if (result?.catch) result.catch((error: any) => next(error));
//       // Check if method is asynchronous
//       // if (result && result instanceof Promise) {
//       //   return result.catch((error: any) => {
//       //     next(error);
//       //   });
//       // }

//       return result;
//     } catch (error) {
//       next(error);
//     }
//   };
//   return descriptor;
// }

/**
 * Decorator para errors de fluxo do endpoint. Deve ser usado apenas em controller do `express`
 */
export function Catch(name = ''): any {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (descriptor) {
      return generateDescriptor(descriptor, name);
    } else {
      // logDevLevel('warn', 'CONTROLER: ', target?.name);
      // console.log('propertyName', target?.name);
      for (const propertyName of Reflect.ownKeys(target.prototype).filter(prop => prop !== 'constructor')) {
        const desc = Object.getOwnPropertyDescriptor(target.prototype, propertyName) ?? {};
        const isMethod = desc.value instanceof Function;
        if (!isMethod) continue;

        Object.defineProperty(target.prototype, propertyName, generateDescriptor(desc, name));
      }
      return undefined;
    }
  };
}
