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
         "userKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2Y0NWYwODIwZjRmNGZiNTAwMjNhMSIsImlhdCI6MTYzMTU0MTgwMiwiZXhwIjoxNjMxNTg1MDAyfQ.ZKrE2QmDM9fW9iTUYgLPVW64jNigCGjzntJT_FJuTBA"
      }
      }
   ``` 
 3. CreateTravelPlan
   
