import { CloseIcon } from '@chakra-ui/icons';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Grid, GridItem, Heading, IconButton, Input, Select, Text, Textarea } from '@chakra-ui/react';
import { HSeparator } from 'components/separator/Separator';
import Spinner from 'components/spinner/Spinner';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { propertySchema } from 'schema';
import { getApi, putApi } from 'services/api';
const Edit = (props) => {

    const initialValues = {
        //1. basicPropertyInformation
        propertyType: "",
        propertyAddress: "",
        listingPrice: "",
        squareFootage: "",
        numberofBedrooms: "",
        numberofBathrooms: "",
        yearBuilt: "",
        propertyDescription: "",
        //2. Property Features and Amenities
        lotSize: "",
        parkingAvailability: "",
        appliancesIncluded: "",
        heatingAndCoolingSystems: "",
        flooringType: "",
        exteriorFeatures: "",
        communityAmenities: "",
        //3. Media and Visuals
        propertyPhotos: "",
        virtualToursOrVideos: "",
        floorPlans: "",
        propertyDocuments: "",
        //4. Listing and Marketing Details
        listingStatus: "",
        listingAgentOrTeam: "",
        listingDate: "",
        marketingDescription: "",
        multipleListingService: "",
        //5. Property History
        previousOwners: "",
        purchaseHistory: "",
        //6. Financial Information
        propertyTaxes: "",
        homeownersAssociation: "",
        mortgageInformation: "",
        //7. Contacts Associated with Property
        sellers: "",
        buyers: "",
        propertyManagers: "",
        contractorsOrServiceProviders: "",
        //8. Property Notes and Comments
        internalNotesOrComments: "",
        createBy: JSON.parse(localStorage.getItem('user'))._id,
    };
    const param = useParams()

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: propertySchema,
        onSubmit: (values, { resetForm }) => {
            EditData();
        },
    });

    const { errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue, } = formik
    const [isLoding, setIsLoding] = useState(false)

    const EditData = async () => {
        try {
            setIsLoding(true)
            let response = await putApi(`api/property/edit/${param.id}`, values)
            if (response.status === 200) {
                props.onClose();
            }
        } catch (e) {
            console.log(e);
        }
        finally {
            setIsLoding(false)
        }
    };

    const handleClose = () => {
        props.onClose(false)
    }

    let response
    const fetchData = async () => {
        response = await getApi('api/property/view/', param.id)

        //1. basicPropertyInformation
        values.brand = response?.data?.property?.brand;
        values.model = response?.data?.property?.model;
        values.year = response?.data?.property?.year;
        values.mileage = response?.data?.property?.mileage;
        values.VIN = response?.data?.property?.VIN;
        values.vehicleDescription = response?.data?.property?.vehicleDescription;
        values.engineType = response?.data?.property?.engineType;
        values.transmission = response?.data?.property?.transmission;
        //2. Property Features and Amenities
        values.fuelType = response?.data?.property?.fuelType;
        values.color = response?.data?.property?.color;
        values.doors = response?.data?.property?.doors;
        values.vehiclePhotos = response?.data?.property?.vehiclePhotos;
        values.vehicleVideos = response?.data?.property?.vehicleVideos;
        values.vehicleDocuments = response?.data?.property?.vehicleDocuments;
        values.availabilityStatus = response?.data?.property?.availabilityStatus;
        //3. Media and Visuals
        values.price = response?.data?.property?.price;
        values.promotions = response?.data?.property?.promotions;
        values.serviceRecords = response?.data?.property?.serviceRecords;
        values.previousOwners = response?.data?.property?.previousOwners;
        //4. Listing and Marketing Details
        values.currentOwner = response?.data?.property?.currentOwner;
        values.associatedServiceAgents = response?.data?.property?.associatedServiceAgents;
        values.internalNotesOrComments = response?.data?.property?.internalNotesOrComments;
        
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <Drawer isOpen={props.isOpen} size={props.size}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader justifyContent='space-between' display='flex' >
                    Basic Car Information
                        <IconButton onClick={handleClose} icon={<CloseIcon />} />
                    </DrawerHeader>
                    <DrawerBody>

                        <Grid templateColumns="repeat(12, 1fr)" gap={3}>

                            <GridItem colSpan={{ base: 12 }}>
                                <Heading as="h1" size="md" >
                                    1. Basic Property Information
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
                                    placeholder='Enter brand'
                                    fontWeight='500'
                                    borderColor={errors.brand && touched.brand ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}> {errors.brand && touched.brand && errors.brand}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Car model<Text color={"red"}>*</Text>
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.model}
                                    name="model"
                                    placeholder='Enter model'
                                    fontWeight='500'
                                    borderColor={errors.model && touched.model ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.model && touched.model && errors.model}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Year Built<Text color={"red"}>*</Text>
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.year}
                                    name="yearBuilt"
                                    // type='number'
                                    // min={1000}
                                    // max={new Date().getFullYear()}
                                    placeholder='Enter Year'
                                    fontWeight='500'
                                    borderColor={errors.year && touched.year ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.year && touched.year && errors.year}</Text>
                            </GridItem>
                            
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Millage<Text color={"red"}>*</Text>
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.mileage}
                                    name="mileage"
                                    placeholder='Enter Lmileage'
                                    fontWeight='500'
                                    borderColor={errors.mileage && touched.mileage ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.mileage && touched.mileage && errors.mileage}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    VIN<Text color={"red"}>*</Text>
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
                                <Text mb='10px' color={'red'}>{errors.VIN && touched.VIN && errors.VIN}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Vhickle Description<Text color={"red"}>*</Text>
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.vehicleDescription}

                                    name="numberofBedrooms"
                                    placeholder='Enter Vhickle Description'
                                    fontWeight='500'
                                    borderColor={errors.vehicleDescription && touched.vehicleDescription ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.vehicleDescription && touched.vehicleDescription && errors.vehicleDescription}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Price<Text color={"red"}>*</Text>
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.price}
                                    name="price"
                                    type='number'
                                    min={0}
                                    placeholder='Enter price'
                                    fontWeight='500'
                                    borderColor={errors.price && touched.price ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.price && touched.price && errors.price}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Promotions<Text color={"red"}>*</Text>
                                </FormLabel>
                                <Textarea
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    resize={'none'}
                                    value={values.promotions}
                                    name="promotions"
                                    placeholder='Enter promotions'
                                    fontWeight='500'
                                    borderColor={errors.promotions && touched.promotions ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.promotions && touched.promotions && errors.promotions}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Service Records <Text color={"red"}>*</Text>
                                </FormLabel>
                                <Textarea
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    resize={'none'}
                                    value={values.serviceRecords}
                                    name="serviceRecords"
                                    placeholder='Enter service Records'
                                    fontWeight='500'
                                    borderColor={errors.serviceRecords && touched.serviceRecords ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.serviceRecords && touched.serviceRecords && errors.serviceRecords}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Previous Owners<Text color={"red"}>*</Text>
                                </FormLabel>
                                <Textarea
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    resize={'none'}
                                    value={values.previousOwners}
                                    name="previousOwners"
                                    placeholder='Enter previous Owners'
                                    fontWeight='500'
                                    borderColor={errors.previousOwners && touched.previousOwners ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.previousOwners && touched.previousOwners && errors.previousOwners}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Current Owner<Text color={"red"}>*</Text>
                                </FormLabel>
                                <Textarea
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    resize={'none'}
                                    value={values.currentOwner}
                                    name="currentOwner"
                                    placeholder='Enter promotions'
                                    fontWeight='500'
                                    borderColor={errors.currentOwner && touched.currentOwner ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.currentOwner && touched.currentOwner && errors.currentOwner}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Associated Service Agents<Text color={"red"}>*</Text>
                                </FormLabel>
                                <Textarea
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    resize={'none'}
                                    value={values.associatedServiceAgents}
                                    name="associatedServiceAgents"
                                    placeholder='Enter associated ServiceA gents'
                                    fontWeight='500'
                                    borderColor={errors.associatedServiceAgents && touched.associatedServiceAgents ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.associatedServiceAgents && touched.associatedServiceAgents && errors.associatedServiceAgents}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Internal Notes Or Comments<Text color={"red"}>*</Text>
                                </FormLabel>
                                <Textarea
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    resize={'none'}
                                    value={values.internalNotesOrComments}
                                    name="internalNotesOrComments"
                                    placeholder='Enter internalNotesOrComments'
                                    fontWeight='500'
                                    borderColor={errors.internalNotesOrComments && touched.internalNotesOrComments ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.internalNotesOrComments && touched.internalNotesOrComments && errors.internalNotesOrComments}</Text>
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
                                    placeholder='Enter Lot Size'
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
                                    name="appliancesIncluded"
                                    placeholder='Enter transmission'
                                    fontWeight='500'
                                    borderColor={errors.transmission && touched.transmission ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.transmission && touched.transmission && errors.transmission}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Fuel type
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.fuelType}
                                    name="fuelType"
                                    placeholder='Enter fuelType'
                                    fontWeight='500'
                                    borderColor={errors.fuelType && touched.fuelType ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.fuelType && touched.fuelType && errors.fuelType}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Color
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.color}
                                    name="flooringType"
                                    placeholder='Enter Flooring Type'
                                    fontWeight='500'
                                    borderColor={errors.color && touched.color ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.color && touched.color && errors.color}</Text>
                            </GridItem>
                           
                            <GridItem colSpan={{ base: 12, sm: 6 }}>
                                <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                    Doors
                                </FormLabel>
                                <Input
                                    fontSize='sm'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.doors}
                                    name="doors"
                                    placeholder='Enter doors'
                                    fontWeight='500'
                                    borderColor={errors.doors && touched.doors ? "red.300" : null}
                                />
                                <Text mb='10px' color={'red'}>{errors.doors && touched.doors && errors.doors}</Text>
                            </GridItem>
                            

                            

                        </Grid>
                    </DrawerBody>


                    <DrawerFooter>
                        <Button
                            sx={{ textTransform: "capitalize" }}
                            variant="solid"
                            colorScheme="green"
                            disabled={isLoding ? true : false}
                            type="submit"
                            onClick={handleSubmit}
                        >
                            {isLoding ? <Spinner /> : 'Update Data'}
                        </Button>
                        <Button
                            variant="outline"
                            colorScheme='red'
                            sx={{
                                marginLeft: 2,
                                textTransform: "capitalize",
                            }}
                            onClick={() => { props.onClose(false) }}
                        >
                            Cancel
                        </Button>
                    </DrawerFooter>

                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default Edit