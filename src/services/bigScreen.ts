import request from '@/utils/request';

export async function queryIllegalData() {
  return request(`/api/v1/illegal`);
}

export async function queryInterProvincialData() {
  return request(`/api/v1/inter-provincial`);
}
export async function queryPoliceDistribution() {
  return request(`/api/v1/police-distribution`);
}

export async function queryRecordNumber() {
  return request(`/api/v1/record-number`);
}

export async function queryTrafficRoutes() {
  return request(`/api/v1/traffic-routes`);
}

export async function queryTrafficTools() {
  return request(`/api/v1/traffic-tools`);
}

export async function queryTrafficVolume() {
  return request(`/api/v1/traffic-volume`);
}
