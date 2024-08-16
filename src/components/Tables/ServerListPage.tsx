import React from 'react';
import { useParams } from 'react-router-dom';
import { VpnUsers } from './TableOne';

const convertToMB = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2) + " MB";
const convertSpeedToKB = (speed: number) => (speed / 1024).toFixed(2) + " KB/s";

const ServerListPage: React.FC<{ data: VpnUsers[] }> = ({ data }) => {
  const { country } = useParams<{ country: string }>();
  const user = data.find((user) => user.country === country);

  if (!user) {
    return <div>No data available for this country.</div>;
  }

  return (
    <div className="p-5">
      <h4 className="mb-6 text-xl font-semibold">Details for {user.country}</h4>
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
  );
};

export default ServerListPage;
