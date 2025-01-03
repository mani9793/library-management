#!/bin/bash
sqlplus -s username/password@hostname:port/service_name <<EOF
SET HEADING OFF;
SET FEEDBACK OFF;
SET PAGESIZE 0;
SET LINESIZE 1000;
SPOOL authors.txt;
SELECT id || ',' || name FROM Authors;
SPOOL OFF;
EXIT;
EOF