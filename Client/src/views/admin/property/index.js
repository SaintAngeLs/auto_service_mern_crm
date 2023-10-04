import { AddIcon } from "@chakra-ui/icons";
import { Button, Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Add from "./Add";
import CheckTable from './components/CheckTable';

const Index = () => {
    const [columns, setColumns] = useState([]);

    const tableColumns = [
        {
            Header: "#",
            accessor: "_id",
            isSortable: false,
            width: 10
        },
        { Header: 'brand', accessor: 'brand' },
        { Header: "model", accessor: "model", },
        { Header: "year", accessor: "year", },
        { Header: "VIN", accessor: "VIN", },
        { Header: "price", accessor: "price", },
        { Header: "mileage", accessor: "mileage", },
        { Header: "current Owner", accessor: "currentOwner", },
    ];

    const { isOpen, onOpen, onClose } = useDisclosure()
    const size = "lg";

    useEffect(() => {
        setColumns(tableColumns)
    }, [onClose])


    const handleClick = () => {
        onOpen()
    }

    return (
        <div>
            <Grid templateColumns="repeat(6, 1fr)" mb={3} gap={1}>
                <GridItem colStart={6} textAlign={"right"}>
                    <Button onClick={() => handleClick()} leftIcon={<AddIcon />} variant="brand">Add</Button>
                </GridItem>
            </Grid>
            <CheckTable columnsData={columns} isOpen={isOpen} />
            {/* Add Form */}
            <Add isOpen={isOpen} size={size} onClose={onClose} />
        </div>
    )
}

export default Index
