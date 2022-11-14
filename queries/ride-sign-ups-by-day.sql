-- Partition ride sign ups by day over time period
SELECT
  STR_TO_DATE(concat(Year,'-',Month,'-',Day), '%Y-%m-%d') as Date,
	Total
from (
	SELECT
		YEAR(createdAt) as Year,
		MONTH(createdAt) as Month,
		DAY(createdAt) as Day,
		COUNT(*) as Total
	FROM UsersOnRides
	GROUP BY
		YEAR(createdAt),
		MONTH(createdAt),
		DAY(createdAt)
) as stats
order by Date;