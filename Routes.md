# Routes

## Auth

- /api/auth/register
- /api/auth/login

## Droom(prospect)

- GET all prospects /api/droom/
- GET single prospect /api/droom/:id
- POST user profile /api/droom/profile
- PUT user profile update /api/droom/:id/profile

## Company

- GET all companies /api/company/
- GET single companies /api/company/:id
- POST company profile /api/company/

## Listing **Company Only**

- GET all postings /api/company/jobs
- GET single posting /api/company/:id/job
- POST job listing /api/company/job
- PUT company profile update /api/company/:id/profile
- DELETE company job posting /api/company/:id/job
