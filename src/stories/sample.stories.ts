import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button } from './Button';

import CSS from './button.css?raw';



// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;


function extractCSSForClasses(css: string, classNames: string[]): string {
  const rules: string[] = [];
  
  classNames.forEach(className => {
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
  const htmlCode = `<button class="${classList}">${args.label}</button>`;
  const cssCode = extractCSSForClasses(CSS, classes);
  
  return `${htmlCode}

<style>
${cssCode}
</style>`;
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
/*
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['storybook-button', 'storybook-button--primary']),
    docs: {
      source: {
        language: 'html',
                code: `<!-- HTML -->
<button class="storybook-button storybook-button--primary">Button</button>

<style>
${extractCSSForClasses(CSS, ['storybook-button', 'storybook-button--primary'])}
</style>`,
      },
    },
  },
};
*/

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['storybook-button', 'storybook-button--primary']),
    docs: {
      source: {
        code: generateHTMLWithCSS(
          { label: 'Button' },
          ['storybook-button', 'storybook-button--primary']
        ),
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['storybook-button', 'storybook-button--secondary']),
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['storybook-button', 'storybook-button.large']),
  }
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['storybook-button', 'storybook-button--small']),
  }
};
