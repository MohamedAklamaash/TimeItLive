import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { createViewerToken } from '@/actions/token'

export const useViewerToken = (hostIdentity: string) => {
    const [token, setToken] = useState('')
    const [name, setName] = useState('')
    const [identity, setIdentity] = useState('')

    useEffect(() => {
        const createToken = async () => {
            try {
                const viewerToken = await createViewerToken(hostIdentity)
                setToken(viewerToken)

                const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
                    name?: string
                    sub?: string
                }
                const { sub, name } = decodedToken
                // using sub might not work cuz uniqueness is not supported at times
                if (sub) {
                    setIdentity(sub)
                }

                if (name) {
                    setName(name)
                }
            } catch (error) {
                console.error('Error:', error)
                toast.error('Something went wrong')
            }
        }

        createToken()
    }, [hostIdentity])

    return {
        token,
        name,
        identity,
    }
}
