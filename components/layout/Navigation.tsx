import React from 'react'
import { ToolbarProps, Toolbar, Button, Hidden, Box } from '@mui/material'
import HomeIcon from 'public/assets/vector-icons/home-icon.svg'
import TwitterIcon from 'public/assets/vector-icons/twitter-icon.svg'
import InstagramIcon from 'public/assets/vector-icons/instagram-icon.svg'
// import { attributes as navigation } from 'content/navigation.md'
import { WalletMultiButton } from '@solana/wallet-adapter-material-ui'

const Navigation: React.FC<ToolbarProps> = (props) => {
	return (
		<Toolbar component='nav' className='navigation' {...props}>
			<Box className='navigation-items navigation-items--left'>
				<Button variant='contained' href='https://www.artofniko.com/' rel='noreferrer' target='_blank'>
					<HomeIcon />
				</Button>
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
				<WalletMultiButton className='wallet-button' />
			</Box>
		</Toolbar>
	)
}

export default Navigation
