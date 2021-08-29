var config = require('../../test/config');
const Dirty = require(config.LIB_DIRTY);

var COUNT = 1e5,
    dirty = new Dirty(config.TMP_PATH + '/benchmark-set-drain.dirty'),
    util = require('util'),
    drained = false;

var start = Date.now();
for (var i = 0; i < COUNT; i++) {
  dirty.set(i, 'This string has 256 bytes. This string has 256 bytes. This string has 256 bytes. This string has 256 bytes.  This string has 256 bytes. This string has 256 bytes. This string has 256 bytes. This string has 256 bytes.  This string has 256 bytes. This string');
}

dirty.on('drain', function() {
  var ms = Date.now() - start,
      mhz = ((COUNT / (ms / 1000)) / 1e3).toFixed(2),
      million = COUNT / 1e6;

  // Can't use console.log() since since I also test this in ancient node versions
  util.log(mhz+' Hz ('+million+' million in '+ms+' ms)');

  drained = true;
});

process.on('exit', function() {
  assert.ok(drained);
});
