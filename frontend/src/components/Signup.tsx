import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from './ui/use-toast';

const formSchema = z
  .object({
    email: z.string().email({ message: `Invalid email: (hello@example.com)` }),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .passthrough()
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Password must match',
    path: ['confirmPassword'],
  });

const Signup = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch('http://127.0.0.1:9000/api/v1/users', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (res.status >= 400) {
        throw new Error(data.message);
      }

      toast({
        title: 'Success',
        description: data.message,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Error is of type Error
        toast({
          variant: 'destructive',
          title: 'Fail',
          description: error.message,
        });
      } else {
        // Handle other types of errors (not instances of Error)
        toast({
          variant: 'destructive',
          title: 'Unknown Error',
          description: 'An unknown error occurred.',
        });
      }
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='border p-8 max-w-[400px] w-[100%] rounded-lg flex flex-col gap-4'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='email' type='email' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='password' type='password' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder='password' type='password' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Signup;
