import React from 'react'
import { useToast, Box, Heading, Text, Button, Container } from '@chakra-ui/react'

export default function Contact(){
  const toast = useToast()
  function send(){
    toast({ title: 'Message sent', description: 'Message sent successfully.', status: 'success', duration: 4000, isClosable: true, position: 'top-right' })
  }
  return (
    <Container maxW="container.md" py={6}>
      <Heading mb={4}>Contact Us</Heading>
      <Box bg="white" p={6} rounded="md" shadow="sm">
        <Text><strong>Address:</strong> 123 School Lane, City</Text>
        <Text><strong>Phone:</strong> (555) 123-4567</Text>
        <Text><strong>Email:</strong> info@school.example</Text>
  <Button mt={4} colorScheme="blue" onClick={send}>Send Message</Button>
      </Box>
    </Container>
  )
}
