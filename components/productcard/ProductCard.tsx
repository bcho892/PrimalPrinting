import React, { useRef, useState } from "react";
import {
  Box,
  Heading,
  Button,
  Text,
  ListItem,
  UnorderedList,
  ButtonGroup,
} from "@chakra-ui/react";
import styles from "./ProductCard.module.css";
import { StripeProduct } from "../../types/types";
import { IAddOrder } from "../../types/helper";
import QuantityPicker from "../quantitypicker/QuantityPicker";
type Props = {
  orderPackage: StripeProduct;
  image: string;
  hasButton: boolean;
  addFunction: IAddOrder;
};

export default function ProductCard({
  orderPackage,
  image,
  hasButton,
  addFunction,
}: Props) {
  const [infoOpen, setInfoOpen] = useState<boolean>(false);
  const openInfo = () => setInfoOpen(true);
  const closeInfo = () => setInfoOpen(false);
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <>
      <Box
        className={styles.productimage}
        display="flex"
        flexDir="column"
        border="1px"
        borderColor="brown.200"
        overflow="hidden"
        borderRadius="sm"
        height="fit-content"
        backgroundColor="white"
        zIndex="999"
        onClick={openInfo}
        cursor={!hasButton ? "pointer" : ""}
      >
        <Box className={styles.innersection} transition="transform 0.5s">
          <Box maxH="15rem" overflow="hidden"></Box>
          <Box gap="1rem" display="flex" flexDir="column" padding="1.5rem">
            <Heading fontWeight="400" color="brown.900">
              {orderPackage.title}
            </Heading>
            <UnorderedList>
              {orderPackage.features.map((feature, index) => {
                return <ListItem>{feature.name}</ListItem>;
              })}
            </UnorderedList>
            <Text>{orderPackage.description}</Text>
            <Box display="flex" alignItems="center">
              <Text
                color="brown.900"
                fontSize={hasButton ? "3xl" : "4xl"}
                fontWeight="500"
              >
                {orderPackage.price.toFixed(2)}
              </Text>
              <ButtonGroup marginLeft="auto">
                <QuantityPicker
                  onChange={(_, value) => {
                    setQuantity(value);
                  }}
                />
                {hasButton && (
                  <Button
                    onClick={() =>
                      addFunction(
                        orderPackage.id,
                        orderPackage.title,
                        orderPackage.priceId,
                        orderPackage.price,
                        quantity
                      )
                    }
                    borderRadius="sm"
                    variant="browned"
                    transition="background-color 0.4s"
                  >
                    Add
                  </Button>
                )}
              </ButtonGroup>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
