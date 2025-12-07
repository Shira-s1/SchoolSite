import React from 'react'
import { useCart, useCartDispatch } from '../../context/CartContext'
import { useToast, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Box, Heading, Text, HStack } from '@chakra-ui/react'

export default function CartPage(){
  const {items} = useCart()
  const dispatch = useCartDispatch()
  const toast = useToast()

  const total = items.reduce((s,i)=> s + (i.price||0) * i.quantity, 0)

  function inc(key){
    const item = items.find(i=>i.key===key)
    dispatch({type:'UPDATE_Q', payload:{key, quantity: item.quantity + 1}})
  }
  function dec(key){
    const item = items.find(i=>i.key===key)
    if(item.quantity <= 1) return
    dispatch({type:'UPDATE_Q', payload:{key, quantity: item.quantity - 1}})
  }
  function remove(key){
    dispatch({type:'REMOVE', payload: key})
    toast({ title: 'Removed', description: 'Item removed from cart', status: 'info', duration: 3000, isClosable: true, position: 'top-right' })
  }
  function proceed(){
    // Place order: show confirmation and clear cart
    if(items.length === 0){
      toast({ title: 'Cart Empty', description: 'Your cart is empty.', status: 'info', duration: 3000, isClosable: true, position: 'top-right' })
      return
    }
    toast({ title: 'Order Placed', description: 'Thank you! Your order has been placed.', status: 'success', duration: 4000, isClosable: true, position: 'top-right' })
    dispatch({type: 'CLEAR'})
  }

  return (
    <Box>
      <Heading mb={4}>My Shopping Cart</Heading>
      {items.length===0 ? <Text>Your cart is empty.</Text> : (
        <>
          <TableContainer bg="white" rounded="md" shadow="sm">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Item</Th>
                  <Th>Option</Th>
                  <Th>Price</Th>
                  <Th>Qty</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {items.map(i=> (
                  <Tr key={i.key}>
                    <Td>{i.title}</Td>
                    <Td>{i.option}</Td>
                    <Td>${(i.price||0).toFixed(2)}</Td>
                    <Td>
                      <HStack>
                        <Button size="sm" onClick={()=>dec(i.key)}>-</Button>
                        <Text>{i.quantity}</Text>
                        <Button size="sm" onClick={()=>inc(i.key)}>+</Button>
                      </HStack>
                    </Td>
                    <Td><Button size="sm" colorScheme="red" onClick={()=>remove(i.key)}>Remove</Button></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <HStack justify="space-between" mt={4}>
            <Text fontWeight={700}>Total: ${total.toFixed(2)}</Text>
            <Button colorScheme="blue" onClick={proceed}>Place Order</Button>
          </HStack>
        </>
      )}
    </Box>
  )
}
