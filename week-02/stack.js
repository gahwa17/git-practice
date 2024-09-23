// stack.js
// 完成以下 TODO 的部分，並且以 Module 的方式匯出 (ESM)
export default class Stack {
  // TODO: # 有特別的意思嗎？請以註解回覆。
  /* 讓 class 的 property 與 method 變成 private，只能在 class 內才能取用
  1. 在 main.js 中 Stack.#item = [1,2,3] 會回傳 SyntaxError: Private field '#item' must be declared in an enclosing class
  2. 在 main.js 中 console.log(stack) 會回傳 Stack {}
  3. 若把 # 拿掉，則 console.log(stack) 會顯示內容，例如 Stack { items: [ 1, 2, 3 ] }
  */
  #items;

  constructor() {
    this.#items = [];
  }

  // 在 stack 頂部加入元素i
  push(element) {
    return this.#items.push(element);
  }

  // 移除並回傳 stack 頂部的元素
  pop() {
    if (this.#items.length == 0) return "Stack is empty";
    return this.#items.pop();
  }

  // 回傳 stack 頂部的元素，但不移除它
  peek() {
    return this.#items[this.#items.length - 1];
  }

  // 檢查 stack 是否為空
  isEmpty() {
    return this.#items.length == 0;
  }

  // 回傳 stack 中元素的個數
  size() {
    return this.#items.length;
  }

  // 清空 stack
  clear() {
    this.#items = [];
  }

  // 印出 stack 內容
  print() {
    console.log(this.#items);
  }
}
