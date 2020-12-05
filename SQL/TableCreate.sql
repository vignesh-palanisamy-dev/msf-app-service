-- Table: public.user_details

-- DROP TABLE public.user_details;

CREATE TABLE public.user_details
(
    user_id character varying(1000) NOT NULL,
    user_name character varying(1000) NOT NULL,
    email_id character varying(1000) NOT NULL,
    password character varying(1000),
    first_name text,
    last_name text,
    d_o_b text,
    phone_no bigint,
    company_name text,
    experience integer,
    created_by character varying(1000),
    created_at timestamp without time zone,
    updated_by character varying(1000),
    updated_at timestamp without time zone,
    CONSTRAINT user_details_pkey PRIMARY KEY (user_id, user_name, email_id)
)

TABLESPACE pg_default;

ALTER TABLE public.user_details
    OWNER to postgres;

