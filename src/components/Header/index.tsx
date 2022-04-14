import { Flex } from '@cmpsr/components'
import { Profile } from './Profile'

export function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1430}
      h="20"
      mx="auto"
      mt="4"
      align="center"
      px="6"
      top="0"
      bgColor='rgba(31, 32, 41, 0.85)'
    >
      <Flex align="center" ml="auto">
        <Profile />
      </Flex>
    </Flex>
  )
}