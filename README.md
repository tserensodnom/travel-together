# travel-together
travel-together
1. Бүртгүүлэх

      1.1 Request http://localhost:3000/user/onSignup method post
``` json
   {
        "name": "tserensodnom",
        "email": "tserensodnom.t@gmail.com",
        "password": "mongol123",
        "phone": 95858521
    }
 ```
      1.2 Response 
``` json
   {
      "status": "success",
       "message": "Амжилттай нэмэгдлээ",
      "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2Y1OTg4MjdkOTdhZWQxZDFkNjcyMyIsImlhdCI6MTYzMTU0MTY0MCwiZXhwIjoxNjMxNTg0ODQwfQ.3hBfSO2xFg9nSO6P4nNwWjILO37zqCytK2p-_o0bndk"
   }
```
 
 2. Нэвтрэх
      2.1 http://localhost:3000/user/onLogin method post
      ```json
        { 
         "name": "beku",
         "password": "mongol1234"
         }
      ```
      2.2 Response
   ```json
      {
         "status": "success",
         "message": "Амжилттай нэвтэрлээ",
         "data": {
            "user": {
               "_id": "613f45f0820f4f4fb50023a1",
               "name": "beku",
               "email": "beku.123@gmail.com",
               "phone": 9999999,
               "password": "$2b$10$Ik.KKxqh5BYJibs8b/CJeuK54s.FSMFaduUGX46q9R7QQwD05uu.u",
               "updated_at": "2021-09-13T12:37:04.032Z",
               "created_at": "2021-09-13T12:37:04.032Z",
               "__v": 0
            },
         "apiKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2Y0NWYwODIwZjRmNGZiNTAwMjNhMSIsImlhdCI6MTYzMTU0MTgwMiwiZXhwIjoxNjMxNTg1MDAyfQ.ZKrE2QmDM9fW9iTUYgLPVW64jNigCGjzntJT_FJuTBA"
      }
      }
   ``` 
 3. CreateTravelPlan
      
      3.1 Request http://localhost:3000/travelPlan method => post required Bearer token
   ```json
      {
         "image": "tiest",
         "title": "test",
         "emoji": "test"
      }
   ```
   
      3.2 Response

 ```json
         {
         "status": "success",
         "message": "Амжилттай нэмэгдлээ",
         "data": {
            "image": "tiest",
            "emoji": ":)",
            "travelers_id": [],
            "requist_id": [],
            "organizer_id": "613f45f0820f4f4fb50023a1",
            "todo_list": [],
            "_id": "6149d65d2cddb911ce16ff5f",
            "updated_at": "2021-09-21T12:55:57.328Z",
            "created_at": "2021-09-21T12:55:57.328Z",
            "__v": 0
            }
         }
```

4. Get TravelPlans

   4.1 Request http://localhost:3000/travelPlan method => get

   4.2 Response 
   

```json
   {
    "status": "success",
    "data": {
        "docs": [
            {
                "_id": "613cacb89facbf92d4417de1",
                "image": "test",
                "emoji": "emoji",
                "travelers_id": [],
                "requist_id": [
                    "613f45f0820f4f4fb50023a1"
                ],
                "organizer_id": "613cac311d5c1c1ae0c2cd31",
                "todo_list": [],
                "updated_at": "2021-09-11T13:18:48.393Z",
                "created_at": "2021-09-11T13:18:48.393Z",
                "__v": 0
            }
        ],
        "totalDocs": 3,
        "offset": 0,
        "limit": 20,
        "totalPages": 1,
        "page": 1,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": false,
        "prevPage": null,
        "nextPage": null
      }
   }
```
5 JoinTravelPlan
   5.1 Request http://localhost:3000/travelPlan/joinPlan?travel_plan_id=613cacb89facbf92d4417de1 method => Get post required Bearer token
 
   5.2 Response 
```json
   {
      "status": "success",
      "message": "Хүсэлт амжилттай илгээгдлээ"
   }
```

   
