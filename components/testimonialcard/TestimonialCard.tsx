import {
    Box,
    Heading,
    Text,
    Image,
    Button,
} from '@chakra-ui/react'
import {
    ExternalLinkIcon
} from '@chakra-ui/icons'
import { infoStructure } from '../../contexts/types'
type Props = {
    toDisplay: infoStructure;
}

export default function TestimonialCard({ toDisplay }: Props) {
    return (
        <Box
            maxWidth="800px"
            display="flex"
            flexDir="column"
            justifyContent="center"
            textAlign="left"
            margin="3rem 0"
            padding="0 1rem"
            borderColor="brown.900"
            position="relative"
            zIndex="999"
        >
            <Box
                padding={{ base: "1rem", lg: "1rem 4rem" }}
                display="flex"
                flexDir="column"
                gap="2rem"
            >
                <Image
                    position="absolute"
                    zIndex="-1"
                    src="quoteicon.png"
                    height="4rem"
                    width="6.5rem"
                    opacity="0.1"
                    top="0"
                    left="2rem"
                    transform="scaleX(-1)"
                />
                <Heading
                    fontWeight="500"
                >
                    {toDisplay.title}
                </Heading>
                <Text
                    fontSize="lg"
                    fontWeight="300">
                    {toDisplay.description}
                </Text>
                <Box display="flex"
                    alignItems="center">
                    <Button
                        leftIcon={<ExternalLinkIcon />}
                        width="8rem"
                        variant="browned">
                        See More
                    </Button>
                    <Heading
                        marginLeft="auto"
                        fontWeight="400"
                        size="sm"
                        textAlign="right">
                        -Yeddy yang
                    </Heading>

                </Box>
            </Box>
        </Box>
    )
}