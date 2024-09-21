import {
    Box,
    Button,
    Container,
    Heading,
    Input,
    useColorModeValue,
    useToast,
    VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        image: '',
    });
    const toast = useToast();
    const { createProduct } = useProductStore();

    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct);
        if (!success) {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } else
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

        setNewProduct({
            name: '',
            price: '',
            image: '',
        });
    };

    return (
        <Container maxW={'container.sm'}>
            <VStack spacing={8}>
                <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>
                    Create new Product
                </Heading>
                <Box
                    w={'full'}
                    bg={useColorModeValue('white', 'grey.800')}
                    p={6}
                    rounded={'lg'}
                    shadow={'md'}
                >
                    <VStack spacing={4}>
                        <Input
                            type="text"
                            placeholder="Product Name"
                            value={newProduct.name}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    name: e.target.value,
                                })
                            }
                        />
                        <Input
                            type="number"
                            placeholder="Product Price"
                            value={newProduct.price}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    price: e.target.value,
                                })
                            }
                        />
                        <Input
                            type="text"
                            placeholder="Product Image URL"
                            value={newProduct.image}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    image: e.target.value,
                                })
                            }
                        />
                        <Button
                            colorScheme="blue"
                            onClick={handleAddProduct}
                            w={'full'}
                        >
                            Add product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreatePage;
