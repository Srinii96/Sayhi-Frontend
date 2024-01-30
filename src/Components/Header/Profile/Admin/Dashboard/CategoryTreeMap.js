import React from 'react';
import { Treemap, Tooltip } from 'recharts';

const CategoryTreeMap = ({ categories }) => {
  // Prepare data in the required format for TreeMap
  console.log(categories, "22")

  const data = {
    name: 'categories',
    children: categories.map(category => ({
      name: category.title,
      size: category.serviceIds.length,  // Use a metric for the 'size' property
      children: category.serviceIds.map(service => ({ name: service.serviceName, size: 10 })),
    })),
  };

  return (
    <Treemap
      width={800}
      height={400}
      data={data}
      dataKey="size"
      ratio={4 / 3}
      stroke="#fff"
      fill="#8884d8"
    >
      <Tooltip />
    </Treemap>
  );
};

export default CategoryTreeMap;
