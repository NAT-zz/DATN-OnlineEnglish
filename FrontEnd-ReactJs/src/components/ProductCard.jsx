import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useProductStore } from '../store/product';
import { useState } from 'react';

const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const textColor = useColorModeValue('gray.600', 'gray.200');
    const bg = useColorModeValue('white', 'gray.800');

    const { deleteProducts, updateProduct } = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProducts(pid);
        if (success) {
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        onClose();
        if (success) {
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            shadow={'lg'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
            bg={bg}
        >
            <Image
                src={product.image}
                alt={product.name}
                h={48}
                w="full"
                objectFit={'cover'}
            ></Image>
            <Box>
                <Heading as="h3" size="md" mb={2}>
                    {' '}
                    {product.name}
                </Heading>

                <Text
                    fontWeight={'bold'}
                    fontSize={'xl'}
                    color={textColor}
                    mb={4}
                >
                    ${product.price}
                </Text>

                <HStack spacing={2}>
                    <IconButton
                        icon={<EditIcon />}
                        onClick={onOpen}
                        colorScheme="blue"
                    ></IconButton>
                    <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => handleDeleteProduct(product._id)}
                        colorScheme="red"
                    ></IconButton>
                </HStack>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Update Product</ModalHeader>
                        <ModalCloseButton />

                        <ModalBody>
                            <VStack spacing={8}>
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
                                            onChange={(e) =>
                                                setUpdatedProduct({
                                                    ...updatedProduct,
                                                    name: e.target.value,
                                                })
                                            }
                                            value={updatedProduct.name}
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Product Price"
                                            onChange={(e) =>
                                                setUpdatedProduct({
                                                    ...updatedProduct,
                                                    price: e.target.value,
                                                })
                                            }
                                            value={updatedProduct.price}
                                        />
                                        <Input
                                            type="text"
                                            placeholder="Product Image URL"
                                            onChange={(e) =>
                                                setUpdatedProduct({
                                                    ...updatedProduct,
                                                    image: e.target.value,
                                                })
                                            }
                                            value={updatedProduct.image}
                                        />
                                        <ModalFooter>
                                            <Button
                                                colorScheme="blue"
                                                mr={3}
                                                onClick={() =>
                                                    handleUpdateProduct(
                                                        product._id,
                                                        updatedProduct,
                                                    )
                                                }
                                            >
                                                Update product
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={onClose}
                                            >
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </VStack>
                                </Box>
                            </VStack>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Box>
        </Box>
    );
};

export default ProductCard;
