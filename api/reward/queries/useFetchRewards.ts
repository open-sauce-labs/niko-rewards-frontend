import { useAuth } from '@open-sauce/solomon'
import http from 'api/http'
import { rewardKeys, REWARD_QUERY_KEYS } from 'api/reward'
import { Reward } from 'models/reward'
import { useQuery } from 'react-query'

const { REWARD, GET } = REWARD_QUERY_KEYS

const fetchRewards = async (): Promise<Reward[]> => {
	const response = await http.get<Reward[]>(`${REWARD}/${GET}`)
	return response.data
}

export const useFetchRewards = () => {
	const { isAuthenticated } = useAuth()

	return useQuery(rewardKeys.get, fetchRewards, {
		staleTime: 1000 * 60 * 60 * 24, // Stale for one day
		enabled: isAuthenticated,
	})
}
