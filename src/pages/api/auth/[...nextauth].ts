import nextAuth from 'next-auth'
import { authOptions } from '@libs/api/auth-options'

export default nextAuth(authOptions)
