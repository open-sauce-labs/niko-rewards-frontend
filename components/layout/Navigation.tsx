import React from 'react'
import { ToolbarProps, Toolbar, Button, Hidden, Box } from '@mui/material'
import HomeIcon from 'public/assets/vector-icons/home-icon.svg'
import TwitterIcon from 'public/assets/vector-icons/twitter-icon.svg'
import InstagramIcon from 'public/assets/vector-icons/instagram-icon.svg'
import { Account, lsRemoveWalletAuth, removeAuthHeaders, useAuth, useServerAuthorization } from '@open-sauce/solomon'
import { SolanaMobileWalletAdapterWalletName } from '@solana-mobile/wallet-adapter-mobile'
import { Web3MobileWallet } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js'
import { useWallet } from '@solana/wallet-adapter-react'
import { useFetchMe } from 'api/wallet'
import { Role } from 'enums/role'
import dynamic from 'next/dynamic'
import http from 'api/http'

const WalletMultiButtonDynamic = dynamic(
	async () => (await import('@solana/wallet-adapter-material-ui')).WalletMultiButton,
	{ ssr: false }
)

const MobileWalletMultiButtonDynamic = dynamic(
	async () => await (await import('@open-sauce/solomon')).MobileWalletMultiButton,
	{ ssr: false }
)

const Navigation: React.FC<ToolbarProps> = (props) => {
	const { setIsAuthenticated } = useAuth()
	const { mobileConnect } = useServerAuthorization(http)
	const { data: me } = useFetchMe()
	const { wallet } = useWallet()

	const isMobileWallet = wallet?.adapter.name === SolanaMobileWalletAdapterWalletName

	const onAuthorize = async (mobileWallet: Web3MobileWallet, account: Account) => {
		// TODO: deprecate setIsAuthenticated(true)
		setIsAuthenticated(true)
		return await mobileConnect(mobileWallet, account)
	}

	const onDeauthorize = (account: Account) => {
		removeAuthHeaders(http)
		if (account?.address) lsRemoveWalletAuth(account.address)
		// TODO: setIsAuthenticated(false)
	}

	return (
		<Toolbar component='nav' className='navigation' {...props}>
			<Box className='navigation-items navigation-items--left'>
				<Button variant='contained' href='https://www.artofniko.com/' rel='noreferrer' target='_blank'>
					<HomeIcon />
				</Button>
				{me?.role === Role.Superadmin && (
					<Button variant='contained' href='/comic'>
						<img style={{ height: '100%', width: 'auto' }} alt='comic' src='/assets/comic-book.png' />
					</Button>
				)}
			</Box>

			<Box className='navigation-items navigation-items--right'>
				{/* Desktop */}
				<Hidden smDown>
					<Button
						variant='contained'
						aria-label='medium'
						href='https://www.instagram.com/nikoandtheswordoflight'
						rel='noreferrer'
						target='_blank'
					>
						<InstagramIcon />
					</Button>
					<Button
						variant='contained'
						aria-label='twitter'
						href='https://twitter.com/StudioNX'
						rel='noreferrer'
						target='_blank'
					>
						<TwitterIcon />
					</Button>
				</Hidden>
				{isMobileWallet ? (
					<MobileWalletMultiButtonDynamic
						className='wallet-button'
						onAuthorize={onAuthorize}
						onDeauthorize={onDeauthorize}
					/>
				) : (
					<WalletMultiButtonDynamic variant='contained' className='wallet-button' />
				)}
			</Box>
		</Toolbar>
	)
}

export default Navigation
