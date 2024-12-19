// Chakra imports
import { Flex, Text, Image, useColorModeValue, Box } from '@chakra-ui/react';
import Link from 'next/link';

// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
  // Use useColorModeValue to set logoColor with the gradient
  let logoColor = useColorModeValue('navy.700', 'white');
  return (
    <Flex alignItems="center" flexDirection="column">
      <Link href="/user/home" passHref>
        <Box as="a" cursor="pointer">
          <HorizonLogo h="80px" w="80px" color={logoColor} />
        </Box>
      </Link>
      <Link href="/user/home" passHref>
        <Text as="a" fontSize="3xl" fontWeight="bold" cursor="pointer">
          Geekhaven Events
        </Text>
      </Link>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
