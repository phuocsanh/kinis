import {zodResolver} from '@hookform/resolvers/zod';
import {UseFormProps} from 'react-hook-form';
import {z} from 'zod';

const schema = z
  .object({
    currentPassword: z
      .string()
      .nonempty('Please, enter Current Password!')
      .trim(),
    password: z.string().nonempty('Please, enter Password!').trim(),
    confirmPassword: z
      .string()
      .nonempty('Please, enter Confirm Password!')
      .trim(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  });
export type FormField = z.infer<typeof schema>;

const formConfig: UseFormProps<FormField> = {
  resolver: zodResolver(schema),
  defaultValues: {
    currentPassword: '',
    password: '',
    confirmPassword: '',
  },
};

export default formConfig;
