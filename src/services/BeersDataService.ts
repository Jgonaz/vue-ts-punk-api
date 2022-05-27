import http from "@/http-common";
class BeersDataService {
  getAll(): Promise<any> {
    return http.get("/beers");
  }

  getById(id: any): Promise<any> {
    return http.get(`/beers/${id}`);
  }

  getByName(name: string): Promise<any> {
    return http.get(`/beers?beer_name=${name}`);
  }

  getRandom(): Promise<any> {
    return http.get(`/beers/random`);
  }
}
export default new BeersDataService();
