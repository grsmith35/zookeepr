const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require("../lib/zookeepers");

const {zookeepers} = require('../data/zookeepers.json');
const { TestWatcher } = require("@jest/core");
const { hasUncaughtExceptionCaptureCallback } = require("process");

jest.mock("fs");

test("creates a zookeeper object", () => {
    const keeper = createNewZookeeper(
        {name: 'riley', id: '15'}, zookeepers
    );

    expect(keeper.name).toBe("riley");
    expect(keeper.id).toBe('15');
});

test('filter by query', () => {
    const zooKeepers = [
        {
            id: "2",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin",
          },
          {
            id: "3",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear",
          },
    ]
    const filteredKeepers = filterByQuery({age: 31}, zooKeepers);
    expect(filteredKeepers.length).toEqual(1);
});

test('finding by id', () => {
    const zooKeepers = [
        {
            id: "2",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin",
          },
          {
            id: "3",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear",
          },
    ]

    const foundId = findById("2", zooKeepers);
    expect(foundId.name).toBe("Raksha");
});

test("validating zookeeper", () => {
    const zooKeeper1 = {
        id: "0",
        name: "Kim",
        age: 28,
        favoriteAnimal: "dolphin"
    };
    
    const invalidKeeper = {
        id: "0",
        name: "Kim",
        favoriteAnimal: "dolphin"
    }

    const check1 = validateZookeeper(zooKeeper1);
    const check2 = validateZookeeper(invalidKeeper);

    expect(check1).toBe(true);
    expect(check2).toBe(false);
})