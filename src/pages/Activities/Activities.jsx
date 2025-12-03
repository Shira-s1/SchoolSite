import React, { useMemo, useState } from 'react'
import { activities } from '../../data/activities'
import ActivityCard from './ActivityCard'
import ScheduleTable from './ScheduleTable'
import Filters from './Filters'

export default function Activities(){
  const [filters, setFilters] = useState({day:'', grade:'', type:''})

  const filtered = useMemo(()=>{
    return activities.filter(a=>{
      if(filters.day && !a.days.includes(filters.day)) return false
      if(filters.grade && !a.grades.includes(Number(filters.grade))) return false
      if(filters.type && a.type !== filters.type) return false
      return true
    })
  },[filters])

  return (
    <div>
      <h1>After-School Activities</h1>
      <Filters filters={filters} setFilters={setFilters} />
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:12,marginTop:12}}>
        {filtered.map(a=> <ActivityCard key={a.id} a={a} />)}
      </div>

      <h2 style={{marginTop:24}}>Weekly Schedule</h2>
      <ScheduleTable activities={activities} />
    </div>
  )
}
