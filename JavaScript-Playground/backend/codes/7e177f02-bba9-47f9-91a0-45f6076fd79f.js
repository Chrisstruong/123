// Complexity
// n = string length
// Time: O(n)
// Space: O(n)

const mostFrequentChar = (s) => {
  // todo
  
  // Using Hash Map (Object)
  const count = {}
  let max = 0
  let maxRepeatedChar 
  
  for (let char of s) {
    if (!(char in count)) {
      count[char] = 0
    }
    count[char] += 1
  }
  
  let best = null
  for (let char of s) {
    if (best === null || count[char] > count[best]) best = char
  }
  return best


};

console.log("🔥")

console.log(mostFrequentChar('bookeeper'))

module.exports = {
  mostFrequentChar,
};


