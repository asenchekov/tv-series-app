import React from 'react'

const TableRow = (props) => {
    console.log(props.index)
    return (
            <tr>
                <th width="5%">{props.index}</th>
                <td width="100px">
                    <img
                        src={props.show.poster}
                        alt={'"' + props.show.title + '" poster.'}
                        width='100px'
                    />
                </td>
                <td>{props.show.title}</td>
                <td width="10%">{props.show.year}</td>
                <td width="10%">{props.show.country ? props.show.country.toUpperCase() : 'n/a'}</td>
            </tr>
    );
}

export default TableRow;
