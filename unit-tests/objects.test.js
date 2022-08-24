const { assert } = require("chai");
const {
  transpose,
  spreadKeyValues,
  splat,
  hasDuplicateKeys,
  duplicateKeyTest,
  arraySplatIndex,
  getObjectFromArray,
  carve,
} = require("../lib/objects");

describe("objects", () => {
  describe("transpose", () => {
    it("should add values from one object to another", () => {
      let obj1 = { one: 1 };
      let obj2 = { two: 2 };
      transpose(obj2, obj1);
      assert.deepEqual(obj1, { one: 1, two: 2 }, "it should merge objects");
    });
  });
  describe("spreadValues", () => {
    it("should return the values as an array", () => {
      let actualData = spreadKeyValues({
        test: 1,
        test_2: "test",
      });
      let expectedData = [1, "test"];
      assert.deepEqual(actualData, expectedData, "it should return array");
    });
  });
  describe("splat", () => {
    it("should return the values as an array", () => {
      let actualData = splat(
        [
          {
            name: "todd",
          },
          {
            name: "egg",
          },
          {
            name: "frog",
          },
        ],
        "name"
      );
      assert.deepEqual(
        actualData,
        ["todd", "egg", "frog"],
        "should return array"
      );
    });
  });
  describe("hasDuplicateKeys", () => {
    let arr = [
      {
        name: "todd",
      },
      {
        name: "egg",
      },
      {
        name: "frog",
      },
    ];
    it("should return true if duplicate keys", () => {
      assert.isTrue(hasDuplicateKeys(arr, "name", "todd"), "todd is here");
    });
    it("should return false if no duplicate keys", () => {
      assert.isFalse(hasDuplicateKeys(arr, "name", "ham"), "ham is not here");
    });
  });
  describe("duplicateKeyTest", () => {
    it("should not throw if not duplicate", () => {
      let arr = [
        {
          name: "todd",
        },
        {
          name: "egg",
        },
        {
          name: "frog",
        },
      ];
      let task = () => {
        duplicateKeyTest("test", arr, "name", "ham");
      };
      assert.doesNotThrow(task);
    });
    it("should throw if duplicate", () => {
      let arr = [
        {
          name: "todd",
        },
        {
          name: "egg",
        },
        {
          name: "frog",
        },
      ];
      let task = () => {
        duplicateKeyTest("test", arr, "name", "todd");
      };
      assert.throws(
        task,
        "test expected no duplicate keys for name. Duplicate value: todd"
      );
    });
  });
  describe("arraySplatIndex", () => {
    it("should return the correct index", () => {
      let arr = [
        {
          name: "todd",
        },
        {
          name: "egg",
        },
        {
          name: "frog",
        },
      ];
      assert.deepEqual(
        arraySplatIndex(arr, "name", "todd"),
        0,
        "it should return index"
      );
    });
  });
  describe("getObjectFromArray", () => {
    it("should return the correct object", () => {
      let arr = [
        {
          name: "todd",
        },
        {
          name: "egg",
        },
        {
          name: "frog",
        },
      ];
      assert.deepEqual(
        getObjectFromArray(arr, "name", "todd"),
        {
          name: "todd",
        },
        "it should return index"
      );
    });
  });
  describe("carve", () => {
    it("should remove and return object", () => {
      let arr = [
        {
          name: "todd",
        },
        {
          name: "egg",
        },
        {
          name: "frog",
        },
      ];
      let returnedValue = carve(arr, "name", "todd");
      assert.deepEqual(
        returnedValue,
        [{ name: "todd" }],
        "it should carve out value"
      );
      assert.deepEqual(
        arr,
        [
          {
            name: "egg",
          },
          {
            name: "frog",
          },
        ],
        "it should change array in place"
      );
    });
  });
});