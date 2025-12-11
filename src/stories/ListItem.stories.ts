import type { Meta, StoryObj } from '@storybook/react-vite';

import { ListItem } from './ListItem';

import CSS from './ListItem.css?raw';

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


const meta = {
  title: 'Components/Lists/Item',
  component: ListItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checkbox: { control: 'boolean' },
    chevron: { control: 'boolean' },
    icon: { control: 'boolean' },
    active: { control: 'boolean' },
    size: { control: 'select', options: ['default', 'small'] },
  },
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 'list-item',
    `list-item--${size}`,
    checkbox && 'list-item--checkbox',
    chevron && 'list-item--chevron',
    icon && 'list-item--icon',
    active && 'list-item--active',
*/
export const Default: Story = {
  args: {
    label: 'Default List Item',
    size: 'default',
    checkbox: false,
    chevron: false,
    icon: false,
    active: false,
    disabled: false
  },
 parameters: {
    css: extractCSSForClasses(CSS, ['list-item', 'list-item--default', 'list-item:hover', 'list-item:active']),
    docs: {
      source: {
        code: generateHTMLWithCSS(
          { label: 'Button' },
          ['list-item', 'list-item--default', 'list-item:hover', 'list-item:active']
        ),
      },
    },
  },
};

export const WithCheckbox: Story = {
  args: {
    label: 'List Item with Checkbox',
    checkbox: true,
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['list-item', 'list-item--default','list-item--checkbox']),
    docs: {
      source: {
        code: generateHTMLWithCSS(
          { label: 'Button' },
          ['list-item', 'list-item--default', 'list-item--checkbox']
        ),
      },
    },
  },
};

export const WithChevron: Story = {
  args: {
    label: 'List Item with Chevron',
    chevron: true,
  },
  parameters: {
    css: extractCSSForClasses(CSS, ['list-item', 'list-item--default', 'list-item--chevron']),
    docs: {
      source: {
        code: generateHTMLWithCSS(
          { label: 'Button' },
          ['list-item', 'list-item--default', 'list-item--chevron']
        ),
      },
    },
  },
};

export const WithIcon: Story = {
  args: {
    label: 'List Item with Icon',
    icon: true,
  },
    parameters: {
    css: extractCSSForClasses(CSS, ['list-item', 'list-item--default', 'list-item--icon ']),
    docs: {
      source: {
        code: generateHTMLWithCSS(
          { label: 'Button' },
          ['list-item', 'list-item--default', 'list-item--icon']
        ),
      },
    },
  },
};

export const Small: Story = {
  args: {
    label: 'Small List Item',
    size: 'small',
  },
    parameters: {
    css: extractCSSForClasses(CSS, ['list-item', 'list-item--small']),
    docs: {
      source: {
        code: generateHTMLWithCSS(
          { label: 'Button' },
          ['list-item', 'list-item--small']
        ),
      },
    },
  },
};

export const Active: Story = {
  args: {
    label: "Default List Item",
    size: "default",
    checkbox: false,
    chevron: false,
    icon: false,
    active: true,
    disabled: false
  }
};