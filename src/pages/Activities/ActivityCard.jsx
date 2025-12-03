import React from 'react'
import { useCartDispatch } from '../../context/CartContext'
import { useToast, Box, Heading, Text, HStack, Spacer, Button } from '@chakra-ui/react'

export default function ActivityCard({a}){
  const dispatch = useCartDispatch()
  const toast = useToast()
  function add(){
    dispatch({type:'ADD', payload: {id: a.id, title: a.name, price: a.price, quantity:1, option: 'activity', meta:{type:a.type}}})
    toast({ title: 'Added to cart', description: `${a.name}`, status: 'success', duration: 4000, isClosable: true, position: 'top-right' })
  }

  return (
    <Box bg="white" p={4} rounded="md" shadow="sm">
      <Heading size="md" mb={2}>{a.name}</Heading>
      <Text fontSize="sm" color="gray.600"><strong>When:</strong> {a.days.join(', ')} — {a.hours}</Text>
      <Text fontSize="sm" color="gray.600"><strong>Grades:</strong> {a.grades.join(', ')}</Text>
      <Text mt={3} mb={4}>{a.description}</Text>
      <HStack>
        <Text fontWeight={700}>${a.price}</Text>
        <Spacer />
        <Button colorScheme="blue" onClick={add}>Add to Cart</Button>
      </HStack>
    </Box>
  )
}
