import type { Meta, StoryObj } from '@storybook/react';
import PlacesSection from './places-section';

const meta = {
  component: PlacesSection,
} satisfies Meta<typeof PlacesSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    places: [
      {
        id: 1,
        title: 'Ленские столбы',
        region: 'Хангаласский район',
        description: 'Ленские столбы — это горная вершина, расположенная на берегу реки Лена. На вершине горы есть смотровая площадка, откуда открывается вид на реку и окрестности.',
        imageUrls: ['https://chuchuna.ru/wp-content/uploads/2021/06/z4qobkxvxsi-2048x1024-1-1.jpg']
      },
      {
        id: 2,
        title: 'Ленские столбы',
        region: 'Хангаласский район',
        description: 'Ленские столбы — это горная вершина, расположенная на берегу реки Лена. На вершине горы есть смотровая площадка, откуда открывается вид на реку и окрестности.',
        imageUrls: ['https://chuchuna.ru/wp-content/uploads/2021/06/z4qobkxvxsi-2048x1024-1-1.jpg']
      },
      {
        id: 3,
        title: 'Ленские столбы',
        region: 'Хангаласский район',
        description: 'Ленские столбы — это горная вершина, расположенная на берегу реки Лена. На вершине горы есть смотровая площадка, откуда открывается вид на реку и окрестности.',
        imageUrls: ['https://chuchuna.ru/wp-content/uploads/2021/06/z4qobkxvxsi-2048x1024-1-1.jpg']
      }
    ]
  }
};