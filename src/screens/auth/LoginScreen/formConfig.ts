import {zodResolver} from '@hookform/resolvers/zod';
import {UseFormProps} from 'react-hook-form';
import {z} from 'zod';

const schema = z.object({
  username: z.string().nonempty('Please, enter Email!').trim(),
  password: z.string().nonempty('Please, enter Password!').trim(),
});

export type FormField = z.infer<typeof schema>;

const formConfig: UseFormProps<FormField> = {
  resolver: zodResolver(schema),
  defaultValues: {
    username: '', // Nếu không sử dụng `email`, có thể loại bỏ hoặc thêm nó vào `schema`.
    password: '',
  },
};

export default formConfig;
