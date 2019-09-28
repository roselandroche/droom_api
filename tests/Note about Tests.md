# Why are tests failing?!

Short: Foreign Key constraints

Long: Because the "listings" table contains a foreign key referencing the company table - the default behavior for Jest where the tests are run in parallel cause conflicts where data a specific test needs may mutate during or before a test. The common solution for this issue is to run tests concurrently and not run the suites in bulk.
