import type { NextPage } from "next";
import Head from "next/head";
import { Box, Image, Heading, Text, Divider } from "@chakra-ui/react";
import NavBar from "../components/navbar/NavBar";
import NoSsr from "../components/NoSsr";
import TestimonialDiv from "../components/testimonialdiv/TestimonialDiv";
import SectionHeading from "../components/sectionheading/SectionHeading";
import WhatNextDiv from "../components/whatnextdiv/WhatNextDiv";
import Footer from "../components/footer/Footer";
import { connectToDatabase } from "../lib/mongo";
import React from "react";
import { MessengerChat } from "react-messenger-chat-plugin";
import IntroAnimation from "../components/intro/IntroAnimation";
export async function getStaticProps() {
  try {
    let { db } = await connectToDatabase("WebsiteText");

    let sections = await db
      .collection("AboutPage")
      .find({})
      .sort({ Order: 1 })
      .toArray();

    let testimonials = await db.collection("Testimonials").find({}).toArray();

    let final = [sections].concat([testimonials]);
    return {
      props: {
        text: JSON.parse(JSON.stringify(final)),
        revalidate: 60 * 60,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        text: {},
      },
    };
  }
}

type PageProps = {
  text: any[];
};

const Home: NextPage<PageProps> = (text) => {
  return (
    <>
      <Head>
        <title>Primal Printing - All your printing needs</title>
        <meta
          name="description"
          content="We’re THE student run print shop at University of Auckland. 
We offer affordable printing and binding services, providing students with course books and manuals for as little as $9.99 
By Students, For Students💯🚀"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Primal Printing New Zealand - Affordable printing services!"
        />
        <meta
          property="og:description"
          content="We offer affordable small and large scale printing in NZ for many paper products such as coursebooks, business cards, and more"
        />
        <meta property="og:url" content="https://primalprinting.co.nz" />
        <meta
          property="og:image"
          content="https://drive.google.com/uc?export=view&id=1Qz_2nuEozFbUypf4jcYApyF2KSkyiTnk"
        />
      </Head>

      <Box className="container">
        <NavBar />
        <IntroAnimation />
        <Box
          id="about"
          marginTop="10rem"
          marginBottom="3rem"
          display="flex"
          justifyContent="center"
          alignSelf="center"
          bg="white"
          w="100vw"
          padding="3rem 2rem"
          border="1px"
          borderRadius="sm"
          borderColor="brown.200"
          position="relative"
        >
          <Box
            position="absolute"
            transformOrigin="top right"
            transform="rotate(90deg)"
            right="0"
            h="70%"
            w="4.5rem"
            bgImage="binder.png"
            top="2.7rem"
            bgRepeat="no-repeat"
          ></Box>
          <Box
            padding="2rem 0"
            maxW="1000px"
            justifyContent="center"
            display="flex"
            flexDir="column"
          >
            <Heading color="brown.900" fontSize="4rem">
              About Us
            </Heading>
            <Divider borderColor="brown.900" margin="1rem 0" />
            <Box
              textAlign="center"
              display="flex"
              flexDir="column"
              gap="1.2rem"
              position="relative"
            >
              {text.text[0] &&
                text.text[0].map((item: any) => {
                  switch (item.Section) {
                    case "Heading":
                      return (
                        <Box
                          display="flex"
                          position="relative"
                          flexDir="column"
                        >
                          <Box
                            position="absolute"
                            transformOrigin="top right"
                            transform="rotate(90deg)"
                            h="100vw"
                            alignSelf="center"
                            w="4.5rem"
                            bgImage="binder.png"
                            top="5rem"
                            left="0"
                            bgRepeat="no-repeat"
                          ></Box>
                          <Heading
                            marginTop="5.4rem"
                            color="brown.900"
                            textAlign="left"
                            fontSize="3.2rem"
                          >
                            {item.Text}
                          </Heading>
                          <Divider borderColor="brown.900" margin="1rem 0" />
                        </Box>
                      );
                    case "Text":
                      return (
                        <>
                          <Text
                            key={item._id}
                            dangerouslySetInnerHTML={{
                              __html: item.Text,
                            }}
                            fontSize="xl"
                            textAlign="left"
                            fontWeight="300"
                            whiteSpace="pre-line"
                          />
                        </>
                      );
                    case "Image":
                      return (
                        <Image
                          src={item.Text}
                          key={item._id}
                          alt={"about page image"}
                          width="100%"
                          objectFit="cover"
                        />
                      );
                    default:
                      return null;
                  }
                })}
            </Box>
          </Box>
        </Box>
        {false && (
          <>
            <Box
              minHeight="16rem"
              marginTop="3rem"
              display="flex"
              flexDir="column"
              position="relative"
              justifyContent="center"
              alignItems="center"
            >
              <Box className="secheading" marginTop="3rem">
                <SectionHeading text={"Testimonials"} />
              </Box>
              <Box display="flex" alignItems="center" padding="3rem 0">
                {text.text.length > 1 && (
                  <TestimonialDiv testimonials={text.text[1]} />
                )}
              </Box>
              <Box
                position="absolute"
                bottom="5rem"
                zIndex="-1"
                width="70%"
                height="10%"
                bg="brown.700"
              />
            </Box>
          </>
        )}
        <Box>
          <WhatNextDiv />
        </Box>
        <Footer />
      </Box>

      <NoSsr>
        <MessengerChat
          pageId="104194185696145"
          themeColor={""}
          loggedInGreeting={""}
          loggedOutGreeting={""}
        />
      </NoSsr>
    </>
  );
};

export default Home;
