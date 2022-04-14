import * as yup from 'yup';
import Link from "next/link";
import { useContext } from 'react';
import { Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { Box, Button, Divider, Flex } from "@cmpsr/components";

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Input } from "../../../components/Form/Input";
import { AuthContext } from '../../../contexts/AuthContext';

const CreateUserSchema = yup.object().shape({
  name: yup.string().required('Noma required'),
  email: yup.string().required('E-mail required').email('E-mail invalid'),
  lastName: yup.string().required('Last name required')
})

export default function CreateUser() {
  const { newUser } = useContext(AuthContext)

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(CreateUserSchema)
  })

  const handleCreateUser: SubmitHandler<any> = async (values) => {
    await newUser({ variables: { ...values }})
  }

  const { errors } = formState;

  return (
    <Box>
      <Flex w="70%" my="6" maxWidth="1480" mx="auto" px="6">
        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal" >Create user</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                label="First name"
                {...register("name")}
                error={errors.name}
              />

              <Input
                label="Last name"
                {...register("lastName")}
                error={errors.lastName}
              />     
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                label="E-mail"
                type="email"
                {...register("email")}
                error={errors.email}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack>
              <Link href="/" passHref>
                <Button colorScheme="whiteAlpha" id="cancelNewUserButton">
                  Cancel
                </Button>
              </Link>
              <Button
                variant="accent"
                type="submit"
                colorScheme="green"
                isLoading={formState.isSubmitting}
                id="saveUserButton"
              >
                Save
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}