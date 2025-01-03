#!/bin/bash
cbq <<EOF
CONNECT -u username -p password -c couchbase://localhost;
SELECT meta().id, title, author_id FROM Books;
EXIT;
EOF