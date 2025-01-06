import {zodResolver} from '@hookform/resolvers/zod';
import {UseFormProps} from 'react-hook-form';
import {z} from 'zod';

const schema = z.object({
  email: z.string().nonempty('Please, enter Email!').trim(),
  brithday: z.date(),
  phone: z.string().nonempty('Please, enter Phone!').trim(),
  emergencyContact: z
    .string()
    .nonempty('Please, enter Emergency Contact!')
    .trim(),
  emergencyPhone: z.string().nonempty('Please, enter Emergency Phone!').trim(),
  medicalHistory: z.boolean(),
});

export type FormField = z.infer<typeof schema>;

const formConfig: UseFormProps<FormField> = {
  resolver: zodResolver(schema),
  defaultValues: {
    email: '',
    phone: '',
    emergencyContact: '',
    emergencyPhone: '',
  },
};

export default formConfig;
