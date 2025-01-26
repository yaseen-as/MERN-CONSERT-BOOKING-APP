import * as z from 'zod';

const userBodySchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email format' }),
  phoneNumber: z
    .string()
    .min(10, { message: 'Phone number must be 10 digits' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  role: z.enum(['USER', 'ADMIN']) 
});

const createUserSchema=z.object({
    body:userBodySchema
})

export default createUserSchema;