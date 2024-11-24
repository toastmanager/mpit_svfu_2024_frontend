import type { Meta, StoryObj } from '@storybook/react';

import ProfileActionButtons from './profile-action-buttons';

const meta = {
  component: ProfileActionButtons,
} satisfies Meta<typeof ProfileActionButtons>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};