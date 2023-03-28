// 递归（Recursion）是一种常用的编程技巧，它允许函数在执行过程中调用自身。
// 简单来说，递归就是通过反复调用自身来解
const factorial = (n) => {
	if (n > 1) {
		return factorial(n - 1) * n;
	} return 1;
}


// generator function used for scheduler, fiber
// react 16 not using it replaced by Algebraic Effects
function* fibbonaci() {
	let current = 1;
	let next = 1;

	while (true) {
		current += next;
		next ++;
		yield current
	}
}

/**
 * for object
 * a = { a:1, b:2, c:3 }
 * elem type = string
 * elem = a | b | c
 *
 * a = [1, 2, 3]
 * elem type = string
 * elem = 0 | 1 | 2
 */
for (const elem in arr) {
  console.log(elem, typeof elem);
}
// for map array set which are already iterable
for (const elem of arr) {
  console.log(elem, typeof elem);
}

// 纯函数
function add(a, b) {
  return a + b;
}

// 不纯的函数，修改了全局变量
let count = 0;
function increment() {
  count++;
  return count;
}

/**
 * https://github.com/trekhleb/javascript-algorithms/blob/master/README.zh-CN.md
 * 所有算法集合
 */


/**
 * HOF high order function
 *
 * HOC high order component
 */
function MyMap(arr, callback) {
	for (let index = 0; index < arr.length; index++) {
		arr[index] =	callback(arr[index], index, arr)
	}
	return arr;
}

const result = MyMap([1, 2, 3], (e) => e + 1)

/**
 * Flux Architecture
 *
 * 1. Action
 * 2. Store
 * 3. Dispatch
 */

class Store {
	constructor(state, updateState) {
		this._state = state;
		this._updateState = updateState;
	}

	get state() {
		return this._state;
	}

	set state(state) {
		this._state = state;
	}

	update(action) {
		console.log('action', action)
		this._updateState(this._state, action)

	}

}

const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			console.log('newstate======>', {
				...state,
				todos: [
					...state.todos,
					{
						text: action.text,
						completed: false,
					}
				]
			});
			return {
				...state,
				todos: [
					...state.todos,
					{
						text: action.text,
						completed: false,
					}
				]
			}
		default:
			return state;
	}
}


// using flux or redux
const initState = {
	todos: []
}
const store = new Store(initState, setState)

const setState = (state, action) => {
	const newState = reducer(state, action)
	store._state = (newState)
}
const action = {
	type: 'ADD_TODO',
	text: 'new todo',
}
store.update(action)
console.log(store)
