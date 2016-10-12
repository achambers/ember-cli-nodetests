/*jshint node:true*/
module.exports = {
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall: function() {
    return this.addPackagesToProject([
      { name: 'chai', target: '3.5.0' },
      { name: 'chai-as-promised', target: '6.0.0' },
      { name: 'glob', target: '7.1.1' },
      { name: 'mocha', target: '3.1.2' },
      { name: 'mocha-jshint', target: '2.3.1' }
    ]);
  }
};
