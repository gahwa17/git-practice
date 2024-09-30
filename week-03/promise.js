function doJob(job, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let now = new Date();
      resolve(`完成工作 ${job} at ${now.toISOString()}`);
    }, time);
  });
}

// 刷牙 1sec -> 吃早餐 3 sec -> 寫功課 1sec -> 吃午餐 2sec
let now = new Date();
console.log(`開始工作 at ${now.toISOString()}`);

/* Promise 

ES6 推的新功能，改善 callback 寫法
- 構造函式 (constructor function)，要透過 new 來建立一個 Promise
- Promise 代表一個非同步操作的最終狀態與結果 (無論失敗/成功)
- Promise 改善了甚麼?
  Promise 的回傳值也是一個 promise
  因此可透過鏈式 (chaining) 的方式把這些 promise 串起來
  也就是一連串的 then() 接下去
  改善 callback hell 難以閱讀的巢狀結構

*/

doJob("刷牙", 1000)
  .then((msg) => {
    console.log(msg);
    return doJob("吃早餐", 3000);
  })
  .then((msg) => {
    console.log(msg);
    return doJob("寫功課", 1000);
  })
  .then((msg) => {
    console.log(msg);
    return doJob("吃午餐", 2000);
  })
  .finally(() => {
    console.log("行程結束");
  });

/* Async & Await */
async function doAllJobs() {
  try {
    console.log(await doJob("刷牙", 1000));
    console.log(await doJob("吃早餐", 3000));
    console.log(await doJob("寫功課", 1000));
    console.log(await doJob("吃午餐", 2000));
  } finally {
    console.log("行程結束");
  }
}

doAllJobs();

/* Async & Await 改善了甚麼?

簡化 Promise 寫法的語法糖，拿掉 then()，讓程式碼看起來更像同步操作
所以它本質上仍是 promise，並非取代 promise

- 建構一個含有 async 關鍵字的函式，稱為異步函式
- 回傳值是 promise 的物件 (把 code 拿去瀏覽器執行會得到一個 Promise {<pending>} )
- 在異步函式內呼叫我們寫好的 doJob，使用 await 來等待最終回傳值

 */
