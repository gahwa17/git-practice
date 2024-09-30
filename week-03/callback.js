function doJob(job, time, cb) {
  setTimeout(() => {
    // 只有在這裡，才能知道這個非同步的 setTimeout 已經做完事情了
    let now = new Date();
    cb(`完成工作 ${job} at ${now.toISOString()}`);
  }, time);
}

// 刷牙 1sec -> 吃早餐 3 sec -> 寫功課 1sec -> 吃午餐 2sec
let now = new Date();
console.log(`開始工作 at ${now.toISOString()}`);
// write your code here
doJob("刷牙", 1000, (msg) => {
  console.log(msg);
  doJob("吃早餐", 3000, (msg) => {
    console.log(msg);
    doJob("寫功課", 1000, (msg) => {
      console.log(msg);
      doJob("吃午餐", 2000, (msg) => {
        console.log(msg);
      });
    });
  });
});

/* 使用 callback 的缺點
可以看到程式碼呈現類似於巢狀迴圈的樣貌，callback 內又包了更多的 callback
稱之為「Callback Hell」，難以閱讀和維護
=> 透過 ES6 的 promise 來優化
*/
