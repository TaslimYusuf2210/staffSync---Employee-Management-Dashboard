# StaffSync — Backend API Specification

> **Project:** StaffSync Employee Management Dashboard  
> **Base URL:** `https://api.staffsync.com/v1`  
> **Auth:** All endpoints except `/auth/*` require a `Bearer <token>` header.  
> **Content-Type:** `application/json` (unless file upload)

---

## Table of Contents

1. [Authentication](#1-authentication)
2. [Employees](#2-employees)
3. [Departments](#3-departments)
4. [Dashboard](#4-dashboard)
5. [Reports](#5-reports)
6. [Settings](#6-settings)
7. [File Uploads](#7-file-uploads)
8. [Data Models](#8-data-models)

---

## 1. Authentication

### 1.1 Login

**`POST /auth/login`**

```json
{
  "email": "admin@rockscompany.com",
  "password": "securePassword123",
  "rememberMe": true
}
```

**Success (200):**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 86400,
    "user": {
      "id": "usr-1",
      "name": "Admin Strator",
      "email": "admin@rockscompany.com",
      "role": "admin",
      "profilePicture": "https://cdn.staffsync.com/images/admin.jpg"
    }
  }
}
```

### 1.2 Register / Create Account

**`POST /auth/register`**

```json
{
  "companyName": "Rocks Company Ltd",
  "email": "admin@rockscompany.com",
  "description": "Corporate Headquarters",
  "password": "securePassword123",
  "confirmPassword": "securePassword123",
  "agreeTerms": true
}
```

**Success (201):**

```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "usr-1",
      "name": "Admin",
      "email": "admin@rockscompany.com",
      "role": "admin"
    },
    "company": {
      "id": "comp-1",
      "name": "Rocks Company Ltd",
      "description": "Corporate Headquarters"
    }
  }
}
```

### 1.3 Forgot Password

**`POST /auth/forgot-password`**

```json
{ "email": "admin@rockscompany.com" }
```

### 1.4 Change Password

**`PUT /auth/change-password`**

```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newSecurePass456",
  "confirmPassword": "newSecurePass456"
}
```

---

## 2. Employees

### 2.1 List Employees

**`GET /employees?page=1&limit=10&search=John&department=Design&status=Active&sortBy=name&sortOrder=asc`**

```json
{
  "success": true,
  "data": {
    "employees": [
      {
        "id": "emp-101",
        "firstName": "Brooklyn",
        "lastName": "Simmons",
        "email": "brok-simms@mail.com",
        "phoneNumber": "+1 312 908 1234",
        "department": "Design",
        "position": "Creative Director",
        "employmentType": "Full-time",
        "status": "Active",
        "hireDate": "2024-01-10",
        "photoUrl": "https://cdn.staffsync.com/photos/emp-101.jpg"
      }
    ],
    "pagination": { "page": 1, "limit": 10, "totalItems": 34, "totalPages": 4 }
  }
}
```

### 2.2 Get Single Employee

**`GET /employees/:id`**

Returns full profile including `education`, `salary`, `bankAccount`, `documents`, `notes`.

### 2.3 Create Employee

**`POST /employees`**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@company.com",
  "phoneNumber": "+1 555 123 4567",
  "gender": "Male",
  "department": "Development",
  "position": "Software Engineer",
  "employmentType": "Full-time",
  "hireDate": "2025-07-01",
  "status": "Active"
}
```

### 2.4 Update Employee

**`PUT /employees/:id`** — Partial update supported.

### 2.5 Delete Employee

**`DELETE /employees/:id`**

### 2.6 Update Salary

**`PUT /employees/:id/salary`**

```json
{ "baseSalary": 9500, "bonus": 2000, "allowances": 500 }
```

### 2.7 Update Bank Account

**`PUT /employees/:id/bank`**

```json
{
  "bankName": "Chase Bank",
  "accountName": "Brooklyn Simmons",
  "accountNumber": "1234567890"
}
```

### 2.8 Education

**`POST /employees/:id/education`**

```json
{
  "institutionName": "MIT",
  "degree": "Master of Computer Science",
  "qualification": "M.CompSc",
  "fieldOfStudy": "Artificial Intelligence",
  "graduationYear": "2020"
}
```

**`DELETE /employees/:id/education/:educationId`**

### 2.9 Documents

**`POST /employees/:id/documents`** — `multipart/form-data`

| Field | Type   | Rules                                                            |
| ----- | ------ | ---------------------------------------------------------------- |
| file  | File   | Required, PDF/image, max 10MB                                    |
| name  | string | Required                                                         |
| type  | string | `Resume`, `Employment Letter`, `Certificates`, `Other Documents` |

**`DELETE /employees/:id/documents/:documentId`**

### 2.10 Notes

**`POST /employees/:id/notes`**

```json
{ "text": "Employee is performing exceptionally well this quarter." }
```

**`DELETE /employees/:id/notes/:noteId`**

---

## 3. Departments

### 3.1 List Departments

**`GET /departments`**

```json
{
  "success": true,
  "data": {
    "departments": [
      {
        "id": "dep-1",
        "name": "Design",
        "description": "UI/UX and product design.",
        "head": "Brooklyn Simmons",
        "employeeCount": 12,
        "dateCreated": "2024-01-10"
      }
    ]
  }
}
```

### 3.2 Get Single Department

**`GET /departments/:id`** — Returns department info + list of employee members.

### 3.3 Create Department

**`POST /departments`**

```json
{
  "name": "DevOps",
  "description": "Infrastructure and CI/CD.",
  "head": "John Doe"
}
```

### 3.4 Update Department

**`PUT /departments/:id`**

### 3.5 Delete Department

**`DELETE /departments/:id`**

---

## 4. Dashboard

### 4.1 Get Dashboard Stats

**`GET /dashboard/stats`**

```json
{
  "success": true,
  "data": {
    "totalEmployees": 34,
    "activeEmployees": 28,
    "inactiveEmployees": 6,
    "totalDepartments": 4,
    "newEmployeesThisMonth": 3,
    "employeesByDepartment": [
      { "department": "Design", "count": 12, "percentage": 35.3 }
    ],
    "statusDistribution": {
      "active": 28,
      "inactive": 3,
      "probation": 2,
      "resigned": 1,
      "terminated": 0
    },
    "recentEmployees": [
      {
        "id": "emp-201",
        "firstName": "John",
        "lastName": "Doe",
        "department": "Development",
        "position": "Software Engineer",
        "hireDate": "2025-07-01",
        "photoUrl": null
      }
    ],
    "growthTrend": {
      "labels": ["Q1", "Q2", "Q3", "Q4"],
      "data": [20, 25, 30, 34]
    }
  }
}
```

---

## 5. Reports

### 5.1 Employee Summary

**`GET /reports/employee-summary`**

### 5.2 Salary Summary

**`GET /reports/salary-summary`**

### 5.3 Hiring Trend

**`GET /reports/hiring-trend?period=monthly&months=12`**

### 5.4 Export Reports

**`GET /reports/export?type=salary-summary&format=csv`** — Formats: `csv`, `xlsx`, `pdf`

---

## 6. Settings

### 6.1 Get Settings

**`GET /settings`**

### 6.2 Update Admin Profile

**`PUT /settings/admin`**

```json
{
  "name": "Admin Strator",
  "email": "admin@rockscompany.com",
  "profilePicture": "https://cdn.staffsync.com/images/admin.jpg"
}
```

### 6.3 Update Company Info

**`PUT /settings/company`**

```json
{
  "name": "Rocks Company Ltd",
  "email": "contact@rockscompany.com",
  "phoneNumber": "+1 312 908 1234",
  "address": "123 Avenue block, Chicago, IL"
}
```

---

## 7. File Uploads

### 7.1 Upload File

**`POST /upload`** — `multipart/form-data`

| Field     | Type   | Rules                                                            |
| --------- | ------ | ---------------------------------------------------------------- |
| file      | File   | Required, max 10MB, allowed: PDF, DOC, DOCX, PNG, JPG, JPEG, GIF |
| directory | string | Optional: `documents`, `photos`, `general`                       |

---

## 8. Data Models

### Employee

```json
{
  "id": "string (emp-xxx)",
  "firstName": "string",
  "lastName": "string",
  "email": "string (unique)",
  "phoneNumber": "string",
  "gender": "string (Male | Female | Other)",
  "dob": "string (date, optional)",
  "address": "string (optional)",
  "emergencyContact": "string (optional)",
  "department": "string",
  "position": "string",
  "employmentType": "string (Full-time | Part-time | Contract | Intern | Remote)",
  "hireDate": "string (date)",
  "reportingManager": "string (optional)",
  "status": "string (Active | Inactive | Probation | Resigned | Terminated)",
  "photoUrl": "string (url, optional)",
  "education": "Education[]",
  "salary": "Salary",
  "bankAccount": "BankAccount",
  "documents": "Document[]",
  "notes": "Note[]",
  "createdAt": "string (ISO datetime)",
  "updatedAt": "string (ISO datetime)"
}
```

### Department

```json
{
  "id": "string (dep-xxx)",
  "name": "string (unique)",
  "description": "string",
  "head": "string",
  "dateCreated": "string (date)"
}
```

### Education

```json
{
  "id": "string (edu-xxx)",
  "institutionName": "string",
  "degree": "string",
  "qualification": "string",
  "fieldOfStudy": "string",
  "graduationYear": "string"
}
```

### Salary

```json
{ "baseSalary": "number", "bonus": "number", "allowances": "number" }
```

### BankAccount

```json
{ "bankName": "string", "accountName": "string", "accountNumber": "string" }
```

### Document

```json
{
  "id": "string (doc-xxx)",
  "name": "string",
  "type": "string (Resume | Employment Letter | Certificates | Other Documents)",
  "uploadDate": "string (date)",
  "fileUrl": "string (url)"
}
```

### Note

```json
{ "id": "string (n-xxx)", "text": "string", "createdDate": "string (date)" }
```

### Common Error Response

```json
{
  "success": false,
  "message": "Error description",
  "errors": { "fieldName": ["Validation error"] }
}
```

| Status | Meaning               |
| ------ | --------------------- |
| 200    | OK                    |
| 201    | Created               |
| 400    | Bad Request           |
| 401    | Unauthorized          |
| 403    | Forbidden             |
| 404    | Not Found             |
| 500    | Internal Server Error |

---

## Endpoints Summary

| #   | Method | Endpoint                          | Description       |
| --- | ------ | --------------------------------- | ----------------- |
| 1   | POST   | `/auth/login`                     | Login             |
| 2   | POST   | `/auth/register`                  | Register          |
| 3   | POST   | `/auth/forgot-password`           | Forgot password   |
| 4   | PUT    | `/auth/change-password`           | Change password   |
| 5   | GET    | `/employees`                      | List employees    |
| 6   | GET    | `/employees/:id`                  | Get employee      |
| 7   | POST   | `/employees`                      | Create employee   |
| 8   | PUT    | `/employees/:id`                  | Update employee   |
| 9   | DELETE | `/employees/:id`                  | Delete employee   |
| 10  | PUT    | `/employees/:id/salary`           | Update salary     |
| 11  | PUT    | `/employees/:id/bank`             | Update bank       |
| 12  | POST   | `/employees/:id/education`        | Add education     |
| 13  | DELETE | `/employees/:id/education/:eduId` | Delete education  |
| 14  | POST   | `/employees/:id/documents`        | Upload document   |
| 15  | DELETE | `/employees/:id/documents/:docId` | Delete document   |
| 16  | POST   | `/employees/:id/notes`            | Add note          |
| 17  | DELETE | `/employees/:id/notes/:noteId`    | Delete note       |
| 18  | GET    | `/departments`                    | List departments  |
| 19  | GET    | `/departments/:id`                | Get department    |
| 20  | POST   | `/departments`                    | Create department |
| 21  | PUT    | `/departments/:id`                | Update department |
| 22  | DELETE | `/departments/:id`                | Delete department |
| 23  | GET    | `/dashboard/stats`                | Dashboard stats   |
| 24  | GET    | `/reports/employee-summary`       | Employee report   |
| 25  | GET    | `/reports/salary-summary`         | Salary report     |
| 26  | GET    | `/reports/hiring-trend`           | Hiring trend      |
| 27  | GET    | `/reports/export`                 | Export report     |
| 28  | GET    | `/settings`                       | Get settings      |
| 29  | PUT    | `/settings/admin`                 | Update admin      |
| 30  | PUT    | `/settings/company`               | Update company    |
| 31  | POST   | `/upload`                         | Upload file       |
