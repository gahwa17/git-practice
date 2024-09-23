import Stack from "./stack.js";

let stack = new Stack();

// 1. 測試 isEmpty()
console.log("========== 測試 isEmpty() ==========");
console.log("Is stack empty?", stack.isEmpty());

// 2. 測試 push(), print()
console.log("\n========== 測試 push(), print() ==========");
stack.push(1);
stack.push(5);
stack.push(8);
stack.print(); // [1, 5, 8]

// 3. 測試 peek()
console.log("\n========== 測試 peek() ==========");
console.log("Peek:", stack.peek()); // 8

// 4. 測試 size()
console.log("\n========== 測試 size() ==========");
console.log("Size:", stack.size()); // 3

// 5. 測試 pop()
console.log("\n========== 測試 pop() ==========");
console.log("Popped value:", stack.pop()); // 8
console.log("Popped value:", stack.pop()); // 5
console.log("Popped value:", stack.pop()); // 1
console.log("Popped value:", stack.pop()); // Stack is empty

// 6. 測試 clear()
console.log("\n========== 測試 clear() ==========");
stack.push(2);
stack.push(4);
stack.push(6);

console.log("Before clear:");
stack.print(); // [2, 4, 6]

stack.clear();

console.log("After clear:");
stack.print(); // []
