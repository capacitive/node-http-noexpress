export const all = (promises: Promise<any>[]): Promise<any[]> => {
    const values: any[] = new Array(promises.length); // [ undefined, undefined, undefined ]
    let numberOfResolvedPromises = 0;
    return new Promise((resolve, reject) => {
        promises.forEach((p, i) => {
          p.then(v => {
            values[i] = v;
            numberOfResolvedPromises++;
            if (numberOfResolvedPromises === promises.length) resolve(values);
          }).catch(reject);
        })
    });
  };
  
  const delay = (ms: number) => new Promise(resolve => setTimeout(() => resolve(1000), ms));
  
  all([
    delay(2000),
    Promise.resolve(1),
    Promise.resolve(3)
  ]).then(console.log).catch(console.error); // [ 1000, 1, 3 ]