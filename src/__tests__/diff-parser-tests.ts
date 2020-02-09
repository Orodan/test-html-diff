import { parse } from '../diff-parser';
describe('DiffParser', () => {
  describe('generateDiffJson', () => {
    it('should parse unix with \n diff', () => {
        'diff --git a/sample b/sample\n' +
        'index 0000001..0ddf2ba\n' +
        '--- a/sample\n' +
        '+++ b/sample\n' +
        '@@ -1 +1 @@\n' +
        '-test\n' +
        '+test1r\n';
    it('should parse windows with \r\n diff', () => {
        'diff --git a/sample b/sample\r\n' +
        'index 0000001..0ddf2ba\r\n' +
        '--- a/sample\r\n' +
        '+++ b/sample\r\n' +
        '@@ -1 +1 @@\r\n' +
        '-test\r\n' +
        '+test1r\r\n';
    it('should parse old os x with \r diff', () => {
        'diff --git a/sample b/sample\r' +
        'index 0000001..0ddf2ba\r' +
        '--- a/sample\r' +
        '+++ b/sample\r' +
        '@@ -1 +1 @@\r' +
        '-test\r' +
        '+test1r\r';
    it('should parse mixed eols diff', () => {
        'diff --git a/sample b/sample\n' +
        'index 0000001..0ddf2ba\r\n' +
        '--- a/sample\r' +
        '+++ b/sample\r\n' +
        '@@ -1 +1 @@\n' +
        '-test\r' +
        '+test1r\n';
    it('should parse diff with special characters', () => {
        'index 4c679d7..e9bd385 100644\n' +
        '@@ -1 +1,2 @@\n' +
        '-cenas\n' +
        '+cenas com ananas\n' +
        '+bananas';
    it('should parse diff with prefix', () => {
        'index 4c679d7..e9bd385 100644\n' +
        '@@ -1 +1,2 @@\n' +
        '-cenas\n' +
        '+cenas com ananas\n' +
        '+bananas';
    it('should parse diff with deleted file', () => {
        'diff --git a/src/var/strundefined.js b/src/var/strundefined.js\n' +
        'deleted file mode 100644\n' +
        'index 04e16b0..0000000\n' +
        '--- a/src/var/strundefined.js\n' +
        '+++ /dev/null\n' +
        '@@ -1,3 +0,0 @@\n' +
        '-define(() => {\n' +
        '-  return typeof undefined;\n' +
        '-});\n';
    it('should parse diff with new file', () => {
        'diff --git a/test.js b/test.js\n' +
        'new file mode 100644\n' +
        'index 0000000..e1e22ec\n' +
        '--- /dev/null\n' +
        '+++ b/test.js\n' +
        '@@ -0,0 +1,5 @@\n' +
        '+\n' +
        '+var patchLineList = [ false, false, false, false ];\n' +
        '+\n' +
        '+console.log(parser.parsePatchDiffResult(text, patchLineList));\n';
    it('should parse diff with nested diff', () => {
        'diff --git a/src/offset.js b/src/offset.js\n' +
        'index cc6ffb4..fa51f18 100644\n' +
        '--- a/src/offset.js\n' +
        '+++ b/src/offset.js\n' +
        '@@ -1,6 +1,5 @@\n' +
        '+\n' +
        '+var patchLineList = [ false, false, false, false ];\n' +
        '+\n' +
        '+console.log(parser.parsePatchDiffResult(text, patchLineList));\n';
    it('should parse diff with multiple blocks', () => {
        'diff --git a/src/attributes/classes.js b/src/attributes/classes.js\n' +
        'index c617824..c8d1393 100644\n' +
        '--- a/src/attributes/classes.js\n' +
        '+++ b/src/attributes/classes.js\n' +
        '@@ -1,10 +1,9 @@\n' +
        ' define([\n' +
        '-], function( jQuery, rnotwhite, strundefined, dataPriv ) {\n' +
        '+], function( jQuery, rnotwhite, dataPriv ) {\n' +
        ' \n' +
        ' var rclass = /[\\t\\r\\n\\f]/g;\n' +
        ' \n' +
        '@@ -128,7 +127,7 @@ jQuery.fn.extend({\n' +
        '         }\n' +
        ' \n' +
        '       // Toggle whole class name\n' +
        '         if ( this.className ) {\n' +
        '           // store className if set\n' +
    it('should parse diff with multiple files', () => {
        'diff --git a/src/core/init.js b/src/core/init.js\n' +
        'index e49196a..50f310c 100644\n' +
        '--- a/src/core/init.js\n' +
        '+++ b/src/core/init.js\n' +
        '@@ -101,7 +101,7 @@ var rootjQuery,\n' +
        '     // HANDLE: $(function)\n' +
        '     // Shortcut for document ready\n' +
        '     } else if ( jQuery.isFunction( selector ) ) {\n' +
        '+      return rootjQuery.ready !== undefined ?\n' +
        '         rootjQuery.ready( selector ) :\n' +
        '         // Execute immediately if ready is not present\n' +
        '         selector( jQuery );\n' +
        'diff --git a/src/event.js b/src/event.js\n' +
        'index 7336f4d..6183f70 100644\n' +
        '--- a/src/event.js\n' +
        '+++ b/src/event.js\n' +
        '@@ -1,6 +1,5 @@\n' +
        ' define([\n' +
    it('should parse combined diff', () => {
        'diff --combined describe.c\n' +
        'index fabadb8,cc95eb0..4866510\n' +
        '--- a/describe.c\n' +
        '+++ b/describe.c\n' +
        '@@@ -98,20 -98,12 +98,20 @@@\n' +
        '   return (a_date > b_date) ? -1 : (a_date == b_date) ? 0 : 1;\n' +
        '  }\n' +
        '  \n' +
        '- static void describe(char *arg)\n' +
        ' -static void describe(struct commit *cmit, int last_one)\n' +
        '++static void describe(char *arg, int last_one)\n' +
        '  {\n' +
        ' + unsigned char sha1[20];\n' +
        ' + struct commit *cmit;\n' +
        '   struct commit_list *list;\n' +
        '   static int initialized = 0;\n' +
        '   struct commit_name *n;\n' +
        '  \n' +
        ' + if (get_sha1(arg, sha1) < 0)\n' +
        ' +     usage(describe_usage);\n' +
        ' + cmit = lookup_commit_reference(sha1);\n' +
        ' + if (!cmit)\n' +
        ' +     usage(describe_usage);\n' +
        ' +\n' +
        '   if (!initialized) {\n' +
        '       initialized = 1;\n' +
        '       for_each_ref(get_name);\n';
    it('should parse diffs with copied files', () => {
        'diff --git a/index.js b/more-index.js\n' +
        'dissimilarity index 5%\n' +
        'copy from index.js\n' +
        'copy to more-index.js\n';
    it('should parse diffs with moved files', () => {
        'diff --git a/more-index.js b/other-index.js\n' +
        'similarity index 86%\n' +
        'rename from more-index.js\n' +
        'rename to other-index.js\n';
    it('should parse diffs correct line numbers', () => {
        'diff --git a/sample b/sample\n' +
        'index 0000001..0ddf2ba\n' +
        '--- a/sample\n' +
        '+++ b/sample\n' +
        '@@ -1 +1,2 @@\n' +
        '-test\n' +
        '+test1r\n';
    it('should parse unified non git diff and strip timestamps off the headers', () => {
        '--- a/sample.js  2016-10-25 11:37:14.000000000 +0200\n' +
          '+++ b/sample.js  2016-10-25 11:37:14.000000000 +0200\n' +
          '@@ -1 +1,2 @@\n' +
          '-test\n' +
          '+test1r\n' +
          '+test2r',
        '--- a/sample.js 2016-10-25 11:37:14.000000000 -0200\n' +
          '+++ b/sample.js  2016-10-25 11:37:14.000000000 -0200\n' +
          '@@ -1 +1,2 @@\n' +
          '-test\n' +
          '+test1r\n' +
          '+test2r',
      ].join('\n');
    it('should parse unified non git diff', () => {
        '--- a/sample.js\n' + '+++ b/sample.js\n' + '@@ -1 +1,2 @@\n' + '-test\n' + '+test1r\n' + '+test2r\n';
    it('should parse unified diff with multiple hunks and files', () => {
        '--- sample.js\n' +
        '+++ sample.js\n' +
        '@@ -1 +1,2 @@\n' +
        '-test\n' +
        '@@ -10 +20,2 @@\n' +
        '+test\n' +
        '--- sample1.js\n' +
        '+++ sample1.js\n' +
        '@@ -1 +1,2 @@\n' +
        '+test1';
    it('should parse diff with --- and +++ in the context lines', () => {
        '--- sample.js\n' +
        '+++ sample.js\n' +
        '@@ -1,8 +1,8 @@\n' +
        ' test\n' +
        ' \n' +
        '-- 1\n' +
        '--- 1\n' +
        '---- 1\n' +
        ' \n' +
        '++ 2\n' +
        '+++ 2\n' +
        '++++ 2';
    it('should parse diff without proper hunk headers', () => {
      const diff = '--- sample.js\n' + '+++ sample.js\n' + '@@ @@\n' + ' test';
    it('should parse binary file diff', () => {
        'diff --git a/last-changes-config.png b/last-changes-config.png\n' +
        'index 322248b..56fc1f2 100644\n' +
        '--- a/last-changes-config.png\n' +
        '+++ b/last-changes-config.png\n' +
        'Binary files differ';
    it('should parse diff with --find-renames', () => {
        'diff --git a/src/test-bar.js b/src/test-baz.js\n' +
        'similarity index 98%\n' +
        'rename from src/test-bar.js\n' +
        'rename to src/test-baz.js\n' +
        'index e01513b..f14a870 100644\n' +
        '--- a/src/test-bar.js\n' +
        '+++ b/src/test-baz.js\n' +
        '@@ -1,4 +1,32 @@\n' +
        ' function foo() {\n' +
        ' }\n' +
        ' ';
    it('should parse diff with prefix 2', () => {
        'similarity index 88%\n' +
        'rename from Test.scala\n' +
        'rename to ScalaTest.scala\n' +
        'index 7d1f9bf..8b13271 100644\n' +
        '@@ -1,6 +1,8 @@\n' +
        ' class Test {\n' +
        ' \n' +
        '   def method1 = ???\n' +
        '+\n' +
        '+  def method2 = ???\n' +
        ' \n' +
        '   def myMethod = ???\n' +
        ' \n' +
        '@@ -10,7 +12,6 @@ class Test {\n' +
        ' \n' +
        '   def + = ???\n' +
        ' \n' +
        '-  def |> = ???\n' +
        ' \n' +
        ' }\n' +
        ' \n' +
        'new file mode 100644\n' +
        'index 0000000..d503a29\n' +
        'diff --git a/src/test-bar.js b/src/test-baz.js\n' +
        'similarity index 98%\n' +
        'rename from src/test-bar.js\n' +
        'rename to src/test-baz.js\n' +
        'index e01513b..f14a870 100644\n' +
        '--- a/src/test-bar.js\n' +
        '+++ b/src/test-baz.js\n' +
        '@@ -1,4 +1,32 @@\n' +
        ' function foo() {\n' +
        ' }\n' +
        ' ';
    it('should parse binary with content', () => {
        'diff --git a/favicon.png b/favicon.png\n' +
        'deleted file mode 100644\n' +
        'index 2a9d516a5647205d7be510dd0dff93a3663eff6f..0000000000000000000000000000000000000000\n' +
        'GIT binary patch\n' +
        'literal 0\n' +
        'HcmV?d00001\n' +
        '\n' +
        'literal 471\n' +
        'zcmeAS@N?(olHy`uVBq!ia0vp^0wB!61|;P_|4#%`EX7WqAsj$Z!;#Vf<Z~8yL>4nJ\n' +
        'za0`Jj<E6WGe}IBwC9V-A&PAz-C7Jno3L%-fsSJk3`UaNzMkcGzh!g=;$beJ?=ckpF\n' +
        'zCl;kLIHu$$r7E~(7NwTw7iAYKI0u`(*t4mJfq_xq)5S5wqIc=!hrWj$cv|<b{x!c(\n' +
        'z;3r#y;31Y&=1q>qPVOAS4ANVKzqmCp=Cty@U^(7zk!jHsvT~YI{F^=Ex6g|gox78w\n' +
        'z+Sn2Du3GS9U7qU`1*NYYlJi3u-!<?H-eky}wyIIL;8VU@wCDrb0``&v(jQ*DWSR4K\n' +
        'zPq(3;isEyho{emNa=%%!jDPE`l3u;5d=q=<+v8kO-=C`*G#t-*AiE-D>-_B#8k9H0\n' +
        'zGl{FnZs<2$wz5^=Q2h-1XI^s{LQL1#T4epqNPC%Orl(tD_@!*EY++~^Lt2<2&!&%=\n' +
        'z`m>(TYj6uS7jDdt=eH>iOyQg(QMR<-Fw8)Dk^ZG)XQTuzEgl{`GpS?Cfq9818R9~=\n' +
        'z{&h9@9n8F^?|qusoPy{k#%tVHzu7H$t26CR`BJZk*Ixf&u36WuS=?6m2^ho-p00i_\n' +
        'I>zopr0Nz-&lmGw#\n' +
        'diff --git a/src/test-bar.js b/src/test-baz.js\n' +
        'similarity index 98%\n' +
        'rename from src/test-bar.js\n' +
        'rename to src/test-baz.js\n' +
        'index e01513b..f14a870 100644\n' +
        '--- a/src/test-bar.js\n' +
        '+++ b/src/test-baz.js\n' +
        '@@ -1,4 +1,32 @@\n' +
        ' function foo() {\n' +
        ' }\n' +
        ' ';