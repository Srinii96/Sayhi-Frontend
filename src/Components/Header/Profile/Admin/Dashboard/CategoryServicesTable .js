import React from 'react'
import { Card, Table } from 'react-bootstrap'

const CategoryServicesTable = ({ categories }) => {
  const colors = [
    "#FF4500", "#00FF7F", "#8A2BE2", "#32CD32", "#FFD700",
    "#4682B4", "#9400D3", "#DC143C", "#20B2AA", "#00CED1",
    "#FF6347", "#00FA9A", "#1E90FF", "#FF69B4", "#3CB371",
    "#800000", "#FFA07A", "#008080", "#FFDAB9", "#2E8B57",
    "#8B008B", "#556B2F", "#FF8C00", "#9932CC", "#8B0000",
    "#5F9EA0", "#B22222", "#008B8B", "#8B4513", "#191970",
    "#FF1493", "#32CD32", "#800080", "#7B68EE", "#FA8072",
    "#40E0D0", "#8B4513", "#7CFC00", "#9932CC", "#FF4500",
    "#00FF00", "#6A5ACD", "#A0522D", "#48D1CC", "#B0C4DE",
    "#FFD700", "#FF6347"
  ]

  return (
    <>
        <div className='text-center m-4'>
            <h4 style={{fontSize: '18px', fontStyle: 'italic', fontWeight: 'bold'}}>Categories & their services</h4>
        </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {categories.map((category, index) => (
          <Card key={category._id} style={{ width: '14rem', margin: '2px', boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)', transition: '0.3s', backgroundColor: colors[index % colors.length] }}>
            <Card.Body>
              <Card.Title className='text-decoration-underline'>{category.title}</Card.Title>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Service Name</th>
                  </tr>
                </thead>
                <tbody>
                  {category.serviceIds.map((service) => (
                    <tr key={service._id}>
                      <td>{service.serviceName}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  )
}

export default CategoryServicesTable
