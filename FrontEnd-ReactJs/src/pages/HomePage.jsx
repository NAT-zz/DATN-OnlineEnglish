import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';

const HomePage = () => {
    return (
        <Container maxW="container.xl" py={12}>
            <VStack spacing={4}>
                <Text
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    bgClip="text"
                    fontSize={{ base: '22', sm: '28' }}
                    fontWeight="extrabold"
                >
                    Current
                </Text>

                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3,
                    }}
                    spacing={10}
                    w={'full'}
                ></SimpleGrid>
            </VStack>
        </Container>
    );
};

export default HomePage;
