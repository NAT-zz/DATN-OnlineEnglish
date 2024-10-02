import { ChevronDownIcon, PlusSquareIcon } from '@chakra-ui/icons';
import {
    Button,
    Container,
    Flex,
    HStack,
    Icon,
    Text,
    useColorMode,
} from '@chakra-ui/react';
import { LuSun } from 'react-icons/lu';
import { IoMoon } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/AuthStore';
import { LuBrainCircuit } from 'react-icons/lu';

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isAuthenticated } = useAuthStore();

    return (
        <Container maxW={'full'} height={'100px'}>
            <Flex
                h={14}
                alignItems={'center'}
                margin={1}
                flexDir={{
                    base: 'column',
                    sm: 'row',
                }}
            >
                <HStack>
                    <Icon
                        as={LuBrainCircuit}
                        boxSize={6}
                        marginTop={1}
                        color={'#7928CA'}
                    />
                    <Text
                        bgGradient="linear(to-l, #7928CA, #FF0080)"
                        bgClip="text"
                        fontSize={{ base: '22', sm: '28' }}
                    >
                        <Link to={'/'}>E-Learning</Link>
                    </Text>
                </HStack>
                <HStack spacing={2} alignItems={'center'} marginLeft={'auto'}>
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
