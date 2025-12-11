import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { TextField } from './TextField';

import CSS from './textfield.css?raw';


const meta = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
  },
  args: { 
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof TextField>;

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
  const htmlCode = `<input class="${classList}" placeholder="${args.placeholder || ''}" />`;
  const cssCode = extractCSSForClasses(CSS, classes);
  
  return `${htmlCode}

<style>
${cssCode}
</style>`;
}

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    label: 'Default Text Field',
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['textfield', 'textfield--medium']),
    docs: {
      source: {
        code: generateHTMLWithCSS(
          { placeholder: 'Enter text...' },
          ['textfield', 'textfield--medium']
        ),
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    placeholder: 'Small input',
    label: 'Small Size',
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['textfield', 'textfield--small']),
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    placeholder: 'Large input',
    label: 'Large Size',
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['textfield', 'textfield--large']),
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['textfield', 'textfield--medium']),
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    label: 'Disabled Field',
    disabled: true,
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['textfield', 'textfield--disabled']),
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
    error: true,
    errorMessage: 'Please enter a valid email address',
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['textfield', 'textfield--error', 'textfield__error-message']),
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    helperText: 'Choose a unique username between 3-20 characters',
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['textfield', 'textfield__helper-text']),
  },
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'John Doe',
    required: true,
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['textfield', 'textfield__required']),
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leftIcon: true,
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['textfield', 'textfield--with-left-icon', 'textfield__icon']),
    docs: {
      source: {
        code: generateHTMLWithCSS(
          { placeholder: 'Search...' },
          ['textfield', 'textfield--with-left-icon', 'textfield__icon']
        ),
      },
    },
  },
};