import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addOrUpdateToCart, getCart, removeFromCart } from '../apis/firebase'
import { useAuthContext } from '../context/AuthContext'

export default function useCart() {
    const { uid } = useAuthContext()
    const queryClient = useQueryClient()
    const cartQuery = useQuery(['carts', uid || ''], () => getCart(uid), { enabled: !!uid })
    // 사용자 별로 carts 정보를 가져오기 위해 두번째 인자로 uid 키를 입력 / enabled 옵션을 통해 사용자가 없는경우 수행되지 않도록 함, 
    const addOrUpdateItem = useMutation(
        (product) => addOrUpdateToCart(uid, product),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['carts', uid]) // carts 중에서 uid에 한하여
            }
        }
    )
    const removeItem = useMutation(
        (id) => removeFromCart(uid, id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['carts', uid])
            }
        }
    )
    return { cartQuery, addOrUpdateItem, removeItem }
}