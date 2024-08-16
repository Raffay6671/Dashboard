import React, { useEffect, useState } from 'react';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import TableOne from '../../components/Tables/TableOne';


const ECommerce: React.FC = () => {
  return (
    <>
      <div className="mt-4 grid grid-cols-12  gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartTwo />
        <ChartThree />
        <div className="col-span-12 xl:col-span-12">
          <TableOne />
        </div>
      </div>
    </>
  );
};

export default ECommerce;
