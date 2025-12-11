import type { Meta, StoryObj } from '@storybook/react-vite';
import { renderToStaticMarkup } from 'react-dom/server';
import { ListItem } from './ListItem';
import CSS from './ListItem.css?raw';

function extractCSSForClasses(css: string, classNames: string[]): string {
  const rules: string[] = [];
  
  classNames.forEach(className => {
    const escapedClass = className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Match basic class
    const basicRegex = new RegExp(`\\.${escapedClass}\\s*\\{[^}]*\\}`, 'gs');
    const basicMatches = css.match(basicRegex);
    if (basicMatches) {
      rules.push(...basicMatches);
    }
    
    // Match pseudo-classes (:hover, :focus, :active, etc.)
    const pseudoRegex = new RegExp(`\\.${escapedClass}:(hover|focus|active|disabled|focus-visible|focus-within|checked|visited|link|first-child|last-child|nth-child\\([^)]*\\)|not\\([^)]*\\))\\s*\\{[^}]*\\}`, 'gs');
    const pseudoMatches = css.match(pseudoRegex);
    if (pseudoMatches) {
      rules.push(...pseudoMatches);
    }
    
    // Match pseudo-elements (::before, ::after, etc.)
    const pseudoElementRegex = new RegExp(`\\.${escapedClass}::(before|after|first-letter|first-line|placeholder|selection)\\s*\\{[^}]*\\}`, 'gs');
    const pseudoElementMatches = css.match(pseudoElementRegex);
    if (pseudoElementMatches) {
      rules.push(...pseudoElementMatches);
    }
  });
  
  return rules.join('\n\n');
}

function extractClassesFromHTML(html: string): string[] {
  const classMatches = html.match(/class="([^"]*)"/g);
  if (!classMatches) return [];
  
  const allClasses = new Set<string>();
  
  classMatches.forEach(match => {
    const classes = match.replace(/class="([^"]*)"/, '$1').split(' ');
    classes.forEach(cls => {
      if (cls.trim()) {
        allClasses.add(cls.trim());
      }
    });
  });
  
  return Array.from(allClasses);
}

const meta = {
  title: 'Components/Lists/Item',
  component: ListItem,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        transform: (code: string, storyContext: any) => {
          const { args } = storyContext;
          const htmlCode = renderToStaticMarkup(ListItem(args));
          const classes = extractClassesFromHTML(htmlCode);
          const cssCode = extractCSSForClasses(CSS, classes);
          
          return `${htmlCode}

<style>
${cssCode}
</style>`;
        },
      },
    },
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

export const Default: Story = {
  args: {
    label: 'Default List Item',
  },
};

export const WithCheckbox: Story = {
  args: {
    label: 'List Item with Checkbox',
    checkbox: true,
  },
};

export const WithChevron: Story = {
  args: {
    label: 'List Item with Chevron',
    chevron: true,
  },
};

export const WithIcon: Story = {
  args: {
    label: 'List Item with Icon',
    icon: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small List Item',
    size: 'small',
  },
};

export const Active: Story = {
  args: {
    label: "Active List Item",
    active: true,
  },
};