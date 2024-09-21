import { PlusSquareIcon } from '@chakra-ui/icons';
import {
    Button,
    Container,
    Flex,
    HStack,
    Text,
    useColorMode,
} from '@chakra-ui/react';
import { LuSun } from 'react-icons/lu';
import { IoMoon } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/AuthStore';

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isAuthenticated, user } = useAuthStore();

    return (
        <Container maxW={'1140px'} px={4}>
            <Flex
                h={16}
                alignItems={'center'}
                justifyContent={'space-between'}
                flexDir={{
                    base: 'column',
                    sm: 'row',
                }}
            >
                <Text
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    bgClip="text"
                    fontSize={{ base: '22', sm: '28' }}
                    fontWeight="extrabold"
                    textTransform={'uppercase'}
                >
                    <Link to={'/'}>Product Store</Link>
                </Text>

                <HStack spacing={2} alignItems={'center'}>
                    {isAuthenticated ? (
                        <Link to={'/dashboard'}>
                            <Button>
                                <Text>Dashboard</Text>
                            </Button>
                        </Link>
                    ) : (
                        <Link to={'/signup'}>
                            <Button>
                                <Text>Sign Up</Text>
                            </Button>
                        </Link>
                    )}

                    <Link to={'/create'}>
                        <Button>
                            <PlusSquareIcon fontSize={20} />
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === 'light' ? (
                            <IoMoon />
                        ) : (
                            <LuSun fontSize={20} />
                        )}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar;
