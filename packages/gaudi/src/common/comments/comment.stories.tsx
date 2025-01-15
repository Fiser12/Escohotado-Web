import { Meta, StoryObj } from "@storybook/react/*";
import { Comment } from ".";

const meta: Meta<typeof Comment> = {
      title: "Molecules",
      component: Comment,
      parameters: {
            layout: 'centered',
            design: {
                  type: 'figspec',
                  url: '',
            },
      },
      argTypes: {
           user: { control: "text", description: "User name" },
            date: { control: "text", description: "Date of the comment" },
            comment: { control: "text", description: "Comment text" },
      },
      args: {
            user: "Sample user",
            date: "10-01-2025",
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dapibus ante. Vivamus id nulla volutpat, tincidunt augue sit amet, venenatis augue. Ut vestibulum urna eu lobortis scelerisque. Morbi pharetra, eros vel euismod vestibulum, quam justo bibendum erat, non rhoncus nunc dui non ante. Pellentesque id eleifend massa. Sed ultricies ligula eget mattis porttitor. Etiam consequat eros ex, ut accumsan nibh suscipit sed. Vivamus egestas consectetur nisi id viverra. Nullam vel venenatis ligula. Ut aliquet sit amet metus ac blandit. Aliquam in massa a metus eleifend pretium efficitur vel tellus. Quisque imperdiet, dui lacinia ultricies congue, urna risus dignissim erat, id commodo mi risus vitae sapien. Nam vestibulum eu urna sit amet porta. In iaculis viverra imperdiet. Sed convallis vehicula leo, at venenatis purus convallis id. Aliquam elementum pretium malesuada.",
      },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const CommentStory: Story = {
      name: "Comment",
};