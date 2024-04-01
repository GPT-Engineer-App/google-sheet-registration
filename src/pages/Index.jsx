import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack, Text, useToast } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const scriptURL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";

    fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast({
          title: isSignUp ? "Registration Successful" : "Sign In Successful",
          description: isSignUp ? "You've been registered successfully!" : "You've signed in successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: isSignUp ? "Registration Error" : "Sign In Error",
          description: isSignUp ? "There was an issue with your registration." : "There was an issue signing in.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.error("Error!", error.message);
      });
  };

  return (
    <Box p={8} maxW="2xl" mx="auto">
      <Text fontSize="4xl" mb={6} textAlign="center" color="purple.500">
        Registration Form
      </Text>
      <Box boxShadow="2xl" p="6" rounded="md" bg="white">
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          {isSignUp && (
            <FormControl isRequired>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" />
            </FormControl>
          )}
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Enter your password" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="message">Message</FormLabel>
            <Input id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Enter a message (optional)" />
          </FormControl>
          <Button leftIcon={<FaGoogle />} colorScheme="blue" color="white" type="submit">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Button variant="link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Index;
