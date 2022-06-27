{
  const all = (promises: Promise<any>[]): Promise<any[]> => {
    const values: any[] = new Array();
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
          promise.then(v => {
            values.push(v);      
            if(values.length == promises.length) {
              resolve(values);
            }
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
}