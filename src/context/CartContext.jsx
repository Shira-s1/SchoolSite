import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext()
const CartDispatchContext = createContext()

function cartReducer(state, action){
  switch(action.type){
    case 'ADD':{
      const item = action.payload
      const key = item.id + '::' + (item.option || 'default')
      const existing = state.items.find(i=>i.key===key)
      if(existing){
        return {
          ...state,
          items: state.items.map(i=> i.key===key ? {...i, quantity: i.quantity + item.quantity} : i)
        }
      }
      return {...state, items:[...state.items, {...item, key, quantity: item.quantity || 1}]}
    }
    case 'REMOVE':{
      return {...state, items: state.items.filter(i=>i.key!==action.payload)}
    }
    case 'UPDATE_Q':{
      const {key, quantity} = action.payload
      return {...state, items: state.items.map(i => i.key===key ? {...i, quantity} : i)}
    }
    case 'CLEAR': return {items:[]}
    default: return state
  }
}

export function CartProvider({children}){
  const [state, dispatch] = useReducer(cartReducer, {items:[]})
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export function useCart(){
  return useContext(CartStateContext)
}
export function useCartDispatch(){
  return useContext(CartDispatchContext)
}
