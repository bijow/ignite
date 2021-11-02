import {
	Flex,
  Text,
  Box,
  Avatar
} from '@chakra-ui/react';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({showProfileData = true}: ProfileProps) {
  return (
    <Flex
      align="center"
    >
      {showProfileData && (
        <Box
          mr="4"
          textAlign="right"
        >
          <Text>Guilherme Cardoso</Text>
          <Text
            color="gray.300"
            fontSize="small"
          >
            contato@guilhermecardoso.dev.br
          </Text>
        </Box>
      )}
      <Avatar size="md" name="Guilherme Cardoso" src="https://github.com/lguilhermecardoso.png" />
    </Flex>
  );
}