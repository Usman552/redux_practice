import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductCard } from "./ProductCard";
const meta = {
  title: "Components/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",

    viewport: {
      defaultViewport: "desktop",
    },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <ProductCard {...args} />
    </div>
  ),
  args: {
    product: {
      id: 1,
      title: "Test Product",
      price: 100,
      description: "Test description",
      category: "test",
      image: "/test.jpg",
    },
  },
};
