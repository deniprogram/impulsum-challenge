import Router from 'next/router';
import { Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Box, Flex, Text, Spinner } from "@cmpsr/components";
import { useEffect } from "react";
import { useQuery } from '@apollo/client'

import { Header } from "../../../components/Header";
import { GET_USERS } from "../../../graphql/queries";

export default function UserList() {
  useEffect(() => {
    const currentToken = window.localStorage.getItem('token')

    if (!currentToken){
      Router.push('/')
    }
  }, [])

  const { data, loading, error } = useQuery(GET_USERS)
  if (error) return <p>{error.message}</p>

  return (
    <Box>
      <Header />

      <Flex w="70%" my="6" maxWidth="1480" mx="auto" px="6">
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Users
            </Heading>
          </Flex>

          {
            loading && (
              <Flex justify="center">
                <Spinner />
              </Flex>
            )
          }

          {
            data?.users?.length === 0 && !loading && (
              <Flex justify="center">
                <Text color='gray.200'>No users registered yet.</Text>
              </Flex>
            )
          }

          {
            data?.users?.length > 0 && !loading && (
              <>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th color="gray.100">Name</Th>
                      <Th color="gray.100">Last Name</Th>
                      <Th color="gray.100">Email</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.users.map((user: any) => {
                      return (
                        <Tr key={user.id}>
                          <Td>
                            <Box>
                              <Text fontSize="sm" color="gray.100">{user.name}</Text>
                            </Box>
                          </Td>
                          <Td>
                            <Box>
                              <Text fontSize="sm" color="gray.100">{user.lastName}</Text>
                            </Box>
                          </Td>
                          <Td>
                            <Box>
                              <Text fontSize="sm" color="gray.100">{user.email}</Text>
                            </Box>
                          </Td>
                        </Tr>
                      )
                    })}
                  </Tbody>
                </Table>
              </>
            )
          }
        </Box>
      </Flex >
    </Box >
  )
}