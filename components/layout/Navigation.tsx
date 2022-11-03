import React from 'react'
import { ToolbarProps, Toolbar, Button, Hidden, Box } from '@mui/material'
import HomeIcon from 'public/assets/vector-icons/home-icon.svg'
import TwitterIcon from 'public/assets/vector-icons/twitter-icon.svg'
import InstagramIcon from 'public/assets/vector-icons/instagram-icon.svg'
import dynamic from 'next/dynamic'
import { useFetchMe } from 'api/wallet'
import { Role } from 'enums/role'

const WalletMultiButtonDynamic = dynamic(
	async () => (await import('@solana/wallet-adapter-material-ui')).WalletMultiButton,
	{ ssr: false }
)

const Navigation: React.FC<ToolbarProps> = (props) => {
	const { data: me } = useFetchMe()

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
				<WalletMultiButtonDynamic className='wallet-button' />
			</Box>
		</Toolbar>
	)
}

export default Navigation
