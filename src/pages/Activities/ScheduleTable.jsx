import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, Box, Text, TableContainer } from '@chakra-ui/react'

export default function ScheduleTable({activities}){
  const days = ['Mon','Tue','Wed','Thu','Fri']
  const map = {}
  days.forEach(d=> map[d]=[])
  activities.forEach(a=> a.days.forEach(d=> map[d].push(a)))

  return (
    <TableContainer bg="white" rounded="md" shadow="sm">
      <Table variant="simple">
        <Thead>
          <Tr>
            {days.map(d=> <Th key={d}>{d}</Th>)}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            {days.map(d=> (
              <Td key={d} verticalAlign="top">
                {map[d].map(a=> (
                  <Box key={a.id} bg="gray.50" p={3} rounded="md" mb={3}>
                    <Text fontWeight={700}>{a.name}</Text>
                    <Text fontSize="sm" color="gray.600">{a.hours} • Grades {a.grades.join(', ')}</Text>
                  </Box>
                ))}
              </Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
