import axios from "@/plugins/axios";
import { AppError } from "@/AppError";

export default class ProductService {
  public static async getProducts(name: string = "", page: number, itemsPerPage: number, sortBy: string, sortDesc: boolean) {
    try {
      const response = await axios.get(`/products?name=${name}&page=${page}&itemsPerPage=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new AppError(
          error.response.data.error ? error.response.data.error : error.response.data.toString(),
          error.response.data.errorCode || 0
        );
      } else {
        throw error;
      }
    }
  }

  public static async addProduct(data) {
    try {
      await axios.post(`/products`, data);
      return true;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new AppError(
          error.response.data.error ? error.response.data.error : error.response.data.toString(),
          error.response.data.errorCode || 0
        );
      } else {
        throw error;
      }
    }
  }

  public static async deleteProduct(id) {
    try {
      await axios.delete(`/products/${id}`);
      return true;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new AppError(
          error.response.data.error ? error.response.data.error : error.response.data.toString(),
          error.response.data.errorCode || 0
        );
      } else {
        throw error;
      }
    }
  }

  public static async updateProduct(id, data) {
    try {
      await axios.put(`/products/${id}`, data);
      return true;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new AppError(
          error.response.data.error ? error.response.data.error : error.response.data.toString(),
          error.response.data.errorCode || 0
        );
      } else {
        throw error;
      }
    }
  }
}
