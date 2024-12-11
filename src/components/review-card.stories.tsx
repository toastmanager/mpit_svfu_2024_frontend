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
      id: 'some-random-id',
      score: 4,
      text: 'Отлично!',
      createdAt: new Date(),
      author: {
        id: 'some-random-id',
        fullname: 'Пупкин Василий Васильевич'
      }
    }
  }
};