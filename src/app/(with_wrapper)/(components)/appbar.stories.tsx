import type { Meta, StoryObj } from '@storybook/react';

import Appbar from './appbar';

const meta = {
  component: Appbar,
} satisfies Meta<typeof Appbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};