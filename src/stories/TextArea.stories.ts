import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextArea } from './TextArea';
import CSS from './TextArea.css?raw';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

function extractCSSForClasses(css: string, classNames: string[]): string {
  const rules: string[] = [];

  classNames.forEach((className) => {
    const escapedClass = className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\.${escapedClass}\\s*\\{[^}]*\\}`, 'gs');
    const matches = css.match(regex);
    if (matches) {
      rules.push(...matches);
    }
  });
  return rules.join('\n\n');
}

function generateHTMLWithCSS(args: any, classes: string[]) {
  const classList = classes.join(' ');
  const htmlCode = `<textarea class="${classList}" placeholder="${args.placeholder || ''}"></textarea>`;
  const cssCode = extractCSSForClasses(CSS, classes);

  return `${htmlCode}

<style>
${cssCode}
</style>`;
}

export const Default: Story = {
  args: {
    label: 'Default TextArea',
    placeholder: 'Enter your text here...',
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['textarea']),
    docs: {
      source: {
        code: generateHTMLWithCSS(
          { placeholder: 'Enter your text here...' },
          ['textarea']
        ),
      },
    },
  },
};

export const WithError: Story = {
  args: {
    label: 'TextArea with Error',
    placeholder: 'Enter your text here...',
    error: true,
    errorMessage: 'This field is required.',
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['textarea', 'textarea--error']),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled TextArea',
    placeholder: 'This field is disabled',
    disabled: true,
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['textarea', 'textarea--disabled']),
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'TextArea with Helper Text',
    placeholder: 'Enter your text here...',
    helperText: 'This is some helper text.',
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['textarea', 'textarea__helper-text']),
  },
};