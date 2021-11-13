/*
 * Javascript has a function:
 *   document.getElementsByClassName(className)
 *
 * This function does what the name suggests, returning
 * a list of all elements that have the provided class.
 *
 * Your task is to implement your own version of this
 * function. It should take a class name and root node
 * as arguments, and return all elements within the
 * root node that have that class.
 *
 * A few functions are off-limits in your solution:
 *   document.getElementsByClassName
 *   document.getElementsByTagName
 *   document.querySelector
 *
 * You can use Google or other resources you normally use.
 */

const myGetElementsByClassName = (className, rootNode) => {
  // Replace this with your own code
  const matchedNodes = []
  // console.log(document.body.children)
  const children = rootNode.children
  function recurseDOM (node) {
    // console.log(node.classList, node.className)
    if(Array.from(node.classList).includes(className)) {
      matchedNodes.push(node)
    }
    const nodeChildren = node.children
    // console.log(nodeChildren)
    if(nodehildren.length) {
      Array.from(nodeChildren).forEach((child, index) => {
        return recurseDOM(child)
      })
    }
    return false
  }
  Array.from(children).forEach(child => recurseDOM(child))
  // return matchedNodes
  return {
    mine: matchedNodes,
    test: rootNode.getElementsByClassName(className)
  }
};

/*
 * With the markup in the html document, this call should result in
 * a list of 8 elements.
 */
const myNodes = myGetElementsByClassName('ipsum-dolor', document.body);
console.log(myNodes);
