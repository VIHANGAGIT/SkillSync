export const challenges = {
  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array • Hash Table",
    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
      notes: [
        "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        "You can return the answer in any order.",
      ],
    },
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists",
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your solution here
  
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6)); // Expected: [1, 2]
console.log(twoSum([3, 3], 6)); // Expected: [0, 1]`,
      python: `def twoSum(nums, target):
    # Write your solution here
    pass

# Test cases
print(twoSum([2, 7, 11, 15], 9))  # Expected: [0, 1]
print(twoSum([3, 2, 4], 6))  # Expected: [1, 2]
print(twoSum([3, 3], 6))  # Expected: [0, 1]`,
      java: `import java.util.*;

class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9))); // Expected: [0, 1]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 2, 4}, 6))); // Expected: [1, 2]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 3}, 6))); // Expected: [0, 1]
    }
}`,
    },
    expectedOutput: {
      javascript: "[0,1]\n[1,2]\n[0,1]",
      python: "[0, 1]\n[1, 2]\n[0, 1]",
      java: "[0, 1]\n[1, 2]\n[0, 1]",
    },
  },
  "reverse-linked-list": {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Medium",
    category: "Linked List",
    description: {
      text: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
      notes: [],
    },
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
      },
      {
        input: "head = [1,2]",
        output: "[2,1]",
      },
      {
        input: "head = []",
        output: "[]",
      },
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000]",
      "-5000 ≤ Node.val ≤ 5000",
    ],
    starterCode: {
      javascript: `
 // Definition for singly-linked list.
 function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
 }
 
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    // Write your solution here
};

// Helper function to create a linked list from an array
function createLinkedList(arr) {
    if (!arr.length) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Helper function to convert linked list to array for printing
function linkedListToArray(head) {
    let arr = [];
    while (head) {
        arr.push(head.val);
        head = head.next;
    }
    return arr;
}

// Test cases
console.log(linkedListToArray(reverseList(createLinkedList([1, 2, 3, 4, 5])))); // Expected: [5, 4, 3, 2, 1]
console.log(linkedListToArray(reverseList(createLinkedList([1, 2])))); // Expected: [2, 1]
console.log(linkedListToArray(reverseList(createLinkedList([])))); // Expected: []`,
      python: `# Definition for singly-linked list.
class ListNode:
  def __init__(self, val=0, next=None):
    self.val = val
    self.next = next
    
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
      # Write your solution here
      pass

# Helper function to create a linked list from a list
def create_linked_list(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    current = head
    for val in arr[1:]:
        current.next = ListNode(val)
        current = current.next
    return head

# Helper function to convert linked list to list for printing
def linked_list_to_list(head):
    arr = []
    while head:
        arr.append(head.val)
        head = head.next
    return arr

# Test cases
sol = Solution()
print(linked_list_to_list(sol.reverseList(create_linked_list([1, 2, 3, 4, 5])))) # Expected: [5, 4, 3, 2, 1]
print(linked_list_to_list(sol.reverseList(create_linked_list([1, 2])))) # Expected: [2, 1]
print(linked_list_to_list(sol.reverseList(create_linked_list([])))) # Expected: []`,
      java: `import java.util.*;

//Definition for singly-linked list.
public class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        // Write your solution here
    }

    // Helper function to create a linked list from an array
    public static ListNode createLinkedList(int[] arr) {
        if (arr.length == 0) return null;
        ListNode head = new ListNode(arr[0]);
        ListNode current = head;
        for (int i = 1; i < arr.length; i++) {
            current.next = new ListNode(arr[i]);
            current = current.next;
        }
        return head;
    }

    // Helper function to print linked list
    public static void printLinkedList(ListNode head) {
        List<Integer> result = new ArrayList<>();
        while (head != null) {
            result.add(head.val);
            head = head.next;
        }
        System.out.println(result);
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        printLinkedList(sol.reverseList(createLinkedList(new int[]{1, 2, 3, 4, 5}))); // Expected: [5, 4, 3, 2, 1]
        printLinkedList(sol.reverseList(createLinkedList(new int[]{1, 2}))); // Expected: [2, 1]
        printLinkedList(sol.reverseList(createLinkedList(new int[]{}))); // Expected: []
    }
}`,
    },
    expectedOutput: {
      javascript: "[5, 4, 3, 2, 1]\n[2, 1]\n[]",
      python: "[5, 4, 3, 2, 1]\n[2, 1]\n[]",
      java: "[5, 4, 3, 2, 1]\n[2, 1]\n[]",
    },
  },
  "valid-parentheses": {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    description: {
      text: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      notes: [
        "Open brackets must be closed by the same type of brackets.",
        "Open brackets must be closed in the correct order.",
        "Every close bracket has a corresponding open bracket of the same type.",
      ],
    },
    examples: [
      {
        input: "s = \"()\"",
        output: "true",
      },
      {
        input: "s = \"()[]{}\"",
        output: "true",
      },
      {
        input: "s = \"(]\"",
        output: "false",
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 10⁴",
      "s consists of parentheses only '()[]{}'",
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    
};

// Test cases
console.log(isValid("()")); // Expected: true
console.log(isValid("()[]{}")); // Expected: true
console.log(isValid("(]")); // Expected: false`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        pass

# Test cases
sol = Solution()
print(sol.isValid("()")) # Expected: True
print(sol.isValid("()[]{}")) # Expected: True
print(sol.isValid("(]")) # Expected: False`,
      java: `class Solution {
    public boolean isValid(String s) {
        
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.isValid("()")); // Expected: true
        System.out.println(sol.isValid("()[]{}")); // Expected: true
        System.out.println(sol.isValid("(]")); // Expected: false
    }
}`,
    },
    expectedOutput: {
      javascript: "true\ntrue\nfalse",
      python: "True\nTrue\nFalse",
      java: "true\ntrue\nfalse",
    },
  },
  "merge-intervals": {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Arrays",
    description: {
      text: "Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
      notes: [],
    },
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6].",
      },
      {
        input: "intervals = [[1,4],[4,5]]",
        output: "[[1,5]]",
        explanation: "Intervals [1,4] and [4,5] are considered overlapping.",
      },
    ],
    constraints: [
      "1 ≤ intervals.length ≤ 10⁴",
      "intervals[i].length == 2",
      "0 ≤ startᵢ ≤ endᵢ ≤ 10⁴",
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    
};

// Test cases
console.log(JSON.stringify(merge([[1,3],[2,6],[8,10],[15,18]]))); // Expected: [[1,6],[8,10],[15,18]]
console.log(JSON.stringify(merge([[1,4],[4,5]]))); // Expected: [[1,5]]`,
      python: `class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        pass

# Test cases
sol = Solution()
print(sol.merge([[1,3],[2,6],[8,10],[15,18]])) # Expected: [[1,6],[8,10],[15,18]]
print(sol.merge([[1,4],[4,5]])) # Expected: [[1,5]]`,
      java: `import java.util.Arrays;

class Solution {
    public int[][] merge(int[][] intervals) {
        
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(Arrays.deepToString(sol.merge(new int[][]{{1,3},{2,6},{8,10},{15,18}}))); // Expected: [[1,6],[8,10],[15,18]]
        System.out.println(Arrays.deepToString(sol.merge(new int[][]{{1,4},{4,5}}))); // Expected: [[1,5]]
    }
}`,
    },
    expectedOutput: {
      javascript: "[[1,6],[8,10],[15,18]]\n[[1,5]]",
      python: "[[1, 6], [8, 10], [15, 18]]\n[[1, 5]]",
      java: "[[1, 6], [8, 10], [15, 18]]\n[[1, 5]]",
    },
  },
  "trapping-rain-water": {
    id: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "Dynamic Programming",
    description: {
      text: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
      notes: [],
    },
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation: "The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.",
      },
      {
        input: "height = [4,2,0,3,2,5]",
        output: "9",
      },
    ],
    constraints: [
      "n == height.length",
      "1 ≤ n ≤ 2 * 10⁴",
      "0 ≤ height[i] ≤ 10⁵",
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    
};

// Test cases
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // Expected: 6
console.log(trap([4,2,0,3,2,5])); // Expected: 9`,
      python: `class Solution:
    def trap(self, height: List[int]) -> int:
        pass

# Test cases
sol = Solution()
print(sol.trap([0,1,0,2,1,0,1,3,2,1,2,1])) # Expected: 6
print(sol.trap([4,2,0,3,2,5])) # Expected: 9`,
      java: `class Solution {
    public int trap(int[] height) {
        
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.trap(new int[]{0,1,0,2,1,0,1,3,2,1,2,1})); // Expected: 6
        System.out.println(sol.trap(new int[]{4,2,0,3,2,5})); // Expected: 9
    }
}`,
    },
    expectedOutput: {
      javascript: "6\n9",
      python: "6\n9",
      java: "6\n9",
    },
  },
  "merge-two-sorted-lists": {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List",
    description: {
      text: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
      notes: [],
    },
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]",
      },
      {
        input: "list1 = [], list2 = [0]",
        output: "[0]",
      },
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50]",
      "-100 ≤ Node.val ≤ 100",
      "Both list1 and list2 are sorted in non-decreasing order",
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    
};

// Helper function to create a linked list from an array
function createLinkedList(arr) {
    if (!arr.length) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Helper function to convert linked list to array for printing
function linkedListToArray(head) {
    let arr = [];
    while (head) {
        arr.push(head.val);
        head = head.next;
    }
    return arr;
}

// Test cases
console.log(linkedListToArray(mergeTwoLists(createLinkedList([1,2,4]), createLinkedList([1,3,4])))); // Expected: [1,1,2,3,4,4]
console.log(linkedListToArray(mergeTwoLists(createLinkedList([]), createLinkedList([])))); // Expected: []
console.log(linkedListToArray(mergeTwoLists(createLinkedList([]), createLinkedList([0])))); // Expected: [0]`,
      python: `# Definition for singly-linked list.
# class ListNode:
     def __init__(self, val=0, next=None):
         self.val = val
         self.next = next
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        pass

# Helper function to create a linked list from a list
def create_linked_list(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    current = head
    for val in arr[1:]:
        current.next = ListNode(val)
        current = current.next
    return head

# Helper function to convert linked list to list for printing
def linked_list_to_list(head):
    arr = []
    while head:
        arr.append(head.val)
        head = head.next
    return arr

# Test cases
sol = Solution()
print(linked_list_to_list(sol.mergeTwoLists(create_linked_list([1,2,4]), create_linked_list([1,3,4])))) # Expected: [1,1,2,3,4,4]
print(linked_list_to_list(sol.mergeTwoLists(create_linked_list([]), create_linked_list([])))) # Expected: []
print(linked_list_to_list(sol.mergeTwoLists(create_linked_list([]), create_linked_list([0])))) # Expected: [0]`,
      java: `import java.util.*;

/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        
    }

    // Helper function to create a linked list from an array
    public static ListNode createLinkedList(int[] arr) {
        if (arr.length == 0) return null;
        ListNode head = new ListNode(arr[0]);
        ListNode current = head;
        for (int i = 1; i < arr.length; i++) {
            current.next = new ListNode(arr[i]);
            current = current.next;
        }
        return head;
    }

    // Helper function to print linked list
    public static void printLinkedList(ListNode head) {
        List<Integer> result = new ArrayList<>();
        while (head != null) {
            result.add(head.val);
            head = head.next;
        }
        System.out.println(result);
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        printLinkedList(sol.mergeTwoLists(createLinkedList(new int[]{1,2,4}), createLinkedList(new int[]{1,3,4}))); // Expected: [1,1,2,3,4,4]
        printLinkedList(sol.mergeTwoLists(createLinkedList(new int[]{}), createLinkedList(new int[]{}))); // Expected: []
        printLinkedList(sol.mergeTwoLists(createLinkedList(new int[]{}), createLinkedList(new int[]{0}))); // Expected: [0]
    }
}`,
    },
    expectedOutput: {
      javascript: "[1,1,2,3,4,4]\n[]\n[0]",
      python: "[1, 1, 2, 3, 4, 4]\n[]\n[0]",
      java: "[1, 1, 2, 3, 4, 4]\n[]\n[0]",
    },
  },
};

export const language_config = {
  javascript: {
    name: "JavaScript",
    icon: "/javascript.png",
    monacoLang: "javascript",
  },
  python: {
    name: "Python",
    icon: "/python.png",
    monacoLang: "python",
  },
  java: {
    name: "Java",
    icon: "/java.png",
    monacoLang: "java",
  },
};