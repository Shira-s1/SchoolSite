import React from 'react'
import { FormControl, FormLabel, Select } from '@chakra-ui/react'

export default function GradeSelector({grades, selected, onChange}){
  return (
    <FormControl mb={4} maxW="360px">
      <FormLabel>Select Grade / Class</FormLabel>
      <Select placeholder="-- choose --" value={selected||''} onChange={e=> onChange(e.target.value)}>
        {grades.map(g=> <option key={g} value={g}>{g}</option>)}
      </Select>
    </FormControl>
  )
}
