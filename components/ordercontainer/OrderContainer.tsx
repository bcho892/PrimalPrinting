import { useState } from "react";
import {
    Box,
    Image,
    FormLabel,
    Input,
    Heading,
    FormControl,
    Textarea,
    List,
    ListItem,
    Button,
    useMediaQuery,
} from "@chakra-ui/react";
import ProductCard from "../productcard/ProductCard";
import UploadCard from "../uploadcard/UploadCard";
import * as pdfjs from "pdfjs-dist";
import Footer from "../footer/Footer";
// solution from https://github.com/wojtekmaj/react-pdf/issues/321
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const OrderContainer = () => {
    const [smallScreen] = useMediaQuery(`(max-width: 800px)`);
    const [uploadedPdfs, setUploadedPdfs] = useState<
        { name: string; pageCount: number }[]
    >([]);
    const handlePdfUpload = (files) => {
        const uploaded = [...uploadedPdfs];
        files.some((file: File) => {
            //file doesn't exist
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                const src = URL.createObjectURL(file);
                let pages: number = -1;
                pdfjs
                    .getDocument(src)
                    .promise.then((doc) => {
                        pages = doc.numPages;
                        uploaded.push({ name: file.name, pageCount: pages });
                    })
                    .catch(() => console.error("invalid file type"));
            }
        });
        console.log(uploaded);
        setUploadedPdfs(uploaded);
    };
    const handleFileEvent = (e) => {
        const files = Array.prototype.slice.call(e.target.files);
        handlePdfUpload(files);
    };
    return (
        <>
            <Box
                paddingTop="1rem"
                display="grid"
                columnGap="1rem"
                rowGap="1rem"
                gridTemplateColumns={smallScreen ? "1fr" : "3fr 1.5fr"}
            >
                <Box
                    bg="white"
                    padding="1rem"
                    position="relative"
                    overflowX="visible"
                >
                    <Box
                        position="absolute"
                        top="0"
                        left="-2rem"
                        h="100%"
                        w="2.8rem"
                        overflowY="hidden"
                        backgroundImage="/binder.png"
                    ></Box>
                    <Box display="flex" flexDir="column" gap="1rem">
                        <Box
                            display="grid"
                            gridTemplateColumns={
                                smallScreen ? "1fr" : "1fr 1fr"
                            }
                        >
                            <ProductCard
                                orderPackage={{
                                    title: "test",
                                    included: ["1sdasd", "2dssd"],
                                    price: 20,
                                }}
                                image=""
                                hasButton={true}
                            />
                        </Box>
                        <FormControl>
                            <Box
                                padding="0.5rem"
                                w="100%"
                                bg="brown.100"
                                borderRadius="2px"
                            >
                                <Input
                                    type="file"
                                    multiple
                                    accept="application/pdf"
                                    onChange={handleFileEvent}
                                />
                                {uploadedPdfs.map((pdf) => {
                                    return (
                                        <Box key={pdf.name} marginBottom="1rem">
                                            <UploadCard
                                                name={pdf.name}
                                                pages={pdf.pageCount}
                                            />
                                        </Box>
                                    );
                                })}
                            </Box>
                            <Box display="flex" flexDir="column" gap="1rem">
                                <Box
                                    display="grid"
                                    gridTemplateColumns="1fr 1fr"
                                    columnGap="1rem"
                                >
                                    <FormLabel>Name</FormLabel>
                                    <FormLabel>Email</FormLabel>
                                    <Input type="text" borderRadius="sm" />
                                    <Input type="email" borderRadius="sm" />
                                </Box>
                                <FormLabel>Extra requests</FormLabel>
                                <Textarea borderRadius="sm" />
                            </Box>
                        </FormControl>
                    </Box>
                </Box>
                <Box
                    w="100%"
                    bg="white"
                    h="fit-content"
                    position={smallScreen ? "relative" : "sticky"}
                    padding="1rem .5rem"
                    top={smallScreen ? "0" : "5rem"}
                >
                    <Box display="flex" flexDir="column">
                        <Heading fontSize="1.5rem" as="p">
                            Total Price
                        </Heading>
                        <List>
                            <ListItem>
                                Coursebook (Upload, 100-200 pages)
                            </ListItem>
                            <ListItem>
                                <strong>Estimated Price:</strong>
                            </ListItem>
                            <Button variant="browned">Order Now</Button>
                        </List>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
};
export default OrderContainer;