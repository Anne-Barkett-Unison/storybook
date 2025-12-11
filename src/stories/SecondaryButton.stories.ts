import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { SecondaryButton } from './SecondaryButton';

import CSS from './Button.css?raw';


const meta = {
  title: 'Components/Buttons/Secondary',
  component: SecondaryButton,
  parameters: {
     layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof SecondaryButton>;

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

export const Secondary: Story = {
  args: {
    label: 'Button',
    leftIcon: false,
    outline: false
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['button', 'button--secondary', 'button--secondary:hover']),
    docs: {
      source: {
        code: generateHTMLWithCSS(
          { label: 'Secondary Button' },
          ['button', 'button--secondary', 'button--secondary:hover']
        ),
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Button",
    disabled: true,
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['button', 'button--secondary', 'button--secondary:disabled']),
  },
};

export const Outline: Story = {
  args: {
    label: "Button",
    leftIcon: false,
    outline: true,
    disabled: false
  },

  parameters: {
    css: extractCSSForClasses(CSS, ["button", "button--secondary", "button--secondary:hover"]),

    docs: {
      source: {
        code: generateHTMLWithCSS({
          label: "Secondary Button"
        }, ["button", "button--secondary", "button--secondary:hover"])
      }
    }
  }
};