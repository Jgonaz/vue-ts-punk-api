import http from "@/http-common";
class BeersDataService {
  getAll(active_page: number, per_page = 25): Promise<any> {
    return http.get(`/beers?page=${active_page}&per_page=${per_page}`);
  }

  getById(id: number): Promise<any> {
    return http.get(`/beers/${id}`);
  }

  getByName(name: string, active_page: number, per_page = 25): Promise<any> {
    return http.get(
      `/beers?beer_name=${name}&page=${active_page}&per_page=${per_page}`
    );
  }

  getRandom(): Promise<any> {
    return http.get(`/beers/random`);
  }
}
export default new BeersDataService();
