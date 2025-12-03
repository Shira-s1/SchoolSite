import React from 'react'
import { NavLink } from 'react-router-dom'
import { Box, HStack, Text, Spacer, Link, IconButton } from '@chakra-ui/react'
import { FaShoppingCart } from 'react-icons/fa'

export default function NavBar(){
  const NavItem = ({to, children}) => (
    <Link as={NavLink} to={to} px={3} py={2} rounded="md" _activeLink={{color:'blue.600', fontWeight:600}} _hover={{textDecoration:'none', bg:'gray.50'}}>
      {children}
    </Link>
  )

  return (
    <Box>
      <HStack spacing={6} align="center" py={4}>
        <Text fontWeight={700} color="blue.600" fontSize="lg">SchoolSite</Text>
        <NavItem to="/about">About the School</NavItem>
        <NavItem to="/bookstore">School Bookstore</NavItem>
        <NavItem to="/activities">After-School Activities</NavItem>
        <NavItem to="/contact">Contact Us</NavItem>
  <Spacer />
  {/* Use react-router NavLink as the underlying element so clicking the icon navigates via router */}
  <IconButton as={NavLink} to="/cart" aria-label="cart" icon={<FaShoppingCart/>} variant="ghost" />
      </HStack>
    </Box>
  )
}
