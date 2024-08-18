module.exports = {
  transform: {},
  testEnvironment: "node",
};



  module.exports = {
    transform: {
      "^.+\\.js$": "babel-jest",
    },
    testEnvironment: "node",
    testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  };
  