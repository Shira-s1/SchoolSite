import React, { useState } from 'react'
import { useCartDispatch } from '../../context/CartContext'
import { useToast, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Select, HStack, Text, Button, Box } from '@chakra-ui/react'

export default function BookTable({books, grade}){
  const dispatch = useCartDispatch()
  const toast = useToast()
  const [mode, setMode] = useState('purchase')
  const [grouping, setGrouping] = useState(() => {
    const map = {}
    books.forEach(b => map[b.id] = b.level || 'Basic')
    return map
  })

  function add(book){
    const selectedGrouping = grouping[book.id] || book.level || 'Basic'
    const payload = {
      id: book.id,
      title: book.title,
      price: book.price,
      option: mode,
      quantity: 1,
      meta: {subject: book.subject, grade, grouping: selectedGrouping}
    }
    dispatch({type:'ADD', payload})
    toast({ title: 'Added to cart', description: `${book.title} (${selectedGrouping})`, status: 'success', duration: 4000, isClosable: true, position: 'top-right' })
  }

  return (
    <Box>
      <HStack spacing={6} align="center" mb={4}>
        <Text fontWeight={600}>Grade: {grade}</Text>
        <HStack>
          <Text>Purchase / Rent:</Text>
          <Select value={mode} onChange={e=>setMode(e.target.value)} w="160px">
            <option value="purchase">Purchase</option>
            <option value="rent">Rent</option>
          </Select>
        </HStack>
      </HStack>

      <TableContainer bg="white" rounded="md" shadow="sm">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Subject</Th>
              <Th>Level / Grouping</Th>
              <Th>Price</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {books.map(b => (
              <Tr key={b.id}>
                <Td>
                  <Text fontWeight={700}>{b.title}</Text>
                </Td>
                <Td>{b.subject}</Td>
                <Td>
                  <Select value={grouping[b.id]} onChange={e => setGrouping({...grouping, [b.id]: e.target.value})} w="180px">
                    {['Basic','Intermediate','Advanced','Standard'].map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </Select>
                </Td>
                <Td>${b.price.toFixed(2)}</Td>
                <Td>
                  <Button colorScheme="blue" onClick={()=>add(b)}>Add to Cart</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
