/**
 * @fileoverview enforce consistent line breaks inside function parentheses
 * @author Teddy Katz
 */

import { RuleTester } from 'eslint'
import { unIndent } from '../../test-utils/unindent'
import parser from '../../test-utils/fixture-parser'
import rule from './function-paren-newline'

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const LEFT_MISSING_ERROR = { messageId: 'expectedAfter', type: 'Punctuator' }
const LEFT_UNEXPECTED_ERROR = { messageId: 'unexpectedAfter', type: 'Punctuator' }
const RIGHT_MISSING_ERROR = { messageId: 'expectedBefore', type: 'Punctuator' }
const RIGHT_UNEXPECTED_ERROR = { messageId: 'unexpectedBefore', type: 'Punctuator' }
const EXPECTED_BETWEEN = { messageId: 'expectedBetween', type: 'Identifier' }

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } })

ruleTester.run('function-paren-newline', rule, {

  valid: [
    'new new Foo();',

    // multiline option (default)
    'function baz(foo, bar) {}',
    '(function(foo, bar) {});',
    '(function baz(foo, bar) {});',
    '(foo, bar) => {};',
    'foo => {};',
    'baz(foo, bar);',
    'function baz() {}',
        `
            function baz(
                foo,
                bar
            ) {}
        `,
        `
            (function(
                foo,
                bar
            ) {});
        `,
        `
            (function baz(
                foo,
                bar
            ) {});
        `,
        `
            (
                foo,
                bar
            ) => {};
        `,
        `
            baz(
                foo,
                bar
            );
        `,
        `
            baz(\`foo
                bar\`)
        `,
        'new Foo(bar, baz)',
        'new Foo',
        'new (Foo)',

        `
            (foo)
            (bar)
        `,
        `
            foo.map(value => {
              return value;
            })
        `,
        {
          code: 'function baz(foo, bar) {}',
          options: ['multiline'],
        },
        {
          code: 'async (foo, bar) => {};',
          parserOptions: { ecmaVersion: 2017 },
        },
        {
          code: `
                async (
                    foo,
                    bar
                ) => {};
            `,
          parserOptions: { ecmaVersion: 2017 },
        },
        {
          code: 'async foo => {};',
          parserOptions: { ecmaVersion: 2017 },
        },
        {
          code: 'import(source)',
          parserOptions: { ecmaVersion: 2020 },
        },
        {
          code: 'import(source\n  + ext)',
          parserOptions: { ecmaVersion: 2020 },
        },

        // multiline-arguments
        {
          code: 'function baz(foo, bar) {}',
          options: ['multiline-arguments'],
        },
        {
          code: 'function baz(foo) {}',
          options: ['multiline-arguments'],
        },
        {
          code: '(function(foo, bar) {});',
          options: ['multiline-arguments'],
        },
        {
          code: '(function(foo) {});',
          options: ['multiline-arguments'],
        },
        {
          code: '(function baz(foo, bar) {});',
          options: ['multiline-arguments'],
        },
        {
          code: '(function baz(foo) {});',
          options: ['multiline-arguments'],
        },
        {
          code: '(foo, bar) => {};',
          options: ['multiline-arguments'],
        },
        {
          code: 'foo => {};',
          options: ['multiline-arguments'],
        },
        {
          code: 'baz(foo, bar);',
          options: ['multiline-arguments'],
        },
        {
          code: 'baz(foo);',
          options: ['multiline-arguments'],
        },
        {
          code: 'function baz() {}',
          options: ['multiline-arguments'],
        },
        {
          code: `
                function baz(
                    foo,
                    bar
                ) {}
            `,
          options: ['multiline-arguments'],
        },
        {
          code: `
                function baz(
                    foo
                ) {}
            `,
          options: ['multiline-arguments'],
        },
        {
          code: `
                (function(
                    foo,
                    bar
                ) {});
            `,
          options: ['multiline-arguments'],
        },
        {
          code: `
                (function(
                    foo
                ) {});
            `,
          options: ['multiline-arguments'],
        },
        {
          code: `
                (function baz(
                    foo,
                    bar
                ) {});
            `,
          options: ['multiline-arguments'],
        },
        {
          code: `
                (function baz(
                    foo
                ) {});
            `,
          options: ['multiline-arguments'],
        },
        {
          code: `
                (
                    foo,
                    bar
                ) => {};
            `,
          options: ['multiline-arguments'],
        },
        {
          code: `
                (
                    foo
                ) => {};
            `,
          options: ['multiline-arguments'],
        },
        {
          code: `
                baz(
                    foo,
                    bar
                );
            `,
          options: ['multiline-arguments'],
        },
        {
          code: `
                baz(
                    foo
                );
            `,
          options: ['multiline-arguments'],
        },
        {
          code: `
                baz(\`foo
                    bar\`)
            `,
          options: ['multiline-arguments'],
        },
        {
          code: 'new Foo(bar, baz)',
          options: ['multiline-arguments'],
        },
        {
          code: 'new Foo(bar)',
          options: ['multiline-arguments'],
        },
        {
          code: 'new Foo',
          options: ['multiline-arguments'],
        },
        {
          code: 'new (Foo)',
          options: ['multiline-arguments'],
        },
        {
          code: 'async (foo, bar) => {};',
          options: ['multiline-arguments'],
          parserOptions: { ecmaVersion: 2017 },
        },
        {
          code: 'async (foo) => {};',
          options: ['multiline-arguments'],
          parserOptions: { ecmaVersion: 2017 },
        },
        {
          code: `
                async (
                    foo
                ) => {};
            `,
          options: ['multiline-arguments'],
          parserOptions: { ecmaVersion: 2017 },
        },
        {
          code: `
                async (
                    foo,
                    bar
                ) => {};
            `,
          options: ['multiline-arguments'],
          parserOptions: { ecmaVersion: 2017 },
        },
        {
          code: 'async foo => {};',
          options: ['multiline-arguments'],
          parserOptions: { ecmaVersion: 2017 },
        },
        {
          code: 'import(source)',
          options: ['multiline-arguments'],
          parserOptions: { ecmaVersion: 2020 },
        },
        {
          code: 'import(source\n  + ext)',
          options: ['multiline-arguments'],
          parserOptions: { ecmaVersion: 2020 },
        },

        {
          code: `
                (foo)
                (bar)
            `,
          options: ['multiline-arguments'],
        },
        {
          code: `
                foo.map(value => {
                  return value;
                })
            `,
          options: ['multiline-arguments'],
        },

        // always option
        {
          code: `
                function baz(
                    foo,
                    bar
                ) {}
            `,
          options: ['always'],
        },
        {
          code: `
                (function(
                    foo,
                    bar
                ) {});
            `,
          options: ['always'],
        },
        {
          code: `
                (function baz(
                    foo,
                    bar
                ) {});
            `,
          options: ['always'],
        },
        {
          code: `
                (
                    foo,
                    bar
                ) => {};
            `,
          options: ['always'],
        },
        {
          code: `
                baz(
                    foo,
                    bar
                );
            `,
          options: ['always'],
        },
        {
          code: `
                function baz(
                ) {}
            `,
          options: ['always'],
        },
        {
          code: `
                async (
                    foo
                ) => {};
            `,
          options: ['always'],
          parserOptions: { ecmaVersion: 2017 },
        },
        {
          code: `
                async (
                    foo,
                    bar
                ) => {};
            `,
          options: ['always'],
          parserOptions: { ecmaVersion: 2017 },
        },
        {
          code: 'async foo => {};',
          options: ['always'],
          parserOptions: { ecmaVersion: 2017 },
        },
        {
          code: 'import(\n  source\n)',
          options: ['always'],
          parserOptions: { ecmaVersion: 2020 },
        },

        // never option
        {
          code: 'function baz(foo, bar) {}',
          options: ['never'],
        },
        {
          code: '(function(foo, bar) {});',
          options: ['never'],
        },
        {
          code: '(function baz(foo, bar) {});',
          options: ['never'],
        },
        {
          code: '(foo, bar) => {};',
          options: ['never'],
        },
        {
          code: 'baz(foo, bar);',
          options: ['never'],
        },
        {
          code: 'function baz() {}',
          options: ['never'],
        },
        {
          code: 'async (foo, bar) => {};',
          options: ['never'],
          parserOptions: { ecmaVersion: 2017 },
        },
        {
          code: 'async foo => {};',
          options: ['never'],
          parserOptions: { ecmaVersion: 2017 },
        },
        {
          code: 'import(source)',
          options: ['never'],
          parserOptions: { ecmaVersion: 2020 },
        },

        // minItems option
        {
          code: 'function baz(foo, bar) {}',
          options: [{ minItems: 3 }],
        },
        {
          code: `
                function baz(
                    foo, bar, qux
                ) {}
            `,
          options: [{ minItems: 3 }],
        },
        {
          code: `
                baz(
                    foo, bar, qux
                );
            `,
          options: [{ minItems: 3 }],
        },
        {
          code: 'baz(foo, bar);',
          options: [{ minItems: 3 }],
        },
        {
          code: 'async (foo, bar) => {};',
          options: [{ minItems: 3 }],
          parserOptions: { ecmaVersion: 2017 },
        },
        {
          code: `
                async (
                    foo,
                    bar,
                    baz
                ) => {};
            `,
          options: [{ minItems: 3 }],
          parserOptions: { ecmaVersion: 2017 },
        },
        {
          code: 'async foo => {};',
          options: [{ minItems: 3 }],
          parserOptions: { ecmaVersion: 2017 },
        },
        {
          code: 'import(source)',
          options: [{ minItems: 3 }],
          parserOptions: { ecmaVersion: 2020 },
        },
        {
          code: 'import(\n  source\n)',
          options: [{ minItems: 1 }],
          parserOptions: { ecmaVersion: 2020 },
        },

        // consistent option
        {
          code: 'foo(bar, baz)',
          options: ['consistent'],
        },
        {
          code: `
                foo(bar,
                baz)
            `,
          options: ['consistent'],
        },
        {
          code: `
                foo(
                    bar, baz
                )
            `,
          options: ['consistent'],
        },
        {
          code: `
                foo(
                    bar,
                    baz
                )
            `,
          options: ['consistent'],
        },
        {
          code: 'async (foo, bar) => {};',
          options: ['consistent'],
          parserOptions: { ecmaVersion: 2017 },
        },
        {
          code: 'async foo => {};',
          options: ['consistent'],
          parserOptions: { ecmaVersion: 2017 },
        },
        {
          code: `
                async (foo,
                    bar) => {};
            `,
          options: ['consistent'],
          parserOptions: { ecmaVersion: 2017 },
        },
        {
          code: `
                async (
                    foo, bar
                ) => {};
            `,
          options: ['consistent'],
          parserOptions: { ecmaVersion: 2017 },
        },
        {
          code: `
                async (
                    foo,
                    bar
                ) => {};
            `,
          options: ['consistent'],
          parserOptions: { ecmaVersion: 2017 },
        },
        {
          code: 'import(source)',
          options: ['consistent'],
          parserOptions: { ecmaVersion: 2020 },
        },
        {
          code: 'import(\n  source\n)',
          options: ['consistent'],
          parserOptions: { ecmaVersion: 2020 },
        },

        // https://github.com/eslint/eslint/issues/15091#issuecomment-975605821
        {
          code: unIndent`
                const method6 = (
                  abc: number,
                  def: () => void,
                ): [
                  string,
                  () => void
                ] => [\`a\${abc}\`, def];
                method6(3, () => {});
            `,
          options: ['multiline'],
          parser: parser('function-paren-newline/arrow-function-return-type'),
        },
  ],

  invalid: [

    // multiline option (default)
    {
      code: `
                function baz(foo,
                    bar
                ) {}
            `,
      output: `
                function baz(\nfoo,
                    bar
                ) {}
            `,
      errors: [LEFT_MISSING_ERROR],
    },
    {
      code: `
                (function(
                    foo,
                    bar) {})
            `,
      output: `
                (function(
                    foo,
                    bar\n) {})
            `,
      errors: [RIGHT_MISSING_ERROR],
    },
    {
      code: `
                (function baz(foo,
                    bar) {})
            `,
      output: `
                (function baz(\nfoo,
                    bar\n) {})
            `,
      errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR],
    },
    {
      code: `
                baz(
                    foo, bar);
            `,
      output: `
                baz(foo, bar);
            `,
      errors: [LEFT_UNEXPECTED_ERROR],
    },
    {
      code: `
                (foo, bar
                ) => {};
            `,
      output: `
                (foo, bar) => {};
            `,
      errors: [RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                function baz(
                    foo, bar
                ) {}
            `,
      output: `
                function baz(foo, bar) {}
            `,
      errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                function baz(
                    foo =
                    1
                ) {}
            `,
      output: `
                function baz(foo =
                    1) {}
            `,
      errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                function baz(
                ) {}
            `,
      output: `
                function baz() {}
            `,
      errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                new Foo(bar,
                    baz);
            `,
      output: `
                new Foo(\nbar,
                    baz\n);
            `,
      errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR],
    },
    {
      code: `
                function baz(/* not fixed due to comment */
                foo) {}
            `,
      output: null,
      errors: [LEFT_UNEXPECTED_ERROR],
    },
    {
      code: `
                function baz(foo
                /* not fixed due to comment */) {}
            `,
      output: null,
      errors: [RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                async (
                    foo, bar
                ) => {};
            `,
      output: `
                async (foo, bar) => {};
            `,
      parserOptions: { ecmaVersion: 2017 },
      errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                async (foo, bar
                ) => {};
            `,
      output: `
                async (foo, bar) => {};
            `,
      parserOptions: { ecmaVersion: 2017 },
      errors: [RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                async (foo,
                    bar) => {};
            `,
      output: `
                async (\nfoo,
                    bar\n) => {};
            `,
      parserOptions: { ecmaVersion: 2017 },
      errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR],
    },
    {
      code: `
                async (
                    foo,
                    bar) => {};
            `,
      output: `
                async (
                    foo,
                    bar\n) => {};
            `,
      parserOptions: { ecmaVersion: 2017 },
      errors: [RIGHT_MISSING_ERROR],
    },
    {
      code: 'import(\n  source\n)',
      output: 'import(source)',
      parserOptions: { ecmaVersion: 2020 },
      errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR],
    },

    // multiline-arguments
    {
      code: `
                function baz(foo,
                    bar
                ) {}
            `,
      output: `
                function baz(\nfoo,
                    bar
                ) {}
            `,
      options: ['multiline-arguments'],
      errors: [LEFT_MISSING_ERROR],
    },
    {
      code: `
                (function(
                    foo,
                    bar) {})
            `,
      output: `
                (function(
                    foo,
                    bar\n) {})
            `,
      options: ['multiline-arguments'],
      errors: [RIGHT_MISSING_ERROR],
    },
    {
      code: `
                (function baz(foo,
                    bar) {})
            `,
      output: `
                (function baz(\nfoo,
                    bar\n) {})
            `,
      options: ['multiline-arguments'],
      errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR],
    },
    {
      code: `
                baz(
                    foo, bar);
            `,
      output: `
                baz(foo, bar);
            `,
      options: ['multiline-arguments'],
      errors: [LEFT_UNEXPECTED_ERROR],
    },
    {
      code: `
                (foo, bar
                ) => {};
            `,
      output: `
                (foo, bar) => {};
            `,
      options: ['multiline-arguments'],
      errors: [RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                function baz(
                    foo, bar
                ) {}
            `,
      output: `
                function baz(foo, bar) {}
            `,
      options: ['multiline-arguments'],
      errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                function baz(
                ) {}
            `,
      output: `
                function baz() {}
            `,
      options: ['multiline-arguments'],
      errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                new Foo(bar,
                    baz);
            `,
      output: `
                new Foo(\nbar,
                    baz\n);
            `,
      options: ['multiline-arguments'],
      errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR],
    },
    {
      code: `
                function baz(/* not fixed due to comment */
                foo) {}
            `,
      output: `
                function baz(/* not fixed due to comment */
                foo\n) {}
            `,
      options: ['multiline-arguments'],
      errors: [RIGHT_MISSING_ERROR],
    },
    {
      code: `
                function baz(foo
                /* not fixed due to comment */) {}
            `,
      output: null,
      options: ['multiline-arguments'],
      errors: [RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                function baz(
                    qwe,
                    foo, bar
                ) {}
            `,
      output: `
                function baz(
                    qwe,
                    foo, \nbar
                ) {}
            `,
      options: ['multiline-arguments'],
      errors: [EXPECTED_BETWEEN],
    },
    {
      code: `
                function baz(
                    qwe, foo,
                    bar
                ) {}
            `,
      output: `
                function baz(
                    qwe, \nfoo,
                    bar
                ) {}
            `,
      options: ['multiline-arguments'],
      errors: [EXPECTED_BETWEEN],
    },
    {
      code: `
                function baz(qwe, foo,
                    bar) {}
            `,
      output: `
                function baz(\nqwe, \nfoo,
                    bar\n) {}
            `,
      options: ['multiline-arguments'],
      errors: [LEFT_MISSING_ERROR, EXPECTED_BETWEEN, RIGHT_MISSING_ERROR],
    },
    {
      code: `
                baz(
                    foo);
            `,
      output: `
                baz(
                    foo\n);
            `,
      options: ['multiline-arguments'],
      errors: [RIGHT_MISSING_ERROR],
    },
    {
      code: `
                baz(foo
                    );
            `,
      output: `
                baz(foo);
            `,
      options: ['multiline-arguments'],
      errors: [RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                async (foo, bar
                ) => {};
            `,
      output: `
                async (foo, bar) => {};
            `,
      options: ['multiline-arguments'],
      parserOptions: { ecmaVersion: 2017 },
      errors: [RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                async (foo,
                    bar) => {};
            `,
      output: `
                async (\nfoo,
                    bar\n) => {};
            `,
      options: ['multiline-arguments'],
      parserOptions: { ecmaVersion: 2017 },
      errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR],
    },
    {
      code: `
                async (
                    foo,
                    bar) => {};
            `,
      output: `
                async (
                    foo,
                    bar\n) => {};
            `,
      options: ['multiline-arguments'],
      parserOptions: { ecmaVersion: 2017 },
      errors: [RIGHT_MISSING_ERROR],
    },
    {
      code: 'import(source\n)',
      output: 'import(source)',
      options: ['multiline-arguments'],
      parserOptions: { ecmaVersion: 2020 },
      errors: [RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: 'import(\n  source)',
      output: 'import(\n  source\n)',
      options: ['multiline-arguments'],
      parserOptions: { ecmaVersion: 2020 },
      errors: [RIGHT_MISSING_ERROR],
    },

    // always option
    {
      code: `
                function baz(foo,
                    bar
                ) {}
            `,
      output: `
                function baz(\nfoo,
                    bar
                ) {}
            `,
      options: ['always'],
      errors: [LEFT_MISSING_ERROR],
    },
    {
      code: `
                (function(
                    foo,
                    bar) {})
            `,
      output: `
                (function(
                    foo,
                    bar\n) {})
            `,
      options: ['always'],
      errors: [RIGHT_MISSING_ERROR],
    },
    {
      code: `
                (function baz(foo,
                    bar) {})
            `,
      output: `
                (function baz(\nfoo,
                    bar\n) {})
            `,
      options: ['always'],
      errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR],
    },
    {
      code: 'function baz(foo, bar) {}',
      output: 'function baz(\nfoo, bar\n) {}',
      options: ['always'],
      errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR],
    },
    {
      code: '(function(foo, bar) {});',
      output: '(function(\nfoo, bar\n) {});',
      options: ['always'],
      errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR],
    },
    {
      code: '(function baz(foo, bar) {});',
      output: '(function baz(\nfoo, bar\n) {});',
      options: ['always'],
      errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR],
    },
    {
      code: '(foo, bar) => {};',
      output: '(\nfoo, bar\n) => {};',
      options: ['always'],
      errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR],
    },
    {
      code: 'baz(foo, bar);',
      output: 'baz(\nfoo, bar\n);',
      options: ['always'],
      errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR],
    },
    {
      code: 'function baz() {}',
      output: 'function baz(\n) {}',
      options: ['always'],
      errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR],
    },
    {
      code: `
                async (foo, bar) => {};
            `,
      output: `
                async (\nfoo, bar\n) => {};
            `,
      options: ['always'],
      parserOptions: { ecmaVersion: 2017 },
      errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR],
    },
    {
      code: `
                async (foo,
                    bar) => {};
            `,
      output: `
                async (\nfoo,
                    bar\n) => {};
            `,
      options: ['always'],
      parserOptions: { ecmaVersion: 2017 },
      errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR],
    },
    {
      code: `
                async (
                    foo,
                    bar) => {};
            `,
      output: `
                async (
                    foo,
                    bar\n) => {};
            `,
      options: ['always'],
      parserOptions: { ecmaVersion: 2017 },
      errors: [RIGHT_MISSING_ERROR],
    },
    {
      code: 'import(source)',
      output: 'import(\nsource\n)',
      options: ['always'],
      parserOptions: { ecmaVersion: 2020 },
      errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR],
    },

    // never option
    {
      code: `
                function baz(foo,
                    bar
                ) {}
            `,
      output: `
                function baz(foo,
                    bar) {}
            `,
      options: ['never'],
      errors: [RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                (function(
                    foo,
                    bar) {})
            `,
      output: `
                (function(foo,
                    bar) {})
            `,
      options: ['never'],
      errors: [LEFT_UNEXPECTED_ERROR],
    },
    {
      code: `
                new new C()(
                );
            `,
      output: `
                new new C()();
            `,
      options: ['never'],
      errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR],
    },

    {
      code: `
                function baz(
                    foo,
                    bar
                ) {}
            `,
      output: `
                function baz(foo,
                    bar) {}
            `,
      options: ['never'],
      errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                (function(
                    foo,
                    bar
                ) {});
            `,
      output: `
                (function(foo,
                    bar) {});
            `,
      options: ['never'],
      errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                (function baz(
                    foo,
                    bar
                ) {});
            `,
      output: `
                (function baz(foo,
                    bar) {});
            `,
      options: ['never'],
      errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                (
                    foo,
                    bar
                ) => {};
            `,
      output: `
                (foo,
                    bar) => {};
            `,
      options: ['never'],
      errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                baz(
                    foo,
                    bar
                );
            `,
      output: `
                baz(foo,
                    bar);
            `,
      options: ['never'],
      errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                function baz(
                ) {}
            `,
      output: `
                function baz() {}
            `,
      options: ['never'],
      errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                async (
                    foo,
                    bar
                ) => {};
            `,
      output: `
                async (foo,
                    bar) => {};
            `,
      options: ['never'],
      parserOptions: { ecmaVersion: 2017 },
      errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                async (
                    foo,
                    bar) => {};
            `,
      output: `
                async (foo,
                    bar) => {};
            `,
      options: ['never'],
      parserOptions: { ecmaVersion: 2017 },
      errors: [LEFT_UNEXPECTED_ERROR],
    },
    {
      code: 'import(\n  source\n)',
      output: 'import(source)',
      options: ['never'],
      parserOptions: { ecmaVersion: 2020 },
      errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR],
    },

    // minItems option
    {
      code: 'function baz(foo, bar, qux) {}',
      output: 'function baz(\nfoo, bar, qux\n) {}',
      options: [{ minItems: 3 }],
      errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR],
    },
    {
      code: `
                function baz(
                    foo, bar
                ) {}
            `,
      output: `
                function baz(foo, bar) {}
            `,
      options: [{ minItems: 3 }],
      errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: 'baz(foo, bar, qux);',
      output: 'baz(\nfoo, bar, qux\n);',
      options: [{ minItems: 3 }],
      errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR],
    },
    {
      code: `
                baz(
                    foo,
                    bar
                );
            `,
      output: `
                baz(foo,
                    bar);
            `,
      options: [{ minItems: 3 }],
      errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                async (
                    foo,
                    bar
                ) => {};
            `,
      output: `
                async (foo,
                    bar) => {};
            `,
      options: [{ minItems: 3 }],
      parserOptions: { ecmaVersion: 2017 },
      errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                async (
                    foo,
                    bar) => {};
            `,
      output: `
                async (foo,
                    bar) => {};
            `,
      options: [{ minItems: 3 }],
      parserOptions: { ecmaVersion: 2017 },
      errors: [LEFT_UNEXPECTED_ERROR],
    },
    {
      code: `
                async (foo, bar, baz) => {};
            `,
      output: `
                async (\nfoo, bar, baz\n) => {};
            `,
      options: [{ minItems: 3 }],
      parserOptions: { ecmaVersion: 2017 },
      errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR],
    },
    {
      code: 'import(\n  source\n)',
      output: 'import(source)',
      options: [{ minItems: 3 }],
      parserOptions: { ecmaVersion: 2020 },
      errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: 'import(source)',
      output: 'import(\nsource\n)',
      options: [{ minItems: 1 }],
      parserOptions: { ecmaVersion: 2020 },
      errors: [LEFT_MISSING_ERROR, RIGHT_MISSING_ERROR],
    },

    // consistent option
    {
      code: `
                foo(
                    bar,
                    baz)
            `,
      output: `
                foo(
                    bar,
                    baz\n)
            `,
      options: ['consistent'],
      errors: [RIGHT_MISSING_ERROR],
    },
    {
      code: `
                foo(bar,
                    baz
                )
            `,
      output: `
                foo(bar,
                    baz)
            `,
      options: ['consistent'],
      errors: [RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: `
                async (
                    foo,
                    bar) => {};
            `,
      output: `
                async (
                    foo,
                    bar\n) => {};
            `,
      options: ['consistent'],
      parserOptions: { ecmaVersion: 2017 },
      errors: [RIGHT_MISSING_ERROR],
    },
    {
      code: `
                async (foo,
                    bar
                ) => {};
            `,
      output: `
                async (foo,
                    bar) => {};
            `,
      options: ['consistent'],
      parserOptions: { ecmaVersion: 2017 },
      errors: [RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: 'import(source\n)',
      output: 'import(source)',
      options: ['consistent'],
      parserOptions: { ecmaVersion: 2020 },
      errors: [RIGHT_UNEXPECTED_ERROR],
    },
    {
      code: 'import(\n  source)',
      output: 'import(\n  source\n)',
      options: ['consistent'],
      parserOptions: { ecmaVersion: 2020 },
      errors: [RIGHT_MISSING_ERROR],
    },

    // https://github.com/eslint/eslint/issues/15091#issuecomment-975605821
    {
      code: unIndent`
                const method6 = (
                  abc: number,
                  def: () => void,
                ): [
                  string,
                  () => void
                ] => [\`a\${abc}\`, def];
                method6(3, () => {});
            `,
      output: unIndent`
                const method6 = (abc: number,
                  def: () => void,): [
                  string,
                  () => void
                ] => [\`a\${abc}\`, def];
                method6(3, () => {});
            `,
      options: ['never'],
      parser: parser('function-paren-newline/arrow-function-return-type'),
      errors: [LEFT_UNEXPECTED_ERROR, RIGHT_UNEXPECTED_ERROR],
    },
  ],
})
