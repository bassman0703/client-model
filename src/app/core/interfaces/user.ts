export interface User {
  "id": number,
  "clientNumber": string,
  "firsName": string,
  "lastName": string,
  "gender": string,
  "personalNumber": number,
  "phoneNumber": number,
  "legalAddress": string,
  "actualAddress": string,
  img: string
}

export interface UserRequest {
  first: number,
  last: number,
  sortField: string | string []
  sortOrder: number;
  filter?: {
    clientNumber: string
  }
}

// export interface usersResponse {
//   user: User[]
//   total: number;
//   skip: number;
//   limit: number
// }
