import type { Meta, StoryObj } from '@storybook/react';

import ReviewCard from './review-card';

const meta = {
  component: ReviewCard,
} satisfies Meta<typeof ReviewCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    review: {
      uuid: 'some-random-uuid',
      score: 4,
      text: 'Отлично!',
      createdAt: new Date(),
      author: {
        uuid: 'some-random-uuid',
        fullname: 'Пупкин Василий Васильевич'
      }
    }
  }
};