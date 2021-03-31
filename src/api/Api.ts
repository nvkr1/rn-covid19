import axios from 'axios';

/* =====
    Static class
    All api request should use this class
======= */
export default class Api{
    
    // api base url
    public static readonly origin = 'https://api.covid19api.com';

    // all request should use it
    private static readonly apiClient = axios.create({baseURL: Api.origin});

    // fetch world data
  public static fetchWorldData = async (): Promise<IWorldData[]> => {
    const end = new Date();
    let start = new Date();
    start.setDate(start.getDate() - 7);
    const response = await Api.apiClient(
      `/world?from=${start}&to=${end}`,
    );
    const data: IWorldData[] = response.data;
    return data || [];
  };

  // fetch country data
  public static fetchCountryData = async (): Promise<IStatsRecord[]> => {
    const response = await Api.apiClient(
      'live/country/mongolia/status/confirmed',
    );
    const records: IStatsRecord[] = response.data;
    return records || [];
  };
}