import { DiffFile, DiffBlock, DiffLine, LineType } from './types';
import { escapeForRegExp } from './utils';
  const filenameParts = filename.split('.');
const baseDiffFilenamePrefixes = ['a/', 'b/', 'i/', 'w/', 'c/', 'o/'];
  const [, filename = ''] = FilenameRegExp.exec(line) || [];
  return fnameWithoutPrefix.replace(/\s+\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:\.\d+)? [+-]\d{4}.*$/, '');
  return getFilename(line, '---', srcPrefix);
  return getFilename(line, '+++', dstPrefix);
  const oldFileNameHeader = '--- ';
  const newFileNameHeader = '+++ ';
  const hunkHeaderPrefix = '@@';
  const index = /^index ([\da-z]+)\.\.([\da-z]+)\s*(\d{6})?/;
  const combinedIndex = /^index ([\da-z]+),([\da-z]+)\.\.([\da-z]+)/;
    .replace(/\\ No newline at end of file/g, '')
    .replace(/\r\n?/g, '\n')
    .split('\n');
      addedLines: 0,
          console.error('Failed to parse lines, starting in 0!');
      header: line,
      content: line,
    const addedPrefixes = currentFile.isCombined ? ['+ ', ' +', '++'] : ['+'];
    const deletedPrefixes = currentFile.isCombined ? ['- ', ' -', '--'] : ['-'];
      if (line.startsWith('diff')) {
    if (!line || line.startsWith('*')) {
    if (line.startsWith('diff')) {
        throw new Error('Where is my file !!!');
        line.startsWith('--- ') &&
        line.startsWith('+++ ') &&
    if (currentBlock && (line.startsWith('+') || line.startsWith('-') || line.startsWith(' '))) {
      throw new Error('Where is my file !!!');
      startBlock('Binary file');
      // eslint-disable-next-line sonarjs/no-duplicated-branches
      // eslint-disable-next-line sonarjs/no-duplicated-branches