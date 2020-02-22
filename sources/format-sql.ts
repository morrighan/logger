// Highlight.js
import hljs from 'highlight.js';

// Third-party modules.
import chalk from 'chalk';

hljs.configure({
    tabReplace: '\t',
    useBR: false,
    languages: [ 'sql' ]
});

const replaceSql = (match: string, className: string, keyword: string): string => {
    let replaced: string;

    switch (className) {
    case 'keyword': {
        replaced = chalk.hex('8be9fd')(keyword.toUpperCase());

        break;
    }

    case 'selector-tag':
    case 'literal':
    case 'section':
    case 'link': {
        replaced = chalk.hex('8be9fd')(keyword);

        break;
    }

    case 'string':
    case 'title':
    case 'name':
    case 'type':
    case 'attribute':
    case 'symbol':
    case 'bullet':
    case 'addition':
    case 'variable':
    case 'template-tag':
    case 'template-variable': {
        replaced = chalk.hex('f1fa8c')(keyword);

        break;
    }

    case 'comment':
    case 'quote':
    case 'deletion':
    case 'meta': {
        replaced = chalk.hex('6272a4')(keyword);

        break;
    }

    default: {
        replaced = keyword;
    }
    }

    switch (className) {
    case 'keyword':
    case 'selector-tag':
    case 'literal':
    case 'title':
    case 'section':
    case 'doctag':
    case 'type':
    case 'name':
    case 'strong': {
        replaced = chalk.bold(replaced);

        break;
    }

    case 'emphasis': {
        replaced = chalk.italic(replaced);

        break;
    }

    default: {
        //
    }
    }

    return replaced;
};

export default function formatSql(query: string): string {
    return hljs.highlight('sql', query)
        .value.replace(
            /\/span>(.+?)(<span|$)/g,
            (match, html: string, following: string) => `/span>${chalk.hex('f8f8f2')(html)}${following}`
        )
        .replace(/&lt;/g, '>')
        .replace(/&gt;/g, '<')
        .replace(/<span class="hljs-(.+?)">(.+?)<\/span>/g, replaceSql);
}
