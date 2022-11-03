import { useEffect } from 'react'
import { Box } from '@mui/material'
import { Unity, useUnityContext } from 'react-unity-webgl'
import useWindowSize from 'hooks/useWindowSize'

const NikoComic: React.FC = () => {
	const { height, width } = useWindowSize()
	const {
		UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate,
		unityProvider,
		isLoaded,
		// requestFullscreen,
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

	const ratio = 18 / 25

	return (
		<Box
			className='main-content'
			style={{ visibility: isLoaded ? 'visible' : 'hidden', minHeight: '100vh', background: '#080a0c' }}
		>
			<Unity
				ref={(canvas) => {
					if (canvas && canvas.id !== 'unity-canvas') canvas.id = 'unity-canvas'
				}}
				style={
					width * (1 / ratio) > height ? { height, width: height * ratio } : { height: width * (1 / ratio), width }
				}
				unityProvider={unityProvider}
			/>
			{/* <Box my={2}>
				<Button variant='contained' onClick={() => requestFullscreen(true)}>
					Fullscreen
				</Button>
			</Box> */}
		</Box>
	)
}

export default NikoComic
