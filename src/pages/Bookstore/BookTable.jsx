import React, { useState, useMemo } from 'react'
import { useCartDispatch } from '../../context/CartContext'
import { useToast, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Select, HStack, Text, Button, Box, VStack } from '@chakra-ui/react'

export default function BookTable({books, grade}){
  const dispatch = useCartDispatch()
  const toast = useToast()
  const [mode, setMode] = useState('purchase')
  const [grouping, setGrouping] = useState(() => {
    const map = {}
    books.forEach(b => {
      if (b.level !== undefined && b.level !== null) map[b.id] = b.level
    })
    return map
  })
  const [levelFilter, setLevelFilter] = useState('all')
  const [subjectFilter, setSubjectFilter] = useState('all')

  const levels = useMemo(() => {
    // Only include explicitly provided levels; books without a level are treated separately
    const s = new Set(books.map(b => b.level).filter(l => l !== undefined && l !== null))
    return ['all', ...Array.from(s)]
  }, [books])

  const subjects = useMemo(() => {
    const s = new Set(books.map(b => b.subject || 'General'))
    return ['all', ...Array.from(s)]
  }, [books])

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

  const visibleBooks = books.filter(b => (levelFilter === 'all' || b.level === levelFilter) && (subjectFilter === 'all' || b.subject === subjectFilter))

  return (
    <Box>
      <VStack align="stretch" spacing={4} mb={4}>
        <HStack spacing={6} align="center">
          <Text fontWeight={600}>Grade: {grade}</Text>
          <HStack>
            <Text>Purchase / Rent:</Text>
            <Select value={mode} onChange={e=>setMode(e.target.value)} w="160px">
              <option value="purchase">Purchase</option>
              <option value="rent">Rent</option>
            </Select>
          </HStack>
        </HStack>

        <HStack spacing={4} align="center">
          <Text>Filter:</Text>
          <Select value={levelFilter} onChange={e=>setLevelFilter(e.target.value)} w="200px">
            {levels.map(l => <option key={l} value={l}>{l === 'all' ? 'All Levels' : l}</option>)}
          </Select>
          <Select value={subjectFilter} onChange={e=>setSubjectFilter(e.target.value)} w="200px">
            {subjects.map(s => <option key={s} value={s}>{s === 'all' ? 'All Subjects' : s}</option>)}
          </Select>
        </HStack>
      </VStack>

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
            {visibleBooks.map(b => (
              <Tr key={b.id}>
                <Td>
                  <Text fontWeight={700}>{b.title}</Text>
                </Td>
                <Td>{b.subject}</Td>
                <Td>
                  {b.level !== undefined && b.level !== null ? (
                    <Select value={grouping[b.id] || b.level} onChange={e => setGrouping({...grouping, [b.id]: e.target.value})} w="180px">
                      {['Basic','Intermediate','Advanced','Standard'].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </Select>
                  ) : (
                    <Text color="gray.600">—</Text>
                  )}
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
