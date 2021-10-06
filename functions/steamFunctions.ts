export default {
  steamPrettifier: function (request: any) {
    switch (request) {
      case 'normal':
        return '✅ Normal ✅';
      case 'surge':
        return '⚠️ Surge ⚠️';
      case 'critical':
        return '❌ Critical ❌';
      case 'offline':
        return '☠️ Offline ☠️';
      case 'delayed':
        return '🔄 Delayed 🔄';
      default:
        return '❔ Unknown(' + request + ') ❔';
    }
  },
  faceitPrettifier: function (request: any) {
    switch (request) {
      case 'none':
        return '✅';
      case 'minor':
        return '⚠️';
      case 'major':
        return '❌';
      default:
        return '❔';
    }
  },
  queuePrettifier: function (request: any) {
    switch (request) {
      case true:
        return '✅ Open ✅';
      case false:
        return '❌ Closed ❌';
      default:
        return '❔';
    }
  },
};
