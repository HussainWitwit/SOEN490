# Backend API Documentation
The following document is used to organize our API links. Developers can use this document as reference when in need of an API.

## Manage Recommendations
Manage recommendation table where you will add, remove, edit or get the list of recommendations.

### Add a recommendation
```
POST http://localhost:5000/ConfiguredRecommendation/add
BODY
{
	"Name": "YWO",
	"Type": "Yearly Wash Optimization",
	"RecurrenceDayOfWeek": 1,
	"CreatedOn": "2025-01-01T00:00:00",
	"CreatedBy": "Mohanad",
	"ModifiedBy": "Hussain",
	"RecurrenceDatetime": "2025-01-01T00:00:00",
	"Granularity": "Yearly", 
	"Parameters" : [
		{"ParameterName": "Span", "ParameterValue": "4"},
		{"ParameterName": "CenterPoint", "ParameterValue": "20250101"}
	]
}
```

### Get list of recommendations
```
GET http://localhost:5000/ConfiguredRecommendation/get
```

## Assets
Assets are part of the right-side pannel. You can get the list of assets or fetch them from powerfactor's API.

### Get list of assets
```
GET http://localhost:5000/Assets/get
```

### Fetch list of assets into database
```
GET http://localhost:5000/Assets/convert
```