import type { Meta, StoryObj } from '@storybook/react';

import ProfileTabs from './profile-tabs';

const meta = {
  component: ProfileTabs,
} satisfies Meta<typeof ProfileTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    path: '',
    uuid: ''
  }
};