import { CollectorLevel } from 'enums/collectorLevel'
import { Role } from 'enums/role'
import { Reward } from './reward'

export interface Wallet {
	address: string
	role: Role
	level: CollectorLevel
	rewards: Reward[]
}
