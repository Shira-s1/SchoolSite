import React from 'react'
import { HStack, Select, FormControl, FormLabel } from '@chakra-ui/react'

export default function Filters({filters, setFilters}){
  const days = ['Mon','Tue','Wed','Thu','Fri']
  const types = ['Sports','Arts','Computers','Wellness']
  const grades = [1,2,3,4,5,6]

  return (
    <HStack spacing={4} align="center">
      <FormControl maxW="180px">
        <FormLabel>Day</FormLabel>
        <Select value={filters.day} onChange={e=> setFilters({...filters, day: e.target.value})}>
          <option value="">Any</option>
          {days.map(d=> <option key={d} value={d}>{d}</option>)}
        </Select>
      </FormControl>

      <FormControl maxW="140px">
        <FormLabel>Grade</FormLabel>
        <Select value={filters.grade} onChange={e=> setFilters({...filters, grade: e.target.value})}>
          <option value="">Any</option>
          {grades.map(g=> <option key={g} value={g}>{g}</option>)}
        </Select>
      </FormControl>

      <FormControl maxW="200px">
        <FormLabel>Type</FormLabel>
        <Select value={filters.type} onChange={e=> setFilters({...filters, type: e.target.value})}>
          <option value="">Any</option>
          {types.map(t=> <option key={t} value={t}>{t}</option>)}
        </Select>
      </FormControl>
    </HStack>
  )
}
