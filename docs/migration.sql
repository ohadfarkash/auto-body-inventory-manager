PGDMP  7                      |            postgres    16.1    16.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    5    postgres    DATABASE     �   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE postgres;
                postgres    false            �           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    4800                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    5            �            1259    16398    location    TABLE     �   CREATE TABLE public.location (
    id integer NOT NULL,
    location_id integer,
    prefix character varying(2),
    index integer,
    name character varying(256) NOT NULL
);
    DROP TABLE public.location;
       public         heap    postgres    false    5            �            1259    16397    location_id_seq    SEQUENCE     �   CREATE SEQUENCE public.location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.location_id_seq;
       public          postgres    false    5    217            �           0    0    location_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.location_id_seq OWNED BY public.location.id;
          public          postgres    false    216            �            1259    16415    repair_order    TABLE     �   CREATE TABLE public.repair_order (
    id integer NOT NULL,
    ro_number integer NOT NULL,
    location_id integer NOT NULL
);
     DROP TABLE public.repair_order;
       public         heap    postgres    false    5            �            1259    16414    repair_order_id_seq    SEQUENCE     �   CREATE SEQUENCE public.repair_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.repair_order_id_seq;
       public          postgres    false    219    5            �           0    0    repair_order_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.repair_order_id_seq OWNED BY public.repair_order.id;
          public          postgres    false    218                        2604    16401    location id    DEFAULT     j   ALTER TABLE ONLY public.location ALTER COLUMN id SET DEFAULT nextval('public.location_id_seq'::regclass);
 :   ALTER TABLE public.location ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            !           2604    16418    repair_order id    DEFAULT     r   ALTER TABLE ONLY public.repair_order ALTER COLUMN id SET DEFAULT nextval('public.repair_order_id_seq'::regclass);
 >   ALTER TABLE public.repair_order ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            �          0    16398    location 
   TABLE DATA           H   COPY public.location (id, location_id, prefix, index, name) FROM stdin;
    public          postgres    false    217   �       �          0    16415    repair_order 
   TABLE DATA           B   COPY public.repair_order (id, ro_number, location_id) FROM stdin;
    public          postgres    false    219   C       �           0    0    location_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.location_id_seq', 9, true);
          public          postgres    false    216            �           0    0    repair_order_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.repair_order_id_seq', 1, false);
          public          postgres    false    218            #           2606    16403    location location_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.location DROP CONSTRAINT location_pkey;
       public            postgres    false    217            %           2606    16420    repair_order repair_order_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.repair_order
    ADD CONSTRAINT repair_order_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.repair_order DROP CONSTRAINT repair_order_pkey;
       public            postgres    false    219            &           2606    16409    location fk_location    FK CONSTRAINT     �   ALTER TABLE ONLY public.location
    ADD CONSTRAINT fk_location FOREIGN KEY (location_id) REFERENCES public.location(id) ON DELETE RESTRICT NOT VALID;
 >   ALTER TABLE ONLY public.location DROP CONSTRAINT fk_location;
       public          postgres    false    217    217    4643            '           2606    16421    repair_order fk_location_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.repair_order
    ADD CONSTRAINT fk_location_id FOREIGN KEY (location_id) REFERENCES public.location(id) ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public.repair_order DROP CONSTRAINT fk_location_id;
       public          postgres    false    217    219    4643            �   `   x�3��"ϼ�Լ���J����\.NC�`�H�IS0�2�4�t��sJs��`#����%gPEP~9P��3�,�<c0Ϙ+F��� =��      �      x������ � �     