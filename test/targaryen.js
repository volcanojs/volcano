const assert = require('assert');
const targaryen = require('targaryen');

const rules = {
  rules: {
    foo: {
      ".write": "root.child('bar').val() == 2",
    },
  }
};
const data = {
  foo: 1,
  bar: 0,
};
const auth = {uid: 'someuid'};

const database = targaryen.database(rules, data).as(auth).with({debug: true});
const {allowed, newDatabase, info} = database.write('/foo', 2);

console.log('Rule evaluations:\n', info);
assert.ok(allowed);

assert.equal(newDatabase.rules, database.rules);
assert.equal(newDatabase.root.foo.$value(), 2);
assert.equal(newDatabase.auth, auth);