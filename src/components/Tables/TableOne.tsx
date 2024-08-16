

import React, { useState, useEffect } from 'react';

// Define the VpnUsers interface based on your data structure
interface VpnUsers {
  id: number;
  username: string;
  email: string;
  connectionStatus: string;
  ipAddress: string;
  connectionDuration: string;
  country: string;
}

// Function to fetch the VPN data
async function FetchTableData(): Promise<VpnUsers[]> {
  try {
    const response = await fetch(
      'https://fvm.funsol.cloud/vmc_all_servers/',
      {
        method: 'GET',
        headers: {
          'Authorization': 'token 26499c6d77c4ff9b6b7e5bde60bf77ed37e71b91',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ERROR! Status: ${response.status}`);
    }

    const data = await response.json();
    // Map the server data to the VpnUsers format
    const users: VpnUsers[] = data.servers.flatMap((server: any, index: number) =>
      server.list.map((item: any, subIndex: number) => ({
        id: index * 100 + subIndex + 1,
        username: `user_${index * 100 + subIndex + 1}`,
        email: `user${index * 100 + subIndex + 1}@example.com`,
        connectionStatus: item.is_active ? 'connected' : 'disconnected',
        country: server.cname,
        ipAddress: item.ipaddress,
        connectionDuration: `${Math.floor(Math.random() * 10)}h ${Math.floor(Math.random() * 60)}m`,
      }))
    );

    console.log('Fetched data:', users);
    return users;
  } catch (error) {
    console.error('Error fetching the data', error);
    return []; // Return an empty array in case of error
  }
}

// Component to display the table with VPN data
const TableOne: React.FC<{ data: VpnUsers[] }> = ({ data }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Global VPN Server Information
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-8">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">ID</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Username
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Connection Status
            </h5>
          </div>
          <div className="p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              IP Address
            </h5>
          </div>
          <div className="p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Connection Duration
            </h5>
          </div>
          <div className="p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Country
            </h5>
          </div>
        </div>

        {data.map((user, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-8 ${
              key === data.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">{user.id}</div>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{user.username}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{user.email}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">
                {user.connectionStatus}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{user.ipAddress}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">
                {user.connectionDuration}
              </p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-3 ">{user.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main component to load data and render the table
function MyComponent() {
  const [data, setData] = useState<VpnUsers[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await FetchTableData();
      setData(response);
    };

    loadData();
  }, []);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return <TableOne data={data} />;
}

export default MyComponent;
