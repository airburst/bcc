SELECT
  r.id,
  COUNT(uor.userId) as user_count
FROM rides r
LEFT JOIN usersOnRides uor ON r.id = uor.rideId
GROUP BY r.rideId;