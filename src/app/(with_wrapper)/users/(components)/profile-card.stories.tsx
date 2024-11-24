import type { Meta, StoryObj } from '@storybook/react';

import ProfileCard from './profile-card';

const meta = {
  component: ProfileCard,
} satisfies Meta<typeof ProfileCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    user: {
      uuid: 'some-random-uuid',
      fullname: 'Пупкин Василий',
    }
  }
};