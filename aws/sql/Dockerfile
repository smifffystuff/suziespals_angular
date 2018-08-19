FROM mysql:5.7.15

MAINTAINER me

ENV MYSQL_DATABASE=suziespals \
  MYSQL_ROOT_PASSWORD=Su5an0518 \
  MYSQL_USER=martinsmifff \
  MYSQL_PASSWORD=Su5an0518

ADD suziespals_tables.sql /docker-entrypoint-initdb.d

EXPOSE 3306
