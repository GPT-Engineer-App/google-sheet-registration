import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack, useToast } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Submit to Google Sheets (the URL should be the one provided by your Google Apps Script deployment)
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
          title: "Registration Successful",
          description: "You've been registered successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Registration Error",
          description: "There was an issue with your registration.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.error("Error!", error.message);
      });
  };

  return (
    <Box p={8}>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="message">Message</FormLabel>
          <Input id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Enter a message (optional)" />
        </FormControl>
        <Button leftIcon={<FaGoogle />} colorScheme="teal" type="submit">
          Register
        </Button>
      </VStack>
    </Box>
  );
};

export default Index;
