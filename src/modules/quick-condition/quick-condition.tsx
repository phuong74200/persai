const qc = function () {
  const conditions = [];
  let result = true;

  const one = function (condition) {
    conditions.push(condition);
    return this;
  };

  const two = function (condition) {
    conditions.push(condition);
    return this;
  };

  const three = function (condition) {
    conditions.push(condition);
    return this;
  };

  const run = function () {
    conditions.forEach((condition) => {
      if (result) {
        result = condition;
      }
    });
    return result;
  };

  return {
    one,
    two,
    three,
    run,
  };
};

qc.one(true).two(false).three(true).run();
