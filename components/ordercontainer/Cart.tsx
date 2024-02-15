import {
  Box,
  Button,
  Divider,
  Heading,
  Input,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { CartContext } from "../../contexts/CartContext";
import CartItem from "../../types/models/CartItem";
import QuantityPicker from "../quantitypicker/QuantityPicker";
import { useContext, useState } from "react";

type Props = {
  uploadedPdfs: any;
  setModalOpen: (value: boolean) => void;
  setUploadedPdfs: (T: any[]) => any;
  smallScreen: boolean;
  formRef: any;
};

type CartItemProps = {
  updatePrice: () => void;
};

const CartItemContainer = ({ updatePrice }: CartItemProps) => {
  const { cartPackages, removeCartPackage } = useContext(CartContext);

  return (
    <>
      {cartPackages.map((cartPackage: CartItem) => {
        return (
          <ListItem key={cartPackage.id}>
            <Box
              display="flex"
              border="1px solid"
              borderColor="brown.700"
              padding="1rem"
              borderRadius="sm"
              marginBottom=".5rem"
            >
              <Text>
                {cartPackage.displayName} |{" "}
                <strong>${cartPackage.getDisplayPrice().toFixed(2)}</strong>
              </Text>
              <Box
                marginLeft="auto"
                display="flex"
                gap="1rem"
                alignItems="center"
              >
                <QuantityPicker
                  defaultValue={cartPackage.getQuantity()}
                  onChange={(_, value) => {
                    cartPackage.setQuantity(value);
                    updatePrice();
                  }}
                />
                <Text
                  marginLeft="auto"
                  fontWeight="800"
                  cursor="pointer"
                  onClick={() => {
                    removeCartPackage(cartPackage);
                    updatePrice();
                  }}
                >
                  X
                </Text>
              </Box>
            </Box>
          </ListItem>
        );
      })}
    </>
  );
};

const Cart = ({
  uploadedPdfs,
  setModalOpen,
  setUploadedPdfs,
  smallScreen,
  formRef,
}: Props) => {
  const { cartPackages } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState<string>();
  const checkFormValidity = () => {
    const form = formRef.current;
    const formValid = form.checkValidity();
    if (!formValid) window.alert("Please check your submission details.");
    return formValid;
  };

  const checkCartValidity = () => {
    const cartValid =
      (cartPackages && cartPackages.length !== 0) ||
      (uploadedPdfs && uploadedPdfs.length !== 0);
    if (!cartValid) window.alert("Please choose a package or upload a pdf.");
    return cartValid;
  };

  const changeQuantity = (name: string, newQuantity: number): any => {
    const idx = uploadedPdfs.findIndex((pdf) => pdf.name === name);
    let temp = [...uploadedPdfs];
    temp[idx].quantity = newQuantity;
    setUploadedPdfs(temp);
  };

  const calculateTotalPrice = () => {
    let sum = 0;
    uploadedPdfs.map((pdf) => {
      sum += pdf.price;
    });
    cartPackages.map((cartPackage) => {
      sum += cartPackage.getDisplayPrice();
    });
    setTotalPrice(sum.toFixed(2));
  };
  return (
    <Box
      w="100%"
      bg="white"
      h="fit-content"
      position={smallScreen ? "relative" : "sticky"}
      padding="1rem .5rem"
      border="1px"
      color="brown.900"
      borderColor="brown.200"
      top={smallScreen ? "0" : "5rem"}
    >
      <Box display="flex" flexDir="column">
        <Heading fontSize="1.5rem" as="p">
          Total Price
        </Heading>
        <List>
          <Text fontWeight="800">Packages</Text>
          <Divider marginBottom=".5rem" />
          <CartItemContainer updatePrice={calculateTotalPrice} />
          {uploadedPdfs && (
            <>
              <Heading as="span" fontSize="1rem">
                Uploaded Files
              </Heading>
              <Divider marginBottom=".5rem" />
              {uploadedPdfs.map((pdf) => {
                return (
                  <ListItem key={pdf.name} marginBottom=".5rem">
                    <Box display="flex">
                      <Text>
                        {pdf.name} | {pdf.price * pdf.quantity}
                      </Text>
                      <Input
                        min="1"
                        max="5"
                        width=""
                        textAlign="right"
                        marginLeft="auto"
                        borderRadius="sm"
                        type="number"
                        placeholder={pdf.quantity}
                        onChange={(e) => {
                          const num = parseInt(e.target.value);
                          const min = parseInt(e.target.min);
                          const max = parseInt(e.target.max);
                          if (num > max || num < min) {
                            e.target.value = pdf.quantity;
                            return;
                          }
                          changeQuantity(pdf.name, parseInt(e.target.value));
                        }}
                      />
                    </Box>
                  </ListItem>
                );
              })}
            </>
          )}
          <ListItem>
            <Text fontSize="1.5rem">
              <strong>Estimated Price: ${totalPrice}</strong>
            </Text>
          </ListItem>
          <Button
            variant="browned"
            onClick={() => {
              if (checkCartValidity() && checkFormValidity())
                setModalOpen(true);
            }}
          >
            Order Now
          </Button>
        </List>
      </Box>
    </Box>
  );
};

export default Cart;
