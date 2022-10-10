import { useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { Unity, useUnityContext } from 'react-unity-webgl'

const NikoComic: React.FC = () => {
	const {
		UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate,
		unityProvider,
		isLoaded,
		requestFullscreen,
	} = useUnityContext({
		loaderUrl: 'webgl/niko-comic-webgl.loader.js',
		dataUrl: 'webgl/niko-comic-webgl.data',
		frameworkUrl: 'webgl/niko-comic-webgl.framework.js',
		codeUrl: 'webgl/niko-comic-webgl.wasm',
		streamingAssetsUrl: 'webgl/streaming-assets',
		companyName: 'Niko',
		productName: 'Niko - The Sword of Light',
		productVersion: '1.0.0',
	})
	useEffect(() => {
		return () => {
			detachAndUnloadImmediate()
		}
	}, [detachAndUnloadImmediate])

	return (
		<Box className='main-content' style={{ visibility: isLoaded ? 'visible' : 'hidden' }}>
			<Unity
				ref={(canvas) => {
					if (canvas && canvas.id !== 'unity-canvas') canvas.id = 'unity-canvas'
				}}
				style={{ height: '450px', width: '300px' }}
				unityProvider={unityProvider}
			/>
			<Box my={2}>
				<Button variant='contained' onClick={() => requestFullscreen(true)}>
					Fullscreen
				</Button>
			</Box>
		</Box>
	)
}

export default NikoComic
