import { escape } from 'html-escaper';
import _ from 'lodash';
import markdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';

const MARKDOWN_PREFIX = /\.markdown/gi;

const markdown = markdownIt();
const dropATagAttributes = (value) => value.replace(/<a\s[\s\w="{}]*>/g, '<a>');
const replaceNewLine = (value) => value.replace(/\\n/g, '\u000a');

/**
 * Converts and sanitizes markdown content to HTML.
 * We also escape the html tags as we don't want FormatJS to build an AST for them.
 * This content will be injected as raw HTML in the UI.
 */
const processMarkdown = _.flowRight(
    escape,
    sanitizeHtml,
    markdown.render.bind(markdown),
    replaceNewLine
);

/**
 * The formatter used by FormatJS for compiling the messages.
 * @see: https://formatjs.io/docs/tooling/cli/#--format-path-1
 * @param {Object<string,string>} messages
 */
export function compile(messages) {
    const processedMessages = {};
    Object.entries(messages).forEach(([key, value]) => {
        if (!MARKDOWN_PREFIX.test(key)) {
            processedMessages[key] = dropATagAttributes(value);
        } else {
            processedMessages[key] = processMarkdown(value);
        }
    });
    return processedMessages;
}
