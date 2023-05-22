import { Observable } from "rxjs";
import axios from "axios";
import { Item } from "../model/item.model";
import { CheckoutResponse } from "../model/checkout-response.model";
import { CheckoutRequest } from "../model/checkout-request.model";

export const ItemService = {
  getItems: (): Observable<Item[]> => {
    return new Observable<Item[]>((observer) => {
      axios
        .get<Item[]>("http://localhost:3001/api/items")
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          console.error("Error: ", error);
          observer.error(error);
        });
    });
  },
  checkout: (request: CheckoutRequest): Observable<CheckoutResponse> => {
    return new Observable((observer) => {
      axios
        .post("http://localhost:3001/api/items/checkout", request)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          console.error("Error: ", error);
          observer.error(error);
        });
    });
  },
};
