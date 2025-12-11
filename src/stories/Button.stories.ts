import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button } from './Button';

import CSS from './button.css?raw';


const meta = {
  title: 'Components/Buttons/Primary',
  component: Button,
  parameters: {
     layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
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

export const Primary: Story = {
  args: {
    label: 'Button',
    leftIcon: false,
    outline: false
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['button', 'button--primary', 'button--primary:hover']),
    docs: {
      source: {
        code: generateHTMLWithCSS(
          { label: 'Button' },
          ['button', 'button--primary', 'button--primary:hover']
        ),
      },
    },
  },
};



export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['button', 'button--large']),
  }
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['button', 'button--small']),
  }
};

export const LeftIcon: Story = {
  args: {
    label: "Button",
    leftIcon: true,
    size: "medium"
  },

  parameters: {
    css: extractCSSForClasses(CSS, ["button", "button--primary", "button__icon"]),

    docs: {
      source: {
        code: generateHTMLWithCSS({
          label: "Button"
        }, ["button", "button--primary button__icon"]),
      }
    }
  }
};

export const Outline: Story = {
  args: {
    label: "Button",
    leftIcon: false,
    outline: true
  },

  parameters: {
    css: extractCSSForClasses(CSS, ["button", "button--primary", "button--primary:hover"]),

    docs: {
      source: {
        code: generateHTMLWithCSS({
          label: "Button"
        }, ["button", "button--primary", "button--primary:hover"])
      }
    }
  }
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['button', 'button--primary', 'button--primary:disabled']),
  },
};
