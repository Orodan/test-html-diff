(function() {
  var utils = require('./utils.js').Utils;
    INSERTS: 'd2h-ins',
    DELETES: 'd2h-del',
    INSERT_CHANGES: 'd2h-ins d2h-change',
    DELETE_CHANGES: 'd2h-del d2h-change',
    CONTEXT: 'd2h-cntx',
    INFO: 'd2h-info'
  DiffParser.prototype.generateDiffJson = function(diffInput) {
    var files = [];
    var currentFile = null;
    var currentBlock = null;
    var oldLine = null;
    var newLine = null;
    var saveBlock = function() {

      /* Add previous block(if exists) before start a new file */
    var saveFile = function() {

       * Add previous file(if exists) before start a new one
    var startFile = function() {
      /* Create file structure */
    var startBlock = function(line) {
      /* Create block metadata */
    var createLine = function(line) {
      var newLinePrefixes = !currentFile.isCombined ? ['+'] : ['+', ' +'];
      var delLinePrefixes = !currentFile.isCombined ? ['-'] : ['-', ' -'];

      /* Fill the line data */
      if (utils.startsWith(line, newLinePrefixes)) {
      } else if (utils.startsWith(line, delLinePrefixes)) {
    var diffLines = diffInput.split('\n');
    /* Diff */
    var oldMode = /^old mode (\d{6})/;
    var newMode = /^new mode (\d{6})/;
    var deletedFileMode = /^deleted file mode (\d{6})/;
    var newFileMode = /^new file mode (\d{6})/;
    var copyFrom = /^copy from (.+)/;
    var copyTo = /^copy to (.+)/;
    var renameFrom = /^rename from (.+)/;
    var renameTo = /^rename to (.+)/;
    var similarityIndex = /^similarity index (\d+)%/;
    var dissimilarityIndex = /^dissimilarity index (\d+)%/;
    var index = /^index ([0-9a-z]+)..([0-9a-z]+) (\d{6})?/;
    /* Combined Diff */
    var combinedIndex = /^index ([0-9a-z]+),([0-9a-z]+)..([0-9a-z]+)/;
    var combinedMode = /^mode (\d{6}),(\d{6})..(\d{6})/;
    var combinedNewFile = /^new file mode (\d{6})/;
    var combinedDeletedFile = /^deleted file mode (\d{6}),(\d{6})/;

    diffLines.forEach(function(line) {
      // Unmerged paths, and possibly other non-diffable files
      // https://github.com/scottgonzalez/pretty-diff/issues/11
      // Also, remove some useless lines
      if (!line || utils.startsWith(line, '*')) {
        return;
      }
      if (utils.startsWith(line, 'diff')) {
      } else if (currentFile && !currentFile.oldName && (values = /^--- [aiwco]\/(.+)$/.exec(line))) {
      } else if (currentFile && !currentFile.newName && (values = /^\+\+\+ [biwco]?\/(.+)$/.exec(line))) {
      } else if (currentFile && utils.startsWith(line, '@@')) {
    var nameSplit = filename.split('.');
    if (nameSplit.length > 1) {
      return nameSplit[nameSplit.length - 1];
    }
    return language;
  module.exports.DiffParser = new DiffParser();

})();