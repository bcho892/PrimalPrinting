import { NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Heading, Text, List, ListItem, Divider } from "@chakra-ui/react";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import OrderContainer from "../components/ordercontainer/OrderContainer";
const OrderComplete: NextPage = () => {
    const router = useRouter();
    const orderId = router.query.orderId;
    const orderItems = JSON.parse(router.query.items);
    const sum = () => {
        let sum = 0;
        orderItems.map((item) => {
            sum += item.cost;
        });
        return sum.toFixed(2);
    };
    console.log(orderItems);
    return (
        <>
            <Box className="container">
                <NavBar />
                <Box
                    justifySelf="center"
                    marginTop="2rem"
                    maxWidth="1100px"
                    bg="white"
                    display="flex"
                    flexDir="column"
                    padding="1rem"
                >
                    <Heading textAlign="center">{orderId}</Heading>
                    <Divider margin="1rem 0" />
                    <Text textAlign="center" fontSize="1.5rem">
                        Thank you for your order, here are the details:
                    </Text>
                    <List>
                        <Box
                            display="flex"
                            flexDir="column"
                            alignItems="center"
                        >
                            {orderItems &&
                                orderItems.map((item) => {
                                    return (
                                        <ListItem
                                            fontSize="1.2rem"
                                            fontWeight="800"
                                            key={item.name}
                                        >
                                            <Box display="flex">
                                                <Text>
                                                    {item.name} x{" "}
                                                    {item.quantity}
                                                </Text>
                                                <Text marginLeft="1rem">
                                                    {item.cost}
                                                </Text>
                                            </Box>
                                        </ListItem>
                                    );
                                })}
                        </Box>
                    </List>
                    <Divider margin="1rem 0" />
                    <Text fontSize="1.5rem">Total: ${sum()}</Text>
                    <Text>
                        {" "}
                        Please transfer this to the account <strong>
                            {}
                        </strong>{" "}
                        with the reference <strong>{orderId}</strong>
                    </Text>
                </Box>
                <Footer />
            </Box>
        </>
    );
};
export default OrderComplete;