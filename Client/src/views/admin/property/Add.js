import { CloseIcon } from '@chakra-ui/icons';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Grid, GridItem, Heading, IconButton, Input, Select, Text, Textarea } from '@chakra-ui/react';
import { HSeparator } from 'components/separator/Separator';
import Spinner from 'components/spinner/Spinner';
import { useFormik } from 'formik';
import { useState } from 'react';
import { propertySchema } from 'schema';
import { postApi } from 'services/api';

const Add = (props) => {
    const [isLoding, setIsLoding] = useState(false)

    const initialValues = {
         // 1. Basic Vehicle Information:
        brand: "",
        model: "",
        year: "",
        mileage: "",
        VIN: "",
        vehicleDescription: "",
         // 2. Technical Specifications:
        engineType: "",
        transmission: "",
        fuelType: "",
        color: "",
        doors: "",

        //3. Media and Visuals:
        vehiclePhotos: "",
        vehicleVideos: "",
        vehicleDocuments: "",
        // 4. Availability and Pricing:
        availabilityStatus: "",
        price: "",
        promotions: "",

        // 5. Service History:
        serviceRecords: "",

        // 6. Associated Contacts:
        previousOwners: "",
        currentOwner: "",
        associatedServiceAgents: "",

        // 7. Vehicle Notes and Comments:
        internalNotesOrComments: "",

        createBy: JSON.parse(localStorage.getItem('user'))._id,
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: propertySchema,
        onSubmit: (values, { resetForm }) => {
            AddData();
        },
    });

    const { errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue, } = formik

    const AddData = async () => {
        try {
            setIsLoding(true)
            let response = await postApi('api/property/add', values)
            if (response.status === 200) {
                props.onClose();
                formik.resetForm();
            }
        } catch (e) {
            console.log(e);
        }
        finally {
            setIsLoding(false)
        }
    };

    const handleCancel = () => {
        formik.resetForm();
        props.onClose()
    }

    return (
        <div>
            <Drawer isOpen={props.isOpen} size={props.size}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader justifyContent='space-between' display='flex' >
                        Add service task
                        <IconButton onClick={props.onClose} icon={<CloseIcon />} />
                    </DrawerHeader>
                    <DrawerBody>

                        <Grid templateColumns="repeat(12, 1fr)" gap={3}>

                            <GridItem colSpan={{ base: 12 }}>
                                <Heading as="h1" size="md" >
                                    1. Basic order information
                                </Heading>
                            </GridItem>

                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Car brand<Text color={"red"}>*</Text>
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.brand}
                                    name="brand"
                                    placeholder='Enter the car brand'
                                    fontWeight='500'
                                    borderColor={errors.brand && touched.brand ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}> {errors.brand && touched.brand && errors.brand}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Model<Text color={"red"}>*</Text>
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.model}
                                    name="model"
                                    type='number'
                                    min={1000}
                                    max={new Date().getFullYear()}
                                    placeholder='Enter model of the car'
                                    fontWeight='500'
                                    borderColor={errors.model && touched.model ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.model && touched.model && errors.model}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Year of the car<Text color={"red"}>*</Text>
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.year}
                                    name="year"
                                    placeholder='Enter year of the car '
                                    fontWeight='500'
                                    borderColor={errors.year && touched.year ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.year && touched.year && errors.year}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Mileage<Text color={"red"}>*</Text>
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.mileage}
                                    name="mileage"
                                    placeholder="Enter mileage"
                                    fontWeight='500'
                                    borderColor={errors.mileage && touched.mileage ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.mileage && touched.mileage && errors.mileage}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    VIN <Text color={"red"}>*</Text>
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.VIN}
                                    name="VIN"
                                    placeholder='Enter VIN'
                                    fontWeight='500'
                                    borderColor={errors.VIN && touched.VIN ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.squareFootage && touched.squareFootage && errors.squareFootage}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Vehicle Description<Text color={"red"}>*</Text>
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.vehicleDescription}
                                    type='number'
                                    min={0}
                                    name="vehicleDescription"
                                    placeholder="Enter vehicle's Description"
                                    fontWeight='500'
                                    borderColor={errors.vehicleDescription && touched.vehicleDescription ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.vehicleDescription && touched.vehicleDescription && errors.vehicleDescription}</Text>
                            </GridItem>
                           

                            <GridItem colSpan={{ base: 12 }}>
                                <HSeparator />
                                <Heading mt={2} as="h1" size="md" >
                                    2. Technical Specifications
                                </Heading>
                            </GridItem>

                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Engine Type
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.engineType}
                                    name="lotSize"
                                    placeholder='Enter engine Type'
                                    fontWeight='500'
                                    borderColor={errors.engineType && touched.engineType ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.engineType && touched.engineType && errors.engineType}</Text>
                            </GridItem>

                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Transmission
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.transmission}
                                    name="transmission"
                                    placeholder='Enter Transmission'
                                    fontWeight='500'
                                    borderColor={errors.transmission && touched.transmission ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.appliancesIncluded && touched.appliancesIncluded && errors.appliancesIncluded}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Fuel Type
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.fuelType}
                                    name="fuelType"
                                    placeholder='Enter fuel Type'
                                    fontWeight='500'
                                    borderColor={errors.fuelType && touched.fuelType ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.heatingAndCoolingSystems && touched.heatingAndCoolingSystems && errors.heatingAndCoolingSystems}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Color
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.color}
                                    name="color"
                                    placeholder='Enter color'
                                    fontWeight='500'
                                    borderColor={errors.color && touched.color ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.color && touched.color && errors.color}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                doors
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.doors}
                                    name="doors"
                                    placeholder='Enter the numeber of doors'
                                    fontWeight='500'
                                    borderColor={errors.doors && touched.doors ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.doors && touched.doors && errors.doors}</Text>
                            </GridItem>
                           
                            {/* <GridItem colSpan={{ base: 12 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Parking Availability
                                </FormLabel>
                                <Select
                                    value={values.parkingAvailability}
                                    name="parkingAvailability"
                                    onChange={handleChange}
                                    fontWeight='500'
                                    placeholder={'Select Parking Availability'}
                                    borderColor={errors.parkingAvailability && touched.parkingAvailability ? "red.300" : null}
                                >
                                    <option value='yes'>Yes</option>
                                    <option value='no'>No</option>
                                </Select>
                                <Text mb='10px' color={'red'}>{errors.parkingAvailability && touched.parkingAvailability && errors.parkingAvailability}</Text>
                            </GridItem> */}

                            <GridItem colSpan={{ base: 12 }}>
                                <HSeparator />
                                <Heading mt={2} as="h1" size="md" >
                                    3. Listing and Marketing Details
                                </Heading>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Listing Status
                                </FormLabel>
                                <Select
                                    value={values.listingStatus}
                                    name="listingStatus"
                                    onChange={handleChange}
                                    fontWeight='500'
                                    placeholder={'Select Listing Status'}
                                    borderColor={errors.listingStatus && touched.listingStatus ? "red.300" : null}
                                >
                                    <option value='active'>active</option>
                                    <option value='pending'>pending</option>
                                    <option value='sold'>sold</option>
                                </Select>
                                <Text mb='10px' color={'red'}>{errors.listingStatus && touched.listingStatus && errors.listingStatus}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Listing Agent Or Team
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.listingAgentOrTeam}
                                    name="listingAgentOrTeam"
                                    placeholder='Enter Listing Agent Or Team'
                                    fontWeight='500'
                                    borderColor={errors.listingAgentOrTeam && touched.listingAgentOrTeam ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.listingAgentOrTeam && touched.listingAgentOrTeam && errors.listingAgentOrTeam}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Listing Date
                                </FormLabel>
                                <Input
                                    type='date'
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.listingDate}
                                    name="listingDate"
                                    fontWeight='500'
                                    borderColor={errors.listingDate && touched.listingDate ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}> {errors.listingDate && touched.listingDate && errors.listingDate}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Marketing Description
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.marketingDescription}
                                    name="marketingDescription"
                                    placeholder='Enter Marketing Description'
                                    fontWeight='500'
                                    borderColor={errors.marketingDescription && touched.marketingDescription ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.marketingDescription && touched.marketingDescription && errors.marketingDescription}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Multiple Listing Service
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.multipleListingService}
                                    name="multipleListingService"
                                    placeholder='Enter Multiple Listing Service'
                                    fontWeight='500'
                                    borderColor={errors.multipleListingService && touched.multipleListingService ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.multipleListingService && touched.multipleListingService && errors.multipleListingService}</Text>
                            </GridItem>


                            <GridItem colSpan={{ base: 12 }}>
                                <HSeparator />
                                <Heading mt={2} as="h1" size="md" >
                                    4. Property History
                                </Heading>
                            </GridItem>
                            <GridItem colSpan={{ base: 12 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Previous Owners
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.previousOwners}
                                    name="previousOwners"
                                    type='number'
                                    min={0}
                                    placeholder='Enter Previous Owners'
                                    fontWeight='500'
                                    borderColor={errors.previousOwners && touched.previousOwners ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.previousOwners && touched.previousOwners && errors.previousOwners}</Text>
                            </GridItem>

                            <GridItem colSpan={{ base: 12 }}>
                                <HSeparator />
                                <Heading mt={2} as="h1" size="md" >
                                    5. Financial Information
                                </Heading>
                            </GridItem>

                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Property Taxes
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.propertyTaxes}
                                    name="propertyTaxes"
                                    placeholder=' Property Taxes'
                                    fontWeight='500'
                                    borderColor={errors.propertyTaxes && touched.propertyTaxes ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}> {errors.propertyTaxes && touched.propertyTaxes && errors.propertyTaxes}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Homeowners Association
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.homeownersAssociation}
                                    name="homeownersAssociation"
                                    placeholder='Homeowners Association'
                                    fontWeight='500'
                                    borderColor={errors.homeownersAssociation && touched.homeownersAssociation ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}> {errors.homeownersAssociation && touched.homeownersAssociation && errors.homeownersAssociation}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Mortgage Information
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.mortgageInformation}
                                    name="mortgageInformation"
                                    placeholder='Mortgage Information'
                                    fontWeight='500'
                                    borderColor={errors.mortgageInformation && touched.mortgageInformation ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}> {errors.mortgageInformation && touched.mortgageInformation && errors.mortgageInformation}</Text>
                            </GridItem>

                            <GridItem colSpan={{ base: 12 }}>
                                <HSeparator />
                                <Heading mt={2} as="h1" size="md" >
                                    6. Contacts Associated with Property
                                </Heading>
                            </GridItem>

                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Sellers
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.sellers}
                                    name="sellers"
                                    placeholder='Sellers'
                                    fontWeight='500'
                                    borderColor={errors.sellers && touched.sellers ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}> {errors.sellers && touched.sellers && errors.sellers}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Buyers
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.buyers}
                                    name="buyers"
                                    placeholder='Buyers'
                                    fontWeight='500'
                                    borderColor={errors.buyers && touched.buyers ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}> {errors.buyers && touched.buyers && errors.buyers}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Property Managers
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.propertyManagers}
                                    name="propertyManagers"
                                    placeholder='Property Managers'
                                    fontWeight='500'
                                    borderColor={errors.propertyManagers && touched.propertyManagers ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}> {errors.propertyManagers && touched.propertyManagers && errors.propertyManagers}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Contractors Or Service Providers
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.contractorsOrServiceProviders}
                                    name="contractorsOrServiceProviders"
                                    placeholder='Contractors Or Service Providers'
                                    fontWeight='500'
                                    borderColor={errors.contractorsOrServiceProviders && touched.contractorsOrServiceProviders ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}> {errors.contractorsOrServiceProviders && touched.contractorsOrServiceProviders && errors.contractorsOrServiceProviders}</Text>
                            </GridItem>

                            <GridItem colSpan={{ base: 12 }}>
                                <HSeparator />
                                <Heading mt={2} as="h1" size="md" >
                                    7. Property Notes and Comments
                                </Heading>
                            </GridItem>

                            <GridItem colSpan={{ base: 12 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Internal Notes Or Comments
                                </FormLabel>
                                <Textarea
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    resize={'none'}
                                    value={values.internalNotesOrComments}
                                    name="internalNotesOrComments"
                                    placeholder='Internal Notes Or Comments'
                                    fontWeight='500'
                                    borderColor={errors.internalNotesOrComments && touched.internalNotesOrComments ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}> {errors.internalNotesOrComments && touched.internalNotesOrComments && errors.internalNotesOrComments}</Text>
                            </GridItem>


                        </Grid>
                    </DrawerBody>


                    <DrawerFooter>
                        <Button sx={{ textTransform: "capitalize" }} disabled={isLoding ? true : false} variant="brand" type="submit" onClick={handleSubmit}                        >
                            {isLoding ? <Spinner /> : 'Add Data'}
                        </Button>
                        <Button
                            variant="outline"
                            colorScheme='red'
                            sx={{
                                marginLeft: 2,
                                textTransform: "capitalize",
                            }}
                            onClick={props.onClose}
                        >
                            Cancel
                        </Button>
                    </DrawerFooter>

                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default Add
