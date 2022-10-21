import React from 'react';
import "../Table.module.scss";

const TableBody = ({columns, items}) => {
    const renderContent = (item, column) => {
          if (columns[column].component) {
              const component = columns[column].component;
              return component(item);
          }
          return item[columns[column].path];
    }
    return (
            <tbody>
            {items.map(item => (
                <tr key={item.id}>
                    { Object.keys(columns).map(column => (
                        <td key={column}>
                            {renderContent(item, column)}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
    );
};

export default TableBody;