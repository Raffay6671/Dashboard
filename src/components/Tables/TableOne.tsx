import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Interface for the server statistics
export interface ServerStats {
  bytes_in: number;
  bytes_out: number;
  incoming_speed: number;
  outgoing_speed: number;
  no_of_active_users: number;
}

// Interface for the server details
export interface ServerDetails {
  uid: string;
  city_name: string;
  ipaddress: string;
  stats: ServerStats;
}

// Interface for each country with its servers
export interface VpnUsers {
  country: string;
  totalServers: number;
  list: ServerDetails[];
}

// Fetch data function
export async function FetchTableData(): Promise<VpnUsers[]> {
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

    const vpnUsers: VpnUsers[] = data.servers.map((server: any) => ({
      country: server.cname,
      totalServers: server.list.length,
      list: server.list.map((item: any) => ({
        uid: item.uid,
        city_name: item.city_name,
        ipaddress: item.ipaddress,
        stats: {
          bytes_in: item.latest_stat.bytes_in,
          bytes_out: item.latest_stat.bytes_out,
          incoming_speed: item.latest_stat.incoming_speed,
          outgoing_speed: item.latest_stat.outgoing_speed,
          no_of_active_users: item.latest_stat.no_of_active_users,
        },
      })),
    }));

    return vpnUsers;
  } catch (error) {
    console.error('Error fetching the data', error);
    return [];
  }
}

// Helper functions for conversions
const convertToMB = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2) + " MB";
const convertSpeedToKB = (speed: number) => (speed / 1024).toFixed(2) + " KB/s";

const TableOne: React.FC<{ data: VpnUsers[] }> = ({ data }) => {
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleListVisibility = (country: string) => {
    setExpandedCountry(expandedCountry === country ? null : country);
  };

  const handleViewList = (country: string) => {
    navigate(`/server-list/${country}`);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Global VPN Server Information
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-8">
          <div className="p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Country
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Total Servers
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Users
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Toggle List
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              View Lists
            </h5>
          </div>
        </div>

        {data.map((user, key) => (
          <React.Fragment key={key}>
            <div className={`grid grid-cols-3 sm:grid-cols-8 ${key === data.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'}`}>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-3">{user.country}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{user.totalServers}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  {user.list.reduce((total, item) => total + item.stats.no_of_active_users, 0)}
                </p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <button onClick={() => toggleListVisibility(user.country)} className="text-blue-500">Toggle List</button>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <button onClick={() => handleViewList(user.country)} className="text-blue-500">View List</button>
              </div>
            </div>

            {/* Expanded list details */}
            {expandedCountry === user.country && (
              <div className="p-5 bg-gray-100 dark:bg-gray-700">
                <h5 className="text-lg font-medium mb-4">Details for {user.country}</h5>
                <div className="grid grid-cols-9 gap-2 text-sm">
                  <p className="font-semibold">Country</p>
                  <p className="font-semibold">UID</p>
                  <p className="font-semibold">City Name</p>
                  <p className="font-semibold">IP Address</p>
                  <p className="font-semibold">Bytes In</p>
                  <p className="font-semibold">Bytes Out</p>
                  <p className="font-semibold">Received Speed</p>
                  <p className="font-semibold">Sent Speed</p>
                  <p className="font-semibold">Active Users</p>

                  {user.list.map((item, index) => (
                    <React.Fragment key={index}>
                      <p>{user.country}</p>
                      <p>{item.uid}</p>
                      <p>{item.city_name}</p>
                      <p>{item.ipaddress}</p>
                      <p>{convertToMB(item.stats.bytes_in)}</p> 
                      <p>{convertToMB(item.stats.bytes_out)}</p> 
                      <p>{convertSpeedToKB(item.stats.incoming_speed)}</p> 
                      <p>{convertSpeedToKB(item.stats.outgoing_speed)}</p> 
                      <p>{item.stats.no_of_active_users}</p>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
