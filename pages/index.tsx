import type { NextPage } from 'next'
import Navigation from 'components/layout/Navigation'
import Footer from 'components/layout/Footer'
import Main from 'components/layout/Main'
import { useFetchMe } from 'api/wallet'
import { useFetchRewards } from 'api/reward'
import { Box, Button, Card, Grid, StandardTextFieldProps, TextField, Typography } from '@mui/material'
import { CollectorLevel } from 'enums/collectorLevel'
// import NikoComic from 'components/NikoComic'
import { Formik, Form, Field, FieldAttributes, FormikErrors, FormikTouched } from 'formik'
import { SimpleRequest, ComplexRequest, useShippingForm } from 'api/wallet/queries/useShippingForm'
import { SchemaOf } from 'yup'
import * as yup from 'yup'
import { Container } from '@mui/system'

const simpleValidationSchema: SchemaOf<SimpleRequest> = yup.object({
	email: yup.string().email().required().required('Required field'),
})

const complexValidationSchema: SchemaOf<ComplexRequest> = yup.object({
	email: yup.string().email().required().required('Required field'),
	twitter: yup.string().min(2, 'Username must have at least 2 characters').optional(),
	shippingAddress: yup.string().min(7, 'Shipping info must have at least 7 characters').required('Required field'),
})

const simpleInitialValues: SimpleRequest = {
	email: '',
}

const complexInitialValues: ComplexRequest = {
	email: '',
	twitter: '',
	shippingAddress: '',
}

const Home: NextPage = () => {
	const { data: me } = useFetchMe()
	const { data: rewards } = useFetchRewards()
	const { mutateAsync: submitFormAsync, isLoading } = useShippingForm()
	const simpleForm = me?.level && me?.level === CollectorLevel.Bronze
	const complexForm = me?.level && !simpleForm

	const initialValues = simpleForm ? simpleInitialValues : complexInitialValues
	const validationSchema = simpleForm ? simpleValidationSchema : complexValidationSchema

	return (
		<>
			<Navigation />

			<Main className='main'>
				<Container maxWidth='lg'>
					<Grid container spacing={4} flexDirection={{ xs: 'column-reverse', sm: 'row' }}>
						<Grid item xs={12} sm={6} md={4}>
							{rewards?.map((reward) => {
								const matchLevel = reward.level === me?.level

								return (
									<Card
										key={reward.level}
										style={{
											marginBottom: '1rem',
											boxShadow: `2px 2px ${matchLevel ? '#276d25' : 'black'}`,
											border: `2px solid ${matchLevel ? '#0d340c' : 'black'}`,
											backgroundColor: `rgba(255, 255, 255, ${matchLevel ? '0.95' : '0.65'})`,
											backgroundImage: 'unset',
										}}
									>
										{reward && (
											<Box textAlign='center' px={2} pb={2} pt={1}>
												<Typography variant='h5' component='h2' color={matchLevel ? '#276d25' : undefined}>
													{reward.name}
												</Typography>
												<Typography variant='body2'>{reward.description}</Typography>
											</Box>
										)}
									</Card>
								)
							})}
						</Grid>
						<Grid item xs={12} sm={6} md={8}>
							{!me?.level && <Typography>You are not eligible for any rewards</Typography>}
							{me?.level === CollectorLevel.Bronze && (
								<Box>
									<Typography variant='h5' component='p'>
										Congrats! 🎉
									</Typography>
									<Typography>
										You are eligible to access the &apos;Niko and the Sword of Light&apos; animated comic!
									</Typography>
									<Typography variant='subtitle2' fontStyle='italic'>
										Comic will be published as soon as exchange.art drops are completed.
									</Typography>
								</Box>
							)}
							{(simpleForm || complexForm) && (
								<Box>
									<Formik
										initialValues={initialValues}
										validationSchema={validationSchema}
										onSubmit={async (values) => submitFormAsync(values)}
									>
										{({ errors, touched }) => (
											<Form noValidate>
												<FormField
													property='email'
													label='e-mail'
													type='email'
													errors={errors}
													touched={touched}
													autoFocus
													required
												/>

												{complexForm && (
													<>
														<FormField
															property='twitter'
															label='Twitter'
															type='text'
															errors={errors}
															touched={touched}
														/>
														<FormField
															property='shippingAddress'
															label='Shipping Info'
															type='text'
															errors={errors}
															touched={touched}
															required
														/>
													</>
												)}

												<Button type='submit' variant='contained' color='primary' disabled={isLoading} fullWidth>
													Confim
												</Button>
											</Form>
										)}
									</Formik>
								</Box>
							)}
						</Grid>
					</Grid>
				</Container>
			</Main>

			<Footer />
		</>
	)
}

type FormFieldProps<T> = Omit<
	FieldAttributes<StandardTextFieldProps> & {
		property: keyof T
		touched: FormikTouched<T>
		errors: FormikErrors<T>
	},
	'name'
>

const FormField: React.FC<FormFieldProps<ComplexRequest>> = ({ property, touched, errors, ...props }) => {
	return (
		<Field
			id={property}
			name={property}
			autoComplete={property}
			margin='normal'
			variant='outlined'
			size='small'
			error={touched[property] && Boolean(errors[property])}
			helperText={touched[property] && errors[property]}
			fullWidth
			as={TextField}
			{...props}
		/>
	)
}

export default Home
