import http from 'api/http'
import { WALLET_QUERY_KEYS } from 'api/wallet/walletKeys'
import { useToaster } from 'providers/ToastProvider'
import { useMutation } from 'react-query'

export interface SimpleRequest {
	email: string
}
export interface ComplexRequest extends SimpleRequest {
	twitter?: string
	shippingAddress: string
}

const submitForm = async (request: SimpleRequest | ComplexRequest): Promise<void> => {
	const response = await http.post<void>(`${WALLET_QUERY_KEYS.WALLET}/${WALLET_QUERY_KEYS.APPLY_FOR_REWARD}`, request)
	return response.data
}

export const useShippingForm = () => {
	const toaster = useToaster()

	return useMutation((request: SimpleRequest | ComplexRequest) => submitForm(request), {
		onSuccess: async () => {
			toaster.add('Form submitted successfully', 'success')
		},
		onError: toaster.onQueryError,
	})
}
