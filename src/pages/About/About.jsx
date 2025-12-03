import React from 'react'
import { Container, Heading, VStack, Box, Text } from '@chakra-ui/react'

export default function About(){
  return (
    <Container maxW="container.lg" py={6}>
      <Heading mb={4}>About Our School</Heading>
      <VStack spacing={4} align="stretch">
        <Box bg="white" p={5} rounded="md" shadow="sm">
          <Heading size="md">Our Values</Heading>
          <Text mt={2}>We promote respect, curiosity, and responsibility. Our curriculum balances academic excellence with social-emotional learning.</Text>
        </Box>

        <Box bg="white" p={5} rounded="md" shadow="sm">
          <Heading size="md">Our Staff</Heading>
          <Text mt={2}>Our teachers are experienced, certified, and passionate. We prioritize professional development and collaborative planning.</Text>
        </Box>

        <Box bg="white" p={5} rounded="md" shadow="sm">
          <Heading size="md">Facilities</Heading>
          <Text mt={2}>Modern classrooms, science labs, a library, sports fields, and dedicated arts and technology rooms support student learning.</Text>
        </Box>

        <Box bg="white" p={5} rounded="md" shadow="sm">
          <Heading size="md">Specialties</Heading>
          <Text mt={2}>Strong STEM and language programs, plus enhanced support for students with diverse learning needs.</Text>
        </Box>

        <Box bg="white" p={5} rounded="md" shadow="sm">
          <Heading size="md">Achievements</Heading>
          <Text mt={2}>Students regularly excel in national competitions, community projects, and cultural events.</Text>
        </Box>
      </VStack>
    </Container>
  )
}
