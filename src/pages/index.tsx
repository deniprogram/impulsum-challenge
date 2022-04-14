import * as yup from 'yup';
import { Stack } from '@chakra-ui/react';
import { Button, Flex } from '@cmpsr/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from "next/link";

import Logo from '../components/Header/Logo';
import { Input } from '../components/Form/Input';
import { AuthContext } from '../contexts/AuthContext';

type signInFormData = {
  email: string;
  password: string;
}

const signFormSchema = yup.object().shape({
  email: yup.string().required('E-mail required').email('E-mail invalid'),
  password: yup.string().required('Password required')
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signFormSchema)
  });

  const { login } = useContext(AuthContext)

  const { errors } = formState;

  const handleSignIn: SubmitHandler<any> = async (values: signInFormData) => {
    await login({ variables: { ...values }});
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      flexDir="column"
    >      
      <Logo />
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.700"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            type="email"
            label="E-mail"
            {...register("email")}
            error={errors.email}
          />

          <Input
            type="password"
            label="Password"
            {...register("password")}
            error={errors.password}
          />
        </Stack>
        <Button type="submit" mt="6" size="l" isLoading={formState.isSubmitting} id="buttonLogin">Log in</Button>
        <Link passHref href='/admin/users/create'>
          <Button colorScheme="whiteAlpha" mt="6" size="l" variant='accent' id="button-sign-up">
            Sign up
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}
