import { Avatar, Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function Profile() {
  const { user, signOut } = useContext(AuthContext);
  return (
    <Flex align="center">
      <Menu>
        <MenuButton><Avatar size="md" name={user.name} /></MenuButton>
        <MenuList>
          <MenuItem color={'blackAlpha.700'} onClick={signOut}>Sing out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}