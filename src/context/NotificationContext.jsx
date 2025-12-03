import React, { createContext, useContext, useCallback, useEffect, useState } from 'react'

const NotificationContext = createContext()

let idCounter = 1

export function NotificationProvider({children}){
  const [toasts, setToasts] = useState([])

  const notify = useCallback((message, opts={})=>{
    const id = String(idCounter++)
    const toast = {id, message, type: opts.type || 'info', duration: opts.duration ?? 4000}
    setToasts(t=>[...t, toast])
    return id
  },[])

  const remove = useCallback((id)=>{
    setToasts(t=> t.filter(x=> x.id !== id))
  },[])

  useEffect(()=>{
    if(toasts.length===0) return
    const timers = toasts.map(t => {
      const timer = setTimeout(()=> remove(t.id), t.duration)
      return timer
    })
    return ()=> timers.forEach(clearTimeout)
  },[toasts, remove])

  return (
    <NotificationContext.Provider value={{notify, remove}}>
      {children}
      <div style={{position:'fixed',right:16,top:16,zIndex:9999,display:'flex',flexDirection:'column',gap:8}}>
        {toasts.map(t=> (
          <div key={t.id} style={{background:'white',padding:'10px 14px',borderRadius:8,boxShadow:'0 4px 12px rgba(2,6,23,0.12)',minWidth:220,borderLeft: t.type==='error'? '4px solid #ef4444' : '4px solid #0b5cff'}}>
            <div style={{fontSize:14,fontWeight:600}}>{t.type === 'error' ? 'Error' : t.type === 'success' ? 'Success' : 'Notice'}</div>
            <div style={{fontSize:13,color:'#334155',marginTop:4}}>{t.message}</div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export function useNotification(){
  return useContext(NotificationContext)
}

export default NotificationContext
