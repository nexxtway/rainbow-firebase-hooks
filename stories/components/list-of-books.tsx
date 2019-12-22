import * as React from 'react';
import { Table, Column, Application } from 'react-rainbow-components';
export type Author = string[];

export interface Book {
    name: string;
    price: number;
    authors: Author[];
}

export interface ListOfBooksProps {
    data: Book[];
    isLoading: boolean;
}

export default function ListOfBooks(props: ListOfBooksProps) {
    const { data, isLoading } = props;
    return (
        <Application>
            <Table data={data} keyField="id" isLoading={isLoading}>
                <Column header="Name" field="data.name" />
                <Column header="Price" field="data.price" />
                <Column header="Authors" field="data.authors" />
            </Table>
        </Application>
    );
}