import { Flex } from "@chakra-ui/react";
import Image from 'next/image'
import img from '../../public/logo.png'

export default function Logo() {
  return (
    <Flex
    w="100%"
    maxWidth={360}
    p="8"
    align="center"
    justify="center"
  >
    <Image
      src={img}
      alt="Logo"
    />
  </Flex>
  );
}