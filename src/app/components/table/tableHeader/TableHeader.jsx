import React from 'react';

const TableHeader = ({columns}) => {
    return (
        <thead>
        <tr>
            {Object.keys(columns).map(column => (
                <th key={column}>{columns[column].name}</th>
            ))}
        </tr>
        </thead>
    );
};

export default TableHeader;