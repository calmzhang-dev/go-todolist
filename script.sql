create table casbin_rule
(
    id    bigint unsigned auto_increment
        primary key,
    ptype varchar(100) null,
    v0    varchar(100) null,
    v1    varchar(100) null,
    v2    varchar(100) null,
    v3    varchar(100) null,
    v4    varchar(100) null,
    v5    varchar(100) null,
    constraint idx_casbin_rule
        unique (ptype, v0, v1, v2, v3, v4, v5)
);

create table collections
(
    id   int auto_increment,
    name varchar(10) not null,
    icon int         null,
    constraint collection_id_uindex
        unique (id)
);

alter table collections
    add primary key (id);

create table collections_items
(
    collection_id int null,
    items_id      int null
);

create table collections_users
(
    collection_id int null,
    user_id       int null
);

create table items
(
    id            bigint auto_increment,
    item_name     varchar(20)  not null,
    description   varchar(100) null,
    project_id    int          null,
    deadline      timestamp    null,
    important     tinyint(1)   not null,
    done          tinyint(1)   null,
    myDay         tinyint(1)   null,
    created_time  timestamp    null,
    node          tinyint(1)   null,
    checkPoint    tinyint(1)   null,
    collection_id int          null,
    constraint item_itemId_uindex
        unique (id)
);

alter table items
    add primary key (id);

create table items_users
(
    item_id int null,
    user_id int null
);

create table mydays
(
    item_id int null,
    user_id int null
);

create table projects
(
    id           int auto_increment,
    name         varchar(20) not null,
    description  varchar(50) null,
    created_time timestamp   not null,
    end_time     timestamp   null,
    password     varchar(15) not null,
    admin_id     int         null,
    constraint project_password_uindex
        unique (password),
    constraint projection_projectionID_uindex
        unique (id)
);

alter table projects
    add primary key (id);

create table projects_nodes
(
    project_id int null,
    item_id    int null,
    user_id    int null
);

create table projects_users
(
    projects_id int not null,
    users_id    int not null
);

create table users
(
    id         int auto_increment,
    username   varchar(20)  not null,
    password   varchar(20)  not null,
    link       varchar(20)  null,
    bio        varchar(100) null,
    avatar     varchar(200) null,
    created_at datetime     null,
    updated_at datetime     null,
    deleted_at datetime     null,
    root       tinyint(1)   not null,
    constraint user_userID_uindex
        unique (id)
);

create index idx_users_deleted_at
    on users (deleted_at);

alter table users
    add primary key (id);


