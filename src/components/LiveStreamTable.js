import React from 'react';

const TableView = ({ data }) => {
  return (
    <div className='main-content'>
        <table>
        <thead>
            <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>User</th>
            <th>Timestamp</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item) => {
            const wikiEventData = JSON.parse(item.wikiEventData);  
            return (
                <tr key={item.id}>
                <td>{item.id}</td>
                <td>{wikiEventData.title}</td>
                <td>{wikiEventData.type}</td>
                <td>{wikiEventData.user}</td>
                <td>{new Date(wikiEventData.timestamp * 1000).toLocaleString()}</td>
                </tr>
            )   
            })}
        </tbody>
        </table>
    </div>
  );
};

export default TableView;
