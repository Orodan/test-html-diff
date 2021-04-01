import * as Diff from 'diff';
import * as HtmlDiff from 'htmldiff';
import * as HtmlDifferModule from 'html-differ';
import * as HtmlDifferLogger from 'html-differ/lib/logger';

import { Diff2HtmlUI } from '../../../../src/ui/js/diff2html-ui-slim';

import '../../../main.ts';
import '../../../main.css';
import 'highlight.js/styles/github.css';
import '../../../../src/ui/css/diff2html.css';
import './demo.css';

/*
 * Example URLs:
 *
 * https://github.com/rtfpessoa/diff2html/commit/7d02e67f3b3386ac5d804f974d025cd7a1165839
 * https://github.com/rtfpessoa/diff2html/pull/106
 *
 * https://gitlab.com/gitlab-org/gitlab-ce/commit/4e963fed42ad518caa7353d361a38a1250c99c41
 * https://gitlab.com/gitlab-org/gitlab-ce/merge_requests/6763
 *
 * https://bitbucket.org/atlassian/amps/commits/52c38116f12475f75af4a147b7a7685478b83eca
 * https://bitbucket.org/atlassian/amps/pull-requests/236
 */

function getHTMLElementById(id: string): HTMLElement {
  const element = document.getElementById(id);

  if (element === null) {
    throw new Error(`Could not find html element with id '${id}'`);
  }

  return element;
}

function removeInsElements(line: string): string {
  return line.replace(/(<ins[^>]*>((.|\n)*?)<\/ins>)/g, '');
}

function removeDelElements(line: string): string {
  return line.replace(/(<del[^>]*>((.|\n)*?)<\/del>)/g, '');
}

document.addEventListener('DOMContentLoaded', async () => {
  // Improves browser compatibility
  require('whatwg-fetch');

  const configuration: any = {
    outputFormat: 'side-by-side',
    matching: 'lines',
    highlight: false,
  };

  console.log('HtmlDifferModule: ', HtmlDifferModule);
  const HtmlDiffer = HtmlDifferModule.HtmlDiffer;
  console.log('HtmlDiffer: ', HtmlDiffer);

  const options = {
    ignoreAttributes: [],
    compareAttributesAsJSON: [],
    ignoreWhitespaces: true,
    ignoreComments: true,
    ignoreEndTags: false,
    ignoreDuplicateAttributes: false,
  };

  const htmlDiffer = new HtmlDiffer(options);

  const sampleA = await fetch('sampleA.html').then(res => res.text());
  const sampleB = await fetch('sampleB.html').then(res => res.text());

  const diff = htmlDiffer.diffHtml(sampleA, sampleB),
    isEqual = htmlDiffer.isEqual(sampleA, sampleB),
    res = HtmlDifferLogger.getDiffText(diff, { charsAroundDiff: 40 });

  console.log('diff: ', diff);
  console.log('isEqual:', isEqual);
  console.log('res: ', res);

  // HtmlDiffer

  const htmlDifferContainer = document.querySelector('#html-differ-container');
  if (htmlDifferContainer) htmlDifferContainer.innerHTML = res;

  // HtmlDiff

  const htmlDiffResult = HtmlDiff.default(sampleA, sampleB);
  const htmlDiffOldResult = removeInsElements(htmlDiffResult);
  const htmlDiffNewResult = removeDelElements(htmlDiffResult);

  const htmlDiffContainer = document.querySelector('#html-diff-container');
  if (htmlDiffContainer) htmlDiffContainer.innerHTML = htmlDiffResult;

  const htmlDiffOldContainer = document.querySelector('#html-diff-container-old');
  if (htmlDiffOldContainer) htmlDiffOldContainer.innerHTML = htmlDiffOldResult;

  const htmlDiffNewContainer = document.querySelector('#html-diff-container-new');
  if (htmlDiffNewContainer) htmlDiffNewContainer.innerHTML = htmlDiffNewResult;

  // Diff2Html

  const diffPatch = Diff.createTwoFilesPatch('sampleA', 'sampleB', sampleA, sampleB);
  const diffTarget = getHTMLElementById('url-diff-container');

  const diff2htmlUi = new Diff2HtmlUI(diffTarget, diffPatch, configuration);

  diff2htmlUi.diffHtml = diff2htmlUi.diffHtml
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')

    .replace(/<<del>/g, '<del><')
    .replace(/<\/del>>/g, '></del>')
    .replace(/<\/<del>/g, '<del></')

    .replace(/<<ins>/g, '<ins><')
    .replace(/<\/ins>>/g, '></ins>')
    .replace(/<\/<ins>/g, '<ins></')
    // a
    .replace(/(?<!<|<\/)a>/g, '') // Replace 'a>' by '' (and not <a> or </a>)
    // p
    .replace(/(?<!<|<\/)p>/g, '') // Replace 'p>' by '' (and not <p> or </p>)
    .replace(/(?<!<|<\/)p&gt;/g, '') // Replace 'p&gt;' by '' (and not <p> or </p>)
    // img
    .replace(/(?<!<|<\/)img>/g, '') // Replace 'img>' by '' (and not <image> or </image>)
    .replace(/(?<!<|<\/)img&gt;/g, '') // Replace 'img&gt;' by '' (and not <image> or </image>)
    // img src
    .replace(/(?<=src=".*)<del>(?=.*")/g, '') // Replace src="...<del> ..." by "..."
    .replace(/(?<=src=".*)<\/del>(?=.*")/g, '') // Replace src="...</del> ..." by "..."
    .replace(/(?<=src=".*)<ins>(?=.*")/g, '') // Replace src="...<ins> ..." by "..."
    .replace(/(?<=src=".*)<\/ins>(?=.*")/g, '') // Replace src="...</ins> ..." by "..."
    // article
    .replace(/(?<!<|<\/)article>/g, '') // Replace 'article>' by '' (and not <article> or </article>)
    .replace(/(?<!<|<\/)article&gt;/g, ''); // Replace 'article&gt;' by '' (and not <article> or </article>)
  diff2htmlUi.draw();
});
