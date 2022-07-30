import React from 'react'
import {
    Box,
    Heading,
    Image,
    IconButton,
    ButtonGroup
} from '@chakra-ui/react'
import styles from './NavBar.module.css'
import InstagramIcon from '../Icons/InstagramIcon'
import FacebookIcon from '../Icons/FacebookIcon'
type Props = {}

export default function NavBar({ }: Props) {
    return (
        <Box
            display="flex"
            height="5rem"
            width="100vw"
            backgroundColor="white"
            position="fixed"
            top="0"
            zIndex="999"
            left="0"
            boxShadow="0 0 10px black"
            padding="0 2rem"
            alignItems="center">
            <Image
                cursor="pointer"
                height="4rem"
                width="auto"
                src='/primallogo.jpg'
                alt='logo'>
            </Image>
            <ul className={styles.navigationitems}>
                <li>
                    <Heading size="md" fontWeight="500">About</Heading>
                </li>
                <li>
                    <Heading size="md" fontWeight="500">Contact</Heading>
                </li>

            </ul>
            <ButtonGroup
                marginLeft="auto">
                <IconButton
                    icon={<InstagramIcon />}
                    aria-label='instagram'
                    variant="browned"
                />
                <IconButton
                    icon={<FacebookIcon />}
                    aria-label='facebook'
                    bgColor='brown.200'
                    variant="browned"
                />
            </ButtonGroup>
        </Box>
    )
}