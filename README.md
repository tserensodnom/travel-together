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
 2. Нэвтрэх
      2.1 http://localhost:3000/user/onLogin method post
      ```json
        { 
         "name": "beku",
         "password": "mongol1234"
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
4. fetchNewPlans
   4.1 Request http://localhost:3000/travelPlan/fetchNewPlans method => get

5. JoinTravelPlan
   5.1 Request http://localhost:3000/travelPlan/joinPlan?travel_plan_id=613cacb89facbf92d4417de1 method => Get required Bearer token
 
6. FetchJoinRequest
   6.1 Request http://localhost:3000/travelPlan/fetchJoinRequest/614f04470a11ac6cb328dabf path.params = traverPlanId method => Get required Bearer token

7. GetchMyPlans
   7.1 Request http://localhost:3000/travelPlan/fetchMyPlans method => Get required Bearer token

8. GetUser
   8.1 Request http://localhost:3000/user/getUser/614e92ef840eed138ff878b8 path.params = userId

9. SetUserProfile
   9.1 Request http://localhost:3000/user/setUserProfile method => Post required Bearer token
```json
   {
      "profilePic": "test.jpeg"
   }
```