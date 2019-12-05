PGDMP             
            w            gorvodokanal    9.6.16    9.6.16 8    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            �           1262    16664    gorvodokanal    DATABASE     �   CREATE DATABASE gorvodokanal WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';
    DROP DATABASE gorvodokanal;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    12387    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            �           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    16675    address    TABLE     �   CREATE TABLE public.address (
    primarykey uuid NOT NULL,
    index integer NOT NULL,
    street character varying(255) NOT NULL,
    house integer NOT NULL,
    build character varying(255),
    floor integer,
    flat integer
);
    DROP TABLE public.address;
       public         postgres    false    3            �            1259    16757    applicationlog    TABLE     :  CREATE TABLE public.applicationlog (
    primarykey uuid NOT NULL,
    category character varying(64),
    eventid integer,
    priority integer,
    severity character varying(32),
    title character varying(256),
    "timestamp" timestamp(3) without time zone,
    machinename character varying(32),
    appdomainname character varying(512),
    processid character varying(256),
    processname character varying(512),
    threadname character varying(512),
    win32threadid character varying(128),
    message character varying(2500),
    formattedmessage text
);
 "   DROP TABLE public.applicationlog;
       public         postgres    false    3            �            1259    16670    request    TABLE     0  CREATE TABLE public.request (
    primarykey uuid NOT NULL,
    index integer NOT NULL,
    address uuid NOT NULL,
    isappointed character varying(13) NOT NULL,
    date timestamp(3) without time zone,
    iscompleted boolean NOT NULL,
    realduration timestamp(3) without time zone,
    team uuid
);
    DROP TABLE public.request;
       public         postgres    false    3            �            1259    16709    stormadvlimit    TABLE     �   CREATE TABLE public.stormadvlimit (
    primarykey uuid NOT NULL,
    "User" character varying(255),
    published boolean,
    module character varying(255),
    name character varying(255),
    value text,
    hotkeydata integer
);
 !   DROP TABLE public.stormadvlimit;
       public         postgres    false    3            �            1259    16733    stormfilterdetail    TABLE     1  CREATE TABLE public.stormfilterdetail (
    primarykey uuid NOT NULL,
    caption character varying(255) NOT NULL,
    dataobjectview character varying(255) NOT NULL,
    connectmasterprop character varying(255) NOT NULL,
    ownerconnectprop character varying(255),
    filtersetting_m0 uuid NOT NULL
);
 %   DROP TABLE public.stormfilterdetail;
       public         postgres    false    3            �            1259    16741    stormfilterlookup    TABLE       CREATE TABLE public.stormfilterlookup (
    primarykey uuid NOT NULL,
    dataobjecttype character varying(255) NOT NULL,
    container character varying(255),
    containertag character varying(255),
    fieldstoview character varying(255),
    filtersetting_m0 uuid NOT NULL
);
 %   DROP TABLE public.stormfilterlookup;
       public         postgres    false    3            �            1259    16717    stormfiltersetting    TABLE     �   CREATE TABLE public.stormfiltersetting (
    primarykey uuid NOT NULL,
    name character varying(255) NOT NULL,
    dataobjectview character varying(255) NOT NULL
);
 &   DROP TABLE public.stormfiltersetting;
       public         postgres    false    3            �            1259    16693    stormnetlockdata    TABLE     �   CREATE TABLE public.stormnetlockdata (
    lockkey character varying(300) NOT NULL,
    username character varying(300) NOT NULL,
    lockdate timestamp(3) without time zone
);
 $   DROP TABLE public.stormnetlockdata;
       public         postgres    false    3            �            1259    16701    stormsettings    TABLE     �   CREATE TABLE public.stormsettings (
    primarykey uuid NOT NULL,
    module character varying(1000),
    name character varying(255),
    value text,
    "User" character varying(255)
);
 !   DROP TABLE public.stormsettings;
       public         postgres    false    3            �            1259    16725    stormwebsearch    TABLE       CREATE TABLE public.stormwebsearch (
    primarykey uuid NOT NULL,
    name character varying(255) NOT NULL,
    "Order" integer NOT NULL,
    presentview character varying(255) NOT NULL,
    detailedview character varying(255) NOT NULL,
    filtersetting_m0 uuid NOT NULL
);
 "   DROP TABLE public.stormwebsearch;
       public         postgres    false    3            �            1259    16665    task    TABLE     �   CREATE TABLE public.task (
    primarykey uuid NOT NULL,
    code integer NOT NULL,
    content character varying(255) NOT NULL,
    planeduration timestamp(3) without time zone NOT NULL,
    request uuid NOT NULL
);
    DROP TABLE public.task;
       public         postgres    false    3            �            1259    16688    team    TABLE     �   CREATE TABLE public.team (
    primarykey uuid NOT NULL,
    index integer NOT NULL,
    shiftstart timestamp(3) without time zone NOT NULL,
    shiftend timestamp(3) without time zone NOT NULL
);
    DROP TABLE public.team;
       public         postgres    false    3            �            1259    16749    usersetting    TABLE       CREATE TABLE public.usersetting (
    primarykey uuid NOT NULL,
    appname character varying(256),
    username character varying(512),
    userguid uuid,
    modulename character varying(1024),
    moduleguid uuid,
    settname character varying(256),
    settguid uuid,
    settlastaccesstime timestamp(3) without time zone,
    strval character varying(256),
    txtval text,
    intval integer,
    boolval boolean,
    guidval uuid,
    decimalval numeric(20,10),
    datetimeval timestamp(3) without time zone
);
    DROP TABLE public.usersetting;
       public         postgres    false    3            �          0    16675    address 
   TABLE DATA               W   COPY public.address (primarykey, index, street, house, build, floor, flat) FROM stdin;
    public       postgres    false    187   I       �          0    16757    applicationlog 
   TABLE DATA               �   COPY public.applicationlog (primarykey, category, eventid, priority, severity, title, "timestamp", machinename, appdomainname, processid, processname, threadname, win32threadid, message, formattedmessage) FROM stdin;
    public       postgres    false    197   )I       �          0    16670    request 
   TABLE DATA               q   COPY public.request (primarykey, index, address, isappointed, date, iscompleted, realduration, team) FROM stdin;
    public       postgres    false    186   FI       �          0    16709    stormadvlimit 
   TABLE DATA               g   COPY public.stormadvlimit (primarykey, "User", published, module, name, value, hotkeydata) FROM stdin;
    public       postgres    false    191   cI       �          0    16733    stormfilterdetail 
   TABLE DATA               �   COPY public.stormfilterdetail (primarykey, caption, dataobjectview, connectmasterprop, ownerconnectprop, filtersetting_m0) FROM stdin;
    public       postgres    false    194   �I       �          0    16741    stormfilterlookup 
   TABLE DATA               �   COPY public.stormfilterlookup (primarykey, dataobjecttype, container, containertag, fieldstoview, filtersetting_m0) FROM stdin;
    public       postgres    false    195   �I       �          0    16717    stormfiltersetting 
   TABLE DATA               N   COPY public.stormfiltersetting (primarykey, name, dataobjectview) FROM stdin;
    public       postgres    false    192   �I       �          0    16693    stormnetlockdata 
   TABLE DATA               G   COPY public.stormnetlockdata (lockkey, username, lockdate) FROM stdin;
    public       postgres    false    189   �I       �          0    16701    stormsettings 
   TABLE DATA               P   COPY public.stormsettings (primarykey, module, name, value, "User") FROM stdin;
    public       postgres    false    190   �I       �          0    16725    stormwebsearch 
   TABLE DATA               p   COPY public.stormwebsearch (primarykey, name, "Order", presentview, detailedview, filtersetting_m0) FROM stdin;
    public       postgres    false    193   J       �          0    16665    task 
   TABLE DATA               Q   COPY public.task (primarykey, code, content, planeduration, request) FROM stdin;
    public       postgres    false    185   .J       �          0    16688    team 
   TABLE DATA               G   COPY public.team (primarykey, index, shiftstart, shiftend) FROM stdin;
    public       postgres    false    188   KJ       �          0    16749    usersetting 
   TABLE DATA               �   COPY public.usersetting (primarykey, appname, username, userguid, modulename, moduleguid, settname, settguid, settlastaccesstime, strval, txtval, intval, boolval, guidval, decimalval, datetimeval) FROM stdin;
    public       postgres    false    196   hJ                  2606    16682    address address_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (primarykey);
 >   ALTER TABLE ONLY public.address DROP CONSTRAINT address_pkey;
       public         postgres    false    187    187            %           2606    16764 "   applicationlog applicationlog_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.applicationlog
    ADD CONSTRAINT applicationlog_pkey PRIMARY KEY (primarykey);
 L   ALTER TABLE ONLY public.applicationlog DROP CONSTRAINT applicationlog_pkey;
       public         postgres    false    197    197                       2606    16674    request request_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.request
    ADD CONSTRAINT request_pkey PRIMARY KEY (primarykey);
 >   ALTER TABLE ONLY public.request DROP CONSTRAINT request_pkey;
       public         postgres    false    186    186                       2606    16716     stormadvlimit stormadvlimit_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.stormadvlimit
    ADD CONSTRAINT stormadvlimit_pkey PRIMARY KEY (primarykey);
 J   ALTER TABLE ONLY public.stormadvlimit DROP CONSTRAINT stormadvlimit_pkey;
       public         postgres    false    191    191                       2606    16740 (   stormfilterdetail stormfilterdetail_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.stormfilterdetail
    ADD CONSTRAINT stormfilterdetail_pkey PRIMARY KEY (primarykey);
 R   ALTER TABLE ONLY public.stormfilterdetail DROP CONSTRAINT stormfilterdetail_pkey;
       public         postgres    false    194    194            !           2606    16748 (   stormfilterlookup stormfilterlookup_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.stormfilterlookup
    ADD CONSTRAINT stormfilterlookup_pkey PRIMARY KEY (primarykey);
 R   ALTER TABLE ONLY public.stormfilterlookup DROP CONSTRAINT stormfilterlookup_pkey;
       public         postgres    false    195    195                       2606    16724 *   stormfiltersetting stormfiltersetting_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.stormfiltersetting
    ADD CONSTRAINT stormfiltersetting_pkey PRIMARY KEY (primarykey);
 T   ALTER TABLE ONLY public.stormfiltersetting DROP CONSTRAINT stormfiltersetting_pkey;
       public         postgres    false    192    192                       2606    16700 &   stormnetlockdata stormnetlockdata_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.stormnetlockdata
    ADD CONSTRAINT stormnetlockdata_pkey PRIMARY KEY (lockkey);
 P   ALTER TABLE ONLY public.stormnetlockdata DROP CONSTRAINT stormnetlockdata_pkey;
       public         postgres    false    189    189                       2606    16708     stormsettings stormsettings_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.stormsettings
    ADD CONSTRAINT stormsettings_pkey PRIMARY KEY (primarykey);
 J   ALTER TABLE ONLY public.stormsettings DROP CONSTRAINT stormsettings_pkey;
       public         postgres    false    190    190                       2606    16732 "   stormwebsearch stormwebsearch_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.stormwebsearch
    ADD CONSTRAINT stormwebsearch_pkey PRIMARY KEY (primarykey);
 L   ALTER TABLE ONLY public.stormwebsearch DROP CONSTRAINT stormwebsearch_pkey;
       public         postgres    false    193    193                       2606    16669    task task_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (primarykey);
 8   ALTER TABLE ONLY public.task DROP CONSTRAINT task_pkey;
       public         postgres    false    185    185                       2606    16692    team team_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_pkey PRIMARY KEY (primarykey);
 8   ALTER TABLE ONLY public.team DROP CONSTRAINT team_pkey;
       public         postgres    false    188    188            #           2606    16756    usersetting usersetting_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.usersetting
    ADD CONSTRAINT usersetting_pkey PRIMARY KEY (primarykey);
 F   ALTER TABLE ONLY public.usersetting DROP CONSTRAINT usersetting_pkey;
       public         postgres    false    196    196                       1259    16782 %   index5422502ec11b45ec80831eb57881dcbf    INDEX     \   CREATE INDEX index5422502ec11b45ec80831eb57881dcbf ON public.request USING btree (address);
 9   DROP INDEX public.index5422502ec11b45ec80831eb57881dcbf;
       public         postgres    false    186                       1259    16851 %   index6b3bd18e9a71440883b5e479531a6216    INDEX     Y   CREATE INDEX index6b3bd18e9a71440883b5e479531a6216 ON public.request USING btree (team);
 9   DROP INDEX public.index6b3bd18e9a71440883b5e479531a6216;
       public         postgres    false    186            	           1259    16845 %   indexd6cc455421414be2b63b959d6ee70233    INDEX     Y   CREATE INDEX indexd6cc455421414be2b63b959d6ee70233 ON public.task USING btree (request);
 9   DROP INDEX public.indexd6cc455421414be2b63b959d6ee70233;
       public         postgres    false    185            +           2606    16805 4   stormfilterlookup fk4d3e9039c35b48c0b9f002ae07cb9e24    FK CONSTRAINT     �   ALTER TABLE ONLY public.stormfilterlookup
    ADD CONSTRAINT fk4d3e9039c35b48c0b9f002ae07cb9e24 FOREIGN KEY (filtersetting_m0) REFERENCES public.stormfiltersetting(primarykey);
 ^   ALTER TABLE ONLY public.stormfilterlookup DROP CONSTRAINT fk4d3e9039c35b48c0b9f002ae07cb9e24;
       public       postgres    false    2075    192    195            &           2606    16840 '   task fk742a59f2c22744d78a0ebb9b08a2255f    FK CONSTRAINT     �   ALTER TABLE ONLY public.task
    ADD CONSTRAINT fk742a59f2c22744d78a0ebb9b08a2255f FOREIGN KEY (request) REFERENCES public.request(primarykey);
 Q   ALTER TABLE ONLY public.task DROP CONSTRAINT fk742a59f2c22744d78a0ebb9b08a2255f;
       public       postgres    false    2063    186    185            (           2606    16846 *   request fk7a0cafd2076e461485a561360dfe1ae6    FK CONSTRAINT     �   ALTER TABLE ONLY public.request
    ADD CONSTRAINT fk7a0cafd2076e461485a561360dfe1ae6 FOREIGN KEY (team) REFERENCES public.team(primarykey);
 T   ALTER TABLE ONLY public.request DROP CONSTRAINT fk7a0cafd2076e461485a561360dfe1ae6;
       public       postgres    false    188    2067    186            *           2606    16800 4   stormfilterdetail fk7a80c5999b1241b6b43e1c4881d20767    FK CONSTRAINT     �   ALTER TABLE ONLY public.stormfilterdetail
    ADD CONSTRAINT fk7a80c5999b1241b6b43e1c4881d20767 FOREIGN KEY (filtersetting_m0) REFERENCES public.stormfiltersetting(primarykey);
 ^   ALTER TABLE ONLY public.stormfilterdetail DROP CONSTRAINT fk7a80c5999b1241b6b43e1c4881d20767;
       public       postgres    false    194    192    2075            '           2606    16777 *   request fkb157732482aa47708262e5427d9998f9    FK CONSTRAINT     �   ALTER TABLE ONLY public.request
    ADD CONSTRAINT fkb157732482aa47708262e5427d9998f9 FOREIGN KEY (address) REFERENCES public.address(primarykey);
 T   ALTER TABLE ONLY public.request DROP CONSTRAINT fkb157732482aa47708262e5427d9998f9;
       public       postgres    false    187    186    2065            )           2606    16795 1   stormwebsearch fkc10cb3debe744426b6f1fb45b07e0c13    FK CONSTRAINT     �   ALTER TABLE ONLY public.stormwebsearch
    ADD CONSTRAINT fkc10cb3debe744426b6f1fb45b07e0c13 FOREIGN KEY (filtersetting_m0) REFERENCES public.stormfiltersetting(primarykey);
 [   ALTER TABLE ONLY public.stormwebsearch DROP CONSTRAINT fkc10cb3debe744426b6f1fb45b07e0c13;
       public       postgres    false    193    192    2075            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     