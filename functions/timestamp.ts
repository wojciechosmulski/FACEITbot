const datetime = require('node-datetime');
export default {
  generateTimestamp: function () {
    var dt = datetime.create();
    var timestamp = dt.format(`w n D Y H:M:S`);
    return timestamp;
  },
};
