'use strict';

// helper func for array equality 
const areArraysEqual = (array1, array2) => {
  var areEqual = true;
  for (var i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      areEqual = false;
    }
  }
  return areEqual && array1.length === array2.length;
};

// helper func for object equality (test not compatible in all browsers)
const areObjectsEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

// time: O(n) | space: O(1)
const stockPricesYesterday = (arg) => {
  let smallest = Infinity;
  let largest = 0;
  let buy = false;
  let length = arg.length;
  arg.forEach((stock, index) => {
    if (stock < smallest && index !== length - 1) {
      smallest = stock;
      buy = true;
    } else if (stock > largest && buy) {
      largest = stock;
    }
  });
  return largest - smallest;
};
// time: O(n) | space: O(1)
const stockPricesYesterday2 = (arg) => {
  let minPrice = arg[0];
  let maxProfit = arg[1] - arg[0];
  for (let i = 1; i < arg.length; i++) {
    let currentPrice = arg[i];
    let potentialProfit = currentPrice - minPrice;
    maxProfit = Math.max(maxProfit, potentialProfit);
    minPrice = Math.min(minPrice, currentPrice);
  }
  return maxProfit;
};

console.assert(stockPricesYesterday([10, 7, 5, 8, 11, 9]) === 6, 'should equal 6');
console.assert(stockPricesYesterday([10, 9, 8, 7, 6, 5]) === -1, 'should equal -1');
console.assert(stockPricesYesterday2([10, 7, 5, 8, 11, 9]) === 6, 'should equal 6');
console.assert(stockPricesYesterday2([10, 9, 8, 7, 6, 5]) === -1, 'should equal -1');

// time: O(n^2) | space: O(n)
const getProductsOfAllIntsExceptAtIndex = (array) => {
  const result = [];
  array.forEach(num => {
    let product = 1;
    for (let i = 0; i < array.length; i++) {
      let current = array[i];
      if (current !== num) {
        product *= current;
      }
    }
    result.push(product);
    product = 1;
  });
  return result;
};
// time: O(n) | space: O(n)
const getProductsOfAllIntsExceptAtIndex2 = (array) => {
  if (array.length === 0) {
    return [];
  }
  const result = [];
  let productSoFar = 1;
  for (let i = 0; i < array.length; i++) {
    result[i] = productSoFar;
    productSoFar *= array[i];
  }
  productSoFar = 1;
  for (let i = array.length - 1; i >= 0; i--) {
    result[i] = productSoFar * result[i];
    productSoFar *= array[i];
  }
  return result;
};

console.assert(areArraysEqual(getProductsOfAllIntsExceptAtIndex([1, 7, 3, 4]), [84, 12, 28, 21]) === true, 'should equal true');
console.assert(areArraysEqual(getProductsOfAllIntsExceptAtIndex([1, 0, 3, 4]), [0, 12, 0, 0]) === true, 'should equal true');
console.assert(areArraysEqual(getProductsOfAllIntsExceptAtIndex2([1, 7, 3, 4]), [84, 12, 28, 21]) === true, 'should equal true');
console.assert(areArraysEqual(getProductsOfAllIntsExceptAtIndex2([1, 0, 3, 4]), [0, 12, 0, 0]) === true, 'should equal true');
console.assert(areArraysEqual(getProductsOfAllIntsExceptAtIndex2([2, 4, 10]), [40, 20, 8]) === true, 'should equal true');
console.assert(areArraysEqual(getProductsOfAllIntsExceptAtIndex2([1]), [1]) === true, 'should equal true');
console.assert(areArraysEqual(getProductsOfAllIntsExceptAtIndex2([]), []) === true, 'should equal true');

const highestProductOfThree = (array) => {

};
// console.assert(highestProductOfThree([1, 2, 3, 4]) === 24, 'should equal 24');
// console.assert(highestProductOfThree([1, 2, 3]) === 6, 'should equal 6');
// console.assert(highestProductOfThree([20, 1, 5, 16, 17, 8, 11, 9]) === 5440, 'should equal 5440');
// console.assert(highestProductOfThree([10, 1, 5, 20, 30, 8, 11, 80]) === 48000, 'should equal 5440');

const condenseMeetingTimes = (array) => {
  // sort array | O(n log n)
  array.sort((a, b) => { return a.startTime > b.startTime ? 1 : 0; });
  // create result object
  const result = [];
  // for each object in array | O(n)
  array.forEach((meeting) => {
    // check to see if start time is inbetween any elements start and end
    let flag = false;
    for (let i = 0; i < result.length; i++) {
      let sched = result[i];
      // if it is update end
      if (meeting.startTime >= sched.startTime && meeting.startTime <= sched.endTime) {
        // case for when second meeting starts later and ends sooner
        sched.endTime = Math.max(meeting.endTime, sched.endTime);
        flag = true;
        return;
      }
    }
    // else add to result object
    if (!flag) {
      result.push(meeting);
    }
  });
  return result;
};

const condenseMeetingTimes2 = (array) => {
  array.sort((a, b) => { return a.startTime > b.startTime ? 1 : 0; });
  const mergedMeetings = [array[0]];
  for (let i = 1; i < array.length; i++) {
    let currentMeeting = array[i];
    let lastMeeting = mergedMeetings[mergedMeetings.length - 1];
    if (currentMeeting.startTime <= lastMeeting.endTime) {
      lastMeeting.endTime = Math.max(lastMeeting.endTime, currentMeeting.endTime);
    } else {
      mergedMeetings.push(currentMeeting);
    }
  }
  return mergedMeetings;  
};

const meetings1 = [
  {startTime: 0, endTime: 1}, 
  {startTime: 3, endTime: 5}, 
  {startTime: 4, endTime: 8}, 
  {startTime: 10, endTime: 12}, 
  {startTime: 9, endTime: 10}
];
const meetings2 = [
  {startTime: 1, endTime: 10},
  {startTime: 2, endTime: 6},
  {startTime: 3, endTime: 5},
  {startTime: 7, endTime: 9}
];
const meetings3 = [
  {startTime: 1, endTime: 5}, 
  {startTime: 2, endTime: 3}
];
const meetings4 = [
  {startTime: 1, endTime: 2}, 
  {startTime: 2, endTime: 3}
];
const solution1 = [ 
  { startTime: 0, endTime: 1},
  { startTime: 3, endTime: 8},
  { startTime: 9, endTime: 12}
];
const solution2 = [ 
  { startTime: 1, endTime: 10}
];
const solution3 = [ 
  { startTime: 1, endTime: 5}
];
const solution4 = [ 
  { startTime: 1, endTime: 3}
];

console.assert(areObjectsEqual(condenseMeetingTimes2(meetings1), solution1), 'should be true for meetings1');
console.assert(areObjectsEqual(condenseMeetingTimes2(meetings2), solution2), 'should be true meetings2');
console.assert(areObjectsEqual(condenseMeetingTimes2(meetings3), solution3), 'should be true meetings3');
console.assert(areObjectsEqual(condenseMeetingTimes2(meetings4), solution4), 'should be true meetings4');

const coins = (amountLeft, denominations, currentIndex) => {
  currentIndex = currentIndex || 0;
  if (amountLeft === 0) {
    return 1;
  }
  if (amountLeft === 1) {
    return 0;
  }
  if (currentIndex === denominations.length) {
    return 0;
  }
  let currentCoin = denominations[currentIndex];
  let possibilities = 0;
  while (amountLeft >= 0) {
    possibilities += coins(amountLeft, denominations, currentIndex + 1);
    amountLeft -= currentCoin;
  }
  return possibilities;
};

const denominations = [1, 2, 3];
console.assert(coins(4, denominations) === 4, 'should equal true');

const intersectionRect = (rect1, rect2) => {
  let highestStartpoint = Math.max(rect1.leftX, rect2.leftX);
  let lowestEndpoint = Math.min(rect1.leftX + rect1.width, rect2.leftX + rect2.width);
  if (highestStartpoint >= lowestEndpoint) {
    return false;
  }
  let highestStartpointY = Math.max(rect1.bottomY, rect2.bottomY);
  let lowestEndpointY = Math.min(rect1.bottomY + rect1.height, rect2.bottomY + rect2.height);
  let width = lowestEndpoint - highestStartpoint;
  let height = lowestEndpointY - highestStartpointY;
  const intersection = {
    leftX: highestStartpoint,
    bottomY: highestStartpointY,
    width: width,
    height: height
  };
  return intersection;
};

const myRectangle = {
  leftX: 1,
  bottomY: 5,
  width: 10,
  height: 4,
};
const myRectangle2 = {
  leftX: 5,
  bottomY: 1,
  width: 3,
  height: 8,
};
const myRectangle3 = {
  leftX: 9,
  bottomY: 7,
  width: 6,
  height: 10,
};
const myRectangle4 = {
  leftX: 15,
  bottomY: 7,
  width: 4,
  height: 7,
};
console.assert(areObjectsEqual(intersectionRect(myRectangle, myRectangle2), { leftX: 5, bottomY: 5, width: 3, height: 4 }) === true, 'should be true');
console.assert(areObjectsEqual(intersectionRect(myRectangle, myRectangle3), { leftX: 9, bottomY: 7, width: 2, height: 2 }) === true, 'should be true');
console.assert(intersectionRect(myRectangle, myRectangle4) === false, 'should be false');
// time: O(1) | space: O(1)
// take away: although we use an array, it's bounded by a value that does not depend on the size of the input
class TempTracker {
  constructor() {
    this.temps = [];
    for (let i = 0; i <= 110; i++) {
      this.temps[i] = 0;
    }
    this.sum = 0;
    this.count = 0;
    this.min = Infinity;
    this.max = 0;
    this.modeCount = 0;
    this.mode;
    this.mean;
  }
  insert(temp) {
    this.temps[temp]++;
    this.sum += temp;
    this.count++;
    this.mean = this.sum / this.count;
    if (temp > this.max) {
      this.max = temp;
    }
    if (temp < this.min) {
      this.min = temp;
    }
    if (this.temps[temp] >= this.modeCount) {
      this.modeCount = this.temps[temp];
      this.mode = temp;
    }
  }
  getMax() {
    return this.max;
  }
  getMin() {
    return this.min;
  }
  getMean() {
    return this.mean;
  }
  getMode() {
    return this.mode;
  }
}
const temp = new TempTracker();
temp.insert(100);
temp.insert(100);
temp.insert(2);
temp.insert(2);
temp.insert(2);
temp.insert(3);
temp.insert(3);
temp.insert(3);
temp.insert(6);
temp.insert(1);
temp.insert(90);
temp.insert(78);
console.assert(temp.getMode() === 3, 'should equal 3');

class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  insertLeft(value) {
    this.left = new BinaryTreeNode(value);
    return this.left;
  }
  insertRight(value) {
    this.right = new BinaryTreeNode(value);
    return this.right;
  }
  superBalanced() {
    let depths = [];
    let nodes = [[this, 0]];
    while (nodes.length) {
      let nodePair = nodes.pop();
      let node = nodePair[0];
      let depth = nodePair[1];
      if (!node.left && !node.right) {
        if (!depths.includes(depth)) {
          depths.push(depth);
          if (depths.length > 2 || depths.length === 2 && Math.abs(depths[0] - depths[1]) > 1) {
            return false;
          }
        }
      } else {
        if (node.left) {
          nodes.push([node.left, depth + 1]);
        } 
        if (node.right) {
          nodes.push([node.right, depth + 1]);
        } 
      }
    }
    return true;
  }
  isValid() {
    let prev = -1;
    const stack = [this];
    let init = this.left;
    while (init) {
      stack.push(init);
      init = init.left;
    }
    while (stack.length) {
      let current = stack.pop();
      if (prev > current.value) {
        return false;
      }
      let temp = current.right;
      while (temp) {
        stack.push(temp);
        temp = temp.left;
      }
      prev = current.value;
    }
    return true;
  }
  inOrder(cb) {
    let node = this;
    if (node.left) {
      node.left.inOrder(cb);
    }
    cb(node);
    if (node.right) {
      node.right.inOrder(cb);
    }
  }
  preOrder(cb) {
    let node = this;
    cb(node);
    if (node.left) {
      node.left.preOrder(cb);
    }
    if (node.right) {
      node.right.preOrder(cb);
    }
  }
  postOrder(cb) {
    let node = this;
    if (node.left) {
      cb(node.left);
      node.left.postOrder(cb);
    }
    if (node.right) {
      cb(node.right);
      node.right.postOrder(cb);
    }
    // cb(node);
  }
}

const bstCheckerRecursive = (treeRoot, lowerBound, upperBound) => {
  lowerBound = lowerBound || Number.MIN_VALUE;
  upperBound = upperBound || Number.MAX_VALUE;
  if (!treeRoot) {
    return true;
  }
  if (treeRoot.value > upperBound || treeRoot.value < lowerBound) {
    return false;
  }
  return bstCheckerRecursive(treeRoot.left, lowerBound, treeRoot.value) && 
  bstCheckerRecursive(treeRoot.right, treeRoot.value, upperBound);
};

const binaryTree = new BinaryTreeNode(1);
binaryTree.insertLeft(2);
binaryTree.insertRight(3);
binaryTree.right.insertLeft(4);
binaryTree.right.insertRight(5);
binaryTree.right.right.insertLeft(6);
console.assert(binaryTree.superBalanced() === false, 'should be false');

const binaryTree2 = new BinaryTreeNode(7);
binaryTree2.insertLeft(5);
binaryTree2.insertRight(10);
binaryTree2.left.insertLeft(2);
binaryTree2.left.insertRight(6);
binaryTree2.right.insertLeft(8);
binaryTree2.right.insertRight(15);
console.assert(bstCheckerRecursive(binaryTree2) === true, 'shoud be true');

const binaryTree3 = new BinaryTreeNode(20);
binaryTree3.insertLeft(10);
binaryTree3.insertRight(30);
binaryTree3.left.insertLeft(6);
binaryTree3.left.insertRight(15);
binaryTree3.right.insertRight(35);
binaryTree3.right.insertLeft(25);

const binaryTree4 = new BinaryTreeNode(5);
binaryTree4.insertLeft(3);
binaryTree4.insertRight(8);
binaryTree4.left.insertLeft(1);
binaryTree4.left.insertRight(4);
binaryTree4.right.insertRight(12);
binaryTree4.right.insertLeft(7);
binaryTree4.right.right.insertLeft(10);
binaryTree4.right.right.left.insertLeft(9);
binaryTree4.right.right.left.insertRight(11);
const findLargest = (bst) => {
  if (!bst) {
    throw new Error('Tree must have at least one node');
  }
  let node = bst;
  while (node.right) {
    node = node.right;
  }
  return node.value;
};
const findSecondLargest = (bst) => {
  let node = bst;
  if (!node || !node.left && !node.right) {
    throw new Error('Tree must have at least two nodes');
  }
  while (node) {
    if (node.left && !node.right) {
      return findLargest(node.left);
    }
    if (node.right && !node.right.left && !node.right.right) {
      return node.value;
    }
    node = node.right;
  }
};

console.log(findSecondLargest(binaryTree4));
console.log(findSecondLargest(binaryTree3));